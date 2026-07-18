// src/components/HeroCarousel.tsx
// Carrousel plein écran pour le hero (style Terrou-Bi) : plusieurs photos
// défilent automatiquement en fondu, avec indicateurs cliquables.

import { useEffect, useState } from 'react';

interface HeroCarouselProps {
  images: string[];
  intervalMs?: number;
}

export function HeroCarousel({ images, intervalMs = 5000 }: HeroCarouselProps) {
  const [index, setIndex] = useState(0); // index de l'image actuellement affichée

  // Change automatiquement d'image toutes les `intervalMs` millisecondes (setInterval)
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length); // boucle : revient à 0 après la dernière image
    }, intervalMs);
    return () => clearInterval(timer); // nettoyage à chaque changement d'images/intervalle
  }, [images.length, intervalMs]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Indicateurs */}
      {images.length > 1 && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-[#C9A24B]' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
