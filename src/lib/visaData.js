// Base visa prices in USD per destination country & visa type.
// The 20% markup is applied at runtime — never stored or shown to the client.

// Bilingual labels — UI picks label based on current language.
export const VISA_TYPES = [
  { id: "tourism", label_fr: "Tourisme", label_en: "Tourism", multiplier: 1 },
  { id: "business", label_fr: "Affaires", label_en: "Business", multiplier: 1.4 },
  { id: "study", label_fr: "Études", label_en: "Study", multiplier: 1.8 },
  { id: "work", label_fr: "Travail", label_en: "Work", multiplier: 2.2 },
  { id: "transit", label_fr: "Transit", label_en: "Transit", multiplier: 0.5 },
];

// Urgency processing options — additive surcharge on the official visa tariff.
export const URGENCY_OPTIONS = [
  { id: "standard", label_fr: "Standard", label_en: "Standard", delay_fr: "5-10 jours", delay_en: "5-10 days", surcharge: 0 },
  { id: "express", label_fr: "Express 48h", label_en: "Express 48h", delay_fr: "48 heures", delay_en: "48 hours", surcharge: 60 },
  { id: "urgent", label_fr: "Urgence 24h", label_en: "Urgent 24h", delay_fr: "24 heures", delay_en: "24 hours", surcharge: 120 },
];

// Optional travel insurance — per day, per person (USD).
export const INSURANCE_RATE_PER_DAY = 4;

const BASE_PRICES = {
  // Europe — Schengen & non-Schengen
  "France": 80, "Germany": 80, "Italy": 80, "Spain": 80, "Portugal": 80,
  "Netherlands": 80, "Belgium": 80, "Greece": 80, "Sweden": 80, "Norway": 90,
  "Denmark": 80, "Finland": 80, "Iceland": 90, "Ireland": 90, "United Kingdom": 145, "Austria": 80,
  "Poland": 80, "Czech Republic": 80, "Hungary": 80, "Switzerland": 90,
  "Luxembourg": 80, "Malta": 80, "Cyprus": 80, "Slovakia": 80, "Slovenia": 80,
  "Estonia": 80, "Latvia": 80, "Lithuania": 80, "Croatia": 80, "Bulgaria": 80,
  "Romania": 80, "Serbia": 70, "Albania": 65, "Bosnia and Herzegovina": 65,
  "Montenegro": 65, "North Macedonia": 65, "Ukraine": 70, "Moldova": 65,
  "Belarus": 70, "Russia": 160, "Georgia": 60, "Armenia": 60, "Azerbaijan": 65,
  // North America
  "United States": 160, "Canada": 90, "Mexico": 90,
  // South America
  "Brazil": 80, "Argentina": 80, "Chile": 80, "Peru": 70, "Colombia": 70,
  "Ecuador": 70, "Venezuela": 75, "Bolivia": 65, "Paraguay": 65, "Uruguay": 75,
  "Guyana": 60, "Suriname": 60,
  // Asia
  "Japan": 30, "China": 140, "India": 45, "South Korea": 70, "Singapore": 30,
  "Malaysia": 40, "Thailand": 30, "Vietnam": 50, "Indonesia": 35, "Philippines": 40,
  "Cambodia": 50, "Laos": 50, "Myanmar": 55, "Brunei": 70, "Mongolia": 60,
  "Kazakhstan": 65, "Uzbekistan": 60, "Kyrgyzstan": 55, "Tajikistan": 55,
  "Turkmenistan": 60, "Taiwan": 80, "Hong Kong": 70, "Macau": 65,
  "Bangladesh": 70, "Pakistan": 75, "Sri Lanka": 60, "Nepal": 55, "Maldives": 60,
  "Afghanistan": 90, "Iran": 85, "Iraq": 90,
  // Middle East
  "Turkey": 50, "UAE": 90, "Saudi Arabia": 80, "Qatar": 90, "Kuwait": 100, "Oman": 80,
  "Bahrain": 80, "Israel": 90, "Jordan": 60, "Lebanon": 60, "Syria": 80,
  "Yemen": 80, "Palestine": 70,
  // Africa
  "South Africa": 35, "Egypt": 55, "Morocco": 50, "Tunisia": 50, "Algeria": 55,
  "Libya": 65, "Sudan": 65, "Ethiopia": 60, "Eritrea": 65, "Djibouti": 60,
  "Somalia": 70, "Kenya": 55, "Uganda": 55, "Tanzania": 55, "Rwanda": 55,
  "Burundi": 55, "Nigeria": 70, "Ghana": 60, "Senegal": 50, "Ivory Coast": 55,
  "Cameroon": 55, "Benin": 50, "Togo": 50, "Burkina Faso": 50, "Mali": 55,
  "Niger": 55, "Chad": 60, "Mauritania": 55, "Liberia": 55, "Sierra Leone": 55,
  "Guinea": 55, "Guinea-Bissau": 50, "Gambia": 50, "Cape Verde": 50,
  "Sao Tome and Principe": 50, "Gabon": 60, "Congo": 55, "DR Congo": 60,
  "Central African Republic": 60, "Equatorial Guinea": 65, "Madagascar": 55,
  "Mauritius": 60, "Seychelles": 60, "Comoros": 50, "Zambia": 55, "Zimbabwe": 55,
  "Malawi": 55, "Mozambique": 55, "Angola": 65, "Namibia": 55, "Botswana": 55,
  "Lesotho": 50, "Eswatini": 50, "South Sudan": 65,
  // Oceania
  "Australia": 100, "New Zealand": 130, "Fiji": 60, "Papua New Guinea": 65,
  "Solomon Islands": 55, "Vanuatu": 55, "Samoa": 55, "Tonga": 55,
  "Kiribati": 50, "Micronesia": 50, "Palau": 50, "Marshall Islands": 50,
  "Nauru": 50, "Tuvalu": 50,
  // Caribbean
  "Cuba": 70, "Dominican Republic": 65, "Jamaica": 65, "Haiti": 65,
  "Bahamas": 70, "Barbados": 65, "Trinidad and Tobago": 65, "Grenada": 60,
  "Saint Lucia": 60, "Saint Vincent and the Grenadines": 60, "Antigua and Barbuda": 60,
  "Dominica": 60, "Saint Kitts and Nevis": 60, "Belize": 60, "Costa Rica": 65,
  "Panama": 65, "Guatemala": 60, "Honduras": 60, "El Salvador": 60,
  "Nicaragua": 60,
};

