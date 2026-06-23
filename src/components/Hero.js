import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Utensils, Wine, Flame, ArrowRight, ChefHat, Coffee } from 'lucide-react';
import './Hero.scss';

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
          Traiteur Cœur d’<span className="underlined-o">o</span>ran
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
          <Link to="/repas-assis" className="feature-card">
            <div className="feature-icon-wrapper">
              <Utensils className="feature-icon" size={24} />
            </div>
            <h2>Repas Assis</h2>
            <p>L'excellence d'un repas traditionnel servi à table pour toutes vos réceptions.</p>
            <div className="feature-card-footer">
              <span className="feature-discover">
                Découvrir <ArrowRight size={14} className="discover-arrow" />
              </span>
              <span className="feature-price">À partir de<br />16€ / pers.</span>
            </div>
          </Link>
 
          <Link to="/buffet" className="feature-card">
            <div className="feature-icon-wrapper">
              <ChefHat className="feature-icon" size={24} />
            </div>
            <h2>Buffets</h2>
            <p>Buffets d'exception alliant présentation soignée, saveurs orientales et convivialité.</p>
            <div className="feature-card-footer">
              <span className="feature-discover">
                Découvrir <ArrowRight size={14} className="discover-arrow" />
              </span>
              <span className="feature-price">À partir de<br />15€ / pers.</span>
            </div>
          </Link>
 
          <Link to="/cocktail" className="feature-card">
            <div className="feature-icon-wrapper">
              <Wine className="feature-icon" size={24} />
            </div>
            <h2>Cocktails</h2>
            <p>Cocktails dînatoires et pièces salées/sucrées raffinées pour toutes vos réceptions.</p>
            <div className="feature-card-footer">
              <span className="feature-discover">
                Découvrir <ArrowRight size={14} className="discover-arrow" />
              </span>
              <span className="feature-price">À partir de<br />7€ / pers.</span>
            </div>
          </Link>
 
          <Link to="/brunch" className="feature-card">
            <div className="feature-icon-wrapper">
              <Coffee className="feature-icon" size={24} />
            </div>
            <h2>Matinées & Brunchs</h2>
            <p>Des formules matinales douces, épicées et conviviales pour vos lendemains de fêtes ou réunions.</p>
            <div className="feature-card-footer">
              <span className="feature-discover">
                Découvrir <ArrowRight size={14} className="discover-arrow" />
              </span>
              <span className="feature-price">Sur devis</span>
            </div>
          </Link>
 
          <Link to="/ateliers" className="feature-card">
            <div className="feature-icon-wrapper">
              <Flame className="feature-icon" size={24} />
            </div>
            <h2>Ateliers Culinaires</h2>
            <p>Découvrez les secrets de la cuisine algérienne lors de cours et d'ateliers interactifs.</p>
            <div className="feature-card-footer">
              <span className="feature-discover">
                Découvrir <ArrowRight size={14} className="discover-arrow" />
              </span>
              <span className="feature-price">À partir de<br />50€ / pers.</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
