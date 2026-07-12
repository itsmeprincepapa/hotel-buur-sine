// src/components/ProtectedRoute.tsx
// Bloque l'accès aux pages du back-office (Dashboard, Clients...) si personne n'est connecté.
// Redirige vers /login à la place d'afficher le contenu protégé.
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  // Rendu conditionnel : redirection si non connecté, sinon affichage normal du contenu
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
