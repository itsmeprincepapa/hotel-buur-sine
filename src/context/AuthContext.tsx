// src/context/AuthContext.tsx
// Context d'authentification du staff (admin/réceptionniste).
// Fournit l'utilisateur connecté et les actions login/logout à toute l'application
// via useAuth(), sans avoir à faire passer ces données de composant en composant (props drilling).
import { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types/auth.types';
import { mockUsers } from '../data/mockUsers';

const STORAGE_KEY = 'buur_sine_user';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // Au premier montage : restaure la session depuis le localStorage si elle existe
  // (évite de devoir se reconnecter à chaque rechargement de page)
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as User);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Simule un appel réseau (délai de 500ms) et vérifie les identifiants
  // contre les utilisateurs mock. Ne stocke jamais le mot de passe dans le state/localStorage.
  const login = async (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const found = mockUsers.find((u) => u.email === email && u.password === password);
        if (found) {
          const { password: _password, ...userWithoutPassword } = found;
          setUser(userWithoutPassword);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Utilisé par la page Profil : met à jour uniquement les champs modifiables (pas id/role)
  const updateUser = (updates: Partial<Omit<User, 'id' | 'role'>>): void => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Valeur exposée à tous les composants enfants via useAuth()
  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
