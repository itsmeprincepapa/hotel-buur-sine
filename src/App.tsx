// src/App.tsx
// Point d'entrée de la logique de navigation : déclare toutes les routes de l'application
// avec React Router, sépare les routes publiques (MainLayout) des routes staff (DashboardLayout
// + ProtectedRoute), et enveloppe le tout dans les Providers de contexte (thème, auth).
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PageLoader } from './components/PageLoader';
import { MainLayout } from './layouts/MainLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Rooms } from './pages/Rooms';
import { Gallery } from './pages/Gallery';
import { Faq } from './pages/Faq';
import { Reservations } from './pages/Reservations';
import { Clients } from './pages/Clients';
import { Profile } from './pages/Profile';
import { Contact } from './pages/Contact';
import { Settings } from './pages/Settings';
import { Suivi } from './pages/Suivi';
import { Dashboard } from './pages/Dashboard';

// Petit composant utilitaire pour les pages du back-office pas encore développées,
// afin que toutes les routes du Dashboard restent navigables même en cours de développement
function Placeholder({ titre }: { titre: string }) {
  return (
    <div className="p-10 text-center text-gray-400">
      <p className="text-lg font-medium">{titre}</p>
      <p className="text-sm">Page en cours de développement.</p>
    </div>
  );
}

function App() {
  return (
    <PageLoader>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <Routes>
            {/* ---------- Routes publiques (avec MainLayout) ---------- */}
            <Route
              path="/"
              element={
                <MainLayout>
                  <Home />
                </MainLayout>
              }
            />
            <Route
              path="/chambres"
              element={
                <MainLayout>
                  <Rooms />
                </MainLayout>
              }
            />
            <Route
              path="/galerie"
              element={
                <MainLayout>
                  <Gallery />
                </MainLayout>
              }
            />
            <Route
              path="/faq"
              element={
                <MainLayout>
                  <Faq />
                </MainLayout>
              }
            />
            <Route
              path="/suivi"
              element={
                <MainLayout>
                  <Suivi />
                </MainLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <MainLayout>
                  <Contact />
                </MainLayout>
              }
            />
            {/* Route de connexion staff : accessible uniquement via l'URL directe,
                aucun lien visible depuis les pages publiques */}
            <Route path="/login" element={<Login />} />

            {/* ---------- Routes protégées (staff uniquement, avec DashboardLayout) ---------- */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/reservations"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Reservations />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/chambres-staff"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Placeholder titre="Gestion des chambres (staff)" />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/clients"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Clients />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profil"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Profile />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/parametres"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Settings />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </PageLoader>
  );
}

export default App;
