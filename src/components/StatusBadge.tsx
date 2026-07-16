// src/components/StatusBadge.tsx
// Petite pastille colorée réutilisable pour afficher un statut, que ce soit celui
// d'une réservation ou celui d'une chambre (les deux types de statuts sont gérés ici).
import { ReservationStatus } from '../types/reservation.types';
import { RoomStatus } from '../types/room.types';

// Union des deux types de statuts possibles, pour que ce composant accepte les deux
type Statut = ReservationStatus | RoomStatus;

// Record garantit (grâce à TypeScript) qu'on a bien une couleur pour chaque valeur possible de Statut
const styles: Record<Statut, string> = {
  // statuts de réservation
  en_attente: 'bg-orange-100 text-orange-700',
  confirmee: 'bg-green-100 text-green-700',
  refusee: 'bg-red-100 text-red-700',
  en_cours: 'bg-blue-100 text-blue-700',
  terminee: 'bg-gray-200 text-gray-600',
  annulee: 'bg-red-100 text-red-700',
  // statuts de chambre
  libre: 'bg-green-100 text-green-700',
  occupee: 'bg-blue-100 text-blue-700',
  en_nettoyage: 'bg-orange-100 text-orange-700',
  hors_service: 'bg-gray-200 text-gray-600',
};

const labels: Record<Statut, string> = {
  en_attente: 'En attente',
  confirmee: 'Confirmée',
  refusee: 'Refusée',
  en_cours: 'En cours',
  terminee: 'Terminée',
  annulee: 'Annulée',
  libre: 'Libre',
  occupee: 'Occupée',
  en_nettoyage: 'En nettoyage',
  hors_service: 'Hors service',
};

interface StatusBadgeProps {
  statut: Statut;
}

export function StatusBadge({ statut }: StatusBadgeProps) {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${styles[statut]}`}>
      {labels[statut]}
    </span>
  );
}
