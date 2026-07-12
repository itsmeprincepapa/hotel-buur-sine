// src/hooks/useClients.ts
// Hook personnalisé qui encapsule l'état des clients et les opérations CRUD
// (Ajouter/Modifier/Supprimer/Consulter), en s'appuyant sur clientService (persistance localStorage).
// Les pages (ex: Clients.tsx) n'ont qu'à appeler useClients() sans connaître le détail du stockage.
import { useState, useEffect, useCallback } from 'react';
import { Client } from '../types/client.types';
import * as clientService from '../services/clientService';

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);

  // useCallback : évite de recréer la fonction à chaque rendu (utile car refresh est
  // une dépendance du useEffect ci-dessous)
  const refresh = useCallback(() => {
    setClients(clientService.getClients());
  }, []);

  // Charge la liste des clients au montage du composant qui utilise ce hook
  useEffect(() => {
    refresh();
  }, [refresh]);

  const addClient = (client: Omit<Client, 'id' | 'historique'>): void => {
    setClients(clientService.addClient(client));
  };

  const updateClient = (id: string, updates: Partial<Client>): void => {
    setClients(clientService.updateClient(id, updates));
  };

  const deleteClient = (id: string): void => {
    setClients(clientService.deleteClient(id));
  };

  return { clients, addClient, updateClient, deleteClient, refresh };
}
