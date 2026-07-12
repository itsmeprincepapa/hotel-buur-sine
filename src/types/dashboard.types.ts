// src/types/dashboard.types.ts
import { Reservation } from './reservation.types';

export interface DashboardStats {
  tauxOccupation: number;          // pourcentage de chambres occupées
  revenusDuJour: number;           // FCFA générés par les demandes soumises aujourd'hui
  reservationsEnAttente: number;   // nombre de demandes à valider
  reservationsRecentes: Reservation[];
}

export interface RepartitionStatutChambre {
  statut: string;
  nombre: number;
}
