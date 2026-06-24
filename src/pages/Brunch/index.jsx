import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ArrowLeft, Check, Sparkles } from 'lucide-react';
import './brunch.scss';

export default function Brunch() {
  return (
    <div className="brunch-page">
      <div className="brunch-asymmetric-wrapper">

        {/* Colonne Gauche - Le Panneau Arche fixe */}
        <aside className="brunch-left-panel">
          <div className="page-header-nav">
            <Link to="/" className="back-link">
              <ArrowLeft size={16} />
              <span>Retour</span>
            </Link>
          </div>

          <div className="patio-arch-card">
            <div className="prestation-badge">
              <Coffee size={14} />
              <span>Matinées & Brunchs</span>
            </div>
            <h1>Matinées & Brunchs</h1>
            <p className="prestation-tagline">
              Des formules matinales douces, épicées et conviviales pour vos lendemains de fêtes ou réunions d'entreprise.
            </p>
            <div className="patio-illustration">
              <img src="/logo.svg" alt="Brunch Cœur d'Oran" className="patio-logo-img" />
            </div>
          </div>
        </aside>

        {/* Colonne Droite - Contenu défilant */}
        <main className="brunch-right-content">
          {/* Section Formules */}
          <section className="brunch-section">
            <div className="section-header">
              <h2>Nos Formules Brunch</h2>
              <p>Des options adaptables selon le nombre de personnes, servies sous forme de buffet matinal.</p>
            </div>

            <div className="formulas-vertical-list">
              <div className="brunch-formula-item">
                <div className="bf-header">
                  <h3>Formule Simple</h3>
                  <span className="bf-price">Sur devis</span>
                </div>
                <p className="bf-desc">Café ou thé à la menthe + jus de fruits + 1 gâteau traditionnel algérien.</p>
              </div>

              <div className="brunch-formula-item">
                <div className="bf-header">
                  <h3>Formule Complète</h3>
                  <span className="bf-price">Sur devis</span>
                </div>
                <p className="bf-desc">Café ou thé + jus de fruits + 1 gâteau traditionnel + 1 dessert au choix.</p>
              </div>

              <div className="brunch-formula-item">
                <div className="bf-header">
                  <h3>Formule Gourmande</h3>
                  <span className="bf-price">Sur devis</span>
                </div>
                <p className="bf-desc">Café ou thé + jus de fruits + 2 gâteaux traditionnels + 1 dessert au choix.</p>
              </div>

              <div className="brunch-formula-item featured">
                <div className="bf-header">
                  <h3>Formule Brunch Complet</h3>
                  <span className="bf-price">Sur devis</span>
                </div>
                <p className="bf-desc">Café ou thé + jus de fruits + 2 gâteaux traditionnels + buffet complet salé & sucré.</p>
              </div>
            </div>
          </section>

          {/* Section Assiettes / Spécialités */}
          <section className="brunch-section specialities-section">
            <div className="section-header">
              <Sparkles size={20} className="sparkle-icon" />
              <h2>Spécialités du Matin</h2>
            </div>

            <div className="patio-plates-grid">
              <div className="patio-plate-card">
                <span className="plate-badge">Douceurs</span>
                <h3>Baghrir</h3>
                <p>Crêpes mille trous traditionnelles arrosées de miel chaud et de beurre fondu.</p>
              </div>

              <div className="patio-plate-card">
                <span className="plate-badge">Feuilleté</span>
                <h3>Msemmen</h3>
                <p>Crêpes feuilletées algériennes étirées à la main, croustillantes et fondantes.</p>
              </div>

              <div className="patio-plate-card">
                <span className="plate-badge">Boisson</span>
                <h3>Thé à la Menthe</h3>
                <p>Thé vert infusé à la menthe fraîche algérienne, servi traditionnellement.</p>
              </div>

              <div className="patio-plate-card">
                <span className="plate-badge">Parfumé</span>
                <h3>Café Cardamome</h3>
                <p>Café traditionnel parfumé à la cardamome moulue pour un réveil épicé.</p>
              </div>

              <div className="patio-plate-card">
                <span className="plate-badge">Salé</span>
                <h3>Assortiment d'Alger</h3>
                <p>Sélection d'olives marinées, fromages frais et mini-boulettes épicées.</p>
              </div>

              <div className="patio-plate-card">
                <span className="plate-badge">Chaud</span>
                <h3>Mini-Quiches</h3>
                <p>Bouchées croustillantes garnies de légumes de saison et d'épices d'Orient.</p>
              </div>
            </div>
          </section>

          {/* Info & CTA Box */}
          <section className="brunch-footer-card">
            <h3>Idéal pour les Lendemains de Fête</h3>
            <p>
              Pour prolonger la magie de votre mariage ou de vos événements familiaux, notre formule brunch est idéale. Servie de manière décontractée et chaleureuse, elle permet à vos convives de se retrouver le lendemain autour de saveurs réconfortantes et dépaysantes.
            </p>
            <div className="brunch-info-tags">
              <span>Fait Maison à Bordeaux</span>
              <span>Lendemains de Noces</span>
              <span>Livraison Gironde</span>
            </div>
            <div className="cta-action">
              <a href="#contact" className="btn btn-primary btn-block">
                Demander un Devis Personnalisé
              </a>
            </div>
          </section>
        </main>

      </div>
    </div>
  );
}