export const COUNTRIES = Object.keys(BASE_PRICES).sort((a, b) => a.localeCompare(b));

// ISO flag emoji from country name (best-effort).
const FLAG_MAP = {
  "France":"🇫🇷","Germany":"🇩🇪","Italy":"🇮🇹","Spain":"🇪🇸","Portugal":"🇵🇹",
  "Netherlands":"🇳🇱","Belgium":"🇧🇪","Greece":"🇬🇷","Sweden":"🇸🇪","Norway":"🇳🇴",
  "Denmark":"🇩🇰","Finland":"🇫🇮",  "Iceland":"🇮🇸","Ireland":"🇮🇪","United Kingdom":"🇬🇧","Austria":"🇦🇹",
  "Poland":"🇵🇱","Czech Republic":"🇨🇿","Hungary":"🇭🇺","Switzerland":"🇨🇭",
  "Luxembourg":"🇱🇺","Malta":"🇲🇹","Cyprus":"🇨🇾","Slovakia":"🇸🇰","Slovenia":"🇸🇮",
  "Estonia":"🇪🇪","Latvia":"🇱🇻","Lithuania":"🇱🇹","Croatia":"🇭🇷","Bulgaria":"🇧🇬",
  "Romania":"🇷🇴","Serbia":"🇷🇸","Albania":"🇦🇱","Bosnia and Herzegovina":"🇧🇦",
  "Montenegro":"🇲🇪","North Macedonia":"🇲🇰","Ukraine":"🇺🇦","Moldova":"🇲🇩",
  "Belarus":"🇧🇾","Russia":"🇷🇺","Georgia":"🇬🇪","Armenia":"🇦🇲","Azerbaijan":"🇦🇿",
  "United States":"🇺🇸","Canada":"🇨🇦","Mexico":"🇲🇽",
  "Brazil":"🇧🇷","Argentina":"🇦🇷","Chile":"🇨🇱","Peru":"🇵🇪","Colombia":"🇨🇴",
  "Ecuador":"🇪🇨","Venezuela":"🇻🇪","Bolivia":"🇧🇴","Paraguay":"🇵🇾","Uruguay":"🇺🇾",
  "Guyana":"🇬🇾","Suriname":"🇸🇷",
  "Japan":"🇯🇵","China":"🇨🇳","India":"🇮🇳","South Korea":"🇰🇷","Singapore":"🇸🇬",
  "Malaysia":"🇲🇾","Thailand":"🇹🇭","Vietnam":"🇻🇳","Indonesia":"🇮🇩","Philippines":"🇵🇭",
  "Cambodia":"🇰🇭","Laos":"🇱🇦","Myanmar":"🇲🇲","Brunei":"🇧🇳","Mongolia":"🇲🇳",
  "Kazakhstan":"🇰🇿","Uzbekistan":"🇺🇿","Kyrgyzstan":"🇰🇬","Tajikistan":"🇹🇯",
  "Turkmenistan":"🇹🇲","Taiwan":"🇹🇼","Hong Kong":"🇭🇰","Macau":"🇲🇴",
  "Bangladesh":"🇧🇩","Pakistan":"🇵🇰","Sri Lanka":"🇱🇰","Nepal":"🇳🇵","Maldives":"🇲🇻",
  "Afghanistan":"🇦🇫","Iran":"🇮🇷","Iraq":"🇮🇶",
  "UAE":"🇦🇪","Saudi Arabia":"🇸🇦","Qatar":"🇶🇦","Kuwait":"🇰🇼","Oman":"🇴🇲",
  "Turkey":"🇹🇷","Bahrain":"🇧🇭","Israel":"🇮🇱","Jordan":"🇯🇴","Lebanon":"🇱🇧","Syria":"🇸🇾",
  "Yemen":"🇾🇪","Palestine":"🇵🇸",
  "South Africa":"🇿🇦","Egypt":"🇪🇬","Morocco":"🇲🇦","Tunisia":"🇹🇳","Algeria":"🇩🇿",
  "Libya":"🇱🇾","Sudan":"🇸🇩","Ethiopia":"🇪🇹","Eritrea":"🇪🇷","Djibouti":"🇩🇯",
  "Somalia":"🇸🇴","Kenya":"🇰🇪","Uganda":"🇺🇬","Tanzania":"🇹🇿","Rwanda":"🇷🇼",
  "Burundi":"🇧🇮","Nigeria":"🇳🇬","Ghana":"🇬🇭","Senegal":"🇸🇳","Ivory Coast":"🇨🇮",
  "Cameroon":"🇨🇲","Benin":"🇧🇯","Togo":"🇹🇬","Burkina Faso":"🇧🇫","Mali":"🇲🇱",
  "Niger":"🇳🇪","Chad":"🇹🇩","Mauritania":"🇲🇷","Liberia":"🇱🇷","Sierra Leone":"🇸🇱",
  "Guinea":"🇬🇳","Guinea-Bissau":"🇬🇼","Gambia":"🇬🇲","Cape Verde":"🇨🇻",
  "Sao Tome and Principe":"🇸🇹","Gabon":"🇬🇦","Congo":"🇨🇬","DR Congo":"🇨🇩",
  "Central African Republic":"🇨🇫","Equatorial Guinea":"🇬🇶","Madagascar":"🇲🇬",
  "Mauritius":"🇲🇺","Seychelles":"🇸🇨","Comoros":"🇰🇲","Zambia":"🇿🇲","Zimbabwe":"🇿🇼",
  "Malawi":"🇲🇼","Mozambique":"🇲🇿","Angola":"🇦🇴","Namibia":"🇳🇦","Botswana":"🇧🇼",
  "Lesotho":"🇱🇸","Eswatini":"🇸🇿","South Sudan":"🇸🇸",
  "Australia":"🇦🇺","New Zealand":"🇳🇿","Fiji":"🇫🇯","Papua New Guinea":"🇵🇬",
  "Solomon Islands":"🇸🇧","Vanuatu":"🇻🇺","Samoa":"🇼🇸","Tonga":"🇹🇴",
  "Kiribati":"🇰🇮","Micronesia":"🇫🇲","Palau":"🇵🇼","Marshall Islands":"🇲🇭",
  "Nauru":"🇳🇷","Tuvalu":"🇹🇻",
  "Cuba":"🇨🇺","Dominican Republic":"🇩🇴","Jamaica":"🇯🇲","Haiti":"🇭🇹",
  "Bahamas":"🇧🇸","Barbados":"🇧🇧","Trinidad and Tobago":"🇹🇹","Grenada":"🇬🇩",
  "Saint Lucia":"🇱🇨","Saint Vincent and the Grenadines":"🇻🇨","Antigua and Barbuda":"🇦🇬",
  "Dominica":"🇩🇲","Saint Kitts and Nevis":"🇰🇳","Belize":"🇧🇿","Costa Rica":"🇨🇷",
  "Panama":"🇵🇦","Guatemala":"🇬🇹","Honduras":"🇭🇳","El Salvador":"🇸🇻",
  "Nicaragua":"🇳🇮",
};
export function flag(country) { return FLAG_MAP[country] || "🏳️"; }

