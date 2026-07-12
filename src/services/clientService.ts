// src/services/clientService.ts
// Couche d'accès aux données pour les fiches clients (CRUD complet), avec persistance
// dans le localStorage du navigateur (simule une vraie base de données pour ce projet).
import { Client } from '../types/client.types';
import { mockClients } from '../data/mockClients';

const STORAGE_KEY = 'buur_sine_clients';

function loadClients(): Client[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as Client[];
    } catch {
      // données corrompues -> on repart des mock data
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockClients));
  return mockClients;
}

function saveClients(clients: Client[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
}

export function getClients(): Client[] {
  return loadClients();
}

// Recherche un client précis, utilisé par exemple pour préremplir un formulaire de modification
export function getClientById(id: string): Client | undefined {
  return loadClients().find((c) => c.id === id);
}

// Crée une nouvelle fiche client avec un id unique et un historique vide
export function addClient(client: Omit<Client, 'id' | 'historique'>): Client[] {
  const nouveauClient: Client = {
    ...client,
    id: `c_${Date.now()}`,
    historique: [],
  };
  const clients = [...loadClients(), nouveauClient];
  saveClients(clients);
  return clients;
}

// Met à jour partiellement un client existant (seuls les champs fournis sont modifiés)
export function updateClient(id: string, updates: Partial<Client>): Client[] {
  const clients = loadClients().map((c) => (c.id === id ? { ...c, ...updates } : c));
  saveClients(clients);
  return clients;
}

// Supprime définitivement une fiche client
export function deleteClient(id: string): Client[] {
  const clients = loadClients().filter((c) => c.id !== id);
  saveClients(clients);
  return clients;
}
