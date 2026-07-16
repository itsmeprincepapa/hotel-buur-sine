// src/pages/Reservations.tsx
// Page back-office listant toutes les réservations, avec actions selon le statut :
// Accepter/Refuser (demandes en attente), Check-in (confirmées), Check-out (en cours).
import { useMemo } from 'react';
import { useReservations } from '../hooks/useReservations';
import { useRooms } from '../hooks/useRooms';
import { StatusBadge } from '../components/StatusBadge';

export function Reservations() {
  const { reservations, accepter, refuser, faireCheckIn, faireCheckOut } = useReservations();
  const { rooms } = useRooms();

  const getNumeroChambre = (roomId: string): string => {
    const room = rooms.find((r) => r.id === roomId);
    return room ? `N°${room.numero} (${room.type})` : roomId;
  };

  // Les demandes en attente sont affichées en priorité, en haut de la liste
  const reservationsTriees = useMemo(() => {
    return [...reservations].sort((a, b) => {
      if (a.statut === 'en_attente' && b.statut !== 'en_attente') return -1;
      if (a.statut !== 'en_attente' && b.statut === 'en_attente') return 1;
      return b.dateCreation.localeCompare(a.dateCreation);
    });
  }, [reservations]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Réservations</h1>
      <p className="text-gray-500 mb-6">Validez les demandes reçues depuis le site, et suivez les séjours en cours.</p>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="px-4 py-3">Référence</th>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Chambre</th>
              <th className="px-4 py-3">Dates</th>
              <th className="px-4 py-3">Montant</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Une ligne par réservation, générée dynamiquement via map() */}
            {reservationsTriees.map((reservation) => (
              <tr key={reservation.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-mono text-xs text-gray-500">{reservation.reference}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800">{reservation.nomClient}</p>
                  <p className="text-xs text-gray-400">{reservation.telephoneClient}</p>
                </td>
                <td className="px-4 py-3">{getNumeroChambre(reservation.roomId)}</td>
                <td className="px-4 py-3 text-gray-600">
                  {reservation.dateArrivee} → {reservation.dateDepart}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  {reservation.montant.toLocaleString('fr-FR')} FCFA
                </td>
                <td className="px-4 py-3">
                  <StatusBadge statut={reservation.statut} />
                </td>
                <td className="px-4 py-3 space-x-2">
                  {/* Rendu conditionnel : les actions affichées dépendent du statut actuel de la réservation */}
                  {reservation.statut === 'en_attente' && (
                    <>
                      <button
                        onClick={() => accepter(reservation.id)}
                        className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Accepter
                      </button>
                      <button
                        onClick={() => refuser(reservation.id)}
                        className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Refuser
                      </button>
                    </>
                  )}
                  {reservation.statut === 'confirmee' && (
                    <button
                      onClick={() => faireCheckIn(reservation.id)}
                      className="text-xs bg-[#8A5A34] hover:bg-[#6b4527] text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Check-in
                    </button>
                  )}
                  {reservation.statut === 'en_cours' && (
                    <button
                      onClick={() => faireCheckOut(reservation.id)}
                      className="text-xs bg-gray-700 hover:bg-gray-800 text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Check-out
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {reservationsTriees.length === 0 && (
          <p className="text-center text-gray-400 py-10">Aucune réservation pour le moment.</p>
        )}
      </div>
    </div>
  );
}
