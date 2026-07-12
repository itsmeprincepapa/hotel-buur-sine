// src/pages/Dashboard.tsx
// Page d'accueil du back-office (obligatoire selon le sujet) : indicateurs clés (KPI),
// graphique de répartition des chambres (Recharts), demandes à valider en priorité
// et tableau des activités récentes. Toutes les stats sont recalculées avec useMemo
// pour éviter des recalculs inutiles à chaque rendu.
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useRooms } from '../hooks/useRooms';
import { useReservations } from '../hooks/useReservations';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { RepartitionStatutChambre } from '../types/dashboard.types';

const today = new Date().toISOString().slice(0, 10);

export function Dashboard() {
  const { rooms } = useRooms();
  const { reservations, accepter, refuser } = useReservations();

  // Pourcentage de chambres actuellement occupées
  const tauxOccupation = useMemo(() => {
    if (rooms.length === 0) return 0;
    const occupees = rooms.filter((r) => r.statut === 'occupee').length;
    return Math.round((occupees / rooms.length) * 100);
  }, [rooms]);

  // Somme des montants des réservations créées aujourd'hui
  const revenusDuJour = useMemo(() => {
    return reservations
      .filter((r) => r.dateCreation === today)
      .reduce((total, r) => total + r.montant, 0);
  }, [reservations]);

  // Demandes à traiter en priorité par le staff
  const reservationsEnAttente = useMemo(
    () => reservations.filter((r) => r.statut === 'en_attente'),
    [reservations]
  );

  // Les 5 dernières réservations créées, pour le tableau "Activités récentes"
  const reservationsRecentes = useMemo(() => {
    return [...reservations]
      .sort((a, b) => b.dateCreation.localeCompare(a.dateCreation))
      .slice(0, 5);
  }, [reservations]);

  const getNumeroChambre = (roomId: string): string => {
    const room = rooms.find((r) => r.id === roomId);
    return room ? `N°${room.numero}` : roomId;
  };

  // Répartition des chambres par statut, pour le graphique
  const repartitionChambres: RepartitionStatutChambre[] = useMemo(() => {
    const labels: Record<string, string> = {
      libre: 'Libre',
      occupee: 'Occupée',
      en_nettoyage: 'En nettoyage',
      hors_service: 'Hors service',
    };
    const compteur: Record<string, number> = {};
    rooms.forEach((r) => {
      compteur[r.statut] = (compteur[r.statut] ?? 0) + 1;
    });
    return Object.entries(compteur).map(([statut, nombre]) => ({
      statut: labels[statut] ?? statut,
      nombre,
    }));
  }, [rooms]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
      <p className="text-gray-500 mb-6">Vue d'ensemble de l'Hôtel Buur Sine</p>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Taux d'occupation" valeur={`${tauxOccupation}%`} emoji="🛏️" accent="indigo" />
        <StatCard
          label="Revenus du jour"
          valeur={`${revenusDuJour.toLocaleString('fr-FR')} FCFA`}
          emoji="💰"
          accent="green"
        />
        <StatCard
          label="Réservations en attente"
          valeur={String(reservationsEnAttente.length)}
          emoji="⏳"
          accent="orange"
        />
        <StatCard label="Chambres au total" valeur={String(rooms.length)} emoji="🏨" accent="indigo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Réservations en attente à valider en priorité */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Demandes à valider</h2>
            <Link to="/reservations" className="text-xs text-[#8A5A34] hover:text-[#6b4527] font-medium">
              Voir tout →
            </Link>
          </div>

          {reservationsEnAttente.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center">Aucune demande en attente pour le moment.</p>
          ) : (
            <div className="space-y-3">
              {reservationsEnAttente.map((r) => (
                <div key={r.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{r.nomClient}</p>
                    <p className="text-xs text-gray-400">
                      {getNumeroChambre(r.roomId)} · {r.dateArrivee} → {r.dateDepart} · {r.reference}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => accepter(r.id)}
                      className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Accepter
                    </button>
                    <button
                      onClick={() => refuser(r.id)}
                      className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Refuser
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Graphique répartition des chambres */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 mb-4">Répartition des chambres</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={repartitionChambres}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="statut" tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="nombre" fill="#4338CA" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activités récentes */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mt-6">
        <h2 className="font-semibold text-gray-800 mb-4">Activités récentes</h2>
        <table className="w-full text-sm">
          <thead className="text-gray-400 text-left">
            <tr>
              <th className="py-2">Référence</th>
              <th className="py-2">Client</th>
              <th className="py-2">Chambre</th>
              <th className="py-2">Statut</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {reservationsRecentes.map((r) => (
              <tr key={r.id} className="border-t border-gray-100">
                <td className="py-2 font-mono text-xs text-gray-500">{r.reference}</td>
                <td className="py-2 text-gray-700">{r.nomClient}</td>
                <td className="py-2 text-gray-600">{getNumeroChambre(r.roomId)}</td>
                <td className="py-2"><StatusBadge statut={r.statut} /></td>
                <td className="py-2 text-gray-400">{r.dateCreation}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {reservationsRecentes.length === 0 && (
          <p className="text-center text-gray-400 py-6">Aucune activité pour le moment.</p>
        )}
      </div>
    </div>
  );
}
