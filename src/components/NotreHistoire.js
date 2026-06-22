import React from 'react';
import { Heart, Sparkles, Leaf, Award, MapPin, Star } from 'lucide-react';

const VALUES = [
  {
    icon: <Heart size={22} />,
    label: 'Fait Maison',
    desc: 'Chaque plat, chaque pièce, préparé avec patience et générosité.',
  },
  {
    icon: <Leaf size={22} />,
    label: 'Éco-Responsable',
    desc: 'Des produits de qualité, choisis avec soin et respect de la saison.',
  },
  {
    icon: <Award size={22} />,
    label: 'Saveurs Authentiques',
    desc: 'Recettes de famille, transmises et revisitées avec une touche unique.',
  },
  {
    icon: <MapPin size={22} />,
    label: 'Basée à Bordeaux',
    desc: 'Traiteur de proximité, livraison & ateliers sur Bordeaux et alentours.',
  },
];

export default function NotreHistoire() {
  return (
    <div className="histoire-page">
      {/* ─── HERO BANNER ─── */}
      <div className="histoire-hero">
        <div className="histoire-hero-overlay" />
        <div className="histoire-hero-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>Notre Histoire</span>
          </div>
          <h1>
            Pour me <span className="text-gold">connaître</span>
          </h1>
          <p>Une histoire de cœur, de courage et de cuisine.</p>
        </div>
      </div>

      {/* ─── MAIN STORY SECTION ─── */}
      <div className="histoire-body">
        {/* Left: portrait */}
        <div className="histoire-portrait-col">
          <div className="portrait-frame">
            <div className="portrait-img-wrapper">
              <img
                src="/logo512.png"
                alt="Djaouida, fondatrice de Cœur d'Oran"
                className="portrait-img"
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div className="portrait-fallback">
                <span>D</span>
              </div>
            </div>
            <div className="portrait-caption">
              <div className="portrait-name-badge">
                <Star size={14} className="portrait-star" />
                <span>Djaouida</span>
              </div>
              <p>Fondatrice & Créatrice</p>
              <p className="portrait-flag">🇩🇿 Originaire d'Oran · Bordeaux</p>
            </div>
          </div>

          {/* Floating quote card */}
          <div className="histoire-quote-card">
            <span className="histoire-quote-mark">"</span>
            <p>
              Mon ambition ? Vous faire voyager en Algérie avec des saveurs raffinées, des recettes de famille et une touche bien à moi.
            </p>
            <span className="histoire-quote-emoji">🇩🇿✨</span>
          </div>
        </div>

        {/* Right: text */}
        <div className="histoire-text-col">
          <div className="histoire-lead-block">
            <p className="histoire-lead">
              Je m'appelle Djaouida, et derrière Cœur d'Oran, c'est une histoire de cœur, de courage et de cuisine.
            </p>
          </div>

          <div className="histoire-paragraphs">
            <p>
              Originaire d'Algérie, ancienne fonctionnaire de police, j'ai toujours porté en moi l'amour des bons plats — de ceux que l'on prépare avec patience et générosité.
            </p>
            <p>
              Après un nouveau départ en France, j'ai choisi de me réinventer à travers ce qui m'anime depuis toujours : la cuisine. C'est ainsi qu'est né <strong>Cœur d'Oran</strong> : un traiteur oriental éco-responsable, où chaque plat, chaque pièce est fait maison, avec des produits de qualité et une vraie volonté de bien manger.
            </p>
          </div>

          {/* Signature block */}
          <div className="histoire-signature">
            <div className="signature-bar" />
            <div className="signature-content">
              <div className="signature-heart-icon">
                <Heart size={18} fill="currentColor" />
              </div>
              <div>
                <span className="signature-main-name">Djaouida</span>
                <span className="signature-role">Créatrice de Cœur d'Oran</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── VALUES STRIP ─── */}
      <div className="histoire-values-strip">
        <div className="histoire-values-header">
          <h2 className="section-title">Nos Engagements</h2>
          <p className="section-subtitle">Ce qui nous définit chaque jour</p>
        </div>
        <div className="histoire-values-grid">
          {VALUES.map((v, i) => (
            <div className="histoire-value-card" key={i}>
              <div className="value-icon-ring">{v.icon}</div>
              <h3>{v.label}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── BOTTOM CTA ─── */}
      <div className="histoire-cta-section">
        <div className="histoire-cta-card">
          <Sparkles size={28} className="cta-sparkle" />
          <h2>Prêt à voyager en Algérie ?</h2>
          <p>Découvrez notre carte de spécialités et laissez-vous séduire par les saveurs de Djaouida.</p>
        </div>
      </div>
    </div>
  );
}
