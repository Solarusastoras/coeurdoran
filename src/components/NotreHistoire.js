import React, { useState } from 'react';

const services = [
  {
    id: 'traiteur',
    title: 'Traiteur Oriental',
    desc: 'Découvrez nos spécialités algériennes sur-mesure pour vos événements privés et professionnels sur Bordeaux et la Gironde.',
    cta: 'Voir la carte',
    tab: 'client',
    bg: 'card-bg-traiteur',
    emoji: '🍲',
  },
  {
    id: 'ateliers',
    title: 'Ateliers Culinaires',
    desc: 'Venez apprendre et partager les secrets de la cuisine algérienne lors de cours animés par Djaouida. Pour tous les niveaux.',
    cta: 'Voir les ateliers',
    tab: 'workshops',
    bg: 'card-bg-ateliers',
    emoji: '👩‍🍳',
  },
];

const valeurs = [
  { emoji: '🧑‍🍳', label: 'Fait Maison', desc: 'Chaque plat, chaque pièce, préparée avec patience et générosité.' },
  { emoji: '🍃', label: 'Éco-Responsable', desc: 'Des produits de qualité, choisis avec soin et respect de la saison.' },
  { emoji: '📖', label: 'Recettes de Famille', desc: 'Des saveurs authentiques transmises de génération en génération.' },
  { emoji: '📍', label: 'Gironde & Nouvelle-Aquitaine', desc: 'Traiteur de proximité, présente sur tout le département.' },
];

export default function NotreHistoire({ setActiveTab }) {
  return (
    <div className="nh-page">


      {/* ════════════════════════════════
          SECTION 2 — C'est quoi ?
          Photo gauche / grand texte droite (style Marie Curry)
          fond blanc, texte grand et aéré
      ════════════════════════════════ */}
      <section className="nh-cest-quoi">
        {/* Colonne gauche : photo */}
        <div className="nh-cq-photo-col">
          <div className="nh-cq-photo-frame">
            <img
              src="/djaouida_portrait.png"
              alt="Djaouida, fondatrice de Cœur d'Oran"
              className="nh-cq-photo"
            />
            {/* Badge flottant */}
            <div className="nh-cq-badge">
              <span>🇩🇿</span>
              <span>Oranaise · Bordeaux</span>
            </div>
          </div>
        </div>

        {/* Colonne droite : texte */}
        <div className="nh-cq-text-col">
          <h1 className="nh-cq-headline">
            Cœur d'Oran,<br />
            c'est quoi&nbsp;?
          </h1>

          <p className="nh-cq-body">
            Cœur d'Oran, c'est une histoire de <strong>cœur, de courage et de cuisine</strong>.
          </p>
          <p className="nh-cq-body">
            Je m'appelle <strong>Djaouida</strong>. Originaire d'Algérie, ancienne fonctionnaire de police, j'ai toujours porté en moi l'amour des bons plats — de ceux que l'on prépare avec patience et générosité.
          </p>
          <p className="nh-cq-body">
            Après un nouveau départ en France, j'ai choisi de me réinventer à travers ce qui m'anime depuis toujours : la cuisine. C'est ainsi qu'est né <strong>Cœur d'Oran</strong> : un traiteur oriental éco-responsable, où chaque plat est fait maison, avec des produits de qualité et une vraie volonté de bien manger.
          </p>

          {/* Phrase-clé capslock couleur (style Marie Curry) */}
          <p className="nh-cq-keyphrase">
            Manger Cœur d'Oran, c'est se laisser voyager en Algérie avec des saveurs raffinées, des recettes de famille et une touche bien à moi.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════
          SECTION 3 — 2 grands titres split (style ESUS section)
          Fond beige, grand texte bold 2 colonnes
      ════════════════════════════════ */}
      <section className="nh-pillars-header-split">
        <div className="nh-ph-left">
          <p className="nh-ph-big">Un traiteur<br />fait maison</p>
        </div>
        <div className="nh-ph-divider" />
        <div className="nh-ph-right">
          <p className="nh-ph-big">Une cuisine<br />éco-responsable</p>
        </div>
      </section>

      {/* ════════════════════════════════
          SECTION 4 — Grille piliers avec illustrations (style Marie Curry)
          Fond beige, 3 colonnes, grandes illustrations en trait
      ════════════════════════════════ */}
      <section className="nh-pillars-grid-section">
        {valeurs.map((v, i) => (
          <div className="nh-pillar-item" key={i}>
            <div className="nh-pillar-illus">{v.emoji}</div>
            <h3 className="nh-pillar-title">{v.label}</h3>
            <p className="nh-pillar-text">{v.desc}</p>
          </div>
        ))}
      </section>

      {/* ════════════════════════════════
          SECTION 5 — Portrait circulaire sur fond sombre
          (style Marie Curry équipe, fond vert sombre)
      ════════════════════════════════ */}
      <section className="nh-team-dark">
        <h2 className="nh-team-title">La fondatrice</h2>

        <div className="nh-team-portrait-wrap">
          {/* Portrait centré, agrandi, style Marie Curry */}
          <div className="nh-team-portrait-card">
            <div className="nh-team-portrait-circle">
              <img
                src="/djaouida_portrait.png"
                alt="Djaouida"
                className="nh-team-portrait-img"
              />
            </div>
            <p className="nh-team-name">Djaouida</p>
            <p className="nh-team-role">Créatrice &amp; Fondatrice</p>
            <p className="nh-team-origin">Oranaise 🇩🇿</p>
          </div>
        </div>

        {/* Grande citation, style Marie Curry */}
        <blockquote className="nh-team-quote">
          <span className="nh-quote-mark">"</span>
          Mon ambition&nbsp;? Vous faire voyager en Algérie avec des saveurs raffinées, des recettes de famille et une touche bien à moi.
          <span className="nh-quote-mark">"</span>
        </blockquote>

        {/* Signature sous la citation */}
        <p className="nh-team-sig">— Djaouida, Bordeaux ✨</p>
      </section>

    </div>
  );
}