const COUNTRY_CODES = {
  "France":"fr","Germany":"de","Italy":"it","Spain":"es","Portugal":"pt",
  "Netherlands":"nl","Belgium":"be","Greece":"gr","Sweden":"se","Norway":"no",
  "Denmark":"dk","Finland":"fi",  "Iceland":"is","Ireland":"ie","United Kingdom":"gb","Austria":"at",
  "Poland":"pl","Czech Republic":"cz","Hungary":"hu","Switzerland":"ch",
  "Luxembourg":"lu","Malta":"mt","Cyprus":"cy","Slovakia":"sk","Slovenia":"si",
  "Estonia":"ee","Latvia":"lv","Lithuania":"lt","Croatia":"hr","Bulgaria":"bg",
  "Romania":"ro","Serbia":"rs","Albania":"al","Bosnia and Herzegovina":"ba",
  "Montenegro":"me","North Macedonia":"mk","Ukraine":"ua","Moldova":"md",
  "Belarus":"by","Russia":"ru","Georgia":"ge","Armenia":"am","Azerbaijan":"az",
  "United States":"us","Canada":"ca","Mexico":"mx",
  "Brazil":"br","Argentina":"ar","Chile":"cl","Peru":"pe","Colombia":"co",
  "Ecuador":"ec","Venezuela":"ve","Bolivia":"bo","Paraguay":"py","Uruguay":"uy",
  "Guyana":"gy","Suriname":"sr",
  "Japan":"jp","China":"cn","India":"in","South Korea":"kr","Singapore":"sg",
  "Malaysia":"my","Thailand":"th","Vietnam":"vn","Indonesia":"id","Philippines":"ph",
  "Cambodia":"kh","Laos":"la","Myanmar":"mm","Brunei":"bn","Mongolia":"mn",
  "Kazakhstan":"kz","Uzbekistan":"uz","Kyrgyzstan":"kg","Tajikistan":"tj",
  "Turkmenistan":"tm","Taiwan":"tw","Hong Kong":"hk","Macau":"mo",
  "Bangladesh":"bd","Pakistan":"pk","Sri Lanka":"lk","Nepal":"np","Maldives":"mv",
  "Afghanistan":"af","Iran":"ir","Iraq":"iq",
  "UAE":"ae","Saudi Arabia":"sa","Qatar":"qa","Kuwait":"kw","Oman":"om",
  "Turkey":"tr","Bahrain":"bh","Israel":"il","Jordan":"jo","Lebanon":"lb","Syria":"sy",
  "Yemen":"ye","Palestine":"ps",
  "South Africa":"za","Egypt":"eg","Morocco":"ma","Tunisia":"tn","Algeria":"dz",
  "Libya":"ly","Sudan":"sd","Ethiopia":"et","Eritrea":"er","Djibouti":"dj",
  "Somalia":"so","Kenya":"ke","Uganda":"ug","Tanzania":"tz","Rwanda":"rw",
  "Burundi":"bi","Nigeria":"ng","Ghana":"gh","Senegal":"sn","Ivory Coast":"ci",
  "Cameroon":"cm","Benin":"bj","Togo":"tg","Burkina Faso":"bf","Mali":"ml",
  "Niger":"ne","Chad":"td","Mauritania":"mr","Liberia":"lr","Sierra Leone":"sl",
  "Guinea":"gn","Guinea-Bissau":"gw","Gambia":"gm","Cape Verde":"cv",
  "Sao Tome and Principe":"st","Gabon":"ga","Congo":"cg","DR Congo":"cd",
  "Central African Republic":"cf","Equatorial Guinea":"gq","Madagascar":"mg",
  "Mauritius":"mu","Seychelles":"sc","Comoros":"km","Zambia":"zm","Zimbabwe":"zw",
  "Malawi":"mw","Mozambique":"mz","Angola":"ao","Namibia":"na","Botswana":"bw",
  "Lesotho":"ls","Eswatini":"sz","South Sudan":"ss",
  "Australia":"au","New Zealand":"nz","Fiji":"fj","Papua New Guinea":"pg",
  "Solomon Islands":"sb","Vanuatu":"vu","Samoa":"ws","Tonga":"to",
  "Kiribati":"ki","Micronesia":"fm","Palau":"pw","Marshall Islands":"mh",
  "Nauru":"nr","Tuvalu":"tv",
  "Cuba":"cu","Dominican Republic":"do","Jamaica":"jm","Haiti":"ht",
  "Bahamas":"bs","Barbados":"bb","Trinidad and Tobago":"tt","Grenada":"gd",
  "Saint Lucia":"lc","Saint Vincent and the Grenadines":"vc","Antigua and Barbuda":"ag",
  "Dominica":"dm","Saint Kitts and Nevis":"kn","Belize":"bz","Costa Rica":"cr",
  "Panama":"pa","Guatemala":"gt","Honduras":"hn","El Salvador":"sv",
  "Nicaragua":"ni",
};
export function flagUrl(country, size = 40) {
  const code = COUNTRY_CODES[country];
  return code ? `https://flagcdn.com/w${size}/${code}.png` : null;
}

