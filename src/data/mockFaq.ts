// src/data/mockFaq.ts

export interface FaqItem {
  id: string;
  question: string;
  reponse: string;
}

export const mockFaq: FaqItem[] = [
  {
    id: 'f1',
    question: 'Quels sont les horaires de check-in et check-out ?',
    reponse: "L'arrivée se fait à partir de 14h et le départ avant 12h. Un départ tardif peut être organisé sur demande, selon disponibilité.",
  },
  {
    id: 'f2',
    question: 'Quelle est la politique d\'annulation ?',
    reponse: "Annulation gratuite jusqu'à 48h avant l'arrivée. Passé ce délai, la première nuit est facturée. Contactez-nous pour toute situation particulière.",
  },
  {
    id: 'f3',
    question: 'Les animaux de compagnie sont-ils acceptés ?',
    reponse: "Les animaux ne sont pas acceptés dans les chambres, pour le confort de tous nos hôtes et le respect de la faune locale du delta.",
  },
  {
    id: 'f4',
    question: 'Le wifi est-il disponible ?',
    reponse: "Oui, le wifi gratuit est accessible dans l'ensemble de l'hôtel, y compris au restaurant Le Thiof et au Baobab Lounge.",
  },
  {
    id: 'f5',
    question: 'Comment se rendre à l\'hôtel depuis Dakar ?',
    reponse: "Buur Sine se trouve dans le delta du Sine Saloum, à environ 2h30 de route de Dakar. Un service de transfert privé peut être organisé sur demande.",
  },
  {
    id: 'f6',
    question: 'Proposez-vous des excursions et activités ?',
    reponse: "Oui : excursions en pirogue, visite des îles, observation ornithologique, pêche traditionnelle, spa et salle de sport sont disponibles sur place ou à proximité immédiate.",
  },
  {
    id: 'f7',
    question: 'Quels moyens de paiement acceptez-vous ?',
    reponse: "Espèces, principales cartes bancaires, ainsi que Wave et Orange Money sont acceptés sur place.",
  },
];
