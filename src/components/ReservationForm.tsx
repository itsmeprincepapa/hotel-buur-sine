// src/components/ReservationForm.tsx
// Formulaire public de demande de réservation (modale ouverte depuis RoomCard).
// Contrôle chaque champ avec useState, recalcule le montant en temps réel avec useEffect,
// puis affiche un écran de confirmation avec la référence une fois la demande soumise.
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Room } from '../types/room.types';
import { ReservationFormData } from '../types/reservation.types';
import { calculerNombreNuits, calculerMontant } from '../services/reservationService';

interface ReservationFormProps {
  room: Room;
  onSubmit: (formData: ReservationFormData) => string; // retourne la référence générée
  onClose: () => void;
}

export function ReservationForm({ room, onSubmit, onClose }: ReservationFormProps) {
  // Toutes les valeurs des champs du formulaire, regroupées dans un seul state
  const [formData, setFormData] = useState<Omit<ReservationFormData, 'roomId'>>({
    nomClient: '',
    telephoneClient: '',
    emailClient: '',
    dateArrivee: '',
    dateDepart: '',
  });
  const [montant, setMontant] = useState<number>(0);
  const [reference, setReference] = useState<string>(''); // vide tant que le formulaire n'est pas soumis

  // Recalcule le montant à chaque changement de dates
  useEffect(() => {
    if (formData.dateArrivee && formData.dateDepart) {
      const nbNuits = calculerNombreNuits(formData.dateArrivee, formData.dateDepart);
      setMontant(calculerMontant(room.prix, nbNuits));
    } else {
      setMontant(0);
    }
  }, [formData.dateArrivee, formData.dateDepart, room.prix]);

  // Générique : met à jour uniquement le champ modifié dans formData, quel que soit son nom
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const nouvelleReference = onSubmit({ ...formData, roomId: room.id });
    setReference(nouvelleReference); // déclenche l'affichage de l'écran de confirmation
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        {/* Rendu conditionnel : écran de confirmation si la demande a été envoyée,
            sinon le formulaire de saisie */}
        {reference ? (
          <div className="text-center py-8">
            <p className="text-2xl mb-2">✅</p>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Demande envoyée !</h3>
            <p className="text-sm text-gray-500 mb-4">
              Votre demande de réservation pour la chambre {room.numero} a bien été enregistrée.
              Notre équipe la validera très prochainement.
            </p>
            <div className="bg-[#F6F1E4] rounded-xl px-4 py-4 mb-4">
              <p className="text-xs text-[#8A5A34] uppercase tracking-wide mb-1">Votre référence</p>
              <p className="text-2xl font-bold text-[#6b4527]">{reference}</p>
            </div>
            <p className="text-xs text-gray-400 mb-6">
              Notez bien cette référence : elle vous permettra de suivre l'état de votre demande
              sur la page « Suivre ma réservation », avec votre numéro de téléphone.
            </p>
            <button
              onClick={onClose}
              className="bg-[#8A5A34] hover:bg-[#6b4527] text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Réserver — {room.type} N°{room.numero}</h3>
                <p className="text-sm text-gray-400">{room.prix.toLocaleString('fr-FR')} FCFA / nuit</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                <input
                  name="nomClient" type="text" required value={formData.nomClient} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8923E]"
                  placeholder="Amadou Diop"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  name="telephoneClient" type="tel" required value={formData.telephoneClient} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8923E]"
                  placeholder="77 123 45 67"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  name="emailClient" type="email" required value={formData.emailClient} onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8923E]"
                  placeholder="amadou.diop@example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Arrivée</label>
                  <input
                    name="dateArrivee" type="date" required value={formData.dateArrivee} onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8923E]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Départ</label>
                  <input
                    name="dateDepart" type="date" required value={formData.dateDepart} onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8923E]"
                  />
                </div>
              </div>

              {/* N'affiche le montant que si les deux dates sont renseignées et valides */}
              {montant > 0 && (
                <div className="bg-[#F6F1E4] rounded-lg px-4 py-3 text-sm text-[#5C4224] font-medium">
                  Montant total estimé : {montant.toLocaleString('fr-FR')} FCFA
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#8A5A34] hover:bg-[#6b4527] text-white font-medium rounded-lg py-2.5 mt-2 transition-colors"
              >
                Envoyer la demande de réservation
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
