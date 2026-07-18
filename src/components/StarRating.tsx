// src/components/StarRating.tsx

interface StarRatingProps {
  note: number; // 1 à 5
  className?: string;
}

export function StarRating({ note, className = '' }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${note} sur 5 étoiles`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="w-4 h-4"
          fill={i <= note ? '#B8923E' : 'none'}
          stroke="#B8923E"
          strokeWidth="1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}
