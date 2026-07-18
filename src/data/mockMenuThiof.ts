// src/data/mockMenuThiof.ts
// Menu du restaurant Le Thiof, affiché dans MenuModal depuis la page d'accueil.
import { Menu } from '../types/menu.types';

export const menuThiof: Menu = {
  nomEtablissement: 'Le Thiof',
  items: [
    { id: 'th1', nom: 'Accras de poisson', description: 'Beignets épicés à la morue, sauce pimentée', prix: 3500, categorie: 'Entrées' },
    { id: 'th2', nom: 'Salade de mangue verte', description: "Mangue verte, oignons, piment, citron vert", prix: 3000, categorie: 'Entrées' },
    { id: 'th3', nom: 'Thiof grillé', description: "Mérou grillé, riz brisé, légumes du jardin", prix: 12000, categorie: 'Plats' },
    { id: 'th4', nom: 'Ceebu Jën', description: 'Riz au poisson traditionnel, légumes mijotés', prix: 9500, categorie: 'Plats' },
    { id: 'th5', nom: 'Huîtres de palétuviers grillées', description: "Spécialité du Sine Saloum, beurre à l'ail", prix: 8000, categorie: 'Plats' },
    { id: 'th6', nom: 'Poulet Yassa', description: 'Poulet mariné aux oignons et citron, riz blanc', prix: 9000, categorie: 'Plats' },
    { id: 'th7', nom: 'Thiakry', description: 'Dessert au mil et lait caillé, parfum vanille', prix: 2500, categorie: 'Desserts' },
    { id: 'th8', nom: 'Beignets de banane', description: 'Beignets croustillants, sucre et cannelle', prix: 2500, categorie: 'Desserts' },
  ],
};
