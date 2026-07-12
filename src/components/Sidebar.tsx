// src/components/Sidebar.tsx
// Barre de navigation latérale du back-office : liens vers les pages staff,
// mise en évidence de la page active (NavLink), infos de l'utilisateur connecté et déconnexion.
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Logo } from './Logo';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/reservations', label: 'Réservations' },
  { to: '/chambres-staff', label: 'Chambres' },
  { to: '/clients', label: 'Clients' },
  { to: '/profil', label: 'Profil' },
  { to: '/parametres', label: 'Paramètres' },
];

export function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 bg-[#0E1815] text-[#D8CDB4] min-h-screen flex flex-col">
      <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
        <Logo light className="w-8 h-10 shrink-0" />
        <div>
          <p className="font-display text-[#F4EFE3] leading-tight">Buur Sine</p>
          <p className="text-xs text-[#8A9186]">Espace Staff</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {/* Affichage dynamique des liens via map() ; NavLink applique automatiquement
            un style différent sur le lien correspondant à la page actuelle (isActive) */}
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-sm text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#B8923E] text-[#0E1815]'
                  : 'text-[#D8CDB4] hover:bg-white/5'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-white/10">
        <p className="text-sm text-[#F4EFE3]">{user?.prenom} {user?.nom}</p>
        <p className="text-xs text-[#8A9186] mb-3 capitalize">{user?.role}</p>
        <button
          onClick={logout}
          className="text-sm text-[#C97B5F] hover:text-[#F4EFE3] transition-colors"
        >
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
