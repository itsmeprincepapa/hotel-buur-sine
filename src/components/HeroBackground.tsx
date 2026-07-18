// src/components/HeroBackground.tsx
// Illustration SVG originale : coucher de soleil sur la lagune du Sine Saloum,
// silhouettes de mangroves. Palette "nuit sur la lagune" (vert-nuit, laiton, argile).

export function HeroBackground() {
  return (
    <svg
      viewBox="0 0 1200 640"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0E1815" />
          <stop offset="42%" stopColor="#1F332C" />
          <stop offset="72%" stopColor="#8A5A34" />
          <stop offset="100%" stopColor="#C9A24B" />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8A5A34" />
          <stop offset="35%" stopColor="#3B4A3F" />
          <stop offset="100%" stopColor="#0E1815" />
        </linearGradient>
        <radialGradient id="sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDF3DC" />
          <stop offset="55%" stopColor="#C9A24B" />
          <stop offset="100%" stopColor="#C9A24B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="1200" height="400" fill="url(#sky)" />

      <circle cx="600" cy="350" r="150" fill="url(#sun)" />
      <circle cx="600" cy="350" r="58" fill="#FBEBC7" />

      <rect x="0" y="400" width="1200" height="240" fill="url(#water)" />
      <ellipse cx="600" cy="400" rx="72" ry="13" fill="#FBEBC7" opacity="0.45" />
      <ellipse cx="600" cy="440" rx="115" ry="9" fill="#C9A24B" opacity="0.22" />
      <ellipse cx="600" cy="480" rx="155" ry="7" fill="#C9A24B" opacity="0.12" />

      {/* Mangroves gauche */}
      <g opacity="0.92" fill="#0E1815">
        <ellipse cx="85" cy="388" rx="72" ry="27" />
        <ellipse cx="158" cy="398" rx="56" ry="20" />
        <rect x="66" y="348" width="8" height="46" />
        <rect x="128" y="360" width="6" height="40" />
        <rect x="188" y="354" width="7" height="42" />
      </g>

      {/* Mangroves droite */}
      <g opacity="0.92" fill="#0E1815">
        <ellipse cx="1082" cy="392" rx="82" ry="29" />
        <ellipse cx="988" cy="400" rx="50" ry="18" />
        <rect x="998" y="354" width="7" height="46" />
        <rect x="1060" y="344" width="8" height="52" />
        <rect x="1122" y="358" width="6" height="38" />
      </g>

      {/* Pirogue */}
      <g opacity="0.95" fill="#0E1815">
        <path d="M 418 420 Q 460 411 502 420 L 497 429 L 423 429 Z" />
        <rect x="456" y="400" width="3" height="21" />
      </g>
    </svg>
  );
}
