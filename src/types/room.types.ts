// src/types/room.types.ts

export type RoomType = 'Standard' | 'Confort' | 'Suite' | 'Suite Vue Lagune';

export type RoomStatus = 'libre' | 'occupee' | 'en_nettoyage' | 'hors_service';

export interface Room {
  id: string;
  numero: string;
  type: RoomType;
  prix: number;          // prix par nuit, en FCFA
  capacite: number;      // nombre de personnes
  statut: RoomStatus;
  equipements: string[]; // ex: ["Piscine", "Vue lagune", "Ponton privé"]
  image: string;         // chemin dans public/images, ex: "/images/chambre1.jpg"
  description?: string;
}
