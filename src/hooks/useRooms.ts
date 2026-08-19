// src/hooks/useRooms.ts
// Hook personnalisé centralisant l'état des chambres et les opérations CRUD
// (Ajouter/Modifier/Supprimer/Consulter), via roomService (API backend).
import { useState, useEffect, useCallback } from 'react';
import { Room } from '../types/room.types';
import * as roomService from '../services/roomService';

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const refresh = useCallback(() => {
    setLoading(true);
    roomService
      .getRooms()
      .then((data) => {
        setRooms(data);
        setError('');
      })
      .catch(() => setError('Impossible de charger les chambres.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addRoom = (room: Omit<Room, 'id'>): void => {
    roomService.addRoom(room).then(setRooms).catch(() => setError("Impossible d'ajouter la chambre."));
  };

  const updateRoom = (id: string, updates: Partial<Room>): void => {
    roomService.updateRoom(id, updates).then(setRooms).catch(() => setError('Impossible de modifier la chambre.'));
  };

  const deleteRoom = (id: string): void => {
    roomService.deleteRoom(id).then(setRooms).catch(() => setError('Impossible de supprimer la chambre.'));
  };

  return { rooms, loading, error, addRoom, updateRoom, deleteRoom, refresh };
}
