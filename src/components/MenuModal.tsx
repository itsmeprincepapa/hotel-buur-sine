// src/components/MenuModal.tsx
// Modale affichant le menu complet d'un établissement (restaurant ou bar),
// avec les plats regroupés et triés par catégorie (Entrées, Plats, Desserts...).
import { useMemo } from 'react';
import { Menu, MenuCategorie } from '../types/menu.types';

interface MenuModalProps {
  menu: Menu;
  onClose: () => void;
}

export function MenuModal({ menu, onClose }: MenuModalProps) {
  // useMemo : le regroupement par catégorie n'est recalculé que si le menu change,
  // pas à chaque rendu du composant
  const categories = useMemo(() => {
    const ordre: MenuCategorie[] = ['Entrées', 'Plats', 'Desserts', 'Boissons', 'Cocktails'];
    const groupes = new Map<MenuCategorie, typeof menu.items>();
    menu.items.forEach((item) => {
      const liste = groupes.get(item.categorie) ?? [];
      liste.push(item);
      groupes.set(item.categorie, liste);
    });
    // ne garde que les catégories réellement présentes dans le menu, dans l'ordre défini plus haut
    return ordre.filter((cat) => groupes.has(cat)).map((cat) => ({ categorie: cat, items: groupes.get(cat)! }));
  }, [menu]);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-[#FBF8F1] max-w-lg w-full max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#0E1815] text-[#F4EFE3] flex items-center justify-between px-6 py-4">
          <h3 className="font-display text-lg">{menu.nomEtablissement} — Menu</h3>
          <button onClick={onClose} className="text-[#B8923E] hover:text-[#F4EFE3] text-xl leading-none">×</button>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Premier niveau : une section par catégorie */}
          {categories.map(({ categorie, items }) => (
            <div key={categorie}>
              <h4 className="text-xs font-semibold text-[#B8923E] uppercase tracking-[0.2em] mb-3">{categorie}</h4>
              <div className="space-y-3">
                {/* Second niveau : chaque plat de la catégorie */}
                {items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-4 border-b border-[#EADFC5] pb-3 last:border-0">
                    <div>
                      <p className="font-display text-[#201C18]">{item.nom}</p>
                      <p className="text-sm text-[#5C5348]">{item.description}</p>
                    </div>
                    <p className="text-sm font-semibold text-[#8A5A34] whitespace-nowrap">
                      {item.prix.toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
