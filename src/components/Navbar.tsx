// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

const liens = [
  { to: '/', label: 'Accueil' },
  { to: '/chambres', label: 'Chambres' },
  { to: '/galerie', label: 'Galerie' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOuvert, setMenuOuvert] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Empêche le scroll de la page derrière le menu plein écran
  useEffect(() => {
    document.body.style.overflow = menuOuvert ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOuvert]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-[#0E1815]/95 backdrop-blur-sm shadow-lg py-3' : 'bg-[#0E1815]/60 py-6'
        }`}
      >
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <Logo light className={`transition-all duration-300 ${scrolled ? 'w-7 h-9' : 'w-9 h-11'}`} />
            <span
              className={`font-display font-semibold text-[#F4EFE3] tracking-wide transition-all duration-300 ${
                scrolled ? 'text-lg' : 'text-2xl'
              }`}
            >
              Buur Sine
            </span>
          </Link>

          {/* Liens desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm text-[#F4EFE3]">
            {liens.map((lien) => (
              <Link key={lien.to} to={lien.to} className="hover:text-[#B8923E] transition-colors">
                {lien.label}
              </Link>
            ))}
            <Link to="/suivi" className="hover:text-[#B8923E] transition-colors">
              Suivre ma réservation
            </Link>
            <Link
              to="/chambres"
              className="border border-[#B8923E] text-[#B8923E] hover:bg-[#B8923E] hover:text-[#0E1815] px-4 py-1.5 rounded-sm text-xs uppercase tracking-widest transition-colors"
            >
              Réserver
            </Link>
          </div>

          {/* Bouton hamburger (mobile) */}
          <button
            onClick={() => setMenuOuvert(true)}
            className="md:hidden text-[#F4EFE3] flex flex-col gap-1.5 w-7"
            aria-label="Ouvrir le menu"
          >
            <span className="block h-0.5 bg-current" />
            <span className="block h-0.5 bg-current" />
            <span className="block h-0.5 bg-current w-4" />
          </button>
        </nav>
      </header>

      {/* Panneau plein écran (mobile) */}
      <div
        className={`fixed inset-0 z-50 bg-[#0E1815] transition-opacity duration-300 md:hidden ${
          menuOuvert ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setMenuOuvert(false)}
            className="text-[#F4EFE3] text-3xl leading-none"
            aria-label="Fermer le menu"
          >
            ×
          </button>
        </div>
        <nav
          className={`flex flex-col items-center gap-8 mt-16 transition-all duration-500 ${
            menuOuvert ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          {liens.map((lien) => (
            <Link
              key={lien.to}
              to={lien.to}
              onClick={() => setMenuOuvert(false)}
              className="font-display text-2xl text-[#F4EFE3] hover:text-[#B8923E] transition-colors"
            >
              {lien.label}
            </Link>
          ))}
          <Link
            to="/suivi"
            onClick={() => setMenuOuvert(false)}
            className="font-display text-2xl text-[#F4EFE3] hover:text-[#B8923E] transition-colors"
          >
            Suivre ma réservation
          </Link>
          <Link
            to="/chambres"
            onClick={() => setMenuOuvert(false)}
            className="mt-4 border border-[#B8923E] text-[#B8923E] px-6 py-2 rounded-sm uppercase tracking-widest text-sm hover:bg-[#B8923E] hover:text-[#0E1815] transition-colors"
          >
            Réserver
          </Link>
        </nav>
      </div>
    </>
  );
}
