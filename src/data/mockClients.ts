// src/data/mockClients.ts
// Données de départ pour les fiches clients (utilisées si le localStorage est vide).
import { Client } from '../types/client.types';

export const mockClients: Client[] = [
  {
    id: 'c1',
    nom: 'Diop',
    prenom: 'Amadou',
    telephone: '77 123 45 67',
    email: 'amadou.diop@example.com',
    historique: [
      { reservationId: 'res1', dateArrivee: '2026-05-10', dateDepart: '2026-05-14', montant: 220000 },
    ],
  },
  {
    id: 'c2',
    nom: 'Fall',
    prenom: 'Aissatou',
    telephone: '76 987 65 43',
    email: 'aissatou.fall@example.com',
    historique: [],
  },
  {
    id: 'c3',
    nom: 'Diallo',
    prenom: 'Moussa',
    telephone: '70 555 12 34',
    email: 'moussa.diallo@example.com',
    historique: [
      { reservationId: 'res2', dateArrivee: '2026-06-01', dateDepart: '2026-06-03', montant: 110000 },
    ],
  },
  {
    id: 'c4',
    nom: 'Ndiaye',
    prenom: 'Fatou',
    telephone: '78 222 33 44',
    email: 'fatou.ndiaye@example.com',
    historique: [],
  },
];
