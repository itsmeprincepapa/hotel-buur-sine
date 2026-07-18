// src/pages/Home.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRooms } from '../hooks/useRooms';
import { ExperienceCard } from '../components/ExperienceCard';
import { HeroCarousel } from '../components/HeroCarousel';
import { MenuModal } from '../components/MenuModal';
import { BolongDivider } from '../components/BolongDivider';
import { Reveal } from '../components/Reveal';
import { ReviewCard } from '../components/ReviewCard';
import { StarRating } from '../components/StarRating';
import { mockReviews } from '../data/mockReviews';
import { menuThiof } from '../data/mockMenuThiof';
import { menuBaobabLounge } from '../data/mockMenuBaobab';
import { Menu } from '../types/menu.types';

const experiences = [
  { image: '/images/experiences/piscine.jpg', titre: 'Piscine à débordement', description: "Face à la lagune, pour un moment de détente les pieds dans l'eau." },
  { image: '/images/experiences/pirogue.jpg', titre: 'Excursion en pirogue', description: 'Explorez les bolongs et mangroves avec un piroguier local.' },
  { image: '/images/experiences/iles.jpg', titre: 'Visite des îles', description: 'Mar Lodj, Simal, Dionewar... le Sine Saloum à portée de pirogue.' },
  { image: '/images/experiences/oiseaux.jpg', titre: 'Observation ornithologique', description: 'Une biodiversité exceptionnelle, classée UNESCO.' },
  { image: '/images/experiences/peche.jpg', titre: 'Pêche traditionnelle', description: "Accompagné d'un piroguier, au fil de l'eau." },
  { image: '/images/experiences/coucher-soleil.jpg', titre: 'Coucher de soleil au ponton', description: "Un ponton privé pour admirer la lagune s'endormir." },
  { image: '/images/experiences/spa.jpg', titre: 'Spa', description: 'Soins et massages inspirés des traditions locales, face à la lagune.' },
  { image: '/images/experiences/sport.jpg', titre: 'Salle de sport', description: 'Un espace fitness équipé, ouvert toute la journée.' },
];

const heroImages = [
  '/images/hero-piscine.jpg',
  '/images/hero-lounge.jpg',
  '/images/hero-chambre-mer.jpg',
];

