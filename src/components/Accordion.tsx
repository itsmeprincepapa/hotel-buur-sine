// src/components/Accordion.tsx
import { useState, ReactNode } from 'react';

interface AccordionItemProps {
  titre: string;
  children: ReactNode;
  ouvertParDefaut?: boolean;
}

export function AccordionItem({ titre, children, ouvertParDefaut = false }: AccordionItemProps) {
  const [ouvert, setOuvert] = useState(ouvertParDefaut);

  return (
    <div className="border-b border-[#EADFC5]">
      <button
        onClick={() => setOuvert((o) => !o)}
        className="w-full flex items-center justify-between py-5 text-left"
        aria-expanded={ouvert}
      >
        <span className="font-display text-lg text-[#201C18] pr-6">{titre}</span>
        <span
          className={`shrink-0 text-2xl text-[#B8923E] leading-none transition-transform duration-300 ${
            ouvert ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          ouvert ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-[#5C5348] leading-relaxed pr-8">{children}</p>
        </div>
      </div>
    </div>
  );
}
