// src/data/mockMenuBaobab.ts
// Menu du bar Le Baobab Lounge, affiché dans MenuModal depuis la page d'accueil.
import { Menu } from '../types/menu.types';

export const menuBaobabLounge: Menu = {
  nomEtablissement: 'Le Baobab Lounge',
  items: [
    { id: 'bb1', nom: 'Jus de bissap', description: "Hibiscus infusé, sirop de menthe", prix: 2000, categorie: 'Boissons' },
    { id: 'bb2', nom: 'Jus de bouye', description: "Pulpe de fruit de baobab, lait, vanille", prix: 2500, categorie: 'Boissons' },
    { id: 'bb3', nom: 'Jus de gingembre', description: 'Gingembre frais, citron, miel', prix: 2000, categorie: 'Boissons' },
    { id: 'bb4', nom: 'Café Touba', description: 'Café épicé traditionnel sénégalais', prix: 1500, categorie: 'Boissons' },
    { id: 'bb5', nom: 'Cocktail Baobab Sunset', description: "Rhum, jus de bouye, citron vert, grenadine", prix: 5500, categorie: 'Cocktails' },
    { id: 'bb6', nom: 'Cocktail Lagune', description: 'Vodka, bissap, citron, sirop de menthe', prix: 5500, categorie: 'Cocktails' },
    { id: 'bb7', nom: 'Ditakh Spritz', description: 'Jus de ditakh, vin mousseux, eau gazeuse', prix: 5000, categorie: 'Cocktails' },
    { id: 'bb8', nom: 'Mocktail Sine Saloum', description: 'Gingembre, citron vert, menthe fraîche, sans alcool', prix: 3000, categorie: 'Cocktails' },
  ],
};
