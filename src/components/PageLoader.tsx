// src/components/PageLoader.tsx
// Affiche un écran de chargement (logo) au tout premier lancement de l'application,
// puis le fait disparaître en fondu après un court délai (useState + useEffect + setTimeout).
import { useState, useEffect } from 'react';
import { Logo } from './Logo';

interface PageLoaderProps {
  children: React.ReactNode;
}

export function PageLoader({ children }: PageLoaderProps) {
  const [chargement, setChargement] = useState<boolean>(true);
  const [masquer, setMasquer] = useState<boolean>(false);

  useEffect(() => {
    // Affiche le loader un court instant, puis le fait disparaître en fondu
    const timerFin = setTimeout(() => setMasquer(true), 900);
    const timerRetrait = setTimeout(() => setChargement(false), 1300);
    return () => {
      clearTimeout(timerFin);
      clearTimeout(timerRetrait);
    };
  }, []);

  return (
    <>
      {chargement && (
        <div
          className={`fixed inset-0 z-[100] bg-[#0E1815] flex items-center justify-center transition-opacity duration-500 ${
            masquer ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <Logo light className="w-16 h-20 animate-pulse" />
        </div>
      )}
      {children}
    </>
  );
}
