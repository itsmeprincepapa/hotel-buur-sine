// src/pages/Profile.tsx
// Page de modification des informations du compte staff connecté (nom, prénom, email),
// via updateUser() fourni par useAuth. Un message de confirmation s'affiche après sauvegarde.
import { useState, FormEvent, ChangeEvent } from 'react';
import { useAuth } from '../hooks/useAuth';

export function Profile() {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    nom: user?.nom ?? '',
    prenom: user?.prenom ?? '',
    email: user?.email ?? '',
  });
  const [enregistre, setEnregistre] = useState<boolean>(false); // affiche le message de succès

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setEnregistre(false); // masque le message de succès dès qu'on retouche un champ
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    updateUser(formData);
    setEnregistre(true);
  };

  // Rendu conditionnel : évite d'afficher la page si l'utilisateur n'est (étrangement) pas chargé
  if (!user) return null;

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Mon profil</h1>
      <p className="text-gray-500 mb-6">Informations de votre compte staff</p>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-[#8A5A34] text-white flex items-center justify-center text-xl font-bold">
            {user.prenom[0]}{user.nom[0]}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{user.prenom} {user.nom}</p>
            <p className="text-sm text-gray-400 capitalize">{user.role}</p>
          </div>
        </div>

        {/* Rendu conditionnel : message affiché uniquement juste après un enregistrement réussi */}
        {enregistre && (
          <div className="mb-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2">
            Profil mis à jour avec succès.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input
                name="prenom" type="text" required value={formData.prenom} onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8923E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                name="nom" type="text" required value={formData.nom} onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8923E]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email" type="email" required value={formData.email} onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8923E]"
            />
          </div>

          <button
            type="submit"
            className="bg-[#8A5A34] hover:bg-[#6b4527] text-white font-medium px-5 py-2 rounded-lg transition-colors mt-2"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  );
}
