import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section className="about-section" id="a-propos">
      <div className="about-container">
        <div className="about-card">
          <div className="about-badge">
            <Sparkles size={16} />
            <span>Notre Histoire</span>
          </div>

          <h2 className="about-title">Pour nous connaître</h2>

          <div className="about-content">
            <div className="about-quote-container">
              <span className="quote-mark">“</span>
              <p className="about-lead">
                Je m’appelle Djaouida, et derrière Cœur d’Oran, c’est une histoire de cœur, de courage et de cuisine.
              </p>
            </div>

            <div className="about-body">
              <p>
                Originaire d’Algérie, ancienne fonctionnaire de police, j’ai toujours porté en moi l’amour des bons plats, de ceux que l’on prépare avec patience et générosité.
              </p>
              <p>
                Après un nouveau départ en France, j’ai choisi de me réinventer à travers ce qui m’anime depuis toujours : la cuisine. C’est ainsi qu’est né Cœur d’Oran : un traiteur oriental éco-responsable, où chaque plat, chaque pièce est fait maison, avec des produits de qualité et une vraie volonté de bien manger.
              </p>
              <p className="about-ambition">
                Mon ambition ? Vous faire voyager en Algérie avec des saveurs raffinées, des recettes de famille et une touche bien à moi. 🇩🇿✨
              </p>
            </div>

            <div className="about-signature">
              <div className="signature-heart">
                <Heart size={20} className="heart-icon animate-pulse" />
              </div>
              <div className="signature-text">
                <span className="signature-name">Djaouida</span>
                <span className="signature-title">Créatrice de Cœur d'Oran</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
