// src/hooks/useReservations.ts
// Hook personnalisé centralisant l'état des réservations et les actions métier
// (soumission publique, acceptation/refus par le staff, check-in/check-out),
// via reservationService (API backend).
import { useState, useEffect, useCallback } from 'react';
import { Reservation, ReservationFormData } from '../types/reservation.types';
import * as reservationService from '../services/reservationService';

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const refresh = useCallback(() => {
    setLoading(true);
    reservationService
      .getReservations()
      .then((data) => {
        setReservations(data);
        setError('');
      })
      .catch(() => setError('Impossible de charger les réservations.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Utilisée par le formulaire public de réservation (ReservationForm) : crée une nouvelle
  // demande et renvoie une Promise de sa référence à afficher au client (ex: "RES-4821")
  const soumettreReservation = async (formData: ReservationFormData): Promise<string> => {
    const { reservations: nouvellesReservations, reference } = await reservationService.addReservation(formData);
    setReservations(nouvellesReservations);
    return reference;
  };

  // Actions réservées au staff (page Reservations du Dashboard)
  const accepter = (id: string): void => {
    reservationService.accepterReservation(id).then(setReservations).catch(() => setError("Impossible d'accepter la réservation."));
  };

  const refuser = (id: string): void => {
    reservationService.refuserReservation(id).then(setReservations).catch(() => setError('Impossible de refuser la réservation.'));
  };

  const faireCheckIn = (id: string): void => {
    reservationService.checkIn(id).then(setReservations).catch(() => setError('Impossible de faire le check-in.'));
  };

  const faireCheckOut = (id: string): void => {
    reservationService.checkOut(id).then(setReservations).catch(() => setError('Impossible de faire le check-out.'));
  };

  return { reservations, loading, error, soumettreReservation, accepter, refuser, faireCheckIn, faireCheckOut, refresh };
}
