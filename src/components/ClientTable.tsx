// src/components/ClientTable.tsx
// Tableau listant les clients (back-office), avec actions Modifier/Supprimer par ligne.
// Les callbacks onEdit/onDelete remontent l'action au composant parent (page Clients.tsx)
// qui gère l'ouverture du formulaire ou la confirmation de suppression.
import { Client } from '../types/client.types';

interface ClientTableProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

export function ClientTable({ clients, onEdit, onDelete }: ClientTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 text-left">
          <tr>
            <th className="px-4 py-3">Nom</th>
            <th className="px-4 py-3">Téléphone</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Séjours</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Une ligne de tableau générée dynamiquement par client, via map() */}
          {clients.map((client) => (
            <tr key={client.id} className="border-t border-gray-100">
              <td className="px-4 py-3 font-medium text-gray-800">
                {client.prenom} {client.nom}
              </td>
              <td className="px-4 py-3 text-gray-600">{client.telephone}</td>
              <td className="px-4 py-3 text-gray-600">{client.email}</td>
              <td className="px-4 py-3 text-gray-600">{client.historique.length}</td>
              <td className="px-4 py-3 space-x-2">
                <button
                  onClick={() => onEdit(client)}
                  className="text-xs bg-[#8A5A34] hover:bg-[#6b4527] text-white px-3 py-1.5 rounded-lg transition-colors"
                >
                  Modifier
                </button>
                <button
                  onClick={() => onDelete(client)}
                  className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Rendu conditionnel : message affiché uniquement si la recherche/filtrage ne retourne rien */}
      {clients.length === 0 && (
        <p className="text-center text-gray-400 py-10">Aucun client trouvé.</p>
      )}
    </div>
  );
}
