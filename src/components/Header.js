import React from 'react';
import { ChefHat, BookOpen, Settings2, Sparkles } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, isAdmin }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo" onClick={() => setActiveTab('client')}>
          <img src="/logo512.png" alt="Logo Traiteur Cœur d’Oran" className="header-logo-img" />
          <div className="logo-text">
            <h2> Cœur d’<span className="underlined-o">O</span>ran</h2>
            <span>Traiteur</span>
            <span className="logo-subtitle">Spécialités Algériennes • Bordeaux</span>
          </div>
        </div>

        <nav className="header-nav">
          <button
            className={`nav-link ${activeTab === 'client' ? 'active' : ''}`}
            onClick={() => setActiveTab('client')}
          >
            <Sparkles size={18} />
            <span>Notre Carte</span>
          </button>

          <button
            className={`nav-link ${activeTab === 'workshops' ? 'active' : ''}`}
            onClick={() => setActiveTab('workshops')}
          >
            <ChefHat size={18} />
            <span>Ateliers Culinaires</span>
          </button>

          {isAdmin && (
            <button
              className={`nav-link ${activeTab === 'booklet' ? 'active' : ''}`}
              onClick={() => setActiveTab('booklet')}
            >
              <BookOpen size={18} />
              <span>Créer un Fascicule</span>
            </button>
          )}

          <button
            className={`nav-link ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            <Settings2 size={18} />
            <span>{isAdmin ? 'Admin (Connecté)' : 'Espace Admin'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
