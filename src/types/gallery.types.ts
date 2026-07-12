// src/types/gallery.types.ts

// Catégories utilisées pour filtrer la page Galerie
export type GalleryCategorie = 'Chambres' | 'Restaurant & Bar' | 'Activités' | 'Extérieur';

// Une photo de la galerie, rattachée à une catégorie pour le filtrage
export interface GalleryImage {
  id: string;
  src: string;    // chemin dans public/images
  alt: string;
  categorie: GalleryCategorie;
}
