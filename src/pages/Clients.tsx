// src/pages/Clients.tsx
// Page CRUD complète des fiches clients (back-office) : Consulter (tableau + recherche),
// Ajouter, Modifier (même formulaire, pré-rempli) et Supprimer (avec règle métier de blocage).
import { useState, useMemo, ChangeEvent } from 'react';
import { useClients } from '../hooks/useClients';
import { useReservations } from '../hooks/useReservations';
import { ClientTable } from '../components/ClientTable';
import { ClientForm } from '../components/ClientForm';
import { Client } from '../types/client.types';

export function Clients() {
  const { clients, addClient, updateClient, deleteClient } = useClients();
  const { reservations } = useReservations();

  const [recherche, setRecherche] = useState<string>('');
  const [formulaireOuvert, setFormulaireOuvert] = useState<boolean>(false);
  const [clientAModifier, setClientAModifier] = useState<Client | null>(null); // null = mode ajout
  const [erreurSuppression, setErreurSuppression] = useState<string>('');

  const handleRechercheChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setRecherche(e.target.value);
  };

  // useMemo : le filtrage n'est recalculé que si la liste de clients ou le terme de recherche changent
  const clientsFiltres = useMemo(() => {
    const terme = recherche.trim().toLowerCase();
    if (!terme) return clients;
    return clients.filter((c) =>
      `${c.prenom} ${c.nom}`.toLowerCase().includes(terme) || c.telephone.includes(terme)
    );
  }, [clients, recherche]);

  const ouvrirAjout = (): void => {
    setClientAModifier(null);
    setFormulaireOuvert(true);
  };

  const ouvrirModification = (client: Client): void => {
    setClientAModifier(client);
    setFormulaireOuvert(true);
  };

  // Un même formulaire/handler sert à la fois l'ajout et la modification
  const handleSubmit = (data: { nom: string; prenom: string; telephone: string; email: string }): void => {
    if (clientAModifier) {
      updateClient(clientAModifier.id, data);
    } else {
      addClient(data);
    }
    setFormulaireOuvert(false);
  };

  // Un client ne peut être supprimé s'il a une réservation confirmée ou en cours
  const aUneReservationActive = (clientId: string): boolean => {
    return reservations.some(
      (r) => r.clientId === clientId && (r.statut === 'confirmee' || r.statut === 'en_cours')
    );
  };

  const handleDelete = (client: Client): void => {
    if (aUneReservationActive(client.id)) {
      setErreurSuppression(
        `Impossible de supprimer ${client.prenom} ${client.nom} : ce client a une réservation active.`
      );
      setTimeout(() => setErreurSuppression(''), 4000); // le message disparaît tout seul après 4s
      return;
    }
    deleteClient(client.id);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Clients</h1>
          <p className="text-gray-500">Fiches clients de l'Hôtel Buur Sine</p>
        </div>
        <button
          onClick={ouvrirAjout}
          className="bg-[#8A5A34] hover:bg-[#6b4527] text-white font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Ajouter un client
        </button>
      </div>

      {erreurSuppression && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2">
          {erreurSuppression}
        </div>
      )}

      <input
        type="text"
        value={recherche}
        onChange={handleRechercheChange}
        placeholder="Rechercher par nom ou téléphone..."
        className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-2 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-[#B8923E]"
      />

      <ClientTable clients={clientsFiltres} onEdit={ouvrirModification} onDelete={handleDelete} />

      {/* Rendu conditionnel : la modale (ajout/modif) ne s'affiche que si formulaireOuvert est vrai */}
      {formulaireOuvert && (
        <ClientForm
          clientAModifier={clientAModifier}
          onSubmit={handleSubmit}
          onClose={() => setFormulaireOuvert(false)}
        />
      )}
    </div>
  );
}
