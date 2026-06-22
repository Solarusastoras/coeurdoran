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

      <div className="prestation-hero">
        <div className="prestation-hero-content">
          <div className="prestation-badge">
            <ChefHat size={14} />
            <span>Déjeunatoires & Dînatoires</span>
          </div>
          <h1>Buffets d'Exception</h1>
          <p className="prestation-tagline">
            L'alliance parfaite de la convivialité, d'une présentation soignée et des saveurs orientales pour vos événements.
          </p>
        </div>
      </div>

      <div className="prestation-container">
        <div className="prestation-grid">
          {/* Buffet Details Card */}
          <div className="prestation-details-card">
            <div className="details-header">
              <h2>Nos Formules de Buffet</h2>
              <p>Une sélection de pièces froides et chaudes, présentées avec soin pour le plaisir des yeux et des papilles.</p>
            </div>

            <div className="formulas-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="buffet-formula-item" style={{ padding: '1.25rem', backgroundColor: 'var(--color-bordeaux-ultra-light)', borderRadius: 'var(--border-radius-md)', border: '1px solid transparent' }}>
                <div className="bf-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-slate-dark)' }}>Formule 7 pièces</h3>
                  <span className="bf-price" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-bordeaux)' }}>15,00 € <span className="bf-unit" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-slate-light)', fontWeight: 500 }}>/ pers.</span></span>
                </div>
                <p className="bf-desc" style={{ fontSize: '0.85rem', color: 'var(--color-slate-light)', lineHeight: 1.5 }}>5 à 6 pièces salées et 1 à 2 pièces sucrées au choix.</p>
              </div>

              <div className="buffet-formula-item" style={{ padding: '1.25rem', backgroundColor: 'var(--color-bordeaux-ultra-light)', borderRadius: 'var(--border-radius-md)', border: '1px solid transparent' }}>
                <div className="bf-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-slate-dark)' }}>Formule 8 pièces</h3>
                  <span className="bf-price" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-bordeaux)' }}>17,00 € <span className="bf-unit" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-slate-light)', fontWeight: 500 }}>/ pers.</span></span>
                </div>
                <p className="bf-desc" style={{ fontSize: '0.85rem', color: 'var(--color-slate-light)', lineHeight: 1.5 }}>6 à 7 pièces salées et 1 à 2 pièces sucrées au choix.</p>
              </div>

              <div className="buffet-formula-item featured" style={{ padding: '1.25rem', backgroundColor: 'hsl(26, 93%, 97%)', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--color-gold-light)', boxShadow: '0 4px 15px rgba(155, 88, 51, 0.08)' }}>
                <div className="bf-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-gold-dark)' }}>Formule 9 pièces</h3>
                  <span className="bf-price" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-gold)' }}>19,00 € <span className="bf-unit" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-slate-light)', fontWeight: 500 }}>/ pers.</span></span>
                </div>
                <p className="bf-desc" style={{ fontSize: '0.85rem', color: 'var(--color-slate-light)', lineHeight: 1.5 }}>7 à 8 pièces salées et 1 à 2 pièces sucrées au choix.</p>
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
              <h2>Exemples de Pièces</h2>
            </div>

            <div className="pieces-gallery">
              <div className="piece-category">
                <h4 style={{ textTransform: 'uppercase', fontSize: '0.85rem', color: 'var(--color-gold-dark)', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>Pièces Salées</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Mini-Bourek viande hachée ou fromage</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Mini-Pastilla croustillante au poulet</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Brochettes de Kefta marinées</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Navettes garnies aux saveurs d'Orient</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Mhadjeb traditionnels (crêpes farcies)</li>
                </ul>
              </div>

              <div className="piece-category" style={{ marginTop: '1.5rem' }}>
                <h4 style={{ textTransform: 'uppercase', fontSize: '0.85rem', color: 'var(--color-gold-dark)', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.25rem', marginBottom: '0.75rem' }}>Pièces Sucrées</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Mini-Baklawa feuilletée au miel</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Cornes de gazelle à la fleur d'oranger</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Makrout moelleux aux dattes</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-slate-light)' }}><Check size={14} className="check-icon" style={{ color: 'var(--color-success)', flexShrink: 0 }} /> Salade de fruits frais en verrines</li>
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
              <img src="/logo.svg" alt="Buffet Cœur d'Oran" className="circular-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
