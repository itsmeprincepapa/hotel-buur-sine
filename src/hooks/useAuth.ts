// src/hooks/useAuth.ts
// Hook personnalisé : raccourci pour lire le AuthContext depuis n'importe quel composant.
// Évite de réécrire useContext(AuthContext) partout et sécurise l'usage hors provider.
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AuthContextType } from '../types/auth.types';

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
  }
  return context;
}