export function Home() {
  const { rooms } = useRooms();
  const apercuChambres = rooms.slice(0, 3);
  const [menuOuvert, setMenuOuvert] = useState<Menu | null>(null);
  const noteMoyenne = mockReviews.reduce((total, r) => total + r.note, 0) / mockReviews.length;

  return (
    <div>
      {/* Hero — remonte sous la navbar fixe transparente */}
      <section className="relative -mt-20 pt-20 bg-[#0E1815] text-[#F4EFE3] overflow-hidden">
        <HeroCarousel images={heroImages} />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative max-w-6xl mx-auto px-4 py-32 text-center">
          <p className="uppercase tracking-[0.35em] text-xs text-[#C9A24B] mb-5">Delta du Sine Saloum</p>
          <h1 className="font-display text-5xl md:text-7xl font-semibold mb-5 drop-shadow-sm">Hôtel Buur Sine</h1>
          <p className="text-lg md:text-xl text-[#E7DEC9] max-w-2xl mx-auto mb-10 font-light">
            Les pieds dans l'eau, au cœur des mangroves. L'hospitalité sénégalaise
            dans un cadre naturel exceptionnel.
          </p>
          <Link
            to="/chambres"
            className="inline-block border border-[#B8923E] text-[#B8923E] hover:bg-[#B8923E] hover:text-[#0E1815] font-medium px-8 py-3 rounded-sm uppercase tracking-widest text-sm transition-colors"
          >
            Découvrir nos chambres
          </Link>
        </div>
        <BolongDivider className="absolute bottom-0 left-0" />
      </section>

      {/* Aperçu des chambres */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="uppercase tracking-[0.3em] text-xs text-[#B8923E] mb-2">Hébergement</p>
              <h2 className="font-display text-3xl text-[#201C18]">Nos chambres</h2>
            </div>
            <Link to="/chambres" className="text-[#8A5A34] hover:text-[#B8923E] text-sm font-medium transition-colors">
              Voir toutes les chambres →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {apercuChambres.map((room) => (
              <div
                key={room.id}
                className="bg-white border border-[#EADFC5] overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img src={room.image} alt={room.type} className="w-full h-44 object-cover" />
                <div className="p-5">
                  <p className="font-display text-lg text-[#201C18]">{room.type}</p>
                  <p className="text-sm text-[#8A5A34]">{room.prix.toLocaleString('fr-FR')} FCFA / nuit</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Expériences */}
      <Reveal>
        <section className="bg-[#EFE7D8] py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="uppercase tracking-[0.3em] text-xs text-[#B8923E] mb-2">Art de vivre</p>
              <h2 className="font-display text-3xl text-[#201C18]">Nos expériences</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.map((exp, i) => (
                <Reveal key={exp.titre} delay={i * 60}>
                  <ExperienceCard {...exp} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Avis clients */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.3em] text-xs text-[#B8923E] mb-2">Témoignages</p>
            <h2 className="font-display text-3xl text-[#201C18] mb-3">Ce qu'en disent nos hôtes</h2>
            <div className="flex items-center justify-center gap-2">
              <StarRating note={Math.round(noteMoyenne)} />
              <span className="text-sm text-[#5C5348]">{noteMoyenne.toFixed(1)}/5 · {mockReviews.length} avis</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockReviews.slice(0, 3).map((review, i) => (
              <Reveal key={review.id} delay={i * 60}>
                <ReviewCard review={review} />
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Restaurant & Bar */}
      <section className="max-w-6xl mx-auto px-4 py-20 space-y-8">
        {/* Le Thiof */}
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-[#0E1815] text-[#F4EFE3] overflow-hidden">
            <div className="p-10 md:p-14">
              <p className="uppercase tracking-[0.3em] text-xs text-[#C9A24B] mb-3">Notre restaurant</p>
              <h2 className="font-display text-3xl mb-4">Le Thiof</h2>
              <p className="text-[#D8CDB4] mb-4 font-light">
                Face à la lagune, Le Thiof met à l'honneur les saveurs du Sine Saloum : poissons
                grillés du jour, huîtres de palétuviers et spécialités sénégalaises revisitées.
              </p>
              <p className="text-sm text-[#8A9186] mb-7">Ouvert tous les jours, petit-déjeuner, déjeuner et dîner.</p>
              <button
                onClick={() => setMenuOuvert(menuThiof)}
                className="border border-[#B8923E] text-[#B8923E] hover:bg-[#B8923E] hover:text-[#0E1815] font-medium px-6 py-2.5 rounded-sm uppercase tracking-widest text-xs transition-colors"
              >
                Voir le menu
              </button>
            </div>
            <div className="h-64 md:h-full">
              <img
                src="/images/experiences/restaurant.jpg"
                alt="Le Thiof - restaurant"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        {/* Le Baobab Lounge */}
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-[#1A2B22] text-[#F4EFE3] overflow-hidden">
            <div className="order-2 md:order-1 h-64 md:h-full">
              <img
                src="/images/experiences/bar.jpg"
                alt="Le Baobab Lounge - bar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2 p-10 md:p-14">
              <p className="uppercase tracking-[0.3em] text-xs text-[#C9A24B] mb-3">Notre bar</p>
              <h2 className="font-display text-3xl mb-4">Le Baobab Lounge</h2>
              <p className="text-[#D8CDB4] mb-4 font-light">
                Un lieu de détente face à la lagune : jus locaux, cocktails signature au bissap
                et au bouye, pour profiter du coucher de soleil sur l'eau.
              </p>
              <p className="text-sm text-[#8A9186] mb-7">Ouvert de 11h à minuit.</p>
              <button
                onClick={() => setMenuOuvert(menuBaobabLounge)}
                className="border border-[#B8923E] text-[#B8923E] hover:bg-[#B8923E] hover:text-[#0E1815] font-medium px-6 py-2.5 rounded-sm uppercase tracking-widest text-xs transition-colors"
              >
                Voir le menu
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Appel à l'action final */}
      <Reveal>
        <section className="max-w-3xl mx-auto px-4 py-24 text-center">
          <p className="uppercase tracking-[0.3em] text-xs text-[#B8923E] mb-3">Réservation</p>
          <h2 className="font-display text-3xl text-[#201C18] mb-3">Prêt pour votre séjour ?</h2>
          <p className="text-[#5C5348] mb-8">Réservez votre chambre en quelques clics, sans création de compte.</p>
          <Link
            to="/chambres"
            className="inline-block bg-[#0E1815] hover:bg-[#1A2B22] text-[#F4EFE3] font-medium px-8 py-3 rounded-sm uppercase tracking-widest text-sm transition-colors"
          >
            Réserver maintenant
          </Link>
        </section>
      </Reveal>

      {menuOuvert && <MenuModal menu={menuOuvert} onClose={() => setMenuOuvert(null)} />}
    </div>
  );
}
