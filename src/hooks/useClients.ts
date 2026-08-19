// src/hooks/useClients.ts
// Hook personnalisé qui encapsule l'état des clients et les opérations CRUD
// (Ajouter/Modifier/Supprimer/Consulter), en s'appuyant sur clientService (API backend).
// Les pages (ex: Clients.tsx) n'ont qu'à appeler useClients() sans connaître le détail du stockage.
import { useState, useEffect, useCallback } from 'react';
import { Client } from '../types/client.types';
import * as clientService from '../services/clientService';

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const refresh = useCallback(() => {
    setLoading(true);
    clientService
      .getClients()
      .then((data) => {
        setClients(data);
        setError('');
      })
      .catch(() => setError('Impossible de charger les clients.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addClient = (client: Omit<Client, 'id' | 'historique'>): void => {
    clientService.addClient(client).then(setClients).catch(() => setError("Impossible d'ajouter le client."));
  };

  const updateClient = (id: string, updates: Partial<Client>): void => {
    clientService.updateClient(id, updates).then(setClients).catch(() => setError('Impossible de modifier le client.'));
  };

  const deleteClient = (id: string): void => {
    clientService.deleteClient(id).then(setClients).catch(() => setError('Impossible de supprimer le client.'));
  };

  return { clients, loading, error, addClient, updateClient, deleteClient, refresh };
}
