// src/types/client.types.ts

// Un séjour passé, rattaché à une réservation confirmée/terminée
export interface SejourHistorique {
  reservationId: string;
  dateArrivee: string;
  dateDepart: string;
  montant: number;
}

// Fiche client créée par le staff (distincte du User staff et de la Reservation publique)
export interface Client {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  historique: SejourHistorique[]; // permet d'afficher les séjours précédents dans le back-office
}
