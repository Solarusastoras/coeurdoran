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

      {/* Le Parchemin Impérial centré */}
      <div className="repas-assis-parchment-wrapper">
        <div className="repas-assis-parchment">

          {/* Bordure ornementée interne */}
          <div className="parchment-inner-border">

            {/* Logo et Entête */}
            <header className="parchment-header">
              <div className="palace-badge">
                <Utensils size={16} />
                <span>Banquet Impérial</span>
              </div>
              <h1>Repas Assis & Banquets</h1>
              <p className="parchment-tagline">L'excellence de la gastronomie algérienne servie à table</p>
              <div className="royal-separator">⚜ ۞ ⚜</div>
            </header>

            {/* Menu Séquentiel (Entrée -> Plat -> Dessert) */}
            <div className="parchment-menu-sequence">

              <div className="parchment-course-section">
                <span className="course-title">Pour Commencer</span>
                <h2 className="course-name">L'Entrée</h2>
                <p className="course-desc">
                  Pastilla croustillante aux amandes effilées, Bourek traditionnel doré au four, Harira parfumée à la coriandre fraîche ou Chorba Frik au blé concassé mijoté.
                </p>
                <span className="course-price-estimate">Dès 5,00 €</span>
              </div>

              <div className="parchment-separator">✦ ✧ ✦</div>

              <div className="parchment-course-section">
                <span className="course-title">Le Cœur du Festin</span>
                <h2 className="course-name">Le Plat</h2>
                <p className="course-desc">
                  Couscous traditionnel généreux aux légumes du soleil et viandes fondantes, ou Tajine mijoté de agneau ou poulet aux pruneaux caramélisés et amandes grillées.
                </p>
                <span className="course-price-estimate">Dès 13,00 €</span>
              </div>

              <div className="parchment-separator">✦ ✧ ✦</div>

              <div className="parchment-course-section">
                <span className="course-title">La Note Douce</span>
                <h2 className="course-name">Le Dessert</h2>
                <p className="course-desc">
                  Salade de fruits frais parfumée à la fleur d'oranger & menthe fraîche, ou Mahalabiya traditionnelle (crêpe/crème de riz veloutée à la cannelle).
                </p>
                <span className="course-price-estimate">Dès 4,00 €</span>
              </div>

            </div>

            {/* Les Formules Officielles */}
            <div className="parchment-formulas-box">
              <div className="formulas-box-header">
                <h3>Nos Formules de Réception</h3>
              </div>
              <div className="formulas-horizontal-row">
                <div className="parchment-formula-item">
                  <h4>Plat + Dessert</h4>
                  <span className="pf-price">16€ <span className="pf-unit">/ pers.</span></span>
                </div>
                <div className="parchment-formula-item">
                  <h4>Entrée + Plat</h4>
                  <span className="pf-price">17€ <span className="pf-unit">/ pers.</span></span>
                </div>
                <div className="parchment-formula-item featured">
                  <h4>Menu Complet</h4>
                  <span className="pf-price">21€ <span className="pf-unit">/ pers.</span></span>
                </div>
              </div>
            </div>

            <div className="parchment-footer">
              <span className="veg-badge">Option végétarienne disponible sur demande pour chaque service</span>
              <p className="terms-info">Tarifs adaptés selon le nombre d'invités et le lieu de votre réception.</p>
              <div className="cta-box">
                <a href="#contact" className="btn btn-primary">
                  Demander un Devis Personnalisé
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Info Banner en dessous du parchemin */}
      <div className="prestation-container">
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
              <img src="/logo192.png" alt="Cœur d'Oran" className="circular-img" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
