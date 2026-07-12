// src/layouts/DashboardLayout.tsx
// Layout du back-office (réservé au staff connecté) : barre latérale de navigation
// + zone de contenu. Utilisé par toutes les pages sous ProtectedRoute (Dashboard, Clients...).
import { ReactNode } from 'react';
import { Sidebar } from '../components/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 page-fade-in">{children}</main>
    </div>
  );
}
