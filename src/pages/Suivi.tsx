// src/pages/Suivi.tsx
// Page publique "Suivre ma réservation" : recherche une réservation par référence + téléphone
// (aucune connexion nécessaire), et affiche un message adapté à son statut actuel.
import { useState, FormEvent, ChangeEvent } from 'react';
import { trouverParReferenceEtTelephone } from '../services/reservationService';
import { getRoomById } from '../services/roomService';
import { Reservation } from '../types/reservation.types';
import { StatusBadge } from '../components/StatusBadge';

export function Suivi() {
  const [reference, setReference] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [resultat, setResultat] = useState<Reservation | null>(null);
  const [recherche, setRecherche] = useState<boolean>(false); // true dès qu'une recherche a été lancée

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trouvee = trouverParReferenceEtTelephone(reference, telephone);
    setResultat(trouvee ?? null);
    setRecherche(true);
  };

  const room = resultat ? getRoomById(resultat.roomId) : undefined;

  // Message affiché à l'utilisateur selon le statut trouvé (typé Record pour couvrir tous les cas)
  const messageParStatut: Record<string, string> = {
    en_attente: "Votre demande est en cours d'examen par notre équipe. Revenez vérifier un peu plus tard.",
    confirmee: 'Bonne nouvelle : votre réservation est confirmée ! Nous avons hâte de vous accueillir.',
    refusee: "Nous sommes désolés, votre demande n'a pas pu être acceptée pour ces dates.",
    en_cours: 'Votre séjour est actuellement en cours. Nous espérons que vous profitez du Buur Sine !',
    terminee: 'Ce séjour est terminé. Merci de votre visite, à bientôt !',
    annulee: 'Cette réservation a été annulée.',
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Suivre ma réservation</h1>
      <p className="text-gray-500 mb-8">
        Entrez votre référence et votre numéro de téléphone pour connaître le statut de votre demande.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-2xl shadow-sm p-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Référence de réservation</label>
          <input
            type="text" required value={reference}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setReference(e.target.value)}
            placeholder="RES-4821"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8923E]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone utilisé lors de la demande</label>
          <input
            type="tel" required value={telephone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTelephone(e.target.value)}
            placeholder="77 123 45 67"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8923E]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#8A5A34] hover:bg-[#6b4527] text-white font-medium rounded-lg py-2.5 transition-colors"
        >
          Vérifier le statut
        </button>
      </form>

      {/* Rendu conditionnel : message d'erreur si une recherche a été faite mais n'a rien trouvé */}
      {recherche && !resultat && (
        <div className="rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
          Aucune réservation trouvée avec cette référence et ce numéro de téléphone. Vérifiez vos informations.
        </div>
      )}

      {/* Rendu conditionnel : détail de la réservation si elle a été trouvée */}
      {resultat && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-sm text-gray-400">{resultat.reference}</p>
            <StatusBadge statut={resultat.statut} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-1">
            {room ? `${room.type} — N°${room.numero}` : 'Chambre'}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {resultat.dateArrivee} → {resultat.dateDepart} · {resultat.montant.toLocaleString('fr-FR')} FCFA
          </p>
          <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-4 py-3">
            {messageParStatut[resultat.statut]}
          </p>
        </div>
      )}
    </div>
  );
}
