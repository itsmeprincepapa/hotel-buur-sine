// src/pages/Faq.tsx
import { mockFaq } from '../data/mockFaq';
import { AccordionItem } from '../components/Accordion';
import { Reveal } from '../components/Reveal';
import { Link } from 'react-router-dom';

export function Faq() {
  return (
    <div className="bg-[#FBF8F1] min-h-screen">
      <section className="max-w-3xl mx-auto px-4 pt-16 pb-6 text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-[#B8923E] mb-2">Bon à savoir</p>
        <h1 className="font-display text-4xl text-[#201C18] mb-3">Questions fréquentes</h1>
        <p className="text-[#5C5348]">
          Tout ce qu'il faut savoir avant votre séjour au Buur Sine.
        </p>
      </section>

      <Reveal>
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <div className="bg-white border border-[#EADFC5] px-6">
            {mockFaq.map((item, i) => (
              <AccordionItem key={item.id} titre={item.question} ouvertParDefaut={i === 0}>
                {item.reponse}
              </AccordionItem>
            ))}
          </div>
        </section>
      </Reveal>

      <section className="max-w-3xl mx-auto px-4 pb-24 text-center">
        <p className="text-[#5C5348] mb-4">Une autre question ?</p>
        <Link
          to="/contact"
          className="inline-block border border-[#B8923E] text-[#B8923E] hover:bg-[#B8923E] hover:text-[#0E1815] font-medium px-8 py-3 rounded-sm uppercase tracking-widest text-sm transition-colors"
        >
          Contactez-nous
        </Link>
      </section>
    </div>
  );
}
