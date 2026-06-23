import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChefHat, BookOpen, Settings2, Sparkles, BookHeart, Utensils, Wine, Coffee, Flame, ChevronDown } from 'lucide-react';
import './Header.scss';

export default function Header({ isAdmin }) {
  const location = useLocation();
  const isCateringActive = ['/repas-assis', '/buffet', '/cocktail', '/brunch', '/ateliers'].some(
    (path) => location.pathname === path
  );

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="header-logo" style={{ textDecoration: 'none' }} aria-label="Accueil - Traiteur Cœur d'Oran">
          <img src="/logo192.png" alt="Logo Traiteur Cœur d’Oran" className="header-logo-img" />
          <div className="logo-text">
            <h2> Cœur d’<span className="underlined-o">o</span>ran</h2>
            <span className="logo-subtitle">Traiteur • Spécialités Algériennes • Bordeaux</span>
          </div>
        </NavLink>

        <nav className="header-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            aria-label="La Carte"
          >
            <Sparkles size={18} />
            <span>La Carte</span>
          </NavLink>

          <div className="nav-dropdown-wrapper">
            <NavLink
              to="/repas-assis"
              className={`nav-link dropdown-trigger ${isCateringActive ? 'active' : ''}`}
              aria-label="Formules Traiteur"
            >
              <Utensils size={18} />
              <span>Formules Traiteur</span>
              <ChevronDown size={14} className="dropdown-chevron" />
            </NavLink>
            <div className="dropdown-menu">
              <NavLink to="/repas-assis" className="dropdown-item" aria-label="Formule Repas Assis">
                <Utensils size={16} />
                <span>Repas Assis</span>
              </NavLink>
              <NavLink to="/buffet" className="dropdown-item" aria-label="Formule Buffets">
                <ChefHat size={16} />
                <span>Buffets</span>
              </NavLink>
              <NavLink to="/cocktail" className="dropdown-item" aria-label="Formule Cocktails">
                <Wine size={16} />
                <span>Cocktails</span>
              </NavLink>
              <NavLink to="/brunch" className="dropdown-item" aria-label="Formule Matinées et Brunchs">
                <Coffee size={16} />
                <span>Matinées & Brunchs</span>
              </NavLink>
              <NavLink to="/ateliers" className="dropdown-item" aria-label="Ateliers Culinaires">
                <Flame size={16} />
                <span>Ateliers Culinaires</span>
              </NavLink>
            </div>
          </div>

          <NavLink
            to="/histoire"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            aria-label="Mon Histoire"
          >
            <BookHeart size={18} />
            <span>Mon Histoire</span>
          </NavLink>

          {isAdmin && (
            <NavLink
              to="/booklet"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              aria-label="Créer un Fascicule"
            >
              <BookOpen size={18} />
              <span>Créer un Fascicule</span>
            </NavLink>
          )}

          <NavLink
            to="/admin"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            aria-label={isAdmin ? 'Admin (Connecté)' : 'Espace Admin'}
          >
            <Settings2 size={18} />
            <span>{isAdmin ? 'Admin (Connecté)' : 'Espace Admin'}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
