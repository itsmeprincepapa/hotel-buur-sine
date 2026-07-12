// src/hooks/useScrollReveal.ts
// Hook personnalisé utilisant l'API IntersectionObserver du navigateur pour détecter
// quand un élément entre dans la zone visible de l'écran, afin de déclencher une
// animation d'apparition au scroll (voir le composant Reveal).
import { useEffect, useRef, useState } from 'react';

export function useScrollReveal<T extends HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null); // référence vers l'élément DOM à observer
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // l'animation ne se joue qu'une seule fois
        }
      },
      { threshold: 0.15 } // se déclenche dès que 15% de l'élément est visible
    );

    observer.observe(element);
    return () => observer.disconnect(); // nettoyage si le composant est démonté avant
  }, []);

  return [ref, visible];
}
