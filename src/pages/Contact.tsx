// src/pages/Contact.tsx
// Page publique de contact : formulaire avec validation manuelle des champs (fonction validate),
// simulation d'envoi (aucun vrai backend), coordonnées et carte Google Maps.
import { useState, FormEvent, ChangeEvent } from 'react';
import { ContactFormData } from '../types/contact.types';
import { GoogleMap } from '../components/GoogleMap';
import { MailIcon, PhoneIcon, LocationIcon } from '../components/SocialIcons';

export function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    nom: '', email: '', sujet: '', message: '',
  });
  const [erreurs, setErreurs] = useState<Partial<ContactFormData>>({}); // un message d'erreur par champ, si besoin
  const [envoye, setEnvoye] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Valide chaque champ requis et le format de l'email ; renseigne `erreurs` et renvoie
  // true seulement si tous les champs sont valides (aucune erreur trouvée)
  const validate = (): boolean => {
    const nouvellesErreurs: Partial<ContactFormData> = {};

    if (!formData.nom.trim()) nouvellesErreurs.nom = 'Le nom est requis.';
    if (!formData.email.trim()) {
      nouvellesErreurs.email = "L'email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nouvellesErreurs.email = 'Format email invalide.';
    }
    if (!formData.sujet.trim()) nouvellesErreurs.sujet = 'Le sujet est requis.';
    if (!formData.message.trim()) nouvellesErreurs.message = 'Le message est requis.';

    setErreurs(nouvellesErreurs);
    return Object.keys(nouvellesErreurs).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validate()) {
      setEnvoye(true);
      setFormData({ nom: '', email: '', sujet: '', message: '' });
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Contactez-nous</h1>
      <p className="text-gray-500 mb-8">Une question sur votre séjour au Buur Sine ? Écrivez-nous.</p>

      {/* Rendu conditionnel : message de succès affiché seulement après envoi validé */}
      {envoye && (
        <div className="mb-6 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3">
          Votre message a bien été envoyé, nous vous répondrons rapidement.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4 bg-white rounded-2xl shadow-sm p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
          <input
            name="nom" type="text" value={formData.nom} onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8923E]"
          />
          {erreurs.nom && <p className="text-xs text-red-500 mt-1">{erreurs.nom}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            name="email" type="email" value={formData.email} onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8923E]"
          />
          {erreurs.email && <p className="text-xs text-red-500 mt-1">{erreurs.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
          <input
            name="sujet" type="text" value={formData.sujet} onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8923E]"
          />
          {erreurs.sujet && <p className="text-xs text-red-500 mt-1">{erreurs.sujet}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            name="message" rows={4} value={formData.message} onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8923E]"
          />
          {erreurs.message && <p className="text-xs text-red-500 mt-1">{erreurs.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-[#8A5A34] hover:bg-[#6b4527] text-white font-medium rounded-lg py-2.5 transition-colors"
        >
          Envoyer le message
        </button>
      </form>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600 mb-6">
        <div className="flex items-start gap-2">
          <LocationIcon className="w-4 h-4 mt-0.5 shrink-0 text-[#8A5A34]" />
          <span>Delta du Sine Saloum, Fatick, Sénégal</span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-4 h-4 shrink-0 text-[#8A5A34]" />
          <a href="tel:+221771234567" className="hover:text-[#8A5A34] transition-colors">+221 77 123 45 67</a>
        </div>
        <div className="flex items-center gap-2">
          <MailIcon className="w-4 h-4 shrink-0 text-[#8A5A34]" />
          <a href="mailto:contact@hotelbuursine.sn" className="hover:text-[#8A5A34] transition-colors">contact@hotelbuursine.sn</a>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden shadow-sm">
        <GoogleMap className="w-full h-80" />
      </div>
    </div>
  );
}
