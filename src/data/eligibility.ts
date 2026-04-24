export type EligibilityAnswer = string;

export type EligibilityQuestion = {
  id: string;
  prompt: string;
  choices: { key: EligibilityAnswer; label: string }[];
};

export const ELIGIBILITY_QUESTIONS: EligibilityQuestion[] = [
  {
    id: "demarche",
    prompt: "Quelle démarche préparez-vous ?",
    choices: [
      { key: "NAT", label: "Naturalisation" },
      { key: "CSP", label: "Carte de Séjour Pluriannuelle" },
      { key: "CR", label: "Carte de Résident de 10 ans" },
      { key: "OTHER", label: "Autre démarche" },
    ],
  },
  {
    id: "age",
    prompt: "Quel est votre âge ?",
    choices: [
      { key: "minor", label: "Moins de 18 ans" },
      { key: "18-64", label: "Entre 18 et 64 ans" },
      { key: "65+", label: "65 ans ou plus" },
    ],
  },
  {
    id: "handicap",
    prompt:
      "Êtes-vous en situation de handicap et disposez-vous d'un certificat médical attestant de l'impossibilité de passer l'examen ?",
    choices: [
      { key: "yes_cert", label: "Oui, avec certificat médical" },
      { key: "yes_no_cert", label: "Oui, mais sans certificat médical" },
      { key: "no", label: "Non" },
    ],
  },
  {
    id: "already_passed",
    prompt: "Avez-vous déjà passé et réussi l'examen civique ?",
    choices: [
      { key: "yes", label: "Oui" },
      { key: "no", label: "Non" },
    ],
  },
];

export type EligibilityVerdict = {
  status: "exempt" | "required" | "already_passed" | "needs_cert";
  title: string;
  description: string;
};

export function computeEligibility(
  answers: Record<string, EligibilityAnswer>
): EligibilityVerdict {
  if (answers.already_passed === "yes") {
    return {
      status: "already_passed",
      title: "Vous avez déjà réussi l'examen civique",
      description:
        "Votre réussite antérieure est valable pour votre démarche. Conservez votre attestation de réussite et présentez-la lors de votre dossier.",
    };
  }

  if (answers.age === "minor") {
    return {
      status: "exempt",
      title: "Vous êtes dispensé(e) de l'examen civique",
      description:
        "Les personnes mineures sont exemptées de l'examen civique lors des démarches de titre de séjour ou de naturalisation.",
    };
  }

  if (answers.age === "65+") {
    return {
      status: "exempt",
      title: "Vous êtes dispensé(e) de l'examen civique",
      description:
        "Les personnes âgées de 65 ans et plus sont dispensées de l'examen civique pour la plupart des démarches administratives.",
    };
  }

  if (answers.handicap === "yes_cert") {
    return {
      status: "exempt",
      title: "Vous êtes dispensé(e) sur présentation de votre certificat",
      description:
        "La dispense pour raisons médicales est accordée sur présentation d'un certificat médical officiel. Conservez ce document pour votre dossier.",
    };
  }

  if (answers.handicap === "yes_no_cert") {
    return {
      status: "needs_cert",
      title: "Une dispense est possible, avec certificat médical",
      description:
        "Vous pouvez demander une dispense pour raisons médicales, mais un certificat médical officiel est nécessaire. Rapprochez-vous de votre médecin traitant.",
    };
  }

  return {
    status: "required",
    title: "Vous devez passer l'examen civique",
    description:
      "L'examen civique est obligatoire pour votre démarche : 40 questions, 45 minutes, seuil de réussite à 80 %. Objectif Civique vous aide à vous préparer.",
  };
}
