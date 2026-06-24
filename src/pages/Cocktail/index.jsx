import React from 'react';
import { Link } from 'react-router-dom';
import { Wine, ArrowLeft, Check, Sparkles } from 'lucide-react';
import './coktail.scss';

export default function Cocktail() {
  return (
    <div className="cocktail-page dark-theme-page">

      {/* Bouton de retour en blanc/doré pour ressortir sur le fond sombre */}
      <div className="page-header-nav">
        <Link to="/" className="back-link dark-back-link">
          <ArrowLeft size={16} />
          <span>Retour à l'Accueil</span>
        </Link>
      </div>

      <div className="cocktail-centered-layout">

        {/* En-tête Lounge épuré */}
        <header className="cocktail-lounge-header">
          <div className="prestation-badge">
            <Wine size={14} />
            <span>Cocktail & Apéritif</span>
          </div>
          <h1>Cocktails Raffinés</h1>
          <p className="prestation-tagline">
            Des bouchées d'exception et des pièces salées/sucrées raffinées pour toutes vos réceptions.
          </p>
        </header>

        {/* Section Formules (En cartes Glassmorphic centrées) */}
        <section className="cocktail-formulas-section">
          <div className="section-title-ornament">
            <h2>Nos Formules Cocktail</h2>
            <div className="star-separator">✦ ۞ ✦</div>
          </div>

          <div className="glass-formulas-container">
            <div className="glass-formula-card">
              <div className="gfc-header">
                <h3>Formule 3 pièces</h3>
                <span className="gfc-price">Dès 7,00 € <span className="gfc-unit">/ pers.</span></span>
              </div>
              <p className="gfc-desc">3 pièces salées savoureuses pour accompagner vos apéritifs.</p>
            </div>

            <div className="glass-formula-card">
              <div className="gfc-header">
                <h3>Formule 4 pièces</h3>
                <span className="gfc-price">Dès 9,00 € <span className="gfc-unit">/ pers.</span></span>
              </div>
              <p className="gfc-desc">L'équilibre idéal : 3 pièces salées et 1 pièce sucrée au choix.</p>
            </div>

            <div className="glass-formula-card featured">
              <div className="gfc-header">
                <h3>Formule 5 pièces</h3>
                <span className="gfc-price">Dès 11,00 € <span className="gfc-unit">/ pers.</span></span>
              </div>
              <p className="gfc-desc">La formule complète : 4 pièces salées et 1 pièce sucrée au choix.</p>
            </div>
          </div>
        </section>

        {/* Section Finger Food / Nuage de Pièces */}
        <section className="cocktail-pieces-section">
          <div className="section-title-ornament">
            <h2>Le Nuage de Bouchées</h2>
            <p className="subtitle">Des explosions de saveurs concentrées en une bouchée</p>
          </div>

          <div className="pieces-cloud-grid">

            <div className="pieces-cloud-category">
              <h3>Bouchées Salées</h3>
              <div className="tags-cloud">
                <span className="piece-tag salé">Mini-Cigares bœuf épicé</span>
                <span className="piece-tag salé">Caviar d'aubergine maison</span>
                <span className="piece-tag salé">Gaspacho tomate-menthe</span>
                <span className="piece-tag salé">Mini-brochettes cumin</span>
                <span className="piece-tag salé">Verrines de poivrons grillés</span>
                <span className="piece-tag salé">Mini-tartelettes houmous</span>
              </div>
            </div>

            <div className="pieces-cloud-category">
              <h3>Mignardises Sucrées</h3>
              <div className="tags-cloud">
                <span className="piece-tag sucré">Mini-Cornes de gazelle</span>
                <span className="piece-tag sucré">Griwech au sésame</span>
                <span className="piece-tag sucré">Sablés d'antan confiture</span>
                <span className="piece-tag sucré">Verrines crème cardamome</span>
                <span className="piece-tag sucré">Bouchées dattes-amandes</span>
              </div>
            </div>

          </div>
        </section>

        {/* Note Végétarienne & CTA */}
        <div className="cocktail-footer-action">
          <div className="prestation-note">
            <span className="veg-badge">Option végétarienne possible sur tout le menu</span>
          </div>
          <div className="cta-box">
            <a href="#contact" className="btn btn-outline dark-btn-outline">
              Demander un Devis Personnalisé
            </a>
          </div>
        </div>

        {/* Info Banner */}
        <div className="prestation-info-banner dark-info-banner">
          <div className="info-content">
            <h3>Une Prestation de Cocktail de Qualité</h3>
            <p>
              Tous nos cocktails incluent une présentation élégante sur supports ardoise ou bois, mettant en valeur l'authenticité et la finesse des bouchées. Idéal pour vos lancements de produits, afterworks ou réceptions de baptême et fiançailles.
            </p>
            <div className="info-badges">
              <span>Fait Maison à Bordeaux</span>
              <span>Présentation Soignée incluse</span>
              <span>Gironde</span>
            </div>
          </div>
          <div className="info-illustration">
            <div className="circle-image-wrapper">
              <img src="/logo192.png" alt="Cocktails Cœur d'Oran" className="circular-img" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
