// src/context/AuthContext.tsx
// Context d'authentification du staff (admin/réceptionniste).
// Fournit l'utilisateur connecté et les actions login/logout à toute l'application
// via useAuth(). Appelle désormais l'API backend (JWT) au lieu des utilisateurs mock.
import { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types/auth.types';
import { apiFetch, ApiError, getToken, setToken, clearToken } from '../services/apiClient';

const USER_STORAGE_KEY = 'buur_sine_user';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // Au premier montage : si un token existe, vérifie qu'il est toujours valide
  // auprès de l'API (GET /auth/me) avant de restaurer la session.
  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as User);
      } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }

    // Vérification en arrière-plan : si le token a expiré, on déconnecte proprement.
    apiFetch<User>('/auth/me')
      .then((freshUser) => {
        setUser(freshUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(freshUser));
      })
      .catch(() => {
        clearToken();
        localStorage.removeItem(USER_STORAGE_KEY);
        setUser(null);
      });
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { token, user: loggedInUser } = await apiFetch<{ token: string; user: User }>(
        '/auth/login',
        { method: 'POST', body: { email, password }, auth: false }
      );
      setToken(token);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      return true;
    } catch (err) {
      if (err instanceof ApiError) return false;
      return false;
    }
  };

  const logout = (): void => {
    clearToken();
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  };

  // Utilisé par la page Profil : met à jour uniquement les champs modifiables (pas id/role)
  const updateUser = (updates: Partial<Omit<User, 'id' | 'role'>>): void => {
    apiFetch<User>('/auth/profile', { method: 'PUT', body: updates })
      .then((updated) => {
        setUser(updated);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
      })
      .catch(() => {
        // En cas d'échec réseau, on ne modifie pas l'état local pour éviter une désynchronisation
      });
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
