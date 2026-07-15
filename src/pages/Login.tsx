// src/pages/Login.tsx
// Page de connexion du staff. Utilise le hook useAuth (basé sur AuthContext) pour tenter
// la connexion, avec gestion d'un état de chargement et affichage d'une erreur si échec.
import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoginFormData } from '../types/auth.types';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // désactive le bouton pendant la simulation d'appel réseau

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // async/await car login() simule un appel réseau et retourne une Promise<boolean>
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const success = await login(formData.email, formData.password);
    setLoading(false);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Email ou mot de passe incorrect.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFE7D8] px-4">
      <div className="w-full max-w-md bg-white border border-[#EADFC5] p-8">
        <div className="text-center mb-8">
          <h1 className="font-display text-2xl text-[#201C18]">Hôtel Buur Sine</h1>
          <p className="text-[#8A9186] mt-1 text-sm">Espace Staff — Connexion</p>
        </div>

        {/* Rendu conditionnel : le message d'erreur n'apparaît que s'il y en a une */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email" name="email" type="email" value={formData.email} onChange={handleChange} required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8923E]"
              placeholder="admin@buursine.sn"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input
              id="password" name="password" type="password" value={formData.password} onChange={handleChange} required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8923E]"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full bg-[#8A5A34] hover:bg-[#6b4527] disabled:opacity-60 text-white font-medium rounded-lg py-2 transition-colors"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-6">
          Compte de test : admin@buursine.sn / admin123
        </p>
      </div>
    </div>
  );
}
