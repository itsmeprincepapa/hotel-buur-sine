// src/data/mockUsers.ts
import { User } from '../types/auth.types';

// Comptes staff simulés (authentification factice, pas de vrai backend)
export const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    nom: 'Ndiaye',
    prenom: 'Papa Mbacke',
    email: 'admin@buursine.sn',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: '2',
    nom: 'Kane Thiam',
    prenom: 'Fatou',
    email: 'reception@buursine.sn',
    password: 'reception123',
    role: 'receptionniste',
  },
];
