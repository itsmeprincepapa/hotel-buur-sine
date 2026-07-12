// src/types/auth.types.ts

// Rôle attribué à un membre du staff : conditionne l'accès à certaines pages (voir ProtectedRoute)
export type UserRole = 'admin' | 'receptionniste';

// Représente un utilisateur connecté (staff de l'hôtel, pas un client public)
export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: UserRole;
}

// Forme des données/fonctions exposées par AuthContext à toute l'application
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<Omit<User, 'id' | 'role'>>) => void; // on ne peut pas changer son propre id/role depuis le profil
}

// Champs du formulaire de connexion (page Login)
export interface LoginFormData {
  email: string;
  password: string;
}
