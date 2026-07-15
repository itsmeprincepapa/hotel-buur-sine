// src/data/mockGallery.ts
import { GalleryImage } from '../types/gallery.types';

export const mockGallery: GalleryImage[] = [
  // Chambres
  { id: 'g1', src: '/images/hero-chambre-mer.jpg', alt: 'Chambre vue sur la lagune', categorie: 'Chambres' },
  { id: 'g2', src: '/images/chambre-standard-1.jpg', alt: 'Chambre standard', categorie: 'Chambres' },
  { id: 'g3', src: '/images/chambre-standard-2.jpg', alt: 'Chambre standard, vue jardin', categorie: 'Chambres' },
  { id: 'g4', src: '/images/chambre-confort-1.jpg', alt: 'Chambre confort avec terrasse', categorie: 'Chambres' },
  { id: 'g5', src: '/images/chambre-confort-2.jpg', alt: 'Chambre confort', categorie: 'Chambres' },
  { id: 'g6', src: '/images/suite-1.jpg', alt: 'Suite', categorie: 'Chambres' },
  { id: 'g7', src: '/images/suite-lagune-1.jpg', alt: 'Suite vue lagune', categorie: 'Chambres' },
  { id: 'g8', src: '/images/suite-lagune-2.jpg', alt: 'Suite vue lagune, salon', categorie: 'Chambres' },

  // Restaurant & Bar
  { id: 'g9', src: '/images/experiences/restaurant.jpg', alt: 'Le Thiof, notre restaurant', categorie: 'Restaurant & Bar' },
  { id: 'g10', src: '/images/experiences/bar.jpg', alt: 'Le Baobab Lounge, notre bar', categorie: 'Restaurant & Bar' },

  // Activités
  { id: 'g11', src: '/images/experiences/piscine.jpg', alt: 'Piscine à débordement', categorie: 'Activités' },
  { id: 'g12', src: '/images/experiences/pirogue.jpg', alt: 'Excursion en pirogue', categorie: 'Activités' },
  { id: 'g13', src: '/images/experiences/iles.jpg', alt: 'Visite des îles du Sine Saloum', categorie: 'Activités' },
  { id: 'g14', src: '/images/experiences/oiseaux.jpg', alt: 'Observation ornithologique', categorie: 'Activités' },
  { id: 'g15', src: '/images/experiences/peche.jpg', alt: 'Pêche traditionnelle', categorie: 'Activités' },
  { id: 'g16', src: '/images/experiences/spa.jpg', alt: 'Spa', categorie: 'Activités' },
  { id: 'g17', src: '/images/experiences/sport.jpg', alt: 'Salle de sport', categorie: 'Activités' },

  // Extérieur
  { id: 'g18', src: '/images/experiences/coucher-soleil.jpg', alt: 'Coucher de soleil au ponton', categorie: 'Extérieur' },
  { id: 'g19', src: '/images/hero-piscine.jpg', alt: "Vue d'ensemble de la piscine", categorie: 'Extérieur' },
  { id: 'g20', src: '/images/hero-lounge.jpg', alt: 'Le lounge extérieur', categorie: 'Extérieur' },
];
