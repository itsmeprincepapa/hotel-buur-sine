// src/data/mockReviews.ts
import { Review } from '../types/review.types';

export const mockReviews: Review[] = [
  {
    id: 'rev1',
    nom: 'Aïssatou D.',
    pays: 'Sénégal',
    note: 5,
    commentaire:
      "Un cadre exceptionnel face à la lagune. Le personnel est très accueillant et l'excursion en pirogue restera un souvenir inoubliable.",
    date: 'Juin 2026',
  },
  {
    id: 'rev2',
    nom: 'Marc L.',
    pays: 'France',
    note: 5,
    commentaire:
      "Nous avons adoré le coucher de soleil au ponton et le dîner au Thiof. Chambre spacieuse et très propre, à refaire sans hésiter.",
    date: 'Mai 2026',
  },
  {
    id: 'rev3',
    nom: 'Fatou S.',
    pays: 'Sénégal',
    note: 4,
    commentaire:
      "Très bon séjour en famille. La piscine à débordement et le spa sont un vrai plus. Petit bémol sur le wifi, un peu lent le soir.",
    date: 'Avril 2026',
  },
  {
    id: 'rev4',
    nom: 'Sophie B.',
    pays: 'Belgique',
    note: 5,
    commentaire:
      "L'observation des oiseaux au petit matin était magique. Le Baobab Lounge propose d'excellents cocktails au bissap.",
    date: 'Mars 2026',
  },
  {
    id: 'rev5',
    nom: 'Ibrahima N.',
    pays: 'Sénégal',
    note: 4,
    commentaire:
      "Belle découverte du Sine Saloum. L'équipe organise très bien les excursions vers les îles. Rapport qualité-prix correct.",
    date: 'Février 2026',
  },
];
