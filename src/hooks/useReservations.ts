// src/hooks/useReservations.ts
// Hook personnalisé centralisant l'état des réservations et les actions métier
// (soumission publique, acceptation/refus par le staff, check-in/check-out).
import { useState, useEffect, useCallback } from 'react';
import { Reservation, ReservationFormData } from '../types/reservation.types';
import * as reservationService from '../services/reservationService';

export function useReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const refresh = useCallback(() => {
    setReservations(reservationService.getReservations());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Utilisé par le formulaire public de réservation (ReservationForm) : crée une nouvelle
  // demande et renvoie sa référence à afficher au client (ex: "RES-4821")
  const soumettreReservation = (formData: ReservationFormData): string => {
    const { reservations: nouvellesReservations, reference } = reservationService.addReservation(formData);
    setReservations(nouvellesReservations);
    return reference;
  };

  // Actions réservées au staff (page Reservations du Dashboard)
  const accepter = (id: string): void => {
    setReservations(reservationService.accepterReservation(id));
  };

  const refuser = (id: string): void => {
    setReservations(reservationService.refuserReservation(id));
  };

  const faireCheckIn = (id: string): void => {
    setReservations(reservationService.checkIn(id));
  };

  const faireCheckOut = (id: string): void => {
    setReservations(reservationService.checkOut(id));
  };

  return { reservations, soumettreReservation, accepter, refuser, faireCheckIn, faireCheckOut, refresh };
}
