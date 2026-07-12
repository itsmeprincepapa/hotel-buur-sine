// src/layouts/MainLayout.tsx
// Layout des pages publiques du site vitrine : Navbar en haut, Footer en bas,
// et le contenu de la page (children) entre les deux.
import { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 pt-20 page-fade-in">{children}</main>
      <Footer />
    </div>
  );
}
