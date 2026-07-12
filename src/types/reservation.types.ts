// src/types/reservation.types.ts

export type ReservationStatus =
  | 'en_attente'   // demande soumise par un visiteur, pas encore traitée
  | 'confirmee'    // acceptée par le staff
  | 'refusee'      // refusée par le staff
  | 'en_cours'     // client actuellement en séjour (après check-in)
  | 'terminee'     // séjour achevé (après check-out)
  | 'annulee';     // annulée après confirmation

export interface Reservation {
  id: string;
  reference: string;       // ex: "RES-4821", communiqué au client pour suivre sa demande
  clientId: string | null; // null tant que la fiche client n'a pas été créée par le staff
  roomId: string;
  nomClient: string;
  telephoneClient: string;
  emailClient: string;
  dateArrivee: string;     // format ISO, ex: "2026-08-15"
  dateDepart: string;
  montant: number;
  statut: ReservationStatus;
  dateCreation: string;
}

// Champs du formulaire public de réservation (accessible sans connexion)
export interface ReservationFormData {
  nomClient: string;
  telephoneClient: string;
  emailClient: string;
  roomId: string;
  dateArrivee: string;
  dateDepart: string;
}
