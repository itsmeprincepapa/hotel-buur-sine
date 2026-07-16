// src/components/RoomCard.tsx
// Carte d'affichage d'une chambre (page publique /chambres) : photo, infos, équipements,
// prix, et bouton "Réserver" désactivé automatiquement si la chambre n'est pas libre.
import { Room } from '../types/room.types';
import { StatusBadge } from './StatusBadge';

interface RoomCardProps {
  room: Room;
  onReserve: (room: Room) => void; // callback fourni par le composant parent (Rooms.tsx)
}

export function RoomCard({ room, onReserve }: RoomCardProps) {
  const disponible = room.statut === 'libre';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={room.image}
        alt={`Chambre ${room.numero}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-800">
            {room.type} — N°{room.numero}
          </h3>
          <StatusBadge statut={room.statut} />
        </div>

        {room.description && (
          <p className="text-sm text-gray-500 mb-3">{room.description}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-3">
          {/* Affichage dynamique de la liste d'équipements (tableau de strings) */}
          {room.equipements.map((equipement) => (
            <span key={equipement} className="text-xs bg-[#F6F1E4] text-[#6b4527] px-2 py-1 rounded-md">
              {equipement}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-lg font-bold text-[#6b4527]">{room.prix.toLocaleString('fr-FR')} FCFA</p>
            <p className="text-xs text-gray-400">par nuit · {room.capacite} pers. max</p>
          </div>
          <button
            onClick={() => onReserve(room)}
            disabled={!disponible}
            className="bg-[#8A5A34] hover:bg-[#6b4527] disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
}
