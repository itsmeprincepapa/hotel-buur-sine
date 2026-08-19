// src/services/reservationService.ts
// Couche d'accès aux données pour les réservations : soumission publique, cycle de vie
// (en_attente -> confirmee -> en_cours -> terminee). Appelle désormais l'API backend
// (Express + MySQL) au lieu du localStorage.
import { Reservation, ReservationFormData, ReservationStatus } from '../types/reservation.types';
import { apiFetch } from './apiClient';

// ---- Fonctions de calcul pures, conservées côté frontend pour l'aperçu en temps réel
//      du montant dans le formulaire de réservation (ReservationForm). Le montant
//      définitif est de toute façon recalculé et stocké côté serveur. ----

export function calculerNombreNuits(dateArrivee: string, dateDepart: string): number {
  const arrivee = new Date(dateArrivee);
  const depart = new Date(dateDepart);
  const diffMs = depart.getTime() - arrivee.getTime();
  const nuits = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return nuits > 0 ? nuits : 0;
}

export function calculerMontant(prix: number, nbNuits: number): number {
  return prix * nbNuits;
}

export async function getReservations(): Promise<Reservation[]> {
  return apiFetch<Reservation[]>('/reservations');
}

// Utilisée par le formulaire public de réservation (aucune connexion requise)
export async function addReservation(
  formData: ReservationFormData
): Promise<{ reservations: Reservation[]; reference: string }> {
  const { reference } = await apiFetch<{ reservation: Reservation; reference: string }>(
    '/reservations',
    { method: 'POST', body: formData, auth: false }
  );
  const reservations = await getReservations().catch(() => [] as Reservation[]);
  return { reservations, reference };
}

// Utilisée par la page publique /suivi : recherche par référence ET téléphone
export async function trouverParReferenceEtTelephone(
  reference: string,
  telephone: string
): Promise<Reservation | undefined> {
  try {
    const params = new URLSearchParams({ reference, telephone });
    return await apiFetch<Reservation>(`/reservations/suivi?${params.toString()}`, { auth: false });
  } catch {
    return undefined;
  }
}

async function updateReservationStatus(id: string, statut: ReservationStatus, path: string): Promise<Reservation[]> {
  await apiFetch<Reservation>(`/reservations/${id}/${path}`, { method: 'PATCH' });
  return getReservations();
}

export async function accepterReservation(id: string): Promise<Reservation[]> {
  return updateReservationStatus(id, 'confirmee', 'accepter');
}

export async function refuserReservation(id: string): Promise<Reservation[]> {
  return updateReservationStatus(id, 'refusee', 'refuser');
}

export async function checkIn(id: string): Promise<Reservation[]> {
  return updateReservationStatus(id, 'en_cours', 'checkin');
}

export async function checkOut(id: string): Promise<Reservation[]> {
  return updateReservationStatus(id, 'terminee', 'checkout');
}
