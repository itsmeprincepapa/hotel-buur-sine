// src/components/ExperienceCard.tsx

interface ExperienceCardProps {
  titre: string;
  description: string;
  image: string;
}

export function ExperienceCard({ titre, description, image }: ExperienceCardProps) {
  return (
    <div className="bg-white border border-[#EADFC5] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <img src={image} alt={titre} className="w-full h-40 object-cover" />
      <div className="p-6">
        <h3 className="font-display text-lg text-[#201C18] mb-1">{titre}</h3>
        <p className="text-sm text-[#5C5348]">{description}</p>
      </div>
    </div>
  );
}
