import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, ArrowLeft, Check, Sparkles } from 'lucide-react';
import './buffet.scss';

export default function Buffet() {
  return (
    <div className="buffet-page">
      <div className="page-header-nav">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          <span>Retour à l'Accueil</span>
        </Link>
      </div>

      {/* Hero Buffet - Grand Entête Arabesque */}
      <div className="prestation-hero">
        <div className="prestation-hero-content">
          <div className="prestation-badge">
            <ChefHat size={14} />
            <span>Déjeunatoires & Dînatoires</span>
          </div>
          <h1>La Table du Riad</h1>
          <p className="prestation-tagline">
            L'alliance parfaite de la convivialité, d'une présentation soignée et des saveurs orientales pour vos événements.
          </p>
        </div>
      </div>

      <div className="prestation-container">
        {/* Grille à 3 Colonnes représentant la Table de Banquet */}
        <div className="buffet-table-grid">

          {/* Colonne 1: Formules (Plateau de Gauche) */}
          <div className="table-column-card formulas-column">
            <div className="column-header">
              <Sparkles size={18} />
              <h2>Nos Formules</h2>
            </div>
            <div className="column-content formulas-list">
              <div className="buffet-formula-item">
                <h3>Formule 7 pièces</h3>
                <p className="bf-desc">5 à 6 pièces salées et 1 à 2 pièces sucrées.</p>
                <span className="bf-price">Dès 15€ <span className="bf-unit">/ pers.</span></span>
              </div>

              <div className="buffet-formula-item">
                <h3>Formule 8 pièces</h3>
                <p className="bf-desc">6 à 7 pièces salées et 1 à 2 pièces sucrées.</p>
                <span className="bf-price">Dès 17€ <span className="bf-unit">/ pers.</span></span>
              </div>

              <div className="buffet-formula-item featured">
                <h3>Formule 9 pièces</h3>
                <p className="bf-desc">7 à 8 pièces salées et 1 à 2 pièces sucrées.</p>
                <span className="bf-price">Dès 19€ <span className="bf-unit">/ pers.</span></span>
              </div>
            </div>
          </div>

          {/* Colonne 2: Salés (Plateau Central) */}
          <div className="table-column-card pieces-column">
            <div className="column-header">
              <Check size={18} />
              <h2>Pièces Salées</h2>
            </div>
            <div className="column-content">
              <ul className="pieces-list">
                <li><Check size={14} className="check-icon" /> <span>Mini-Bourek viande hachée</span></li>
                <li><Check size={14} className="check-icon" /> <span>Mini-Pastilla au poulet</span></li>
                <li><Check size={14} className="check-icon" /> <span>Brochettes de Kefta marinées</span></li>
                <li><Check size={14} className="check-icon" /> <span>Navettes garnies d'Orient</span></li>
                <li><Check size={14} className="check-icon" /> <span>Mhadjeb traditionnels farcis</span></li>
                <li><Check size={14} className="check-icon" /> <span>Mini-boulettes Kefta grillées</span></li>
              </ul>
            </div>
          </div>

          {/* Colonne 3: Sucrés (Plateau de Droite) */}
          <div className="table-column-card sweets-column">
            <div className="column-header">
              <Check size={18} />
              <h2>Pièces Sucrées</h2>
            </div>
            <div className="column-content">
              <ul className="pieces-list">
                <li><Check size={14} className="check-icon" /> <span>Mini-Baklawa feuilletée</span></li>
                <li><Check size={14} className="check-icon" /> <span>Cornes de gazelle parfumées</span></li>
                <li><Check size={14} className="check-icon" /> <span>Makrout moelleux aux dattes</span></li>
                <li><Check size={14} className="check-icon" /> <span>Sablés d'Orient à la confiture</span></li>
                <li><Check size={14} className="check-icon" /> <span>Mignardises à la fleur d'oranger</span></li>
                <li><Check size={14} className="check-icon" /> <span>Verrines de fruits frais</span></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Options & Devis */}
        <div className="buffet-bottom-section">
          <div className="prestation-note">
            <span className="veg-badge">Option végétarienne possible sur l'ensemble de notre buffet</span>
          </div>
          <div className="cta-box">
            <a href="#contact" className="btn btn-primary">
              Demander un Devis Personnalisé
            </a>
          </div>
        </div>

        {/* Info Banner */}
        <div className="prestation-info-banner">
          <div className="info-content">
            <h3>Une Organisation de Buffet Sans Souci</h3>
            <p>
              Nous prenons en charge la livraison de vos buffets chauds et froids, la mise en place sur table avec décoration orientale si souhaité, ainsi que la reprise de nos contenants. Pour un confort total, nous pouvons également mettre à disposition du personnel pour le service et le débarrassage.
            </p>
            <div className="info-badges">
              <span>Fait Maison à Bordeaux </span>
              <span>Décoration de Buffet incluse</span>
              <span>Livraison Gironde</span>
            </div>
          </div>
          <div className="info-illustration">
            <div className="circle-image-wrapper">
              <img src="/logo192.png" alt="Buffet Cœur d'Oran" className="circular-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
