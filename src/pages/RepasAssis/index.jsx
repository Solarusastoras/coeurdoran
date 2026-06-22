import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, ArrowLeft, Check, Sparkles } from 'lucide-react';
import './repasassis.scss';

export default function RepasAssis() {
  return (
    <div className="repas-assis-page">
      <div className="page-header-nav">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          <span>Retour à l'Accueil</span>
        </Link>
      </div>

      <div className="prestation-hero">
        <div className="prestation-hero-content">
          <div className="prestation-badge">
            <Utensils size={14} />
            <span>Service Traditionnel à Table</span>
          </div>
          <h1>Repas Assis & Banquets</h1>
          <p className="prestation-tagline">
            L'excellence d'un repas servi à l'assiette pour sublimer vos mariages, fêtes familiales ou repas professionnels.
          </p>
        </div>
      </div>

      <div className="prestation-container">
        <div className="prestation-grid">
          {/* Menu Details Card */}
          <div className="prestation-details-card">
            <div className="details-header">
              <h2>Notre Carte à la Carte</h2>
              <p>Composez votre menu selon vos préférences. Nos produits sont préparés avec amour et épices d'Oran.</p>
            </div>

            <div className="menu-sections-wrapper">
              <div className="menu-section-item">
                <div className="item-title-row">
                  <h3>Entrée</h3>
                  <span className="item-price">5,00 €</span>
                </div>
                <p className="item-choices">Pastilla croustillante aux amandes, Bourek traditionnel doré, Harira parfumée ou Chorba Frik au blé concassé.</p>
              </div>

              <div className="menu-section-item">
                <div className="item-title-row">
                  <h3>Plat</h3>
                  <span className="item-price">13,00 €</span>
                </div>
                <p className="item-choices">Couscous traditionnel généreux aux légumes et viandes fondantes, ou Tajine mijoté aux légumes de saison avec épices secrètes.</p>
              </div>

              <div className="menu-section-item">
                <div className="item-title-row">
                  <h3>Dessert</h3>
                  <span className="item-price">4,00 €</span>
                </div>
                <p className="item-choices">Salade de fruits frais de saison parfumée à la fleur d'oranger & menthe, ou Crème de riz traditionnelle (Mahalabiya) cannelle & fleur d'oranger.</p>
              </div>
            </div>

            <div className="prestation-note">
              <span className="veg-badge">Option végétarienne possible sur tout le menu</span>
            </div>
          </div>

          {/* Formules Card */}
          <div className="prestation-formulas-card">
            <div className="formulas-header">
              <Sparkles size={20} className="sparkle-icon" />
              <h2>Nos Formules Sevrées</h2>
            </div>

            <div className="formulas-list">
              <div className="formula-item">
                <div className="formula-info">
                  <h3>Formule Plat + Dessert</h3>
                  <p>La simplicité gourmande d'un plat mijoté suivi d'une touche sucrée.</p>
                </div>
                <div className="formula-price-tag">16€ <span className="price-unit">/ pers.</span></div>
              </div>

              <div className="formula-item">
                <div className="formula-info">
                  <h3>Formule Entrée + Plat</h3>
                  <p>L'essentiel des saveurs salées traditionnelles algériennes.</p>
                </div>
                <div className="formula-price-tag">17€ <span className="price-unit">/ pers.</span></div>
              </div>

              <div className="formula-item featured">
                <div className="formula-info">
                  <h3>Menu Complet</h3>
                  <p>Entrée + Plat + Dessert pour un voyage gustatif absolu.</p>
                </div>
                <div className="formula-price-tag">21€ <span className="price-unit">/ pers.</span></div>
              </div>
            </div>

            <div className="cta-box">
              <p>Tarifs adaptés selon le nombre d'invités et le lieu de votre réception.</p>
              <a href="#contact" className="btn btn-primary btn-block">
                Demander un Devis Personnalisé
              </a>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="prestation-info-banner">
          <div className="info-content">
            <h3>Organisation de Noces & Grands Événements</h3>
            <p>
              Nous mettons à votre service tout notre savoir-faire pour concevoir des buffets et repas de noces traditionnels d'exception. De la décoration thématique des tables à la location de vaisselle et au service en salle, nous prenons soin de chaque détail pour sublimer votre plus beau jour.
            </p>
            <div className="info-badges">
              <span>Fait Maison à Bordeaux</span>
              <span>Service en Salle & Matériel</span>
              <span>Gironde & Alentours</span>
            </div>
          </div>
          <div className="info-illustration">
            <div className="circle-image-wrapper">
              <img src="/logo.svg" alt="Cœur d'Oran" className="circular-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
