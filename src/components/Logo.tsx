// src/components/Logo.tsx

interface LogoProps {
  light?: boolean; // true = trait blanc (sur fond sombre/hero), false = trait foncé
  className?: string;
}

export function Logo({ light = true, className = '' }: LogoProps) {
  const stroke = light ? '#F4EFE3' : '#16231F';
  return (
    <svg viewBox="0 0 80 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="50" rx="34" ry="44" fill="none" stroke={stroke} strokeWidth="1.5" />
      <text
        x="40"
        y="60"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontSize="34"
        fill={stroke}
      >
        BS
      </text>
    </svg>
  );
}
