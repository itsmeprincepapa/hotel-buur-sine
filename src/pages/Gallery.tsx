// src/pages/Gallery.tsx
import { useMemo, useState } from 'react';
import { mockGallery } from '../data/mockGallery';
import { GalleryCategorie } from '../types/gallery.types';
import { Reveal } from '../components/Reveal';

const categories: (GalleryCategorie | 'Toutes')[] = ['Toutes', 'Chambres', 'Restaurant & Bar', 'Activités', 'Extérieur'];

export function Gallery() {
  const [filtre, setFiltre] = useState<GalleryCategorie | 'Toutes'>('Toutes');
  const [imageOuverte, setImageOuverte] = useState<string | null>(null);

  const imagesFiltrees = useMemo(() => {
    if (filtre === 'Toutes') return mockGallery;
    return mockGallery.filter((img) => img.categorie === filtre);
  }, [filtre]);

  return (
    <div className="bg-[#FBF8F1] min-h-screen">
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-10 text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-[#B8923E] mb-2">En images</p>
        <h1 className="font-display text-4xl text-[#201C18] mb-3">Notre galerie</h1>
        <p className="text-[#5C5348] max-w-xl mx-auto">
          Chambres, restaurant, activités et lagune : un aperçu de votre séjour à Buur Sine.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFiltre(cat)}
            className={`px-4 py-2 rounded-sm text-xs uppercase tracking-widest transition-colors border ${
              filtre === cat
                ? 'bg-[#0E1815] text-[#F4EFE3] border-[#0E1815]'
                : 'border-[#EADFC5] text-[#5C5348] hover:border-[#B8923E]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {imagesFiltrees.map((img, i) => (
            <Reveal key={img.id} delay={(i % 6) * 60}>
              <button
                onClick={() => setImageOuverte(img.src)}
                className="block w-full break-inside-avoid overflow-hidden"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </button>
            </Reveal>
          ))}
        </div>

        {imagesFiltrees.length === 0 && (
          <p className="text-center text-[#B0A98F] mt-10">Aucune photo dans cette catégorie pour le moment.</p>
        )}
      </section>

      {/* Visionneuse plein écran */}
      {imageOuverte && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center px-4"
          onClick={() => setImageOuverte(null)}
        >
          <button
            onClick={() => setImageOuverte(null)}
            className="absolute top-6 right-6 text-white text-3xl leading-none"
            aria-label="Fermer"
          >
            ×
          </button>
          <img
            src={imageOuverte}
            alt=""
            className="max-w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
