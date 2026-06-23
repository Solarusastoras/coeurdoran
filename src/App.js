import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuCatalog from './components/MenuCatalog';
import MenuBooklet from './components/MenuBooklet';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import Workshops from './components/Workshops';
import NotreHistoire from './components/NotreHistoire';
import RepasAssis from './pages/RepasAssis';
import Buffet from './pages/Buffet';
import Cocktail from './pages/Cocktail';
import Brunch from './pages/Brunch';
import { getMenu } from './utils/api';
import { Loader2, AlertCircle } from 'lucide-react';
import './App.scss';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false); // État d'authentification administrateur
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Charger les données du menu depuis le serveur local (NAS) ou fallback statique (OVH)
  const fetchMenu = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getMenu();
      setMenuItems(data);
    } catch (err) {
      console.warn('Connexion au NAS impossible, chargement du menu statique public (OVH)...');
      try {
        const fallbackResponse = await fetch('/data/menu.json');
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          setMenuItems(fallbackData);
          return; // Menu chargé avec succès en lecture seule
        }
      } catch (fallbackErr) {
        console.error('Échec du chargement du menu statique public :', fallbackErr);
      }
      
      setError('Impossible de charger la carte. Veuillez vérifier votre connexion.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="app-container">
      {/* Barre de navigation supérieure (Masquée à l'impression via CSS) */}
      <Header isAdmin={isAdmin} />

      <main className="main-content">
        {/* Affichage d'erreur si le backend est hors ligne */}
        {error && (
          <div className="container" style={{ marginTop: '2rem' }}>
            <div className="admin-alert alert-error">
              <AlertCircle size={20} />
              <div>
                <strong>Erreur de connexion :</strong> {error}
                <button
                  onClick={fetchMenu}
                  className="btn btn-outline"
                  style={{ marginLeft: '1rem', padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
                >
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loader de chargement initial */}
        <Routes>
          <Route path="/" element={
            <>
              <Hero onExplore={() => document.getElementById('menu-catalog')?.scrollIntoView({ behavior: 'smooth' })} />
              <div className="container">
                <MenuCatalog menuItems={menuItems} isLoading={isLoading} />
              </div>
            </>
          } />

          <Route path="/repas-assis" element={
            <div className="container">
              <RepasAssis />
            </div>
          } />

          <Route path="/buffet" element={
            <div className="container">
              <Buffet />
            </div>
          } />

          <Route path="/cocktail" element={
            <div className="container">
              <Cocktail />
            </div>
          } />

          <Route path="/brunch" element={
            <div className="container">
              <Brunch />
            </div>
          } />

          <Route path="/ateliers" element={
            <div className="container">
              <Workshops />
            </div>
          } />

          <Route path="/histoire" element={
            <NotreHistoire />
          } />

          <Route path="/booklet" element={
            isAdmin ? (
              <div className="container">
                {isLoading ? (
                  <div className="loading-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '1rem' }}>
                    <Loader2 className="animate-spin" size={40} style={{ color: 'var(--color-bordeaux)' }} />
                    <p style={{ color: 'var(--color-slate-light)', fontWeight: 500 }}>Chargement du livret...</p>
                  </div>
                ) : (
                  <MenuBooklet menuItems={menuItems} />
                )}
              </div>
            ) : (
              <Navigate to="/admin" replace />
            )
          } />

          <Route path="/admin" element={
            <div className="container">
              <AdminPanel
                menuItems={menuItems}
                onRefresh={fetchMenu}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
                isLoadingMenu={isLoading}
              />
            </div>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Pied de page informatif (Masqué à l'impression via CSS) */}
      <Footer />
    </div>
  );
}