export function getBaseVisaPrice(destination, visaType) {
  const base = BASE_PRICES[destination] ?? 85;
  const vt = VISA_TYPES.find((v) => v.id === visaType);
  return base * (vt ? vt.multiplier : 1);
}

// The invisible 20% commission — applied silently. Never exposed in UI.
export const COMMISSION_RATE = 0.2;

// Children (6-12) pay 50% of the official visa tariff (e.g. Schengen); under 6 free.
export const CHILD_DISCOUNT = 0.5;

// Full pricing engine — realistic agency model:
//   visaFees  = adultFee×adults + childFee×children   (childFee = official × 0.5)
//   margin    = visaFees × 20%   (invisible to the client, never shown)
//   urgency   = flat surcharge per application (agency expedite fee, no margin on top)
//   insurance = per-day per-person passthrough (no margin)
//   total     = visaFees × 1.20 + urgency + insurance
export function computeVisaTotal({ destination, visaType, urgencyId, adults, children, insuranceDays, withInsurance }) {
  const official = getBaseVisaPrice(destination, visaType); // adult official tariff
  const childFee = official * CHILD_DISCOUNT;
  const visaFees = official * adults + childFee * children;
  const urgency = URGENCY_OPTIONS.find((u) => u.id === urgencyId)?.surcharge ?? 0;
  const travelers = adults + children;
  const subtotal = visaFees * (1 + COMMISSION_RATE) + urgency;
  const insurance = withInsurance ? INSURANCE_RATE_PER_DAY * (insuranceDays || 0) * travelers : 0;
  return { total: subtotal + insurance, official, childFee, urgency, travelers, insurance, visaFees };
}

export function applyCommission(basePrice) {
  return basePrice * (1 + COMMISSION_RATE);
}

// Passport validity: must be valid at least 6 months after the return date.
export function isPassportValid(expiryDate, returnDate) {
  if (!expiryDate || !returnDate) return null;
  const exp = new Date(expiryDate);
  const ret = new Date(returnDate);
  ret.setMonth(ret.getMonth() + 6);
  return exp >= ret;
}