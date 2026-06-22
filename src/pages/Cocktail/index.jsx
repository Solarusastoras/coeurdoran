import React from 'react';
import { Link } from 'react-router-dom';
import { Wine, ArrowLeft, Check, Sparkles } from 'lucide-react';
import './coktail.scss';

export default function Cocktail() {
  return (
    <div className="cocktail-page">
      <div className="page-header-nav">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          <span>Retour à l'Accueil</span>
        </Link>
      </div>

      <div className="prestation-hero">
        <div className="prestation-hero-content">
          <div className="prestation-badge">
            <Wine size={14} />
            <span>Cocktail & Apéritif</span>
          </div>
          <h1>Cocktails Raffinés</h1>
          <p className="prestation-tagline">
            Des bouchées d'exception et des pièces salées/sucrées raffinées pour toutes vos réceptions.
          </p>
        </div>
      </div>

      <div className="prestation-container">
        <div className="prestation-grid">
          {/* Cocktail Details Card */}
          <div className="prestation-details-card">
            <div className="details-header">
              <h2>Nos Formules Cocktails</h2>
              <p>Idéal pour ouvrir le bal ou animer vos débuts de soirée avec légèreté.</p>
            </div>

            <div className="formulas-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="buffet-formula-item" style={{ padding: '1.25rem', backgroundColor: 'var(--color-bordeaux-ultra-light)', borderRadius: 'var(--border-radius-md)', border: '1px solid transparent' }}>
                <div className="bf-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-slate-dark)' }}>Formule 3 pièces</h3>
                  <span className="bf-price" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-bordeaux)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 1.2 }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'var(--color-slate-light)', fontWeight: 500 }}>À partir de</span>
                    <span>7,00 € <span className="bf-unit" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-slate-light)', fontWeight: 500 }}>/ pers.</span></span>
                  </span>
                </div>
                <p className="bf-desc" style={{ fontSize: '0.85rem', color: 'var(--color-slate-light)', lineHeight: 1.5 }}>3 pièces salées savoureuses.</p>
              </div>

              <div className="buffet-formula-item" style={{ padding: '1.25rem', backgroundColor: 'var(--color-bordeaux-ultra-light)', borderRadius: 'var(--border-radius-md)', border: '1px solid transparent' }}>
                <div className="bf-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-slate-dark)' }}>Formule 4 pièces</h3>
                  <span className="bf-price" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-bordeaux)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 1.2 }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'var(--color-slate-light)', fontWeight: 500 }}>À partir de</span>
                    <span>9,00 € <span className="bf-unit" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-slate-light)', fontWeight: 500 }}>/ pers.</span></span>
                  </span>
                </div>
                <p className="bf-desc" style={{ fontSize: '0.85rem', color: 'var(--color-slate-light)', lineHeight: 1.5 }}>3 pièces salées et 1 pièce sucrée au choix.</p>
              </div>

              <div className="buffet-formula-item featured" style={{ padding: '1.25rem', backgroundColor: 'hsl(26, 93%, 97%)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--color-gold-light)', boxShadow: '0 4px 15px rgba(155, 88, 51, 0.08)' }}>
                <div className="bf-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-gold-dark)' }}>Formule 5 pièces</h3>
                  <span className="bf-price" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-gold)', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', lineHeight: 1.2 }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: 500 }}>À partir de</span>
                    <span>11,00 € <span className="bf-unit" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-slate-light)', fontWeight: 500 }}>/ pers.</span></span>
                  </span>
                </div>
                <p className="bf-desc" style={{ fontSize: '0.85rem', color: 'var(--color-slate-light)', lineHeight: 1.5 }}>4 pièces salées et 1 pièce sucrée au choix.</p>
              </div>
            </div>

            <div className="prestation-note" style={{ marginTop: '2rem', backgroundColor: 'var(--color-bordeaux-ultra-light)', padding: '1rem', borderRadius: 'var(--border-radius-md)', textAlign: 'center' }}>
              <span className="veg-badge" style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--color-bordeaux)', fontWeight: 600 }}>Option végétarienne possible sur tout le menu</span>
            </div>
          </div>

          {/* Example Pieces Card */}
          <div className="prestation-formulas-card">
            <div className="formulas-header">
              <Sparkles size={20} className="sparkle-icon" />
              <h2>Idées de Verrines & Bouchées</h2>
            </div>

            <div className="pieces-gallery">
              <div className="piece-category">
                <h4 style={{ textTransform: 'uppercase', fontSize: '0.85rem', color: 'var(--color-gold-dark)', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>Bouchées Salées</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Mini-Cigares croustillants au bœuf épicé</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Canapés de caviar d'aubergine maison</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Verrines de gaspacho de tomates & menthe</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Mini-brochettes de poulet mariné au cumin</li>
                </ul>
              </div>

              <div className="piece-category" style={{ marginTop: '1.5rem' }}>
                <h4 style={{ textTransform: 'uppercase', fontSize: '0.85rem', color: 'var(--color-gold-dark)', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>Mignardises Sucrées</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Mini-Cornes de gazelle</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Griwech croustillant (pâtisserie au sésame)</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Sablés confiture traditionnels</li>
                </ul>
              </div>
            </div>

            <div className="cta-box" style={{ marginTop: '1.5rem' }}>
              <a href="#contact" className="btn btn-primary btn-block">
                Demander un Devis Personnalisé
              </a>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="prestation-info-banner">
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
              <img src="/logo.svg" alt="Cocktails Cœur d'Oran" className="circular-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
