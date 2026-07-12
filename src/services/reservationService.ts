// src/services/reservationService.ts
// Couche d'accès aux données pour les réservations : soumission publique, cycle de vie
// (en_attente -> confirmee -> en_cours -> terminee), et persistance dans le localStorage.
import { Reservation, ReservationFormData, ReservationStatus } from '../types/reservation.types';
import { mockReservations } from '../data/mockReservations';
import { getRoomById, updateRoomStatus } from './roomService';

const STORAGE_KEY = 'buur_sine_reservations';

function loadReservations(): Reservation[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as Reservation[];
    } catch {
      // données corrompues -> on repart des mock data
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockReservations));
  return mockReservations;
}

function saveReservations(reservations: Reservation[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
}

// Calcule le nombre de nuits entre deux dates ISO (ex: "2026-08-15")
export function calculerNombreNuits(dateArrivee: string, dateDepart: string): number {
  const arrivee = new Date(dateArrivee);
  const depart = new Date(dateDepart);
  const diffMs = depart.getTime() - arrivee.getTime();
  const nuits = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return nuits > 0 ? nuits : 0;
}

// Calcule le montant total selon le prix de la chambre et la durée du séjour
export function calculerMontant(prix: number, nbNuits: number): number {
  return prix * nbNuits;
}

export function getReservations(): Reservation[] {
  return loadReservations();
}

// Génère une référence lisible du type RES-XXXX
function genererReference(): string {
  const nombre = Math.floor(1000 + Math.random() * 9000);
  return `RES-${nombre}`;
}

// Utilisée par le formulaire public de réservation (aucune connexion requise)
export function addReservation(formData: ReservationFormData): { reservations: Reservation[]; reference: string } {
  const room = getRoomById(formData.roomId);
  const nbNuits = calculerNombreNuits(formData.dateArrivee, formData.dateDepart);
  const montant = room ? calculerMontant(room.prix, nbNuits) : 0;
  const reference = genererReference();

  const nouvelleReservation: Reservation = {
    id: `res_${Date.now()}`,
    reference,
    clientId: null,
    roomId: formData.roomId,
    nomClient: formData.nomClient,
    telephoneClient: formData.telephoneClient,
    emailClient: formData.emailClient,
    dateArrivee: formData.dateArrivee,
    dateDepart: formData.dateDepart,
    montant,
    statut: 'en_attente',
    dateCreation: new Date().toISOString().slice(0, 10),
  };

  const reservations = [...loadReservations(), nouvelleReservation];
  saveReservations(reservations);
  return { reservations, reference };
}

// Utilisée par la page publique /suivi : recherche par référence ET téléphone (vérification simple)
export function trouverParReferenceEtTelephone(reference: string, telephone: string): Reservation | undefined {
  return loadReservations().find(
    (r) =>
      r.reference.trim().toLowerCase() === reference.trim().toLowerCase() &&
      r.telephoneClient.replace(/\s/g, '') === telephone.replace(/\s/g, '')
  );
}

export function updateReservationStatus(id: string, statut: ReservationStatus): Reservation[] {
  const reservations = loadReservations().map((r) => (r.id === id ? { ...r, statut } : r));
  saveReservations(reservations);
  return reservations;
}

// Le staff accepte une demande en attente
export function accepterReservation(id: string): Reservation[] {
  return updateReservationStatus(id, 'confirmee');
}

// Le staff refuse une demande en attente
export function refuserReservation(id: string): Reservation[] {
  return updateReservationStatus(id, 'refusee');
}

// Check-in : la réservation passe en_cours, la chambre passe occupée
export function checkIn(reservationId: string): Reservation[] {
  const reservations = loadReservations();
  const reservation = reservations.find((r) => r.id === reservationId);
  if (reservation) {
    updateRoomStatus(reservation.roomId, 'occupee');
  }
  return updateReservationStatus(reservationId, 'en_cours');
}

// Check-out : la réservation passe terminee, la chambre passe en nettoyage
export function checkOut(reservationId: string): Reservation[] {
  const reservations = loadReservations();
  const reservation = reservations.find((r) => r.id === reservationId);
  if (reservation) {
    updateRoomStatus(reservation.roomId, 'en_nettoyage');
  }
  return updateReservationStatus(reservationId, 'terminee');
}
