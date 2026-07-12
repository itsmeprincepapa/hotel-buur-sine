// src/hooks/useRooms.ts
// Hook personnalisé centralisant l'état des chambres et les opérations CRUD
// (Ajouter/Modifier/Supprimer/Consulter), via roomService (persistance localStorage).
import { useState, useEffect, useCallback } from 'react';
import { Room } from '../types/room.types';
import * as roomService from '../services/roomService';

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);

  const refresh = useCallback(() => {
    setRooms(roomService.getRooms());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addRoom = (room: Room): void => {
    setRooms(roomService.addRoom(room));
  };

  const updateRoom = (id: string, updates: Partial<Room>): void => {
    setRooms(roomService.updateRoom(id, updates));
  };

  const deleteRoom = (id: string): void => {
    setRooms(roomService.deleteRoom(id));
  };

  return { rooms, addRoom, updateRoom, deleteRoom, refresh };
}
