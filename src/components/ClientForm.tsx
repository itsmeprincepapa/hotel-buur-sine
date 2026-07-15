// src/components/ClientForm.tsx
// Formulaire d'ajout/modification d'un client (back-office). Le même formulaire sert
// aux deux cas : si clientAModifier est fourni, les champs sont pré-remplis (mode modification).
import { useState, FormEvent, ChangeEvent } from 'react';
import { Client } from '../types/client.types';

interface ClientFormProps {
  clientAModifier: Client | null; // null = mode ajout, sinon mode modification
  onSubmit: (data: { nom: string; prenom: string; telephone: string; email: string }) => void;
  onClose: () => void;
}

export function ClientForm({ clientAModifier, onSubmit, onClose }: ClientFormProps) {
  // Initialisation du state à partir du client à modifier (s'il existe), sinon champs vides
  const [formData, setFormData] = useState({
    nom: clientAModifier?.nom ?? '',
    prenom: clientAModifier?.prenom ?? '',
    telephone: clientAModifier?.telephone ?? '',
    email: clientAModifier?.email ?? '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {/* Rendu conditionnel du titre selon le mode (ajout ou modification) */}
            {clientAModifier ? 'Modifier le client' : 'Ajouter un client'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
        </div>

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
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              name="telephone" type="tel" required value={formData.telephone} onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8923E]"
            />
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
            className="w-full bg-[#8A5A34] hover:bg-[#6b4527] text-white font-medium rounded-lg py-2.5 mt-2 transition-colors"
          >
            {clientAModifier ? 'Enregistrer les modifications' : 'Ajouter le client'}
          </button>
        </form>
      </div>
    </div>
  );
}
