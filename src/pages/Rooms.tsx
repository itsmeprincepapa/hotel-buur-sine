// src/pages/Rooms.tsx
// Page publique listant les chambres, avec filtres par statut et par type (rendu dynamique
// via map()), et ouverture du formulaire de réservation (ReservationForm) au clic sur une chambre.
import { useState, useMemo } from 'react';
import { useRooms } from '../hooks/useRooms';
import { useReservations } from '../hooks/useReservations';
import { RoomCard } from '../components/RoomCard';
import { ReservationForm } from '../components/ReservationForm';
import { Room, RoomStatus, RoomType } from '../types/room.types';

export function Rooms() {
  const { rooms } = useRooms();
  const { soumettreReservation } = useReservations();

  const [filtreStatut, setFiltreStatut] = useState<RoomStatus | 'tous'>('tous');
  const [filtreType, setFiltreType] = useState<RoomType | 'tous'>('tous');
  const [roomSelectionnee, setRoomSelectionnee] = useState<Room | null>(null); // chambre choisie pour réserver

  // useMemo : le filtrage n'est recalculé que si les chambres ou les filtres changent
  const roomsFiltrees = useMemo(() => {
    return rooms.filter((room) => {
      const matchStatut = filtreStatut === 'tous' || room.statut === filtreStatut;
      const matchType = filtreType === 'tous' || room.type === filtreType;
      return matchStatut && matchType;
    });
  }, [rooms, filtreStatut, filtreType]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Nos chambres</h1>
        <p className="text-gray-500">Les pieds dans l'eau, au cœur du delta du Sine Saloum.</p>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={filtreStatut}
          onChange={(e) => setFiltreStatut(e.target.value as RoomStatus | 'tous')}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="tous">Tous les statuts</option>
          <option value="libre">Libre</option>
          <option value="occupee">Occupée</option>
          <option value="en_nettoyage">En nettoyage</option>
          <option value="hors_service">Hors service</option>
        </select>

        <select
          value={filtreType}
          onChange={(e) => setFiltreType(e.target.value as RoomType | 'tous')}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="tous">Tous les types</option>
          <option value="Standard">Standard</option>
          <option value="Confort">Confort</option>
          <option value="Suite">Suite</option>
          <option value="Suite Vue Lagune">Suite Vue Lagune</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Affichage dynamique d'une carte par chambre filtrée, via map() */}
        {roomsFiltrees.map((room) => (
          <RoomCard key={room.id} room={room} onReserve={setRoomSelectionnee} />
        ))}
      </div>

      {/* Rendu conditionnel : message si aucun résultat pour les filtres actuels */}
      {roomsFiltrees.length === 0 && (
        <p className="text-center text-gray-400 mt-10">Aucune chambre ne correspond à ces critères.</p>
      )}

      {/* Rendu conditionnel : la modale de réservation ne s'affiche que si une chambre est sélectionnée */}
      {roomSelectionnee && (
        <ReservationForm
          room={roomSelectionnee}
          onSubmit={soumettreReservation}
          onClose={() => setRoomSelectionnee(null)}
        />
      )}
    </div>
  );
}
