export type ExamCenter = {
  id: string;
  name: string;
  city: string;
  department: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  services: Array<"CR" | "CSP" | "NAT">;
};

export const EXAM_CENTERS: ExamCenter[] = [
  {
    id: "center-75-01",
    name: "Centre OFII Paris",
    city: "Paris",
    department: "Paris (75)",
    address: "48 rue de la Roquette, 75011 Paris",
    phone: "01 53 69 53 70",
    email: "contact.paris@ofii.fr",
    services: ["CR", "CSP", "NAT"],
  },
  {
    id: "center-69-01",
    name: "Centre OFII Lyon",
    city: "Lyon",
    department: "Rhône (69)",
    address: "7 rue Quivogne, 69002 Lyon",
    phone: "04 72 77 15 40",
    email: "contact.lyon@ofii.fr",
    services: ["CR", "CSP", "NAT"],
  },
  {
    id: "center-13-01",
    name: "Centre OFII Marseille",
    city: "Marseille",
    department: "Bouches-du-Rhône (13)",
    address: "61 boulevard Rabatau, 13008 Marseille",
    phone: "04 91 32 53 60",
    services: ["CR", "CSP", "NAT"],
  },
  {
    id: "center-31-01",
    name: "Centre OFII Toulouse",
    city: "Toulouse",
    department: "Haute-Garonne (31)",
    address: "7 rue Arthur Rimbaud, 31200 Toulouse",
    phone: "05 34 41 72 20",
    services: ["CR", "CSP", "NAT"],
  },
  {
    id: "center-33-01",
    name: "Centre OFII Bordeaux",
    city: "Bordeaux",
    department: "Gironde (33)",
    address: "55 rue Saint-Sernin, 33000 Bordeaux",
    phone: "05 57 14 23 00",
    services: ["CR", "CSP", "NAT"],
  },
  {
    id: "center-59-01",
    name: "Centre OFII Lille",
    city: "Lille",
    department: "Nord (59)",
    address: "84 rue de Trévise, 59000 Lille",
    phone: "03 20 19 86 40",
    services: ["CR", "CSP", "NAT"],
  },
  {
    id: "center-44-01",
    name: "Centre OFII Nantes",
    city: "Nantes",
    department: "Loire-Atlantique (44)",
    address: "2 rue de Bel Air, 44000 Nantes",
    phone: "02 40 71 03 90",
    services: ["CR", "CSP", "NAT"],
  },
  {
    id: "center-67-01",
    name: "Centre OFII Strasbourg",
    city: "Strasbourg",
    department: "Bas-Rhin (67)",
    address: "4 rue Gustave Doré, 67000 Strasbourg",
    phone: "03 88 15 60 90",
    services: ["CR", "CSP", "NAT"],
  },
  {
    id: "center-06-01",
    name: "Centre OFII Nice",
    city: "Nice",
    department: "Alpes-Maritimes (06)",
    address: "28 rue de Roquebillière, 06300 Nice",
    phone: "04 93 27 00 66",
    services: ["CR", "CSP", "NAT"],
  },
  {
    id: "center-35-01",
    name: "Centre OFII Rennes",
    city: "Rennes",
    department: "Ille-et-Vilaine (35)",
    address: "Rue Martenot, 35000 Rennes",
    phone: "02 99 25 23 00",
    services: ["CR", "CSP", "NAT"],
  },
  {
    id: "center-34-01",
    name: "Centre OFII Montpellier",
    city: "Montpellier",
    department: "Hérault (34)",
    address: "3 place Paul Bec, 34000 Montpellier",
    phone: "04 67 07 06 80",
    services: ["CR", "CSP", "NAT"],
  },
  {
    id: "center-21-01",
    name: "Centre OFII Dijon",
    city: "Dijon",
    department: "Côte-d'Or (21)",
    address: "1 rue Hoche, 21000 Dijon",
    phone: "03 80 30 35 10",
    services: ["CR", "CSP", "NAT"],
  },
];
