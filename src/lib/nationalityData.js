// Nationality & Residency program tiers — agency service fees (USD).
// Prices are coherent with the platform's visa pricing model.
// Government fees, investment amounts, and due diligence costs are separate.
export const NATIONALITY_TIERS = [
  {
    id: "standard",
    name: "Formule Standard",
    price_usd: 2500,
    description: "Accompagnement essentiel pour la résidence et premières démarches de mobilité internationale.",
    features: [
      "Consultation juridique initiale (1h)",
      "Évaluation d'éligibilité complète",
      "Préparation du dossier de résidence",
      "Suivi administratif 3 mois",
      "Support email dédié",
      "Coordination ambassade 1 rendez-vous",
    ],
    highlight: false,
    imgs: [
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=600&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b67?w=600&q=80",
      "https://images.unsplash.com/photo-1517760444937-f6397edcbb0e?w=600&q=80",
      "https://images.unsplash.com/photo-1503551782900-8f6b3b3e4e4e?w=600&q=80",
      "https://images.unsplash.com/photo-1486328219178-9a8b3b3c3c3c?w=600&q=80",
    ],
  },
  {
    id: "premium",
    name: "Formule Premium",
    price_usd: 6500,
    description: "Accompagnement complet avec conseiller dédié, optimisation fiscale et gestion accélérée.",
    features: [
      "Tout le Standard, et :",
      "Conseiller dédié 1-to-1 (WhatsApp direct)",
      "Optimisation fiscale & structuration patrimoniale",
      "Suivi prioritaire 6 mois",
      "Assistance rendez-vous ambassade (illimité)",
      "Représentation juridique incluse",
      "Inclusion familiale (conjoint + enfants)",
    ],
    highlight: true,
    imgs: [
      "https://images.unsplash.com/photo-1560472354-b33ff9c0bd2b?w=600&q=80",
      "https://images.unsplash.com/photo-1554224155-6726b0c6f1c3?w=600&q=80",
      "https://images.unsplash.com/photo-1543465077-db45d34b88ac?w=600&q=80",
      "https://images.unsplash.com/photo-1518184078638-0c5c8f3d3d3d?w=600&q=80",
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f34?w=600&q=80",
    ],
  },
  {
    id: "vip",
    name: "Formule VIP / Executive",
    price_usd: 15000,
    description: "Service premium intégral, traitement confidentiel, accès direct à nos partenaires notariaux et family office.",
    features: [
      "Tout le Premium, et :",
      "Traitement confidentiel prioritaire absolu",
      "Accès réseau partenaires notariaux & bancaires",
      "Suivi 12 mois + family office dédié",
      "Garantie accompagnement seconde nationalité",
      "Conciergerie VIP (vols, hôtel, transport)",
      "Stratégie multi-pays personnalisée",
      "Avocat fiscaliste dédié à temps plein",
    ],
    highlight: false,
    imgs: [
      "https://images.unsplash.com/photo-1551652811-9c2c5c5c5c5c?w=600&q=80",
      "https://images.unsplash.com/photo-1560472354-b33ff9c0bd2b?w=600&q=80",
      "https://images.unsplash.com/photo-1543465077-db45d34b88ac?w=600&q=80",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80",
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f34?w=600&q=80",
    ],
  },
];

export const NATIONALITY_OBJECTIVES = [
  "Mobilité internationale",
  "Optimisation fiscale",
  "Sécurité familiale",
  "Accès à la citoyenneté",
  "Planification successorale",
  "Résidence permanente",
  "Accès aux soins",
  "Éducation des enfants",
];