// src/services/clientService.ts
// Couche d'accès aux données pour les fiches clients (CRUD complet).
// Appelle désormais l'API backend (Express + MySQL) au lieu du localStorage.
import { Client } from '../types/client.types';
import { apiFetch } from './apiClient';

export async function getClients(): Promise<Client[]> {
  return apiFetch<Client[]>('/clients');
}

export async function getClientById(id: string): Promise<Client | undefined> {
  try {
    return await apiFetch<Client>(`/clients/${id}`);
  } catch {
    return undefined;
  }
}

export async function addClient(client: Omit<Client, 'id' | 'historique'>): Promise<Client[]> {
  await apiFetch<Client>('/clients', { method: 'POST', body: client });
  return getClients();
}

export async function updateClient(id: string, updates: Partial<Client>): Promise<Client[]> {
  await apiFetch<Client>(`/clients/${id}`, { method: 'PUT', body: updates });
  return getClients();
}

export async function deleteClient(id: string): Promise<Client[]> {
  await apiFetch<void>(`/clients/${id}`, { method: 'DELETE' });
  return getClients();
}
