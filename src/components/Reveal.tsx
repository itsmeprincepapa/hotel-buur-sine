// src/components/Reveal.tsx
// Composant wrapper réutilisable : anime en fondu + translation l'apparition de son contenu
// dès qu'il devient visible au scroll, grâce au hook personnalisé useScrollReveal.
import { ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface RevealProps {
  children: ReactNode;
  delay?: number; // en millisecondes, pour décaler plusieurs Reveal entre eux (effet cascade)
  className?: string;
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
