// src/types/menu.types.ts

// Catégories affichées dans la modale du menu (restaurant/bar)
export type MenuCategorie = 'Entrées' | 'Plats' | 'Desserts' | 'Boissons' | 'Cocktails';

export interface MenuItem {
  id: string;
  nom: string;
  description: string;
  prix: number; // FCFA
  categorie: MenuCategorie;
}

// Un menu complet, propre à un établissement (Le Thiof ou Le Baobab Lounge)
export interface Menu {
  nomEtablissement: string;
  items: MenuItem[];
}
