// ============================================================
// TREK VISA — International Visa Rules Engine
// ============================================================
// This module is the administrable rules database for the Smart
// Visa Checker. It maps (nationality + residence + destination +
// purpose + duration) to a personalized visa pathway.
//
// In production these rules live in a VisaRule entity so admins
// can update them without touching code. This file provides the
// default verified dataset and the evaluation logic.
// ============================================================

import { COUNTRIES, flag, getBaseVisaPrice, applyCommission } from "./visaData";

// ------------------------------------------------------------
// 1. REGIONS & VISA-EXEMPT NATIONALITY SETS
// ------------------------------------------------------------

const SCHENGEN_STATES = [
  "France", "Germany", "Italy", "Spain", "Portugal", "Netherlands", "Belgium",
  "Greece", "Sweden", "Denmark", "Finland", "Austria", "Poland", "Czech Republic",
  "Hungary", "Luxembourg", "Malta", "Cyprus", "Slovakia", "Slovenia", "Estonia",
  "Latvia", "Lithuania", "Croatia", "Bulgaria", "Romania", "Switzerland",
  "Norway", "Iceland", "Liechtenstein",
];

// Schengen Annex II — visa-exempt for short stays (90/180)
const SCHENGEN_EXEMPT = new Set([
  ...SCHENGEN_STATES, "United Kingdom", "Ireland", "United States", "Canada",
  "Australia", "New Zealand", "Japan", "South Korea", "Singapore", "Malaysia",
  "Brazil", "Argentina", "Chile", "Uruguay", "Mexico", "Costa Rica", "Panama",
  "UAE", "Israel", "Mauritius", "Seychelles", "Hong Kong", "Macau", "Taiwan",
  "Brunei", "Guatemala", "Honduras", "El Salvador", "Nicaragua", "Paraguay",
  "Vatican City", "Serbia", "Montenegro", "North Macedonia", "Bosnia and Herzegovina",
  "Albania", "Georgia", "Moldova", "Ukraine",
]);

// US Visa Waiver Program (ESTA)
const US_VWP = new Set([
  "United Kingdom", "Ireland", "Germany", "France", "Italy", "Spain", "Portugal",
  "Netherlands", "Belgium", "Luxembourg", "Austria", "Greece", "Malta", "Cyprus",
  "Sweden", "Denmark", "Finland", "Norway", "Iceland", "Switzerland",
  "Japan", "South Korea", "Singapore", "Taiwan", "Australia", "New Zealand",
  "Brunei", "Croatia", "Czech Republic", "Estonia", "Hungary", "Latvia",
  "Lithuania", "Poland", "Slovakia", "Slovenia", "Chile",
]);

// UK visa-exempt (non-visa nationals)
const UK_EXEMPT = new Set([
  ...SCHENGEN_STATES, "United States", "Canada", "Australia", "New Zealand",
  "Japan", "South Korea", "Singapore", "Malaysia", "Hong Kong", "Taiwan",
  "Brazil", "Argentina", "Chile", "Costa Rica", "Mexico", "UAE", "Israel",
  "United States", "Ireland",
]);

// Canada eTA-eligible (visa-exempt)
const CANADA_ETA = new Set([
  "United States", "United Kingdom", "Ireland", "Germany", "France", "Italy",
  "Spain", "Portugal", "Netherlands", "Belgium", "Luxembourg", "Austria",
  "Greece", "Sweden", "Denmark", "Finland", "Norway", "Iceland", "Switzerland",
  "Japan", "South Korea", "Singapore", "Australia", "New Zealand", "Malaysia",
  "Brunei", "Hong Kong", "Taiwan", "Croatia", "Czech Republic", "Estonia",
  "Hungary", "Latvia", "Lithuania", "Poland", "Slovakia", "Slovenia",
  "Bulgaria", "Romania", "Cyprus", "Malta", "Israel", "UAE",
]);

// Japan visa-exempt
const JAPAN_EXEMPT = new Set([
  ...SCHENGEN_STATES, "United Kingdom", "Ireland", "United States", "Canada",
  "Australia", "New Zealand", "Singapore", "Malaysia", "Brunei", "Thailand",
  "South Korea", "Hong Kong", "Taiwan", "Mexico", "Costa Rica", "Chile",
  "Argentina", "Brazil", "Uruguay", "UAE", "Israel", "Mauritius", "Seychelles",
]);

