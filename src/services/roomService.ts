// src/services/roomService.ts
// Couche d'accès aux données pour les chambres (CRUD complet), avec persistance
// dans le localStorage. Utilisée par useRooms() et par reservationService (mise à jour de statut).
import { Room, RoomStatus } from '../types/room.types';
import { mockRooms } from '../data/mockRooms';

const STORAGE_KEY = 'buur_sine_rooms';

function loadRooms(): Room[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as Room[];
    } catch {
      // en cas de données corrompues, on repart des mock data
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockRooms));
  return mockRooms;
}

function saveRooms(rooms: Room[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rooms));
}

export function getRooms(): Room[] {
  return loadRooms();
}

export function getRoomById(id: string): Room | undefined {
  return loadRooms().find((r) => r.id === id);
}

export function addRoom(room: Room): Room[] {
  const rooms = [...loadRooms(), room];
  saveRooms(rooms);
  return rooms;
}

export function updateRoom(id: string, updates: Partial<Room>): Room[] {
  const rooms = loadRooms().map((r) => (r.id === id ? { ...r, ...updates } : r));
  saveRooms(rooms);
  return rooms;
}

export function updateRoomStatus(id: string, statut: RoomStatus): Room[] {
  return updateRoom(id, { statut });
}

export function deleteRoom(id: string): Room[] {
  const rooms = loadRooms().filter((r) => r.id !== id);
  saveRooms(rooms);
  return rooms;
}
