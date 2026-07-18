// src/components/GoogleMap.tsx

interface GoogleMapProps {
  query?: string;
  className?: string;
  title?: string;
}

// Utilise l'embed public de Google Maps (sans clé API nécessaire).
export function GoogleMap({
  query = 'Delta du Sine Saloum, Fatick, Sénégal',
  className = 'w-full h-64',
  title = 'Localisation Hôtel Buur Sine',
}: GoogleMapProps) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

  return (
    <iframe
      title={title}
      src={src}
      className={`${className} border-0`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
