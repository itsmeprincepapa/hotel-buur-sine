// src/components/BolongDivider.tsx
// Élément signature du site : une ligne sinueuse évoquant un bolong (chenal de
// mangrove) vu du ciel. Réutilisée entre les sections pour créer une identité
// visuelle reconnaissable, propre à Buur Sine.

interface BolongDividerProps {
  flip?: boolean;
  className?: string;
}

export function BolongDivider({ flip = false, className = '' }: BolongDividerProps) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className={`w-full h-10 ${flip ? 'rotate-180' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 30 C 150 5, 300 55, 450 30 S 750 5, 900 30 S 1100 55, 1200 30"
          fill="none"
          stroke="#B8923E"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M0 40 C 150 15, 300 65, 450 40 S 750 15, 900 40 S 1100 65, 1200 40"
          fill="none"
          stroke="#B8923E"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}
