import React from 'react';
import { Star, Heart, Utensils, Wine, Users, Flame } from 'lucide-react';

export default function Hero({ onExplore }) {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content-wrapper">
        <div className="hero-badge">
          <Star className="hero-badge-icon" size={14} />
          <span>Traiteur Algérien de Prestige • Bordeaux</span>
        </div>

        <h1 className="hero-title">
          Traiteur Cœur d’<span className="underlined-o">O</span>ran
        </h1>

        <p className="hero-tagline" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
          <span>🍽 Spécialités algériennes & pâtisseries orientales</span>
          <span>🎉 Repas sur-mesure pour particuliers & pros</span>
          <span style={{ fontSize: '1.05rem', opacity: 0.9 }}>📍 Basée à Bordeaux</span>
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary btn-lg" onClick={onExplore}>
            Explorer la Carte
          </button>
          <a href="#contact" className="btn btn-outline btn-lg">
            Nous Contacter
          </a>
        </div>

        <div className="hero-features">
          <div className="feature-card">
            <Heart className="feature-icon" size={24} />
            <h3>Mariages</h3>
            <p>Organisation de buffets et repas de noces traditionnels pour sublimer votre plus beau jour.</p>
          </div>

          <div className="feature-card">
            <Utensils className="feature-icon" size={24} />
            <h3>Buffets</h3>
            <p>Buffets d'exception alliant présentation soignée, saveurs orientales et convivialité.</p>
          </div>

          <div className="feature-card">
            <Wine className="feature-icon" size={24} />
            <h3>Cocktails</h3>
            <p>Cocktails dînatoires et pièces salées/sucrées raffinées pour toutes vos réceptions.</p>
          </div>

          <div className="feature-card">
            <Users className="feature-icon" size={24} />
            <h3>Repas de Groupe</h3>
            <p>Banquets, séminaires professionnels et événements familiaux chaleureux sur mesure.</p>
          </div>

          <div className="feature-card">
            <Flame className="feature-icon" size={24} />
            <h3>Ateliers Culinaires</h3>
            <p>Découvrez les secrets de la cuisine algérienne lors de cours et d'ateliers interactifs.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
