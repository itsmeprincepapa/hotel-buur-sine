// src/components/StatCard.tsx
// Petite carte réutilisable pour afficher un indicateur (KPI) sur le Dashboard :
// un emoji, une valeur mise en avant, un libellé, et une couleur d'accent au choix.

interface StatCardProps {
  label: string;
  valeur: string;
  emoji: string;
  accent?: 'indigo' | 'green' | 'orange';
}

const accentStyles = {
  indigo: 'bg-[#F6F1E4] text-[#6b4527]',
  green: 'bg-green-50 text-green-700',
  orange: 'bg-orange-50 text-orange-700',
};

export function StatCard({ label, valeur, emoji, accent = 'indigo' }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${accentStyles[accent]}`}>
        {emoji}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{valeur}</p>
        <p className="text-sm text-gray-400">{label}</p>
      </div>
    </div>
  );
}
