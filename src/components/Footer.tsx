// src/components/Footer.tsx
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { GoogleMap } from './GoogleMap';
import {
  InstagramIcon,
  FacebookIcon,
  TiktokIcon,
  SnapchatIcon,
  MailIcon,
  PhoneIcon,
  LocationIcon,
} from './SocialIcons';

const reseaux = [
  { label: 'Instagram', href: 'https://instagram.com/hotelbuursine', Icon: InstagramIcon },
  { label: 'Facebook', href: 'https://facebook.com/hotelbuursine', Icon: FacebookIcon },
  { label: 'TikTok', href: 'https://tiktok.com/@hotelbuursine', Icon: TiktokIcon },
  { label: 'Snapchat', href: 'https://snapchat.com/add/hotelbuursine', Icon: SnapchatIcon },
];

export function Footer() {
  return (
    <footer className="bg-[#0E1815] text-[#B9C0B7] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + description */}
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <Logo light className="w-9 h-11" />
            <span className="font-display text-xl text-[#F4EFE3]">Buur Sine</span>
          </Link>
          <p className="text-sm leading-relaxed max-w-sm">
            Les pieds dans l'eau, au cœur des mangroves du Sine Saloum. Hôtel Buur Sine
            vous accueille dans un cadre naturel exceptionnel, entre lagune, bolongs
            et hospitalité sénégalaise.
          </p>
          <div className="flex items-center gap-4 mt-6">
            {reseaux.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-[#3A463F] text-[#F4EFE3] hover:bg-[#B8923E] hover:border-[#B8923E] hover:text-[#0E1815] transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="uppercase tracking-[0.25em] text-xs text-[#B8923E] mb-4">Contact</p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <LocationIcon className="w-4 h-4 mt-0.5 shrink-0 text-[#B8923E]" />
              <span>Delta du Sine Saloum, Fatick, Sénégal</span>
            </li>
            <li className="flex items-center gap-3">
              <PhoneIcon className="w-4 h-4 shrink-0 text-[#B8923E]" />
              <a href="tel:+221771234567" className="hover:text-[#F4EFE3] transition-colors">
                +221 77 123 45 67
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MailIcon className="w-4 h-4 shrink-0 text-[#B8923E]" />
              <a href="mailto:contact@hotelbuursine.sn" className="hover:text-[#F4EFE3] transition-colors">
                contact@hotelbuursine.sn
              </a>
            </li>
          </ul>
          <div className="mt-5 overflow-hidden border border-[#3A463F] grayscale hover:grayscale-0 transition-all">
            <GoogleMap className="w-full h-32" />
          </div>
        </div>

        {/* Liens utiles */}
        <div>
          <p className="uppercase tracking-[0.25em] text-xs text-[#B8923E] mb-4">Liens utiles</p>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-[#F4EFE3] transition-colors">Accueil</Link></li>
            <li><Link to="/chambres" className="hover:text-[#F4EFE3] transition-colors">Chambres</Link></li>
            <li><Link to="/galerie" className="hover:text-[#F4EFE3] transition-colors">Galerie</Link></li>
            <li><Link to="/faq" className="hover:text-[#F4EFE3] transition-colors">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-[#F4EFE3] transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#20291F]">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-[#7C857D]">
          <p>&copy; {new Date().getFullYear()} Hôtel Buur Sine — Delta du Sine Saloum, Sénégal</p>
          <p>Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}