// UAE visa-on-arrival / visa-free
const UAE_ON_ARRIVAL = new Set([
  "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain",
  "United States", "United Kingdom", "France", "Germany", "Italy", "Spain",
  "Netherlands", "Belgium", "Switzerland", "Austria", "Sweden", "Denmark",
  "Finland", "Norway", "Iceland", "Ireland", "Greece", "Portugal", "Luxembourg",
  "Japan", "South Korea", "Singapore", "Malaysia", "Australia", "New Zealand",
  "Canada", "Hong Kong", "China", "India", "Russia", "Ukraine", "Israel",
  "Mauritius", "Seychelles",
]);

// Australia ETA-eligible
const AUSTRALIA_ETA = new Set([
  "United States", "United Kingdom", "Canada", "Japan", "South Korea",
  "Singapore", "Malaysia", "Hong Kong", "Taiwan", "Brunei", "New Zealand",
]);

// ------------------------------------------------------------
// 2. VISA STATUS EVALUATION
// ------------------------------------------------------------

export const VISA_STATUS = {
  VISA_REQUIRED: { id: "visa_required", label: "Visa required", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
  VISA_FREE: { id: "visa_free", label: "Visa-free entry", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
  EVISA: { id: "evisa", label: "e-Visa available", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  ETA: { id: "eta", label: "eTA / Electronic authorization", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
  ON_ARRIVAL: { id: "visa_on_arrival", label: "Visa on arrival", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
};

// Lookup by status id (used to resolve DB overrides)
const STATUS_BY_ID = Object.fromEntries(Object.values(VISA_STATUS).map((s) => [s.id, s]));

function isSchengenDestination(destination) {
  return SCHENGEN_STATES.includes(destination);
}

// Returns the visa status for a nationality → destination pair.
export function getVisaStatus(nationality, destination) {
  if (!nationality || !destination) return VISA_STATUS.VISA_REQUIRED;

  // Same country — no visa needed
  if (nationality === destination) return VISA_STATUS.VISA_FREE;

  // Schengen
  if (isSchengenDestination(destination)) {
    if (SCHENGEN_EXEMPT.has(nationality)) return VISA_STATUS.VISA_FREE;
    return VISA_STATUS.VISA_REQUIRED;
  }

  // USA
  if (destination === "United States") {
    if (US_VWP.has(nationality)) return VISA_STATUS.ETA;
    return VISA_STATUS.VISA_REQUIRED;
  }

  // UK
  if (destination === "United Kingdom") {
    if (UK_EXEMPT.has(nationality)) return VISA_STATUS.VISA_FREE;
    return VISA_STATUS.VISA_REQUIRED;
  }

  // Canada
  if (destination === "Canada") {
    if (nationality === "United States") return VISA_STATUS.VISA_FREE;
    if (CANADA_ETA.has(nationality)) return VISA_STATUS.ETA;
    return VISA_STATUS.VISA_REQUIRED;
  }

  // Japan
  if (destination === "Japan") {
    if (JAPAN_EXEMPT.has(nationality)) return VISA_STATUS.VISA_FREE;
    return VISA_STATUS.VISA_REQUIRED;
  }

  // UAE
  if (destination === "UAE") {
    if (UAE_ON_ARRIVAL.has(nationality)) return VISA_STATUS.ON_ARRIVAL;
    return VISA_STATUS.EVISA;
  }

  // Australia
  if (destination === "Australia") {
    if (AUSTRALIA_ETA.has(nationality)) return VISA_STATUS.ETA;
    return VISA_STATUS.EVISA;
  }

  // Turkey — e-Visa for most
  if (destination === "Turkey") return VISA_STATUS.EVISA;

  // India — e-Visa for most
  if (destination === "India") return VISA_STATUS.EVISA;

  // Many African / Asian destinations offer e-Visa
  const evisaDestinations = ["Kenya", "Uganda", "Tanzania", "Rwanda", "Ethiopia", "Nigeria", "Ghana", "Senegal", "Zambia", "Zimbabwe", "Egypt", "Morocco", "Tunisia", "Cambodia", "Vietnam", "Myanmar", "Thailand", "Indonesia", "Philippines", "Kazakhstan", "Uzbekistan", "Azerbaijan", "Georgia", "Armenia", "Bahrain", "Oman", "Saudi Arabia"];
  if (evisaDestinations.includes(destination)) return VISA_STATUS.EVISA;

  return VISA_STATUS.VISA_REQUIRED;
}

// ------------------------------------------------------------
// 3. VISA PATHWAY NAMING
// ------------------------------------------------------------

export const TRAVEL_PURPOSES = [
  { id: "tourism", label: "Tourism", icon: "🏖️" },
  { id: "business", label: "Business", icon: "💼" },
  { id: "study", label: "Study", icon: "🎓" },
  { id: "work", label: "Work", icon: "🏢" },
  { id: "family", label: "Family Visit", icon: "👨‍👩‍👧" },
  { id: "transit", label: "Transit", icon: "✈️" },
  { id: "medical", label: "Medical", icon: "🏥" },
  { id: "conference", label: "Conference / Event", icon: "🎤" },
  { id: "religious", label: "Religious", icon: "🕌" },
  { id: "other", label: "Other", icon: "📋" },
];

export function getVisaPathway(destination, purpose, status) {
  const isSchengen = isSchengenDestination(destination);
  const purposeLabel = TRAVEL_PURPOSES.find((p) => p.id === purpose)?.label || "Visitor";

  if (status.id === "visa_free") {
    return {
      name: isSchengen ? "Schengen 90/180 Visa-Free Stay" : `${destination} Visa-Free Entry`,
      category: "Short stay — no visa required",
      description: isSchengen
        ? "You may travel within the Schengen Area for up to 90 days in any 180-day period without a visa."
        : `You may enter ${destination} without a visa for the permitted stay duration.`,
    };
  }

  if (status.id === "eta") {
    return {
      name: isSchengen ? "ETIAS Authorization" : `${destination} eTA / Electronic Authorization`,
      category: "Electronic travel authorization",
      description: `An electronic travel authorization is required before travel. It is quick to obtain online.`,
    };
  }

  if (status.id === "evisa") {
    return {
      name: `${destination} e-Visa (${purposeLabel})`,
      category: "Electronic visa",
      description: `Apply online for an electronic visa. Processing is typically faster than a traditional visa.`,
    };
  }

  if (status.id === "visa_on_arrival") {
    return {
      name: `${destination} Visa on Arrival`,
      category: "On-arrival visa",
      description: `A visa can be obtained upon arrival at the port of entry. Confirm eligibility before travel.`,
    };
  }

  // visa_required
  if (isSchengen) {
    return {
      name: `Schengen Short-Stay Visa (${purposeLabel})`,
      category: "Type C — Short-stay visa",
      description: "A Schengen short-stay visa allows travel within the Schengen Area for up to 90 days in any 180-day period.",
    };
  }

  const pathwayMap = {
    "United States": `US ${purposeLabel} Visa (Nonimmigrant)`,
    "United Kingdom": `UK Standard Visitor Visa (${purposeLabel})`,
    "Canada": `Canada Visitor Visa (TRV) — ${purposeLabel}`,
    "Japan": `Japan ${purposeLabel} Visa`,
    "Australia": `Australia Visitor Visa (Subclass 600) — ${purposeLabel}`,
    "UAE": `UAE ${purposeLabel} Visa`,
    "China": `China ${purposeLabel} Visa (L/M/F)`,
    "India": `India e-Visa (${purposeLabel})`,
    "Turkey": `Turkey e-Visa (${purposeLabel})`,
  };

  return {
    name: pathwayMap[destination] || `${destination} ${purposeLabel} Visa`,
    category: "Visitor visa",
    description: `A visa is required to travel to ${destination} for ${purposeLabel.toLowerCase()} purposes.`,
  };
}

// ------------------------------------------------------------
// 4. GOVERNMENT / EMBASSY FEES (official, separate from service)
// ------------------------------------------------------------

const GOVT_FEE_OVERRIDE = {
  "United States": 185, // B1/B2
  "United Kingdom": 127, // standard visitor
  "Canada": 100, // visitor visa + $85 biometrics
  "Japan": 27, // single entry
  "Australia": 150, // subclass 600
  "UAE": 90,
  "China": 140,
  "India": 25, // e-tourist 30-day
  "Turkey": 50, // e-visa
  "South Korea": 40,
  "Singapore": 30,
  "Thailand": 30,
  "Russia": 160,
  "Saudi Arabia": 80,
};

export function getGovernmentFee(destination) {
  if (GOVT_FEE_OVERRIDE[destination] != null) return GOVT_FEE_OVERRIDE[destination];
  // Schengen standard: €90 ≈ $97
  if (isSchengenDestination(destination)) return 97;
  return getBaseVisaPrice(destination, "tourism");
}

// ------------------------------------------------------------
// 5. PROCESSING INFORMATION
// ------------------------------------------------------------

export function getProcessingInfo(destination, status) {
  if (status.id === "visa_free") {
    return { standard: "Immediate — no processing", express: "—", urgent: "—" };
  }
  if (status.id === "eta") {
    return { standard: "24–72 hours", express: "—", urgent: "—" };
  }
  if (status.id === "evisa") {
    return { standard: "3–5 business days", express: "24–48 hours", urgent: "—" };
  }

  const schengen = isSchengenDestination(destination);
  const map = {
    "United States": { standard: "3–8 weeks", express: "—", urgent: "—" },
    "United Kingdom": { standard: "3–6 weeks", express: "5 working days (+£500)", urgent: "24 hours (+£800)" },
    "Canada": { standard: "2–4 weeks", express: "—", urgent: "—" },
    "Japan": { standard: "5–7 working days", express: "—", urgent: "—" },
    "Australia": { standard: "2–4 weeks", express: "—", urgent: "—" },
    "China": { standard: "4–6 working days", express: "2–3 working days", urgent: "—" },
    "Russia": { standard: "5–10 working days", express: "3 working days", urgent: "1 working day" },
  };
  if (map[destination]) return map[destination];
  if (schengen) return { standard: "10–15 calendar days", express: "—", urgent: "—" };
  return { standard: "5–10 working days", express: "24–48 hours", urgent: "—" };
}

// ------------------------------------------------------------
// 6. PERSONALIZED DOCUMENT CHECKLIST ENGINE
// ------------------------------------------------------------

// Base documents required for nearly every visa application
const BASE_DOCUMENTS = [
  { name: "Valid passport", description: "Original passport valid at least 6 months beyond your return date, with at least 2 blank pages.", why: "Required by all embassies for identity and travel document verification.", type: "required" },
  { name: "Passport-size photograph", description: "Recent (under 6 months) color photo meeting embassy specifications — white background, neutral expression.", why: "Standard biometric identification requirement.", type: "required" },
  { name: "Completed visa application form", description: "The official application form for your destination, fully completed and signed.", why: "Mandatory application document required by the immigration authority.", type: "required" },
];

const PURPOSE_DOCUMENTS = {
  tourism: [
    { name: "Proof of accommodation", description: "Hotel reservations or a letter of invitation from your host covering your entire stay.", why: "Demonstrates where you will stay during your visit.", type: "required" },
    { name: "Flight itinerary / round-trip reservation", description: "Confirmed or reserved round-trip flight booking showing entry and exit dates.", why: "Shows your intended travel dates and return plans.", type: "required" },
    { name: "Proof of financial means", description: "Recent bank statements (last 3–6 months) showing sufficient funds for your stay.", why: "Demonstrates you can financially support yourself during the trip.", type: "required" },
    { name: "Travel insurance", description: "Medical travel insurance with minimum coverage (€30,000 for Schengen) valid for the entire stay.", why: "Mandatory for Schengen; strongly recommended elsewhere.", type: "conditional" },
    { name: "Proof of employment / leave approval", description: "Employer letter confirming your position, salary, and approved leave dates.", why: "Establishes ties to your home country and purpose of return.", type: "conditional" },
  ],
  business: [
    { name: "Letter of invitation from host company", description: "Official invitation letter from the company you will visit, on company letterhead.", why: "Confirms the business purpose and host of your visit.", type: "required" },
    { name: "Letter from your employer", description: "Employer letter detailing your role, the purpose of the trip, and financial responsibility.", why: "Establishes the business nature of the visit and sponsorship.", type: "required" },
    { name: "Proof of business registration", description: "Registration document of your company or the inviting company.", why: "Verifies the legitimacy of the business entities involved.", type: "required" },
    { name: "Proof of financial means", description: "Recent bank statements (last 3–6 months).", why: "Demonstrates financial capacity for the trip.", type: "required" },
    { name: "Flight & hotel reservations", description: "Round-trip flight booking and hotel reservation for the duration of the stay.", why: "Confirms travel dates and accommodation.", type: "required" },
  ],
  study: [
    { name: "Letter of acceptance / admission", description: "Official admission letter from the recognized educational institution.", why: "Confirms enrollment in a legitimate study program.", type: "required" },
    { name: "Proof of tuition payment / scholarship", description: "Receipt of tuition payment or scholarship award letter.", why: "Demonstrates financial arrangements for study.", type: "required" },
    { name: "Academic transcripts & certificates", description: "Translated and notarized academic records from previous education.", why: "Required to verify academic background.", type: "required" },
    { name: "Proof of financial means", description: "Bank statements or sponsor letter showing ability to cover tuition and living costs.", why: "Demonstrates you can support yourself during studies.", type: "required" },
    { name: "Language proficiency certificate", description: "IELTS, TOEFL, or equivalent if required by the institution.", why: "Required by many institutions to confirm language ability.", type: "conditional" },
  ],
  work: [
    { name: "Employment contract / offer letter", description: "Signed employment contract or offer from the employer in the destination country.", why: "Confirms the employment arrangement.", type: "required" },
    { name: "Work permit approval", description: "Approval from the destination immigration authority (if applicable).", why: "Legally required to work in the destination country.", type: "required" },
    { name: "Employer letter & registration", description: "Letter from the employer plus company business registration.", why: "Verifies employer legitimacy.", type: "required" },
    { name: "Proof of qualifications", description: "Degree certificates, professional licenses, and experience letters.", why: "Required to verify professional qualifications.", type: "required" },
    { name: "Proof of financial means", description: "Recent bank statements.", why: "Demonstrates financial stability.", type: "conditional" },
  ],
  family: [
    { name: "Invitation letter from family member", description: "Letter from your host family member with their ID and address.", why: "Confirms the purpose and host of your visit.", type: "required" },
    { name: "Proof of relationship", description: "Birth/marriage certificates establishing the family relationship.", why: "Verifies the family connection to your host.", type: "required" },
    { name: "Host's proof of residence & funds", description: "Host's ID, residence permit, and bank statements if they are sponsoring you.", why: "Demonstrates the host can accommodate and support you.", type: "conditional" },
    { name: "Proof of financial means", description: "Your bank statements if you are self-sponsored.", why: "Demonstrates financial capacity.", type: "conditional" },
    { name: "Flight & accommodation details", description: "Round-trip flight reservation and accommodation confirmation.", why: "Confirms travel plans.", type: "required" },
  ],
  transit: [
    { name: "Onward flight ticket", description: "Confirmed ticket to your final destination beyond the transit country.", why: "Proves transit status and onward travel.", type: "required" },
    { name: "Visa for final destination", description: "Valid visa for your final destination (if required).", why: "Required to confirm onward travel eligibility.", type: "required" },
  ],
  medical: [
    { name: "Medical appointment confirmation", description: "Letter from the hospital/clinic confirming your appointment and treatment.", why: "Confirms the medical purpose of travel.", type: "required" },
    { name: "Proof of financial means", description: "Bank statements showing ability to cover medical and travel costs.", why: "Demonstrates financial capacity for treatment.", type: "required" },
    { name: "Medical report", description: "Current medical report from your home country doctor.", why: "Supports the medical visa application.", type: "required" },
  ],
  conference: [
    { name: "Event registration / invitation", description: "Confirmation of registration or official invitation to the conference/event.", why: "Confirms the purpose of travel.", type: "required" },
    { name: "Letter from your organization", description: "Letter from your employer or organization sponsoring your attendance.", why: "Establishes the professional context.", type: "required" },
    { name: "Proof of financial means", description: "Recent bank statements.", why: "Demonstrates financial capacity.", type: "required" },
  ],
  religious: [
    { name: "Religious organization invitation", description: "Letter from the religious institution confirming your visit.", why: "Confirms the religious purpose.", type: "required" },
    { name: "Proof of financial means", description: "Bank statements or sponsor letter.", why: "Demonstrates financial capacity.", type: "required" },
  ],
  other: [
    { name: "Purpose justification letter", description: "A letter explaining the specific purpose of your visit.", why: "Clarifies the nature of your travel.", type: "required" },
    { name: "Proof of financial means", description: "Recent bank statements.", why: "Demonstrates financial capacity.", type: "required" },
  ],
};

// Supporting documents (always helpful, marked as supporting)
const SUPPORTING_DOCUMENTS = [
  { name: "Previous passports / travel history", description: "Previous passports showing prior travel and visas.", why: "Strengthens your application by demonstrating travel history.", type: "supporting" },
  { name: "Proof of ties to home country", description: "Property deeds, family documents, or business ownership proving intent to return.", why: "Helps demonstrate non-immigrant intent.", type: "supporting" },
  { name: "Civil status documents", description: "Marriage/birth certificates where relevant.", why: "May be requested to verify family situation.", type: "supporting" },
];

export function getDocumentChecklist(destination, purpose, status) {
  if (status.id === "visa_free") {
    return {
      required: [
        { name: "Valid passport", description: "Passport valid for the duration of your stay.", why: "Required for entry.", type: "required" },
        { name: "Return / onward ticket", description: "Proof of onward or return travel.", why: "May be requested at the border.", type: "required" },
        { name: "Proof of sufficient funds", description: "Evidence you can support yourself during the stay.", why: "May be requested at the border.", type: "conditional" },
      ],
      conditional: [],
      supporting: SUPPORTING_DOCUMENTS,
    };
  }

  const required = [...BASE_DOCUMENTS, ...(PURPOSE_DOCUMENTS[purpose] || PURPOSE_DOCUMENTS.tourism)];
  const conditional = required.filter((d) => d.type === "conditional");
  const strictRequired = required.filter((d) => d.type === "required");

  return {
    required: strictRequired,
    conditional,
    supporting: SUPPORTING_DOCUMENTS,
  };
}

export function countRequirements(checklist) {
  return checklist.required.length + checklist.conditional.length + checklist.supporting.length;
}

// ------------------------------------------------------------
// 7. FULL ASSESSMENT — combines everything
// ------------------------------------------------------------

// Find the best matching DB override rule for a nationality → destination pair.
// Exact nationality match beats "ANY"; higher priority wins ties.
export function matchVisaRule(nationality, destination, dbRules) {
  if (!dbRules || dbRules.length === 0) return null;
  const candidates = dbRules.filter(
    (r) => r.destination_country === destination && (r.nationality === nationality || r.nationality === "ANY")
  );
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => {
    const aExact = a.nationality === nationality ? 1 : 0;
    const bExact = b.nationality === nationality ? 1 : 0;
    if (aExact !== bExact) return bExact - aExact;
    return (b.priority || 0) - (a.priority || 0);
  });
  return candidates[0];
}

export function assessVisa({ nationality, residence, destination, purpose, duration, travelDate }, dbRules) {
  const override = matchVisaRule(nationality, destination, dbRules);
  const staticStatus = getVisaStatus(nationality, destination);
  const status = override && STATUS_BY_ID[override.visa_status] ? STATUS_BY_ID[override.visa_status] : staticStatus;
  const pathway = getVisaPathway(destination, purpose, status);
  const governmentFee = override?.government_fee_usd != null ? override.government_fee_usd : getGovernmentFee(destination);
  const processing = override?.processing_standard
    ? { standard: override.processing_standard, express: override.processing_express || "—", urgent: "—" }
    : getProcessingInfo(destination, status);
  const checklist = getDocumentChecklist(destination, purpose, status);
  const reqCount = countRequirements(checklist);

  // Trek Visa service fee (separate from government fee, transparent)
  const serviceFee = applyCommission(getBaseVisaPrice(destination, purpose)) - getBaseVisaPrice(destination, purpose);

  return {
    nationality,
    residence,
    destination,
    purpose,
    purposeLabel: TRAVEL_PURPOSES.find((p) => p.id === purpose)?.label || "Visitor",
    duration,
    travelDate,
    status,
    pathway,
    governmentFee,
    serviceFee,
    processing,
    checklist,
    reqCount,
    flag: flag(destination),
    notes: override?.notes || null,
  };
}

export { COUNTRIES, flag };