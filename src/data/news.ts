export type NewsArticle = {
  id: string;
  category: "legislation" | "naturalisation" | "titre-sejour" | "general";
  title: string;
  excerpt: string;
  publishedAt: string; // ISO date
  source: string;
  body: string;
};

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "news-2026-04-sejour-reform",
    category: "titre-sejour",
    title:
      "Réforme des titres de séjour : ce qui change en 2026 pour les résidents étrangers",
    excerpt:
      "Le ministère de l'Intérieur annonce plusieurs ajustements concernant la délivrance des cartes de séjour pluriannuelles à compter du 1er juin 2026.",
    publishedAt: "2026-04-18",
    source: "Ministère de l'Intérieur",
    body:
      "La direction générale des étrangers en France (DGEF) a détaillé les nouvelles modalités applicables aux cartes de séjour pluriannuelles. Les critères d'intégration républicaine, notamment la maîtrise du français et la connaissance des valeurs de la République, seront évalués plus finement. Un décret précisera les conditions d'application dans les semaines à venir.",
  },
  {
    id: "news-2026-04-naturalisation",
    category: "naturalisation",
    title:
      "Naturalisation : le nouveau livret du citoyen 2026 est disponible en ligne",
    excerpt:
      "La version 2026 du livret du citoyen, document de référence pour l'entretien de naturalisation, a été publiée.",
    publishedAt: "2026-04-12",
    source: "Formation-civique.interieur.gouv.fr",
    body:
      "Le livret du citoyen 2026 intègre les dernières évolutions constitutionnelles, historiques et culturelles de la République française. Il est téléchargeable gratuitement. Les candidats à la naturalisation sont invités à en prendre connaissance pour préparer leur entretien d'assimilation.",
  },
  {
    id: "news-2026-04-senat-budget",
    category: "legislation",
    title:
      "Le Sénat adopte le budget de la mission Immigration, Asile et Intégration",
    excerpt:
      "Les crédits alloués à la mission immigration ont été votés par le Sénat en séance publique.",
    publishedAt: "2026-04-08",
    source: "Sénat",
    body:
      "Le Sénat a adopté les crédits de la mission Immigration, Asile et Intégration pour l'exercice budgétaire en cours. Les financements dédiés à la formation civique et linguistique des primo-arrivants sont reconduits. Les modalités de mise en œuvre seront précisées par circulaire.",
  },
  {
    id: "news-2026-03-laicite",
    category: "general",
    title:
      "Laïcité : une campagne nationale rappelle les fondamentaux républicains",
    excerpt:
      "Le gouvernement lance une campagne d'information pour rappeler les principes de la laïcité à la française.",
    publishedAt: "2026-03-29",
    source: "Gouvernement",
    body:
      "La laïcité, principe constitutionnel, garantit la liberté de conscience et la neutralité de l'État vis-à-vis des religions. La campagne rappelle que la loi du 9 décembre 1905 reste le socle juridique de ce principe, et que sa connaissance est requise lors des démarches de naturalisation.",
  },
  {
    id: "news-2026-03-examen-centres",
    category: "titre-sejour",
    title:
      "Nouveaux centres d'examen civique agréés en Île-de-France",
    excerpt:
      "Trois nouveaux centres d'examen civique ont obtenu leur agrément préfectoral.",
    publishedAt: "2026-03-15",
    source: "Préfecture de Paris",
    body:
      "Afin de réduire les délais d'attente pour passer l'examen civique, trois nouveaux centres ont été agréés dans les départements d'Île-de-France. Les candidats peuvent désormais choisir un créneau plus proche de chez eux via la plateforme nationale de prise de rendez-vous.",
  },
];

export const NEWS_CATEGORY_LABELS: Record<NewsArticle["category"], string> = {
  legislation: "Législation",
  naturalisation: "Naturalisation",
  "titre-sejour": "Titre de séjour",
  general: "Général",
};
