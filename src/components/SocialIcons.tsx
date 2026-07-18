// src/components/SocialIcons.tsx
// Icônes SVG simples (traits fins) pour réseaux sociaux et contact,
// dans le style épuré "nuit sur la lagune" du site.

interface IconProps {
  className?: string;
}

export function InstagramIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 9h2.5V6H14c-1.93 0-3.5 1.57-3.5 3.5V11H8v3h2.5v6h3v-6H16l.5-3h-3V9.5c0-.28.22-.5.5-.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TiktokIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 4v10.2a2.6 2.6 0 1 1-2-2.53"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 4c0 2.2 1.8 4 4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SnapchatIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 4c2.5 0 4 1.8 3.9 4.2l-.1 2.1c1 .2 1.6.6 1.6 1s-.7.8-1.7 1c.2.6.7 1.2 1.5 1.6.2.1.1.5-.2.6-.5.2-.9.3-1.2.5-.1.3-.2.7-.4.9-.2.3-1.1.1-1.8.3-.6.2-1 .8-2 .8s-1.5-.6-2-.8c-.7-.2-1.6 0-1.8-.3-.2-.2-.3-.6-.4-.9-.3-.2-.7-.3-1.2-.5-.3-.1-.4-.5-.2-.6.8-.4 1.3-1 1.5-1.6-1-.2-1.7-.6-1.7-1s.6-.8 1.6-1L8.1 8.2C8 5.8 9.5 4 12 4Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m3.5 6 8.5 6.5L20.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.5 3.5c1 0 1.9.7 2.2 1.7l.6 1.9c.2.7 0 1.5-.5 2l-1 1c.9 2 2.5 3.6 4.5 4.5l1-1c.5-.5 1.3-.7 2-.5l1.9.6c1 .3 1.7 1.2 1.7 2.2v1.6c0 1.4-1.2 2.5-2.6 2.3-6-.7-10.8-5.5-11.5-11.5C4.7 6.7 5.1 3.5 6.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LocationIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 21s7-6.1 7-11.5C19 5.9 15.9 3 12 3S5 5.9 5 9.5C5 14.9 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
