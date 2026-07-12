// src/types/review.types.ts

// Un avis client affiché sur la page d'accueil (données mock, pas de vrai système d'avis)
export interface Review {
  id: string;
  nom: string;
  pays?: string;
  note: number; // note sur 5, utilisée par StarRating
  commentaire: string;
  date: string; // ex: "Juin 2026"
}
