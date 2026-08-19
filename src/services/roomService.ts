// src/services/roomService.ts
// Couche d'accès aux données pour les chambres (CRUD complet).
// Appelle désormais l'API backend (Express + MySQL) au lieu du localStorage.
import { Room, RoomStatus } from '../types/room.types';
import { apiFetch } from './apiClient';

export async function getRooms(): Promise<Room[]> {
  return apiFetch<Room[]>('/rooms', { auth: false });
}

export async function getRoomById(id: string): Promise<Room | undefined> {
  try {
    return await apiFetch<Room>(`/rooms/${id}`, { auth: false });
  } catch {
    return undefined;
  }
}

export async function addRoom(room: Omit<Room, 'id'>): Promise<Room[]> {
  await apiFetch<Room>('/rooms', { method: 'POST', body: room });
  return getRooms();
}

export async function updateRoom(id: string, updates: Partial<Room>): Promise<Room[]> {
  await apiFetch<Room>(`/rooms/${id}`, { method: 'PUT', body: updates });
  return getRooms();
}

export async function updateRoomStatus(id: string, statut: RoomStatus): Promise<Room[]> {
  return updateRoom(id, { statut });
}

export async function deleteRoom(id: string): Promise<Room[]> {
  await apiFetch<void>(`/rooms/${id}`, { method: 'DELETE' });
  return getRooms();
}
