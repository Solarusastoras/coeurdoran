import React from 'react';
import { ChefHat, Utensils, Wine, Coffee, Sparkles, Check, HelpCircle } from 'lucide-react';

export default function CateringFormulas() {
  return (
    <section className="catering-section" id="menu-formulas">
      <div className="catalog-header">
        <div className="section-badge">
          <Sparkles size={16} />
          <span>Prestations Événementielles</span>
        </div>
        <h2 className="section-title">Nos Formules sur-mesure</h2>
        <p className="section-subtitle">
          Découvrez toutes nos formules pour vos réceptions privées et professionnelles, adaptées sur devis.
        </p>
      </div>

      <div className="formulas-grid">
        {/* Card 1: Repas Assis */}
        <div className="formula-card">
          <div className="formula-card-header">
            <div className="formula-icon-ring ring-olive">
              <Utensils size={24} />
            </div>
            <h3 className="formula-card-title">Repas Assis</h3>
            <p className="formula-card-subtitle">Un service traditionnel à table</p>
          </div>
          <div className="formula-card-body">
            <div className="formula-menu-group">
              <h4>Entrée</h4>
              <p>Pastilla, Bourek, Harira ou Chorba</p>
            </div>
            <div className="formula-menu-group">
              <h4>Plat</h4>
              <p>Couscous ou Tajine aux légumes de saison</p>
            </div>
            <div className="formula-menu-group">
              <h4>Dessert</h4>
              <p>Salade de fruits de saison parfumée à l'eau de fleur d'oranger & menthe, ou Crème de riz aux raisins, cannelle & fleur d'oranger</p>
            </div>
            
            <div className="formula-variations">
              <h5>Formules possibles</h5>
              <ul>
                <li><Check size={14} className="check-icon" /> Entrée + Plat</li>
                <li><Check size={14} className="check-icon" /> Plat + Dessert</li>
                <li><Check size={14} className="check-icon" /> Menu Complet (Entrée + Plat + Dessert)</li>
              </ul>
              <span className="veg-option">Option végétarienne possible sur tout le menu</span>
            </div>
          </div>
        </div>

        {/* Card 2: Buffets Déjeunatoires & Dînatoires */}
        <div className="formula-card">
          <div className="formula-card-header">
            <div className="formula-icon-ring ring-terra">
              <ChefHat size={24} />
            </div>
            <h3 className="formula-card-title">Buffets</h3>
            <p className="formula-card-subtitle">Déjeunatoires & Dînatoires</p>
          </div>
          <div className="formula-card-body">
            <p className="formula-intro">
              Une sélection conviviale de pièces salées et sucrées pour vos événements professionnels ou familiaux.
            </p>
            <div className="formula-options-list">
              <div className="formula-option-item">
                <div className="option-title">Formule 7 pièces</div>
                <div className="option-desc">5 à 6 pièces salées · 1 à 2 pièces sucrées</div>
              </div>
              <div className="formula-option-item">
                <div className="option-title">Formule 8 pièces</div>
                <div className="option-desc">6 à 7 pièces salées · 1 à 2 pièces sucrées</div>
              </div>
              <div className="formula-option-item">
                <div className="option-title">Formule 9 pièces</div>
                <div className="option-desc">7 à 8 pièces salées · 1 à 2 pièces sucrées</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Cocktail Apéritif */}
        <div className="formula-card">
          <div className="formula-card-header">
            <div className="formula-icon-ring ring-orange">
              <Wine size={24} />
            </div>
            <h3 className="formula-card-title">Cocktail Apéritif</h3>
            <p className="formula-card-subtitle">Pour vos débuts de réception</p>
          </div>
          <div className="formula-card-body">
            <p className="formula-intro">
              Des bouchées et pièces apéritives raffinées pour ouvrir l'appétit de vos invités avec élégance.
            </p>
            <div className="formula-options-list">
              <div className="formula-option-item">
                <div className="option-title">Formule 3 pièces</div>
                <div className="option-desc">3 pièces salées savoureuses</div>
              </div>
              <div className="formula-option-item">
                <div className="option-title">Formule 4 pièces</div>
                <div className="option-desc">3 pièces salées · 1 pièce sucrée</div>
              </div>
              <div className="formula-option-item">
                <div className="option-title">Formule 5 pièces</div>
                <div className="option-desc">4 pièces salées · 1 pièce sucrée</div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Petits-Déjeuners & Brunchs */}
        <div className="formula-card">
          <div className="formula-card-header">
            <div className="formula-icon-ring ring-olive">
              <Coffee size={24} />
            </div>
            <h3 className="formula-card-title">Matinées & Brunchs</h3>
            <p className="formula-card-subtitle">Formules matinales douces & épicées</p>
          </div>
          <div className="formula-card-body">
            <p className="formula-intro">
              Idéal pour vos séminaires du matin, lendemains de fête ou moments conviviaux en matinée.
            </p>
            <div className="formula-options-list">
              <div className="formula-option-item">
                <div className="option-title">Formule Simple</div>
                <div className="option-desc">Café ou thé + jus + 1 gâteau traditionnel</div>
              </div>
              <div className="formula-option-item">
                <div className="option-title">Formule Complète</div>
                <div className="option-desc">Café ou thé + jus + 1 gâteau + dessert</div>
              </div>
              <div className="formula-option-item">
                <div className="option-title">Formule Gourmande</div>
                <div className="option-desc">Café ou thé + jus + 2 gâteaux + dessert</div>
              </div>
              <div className="formula-option-item">
                <div className="option-title">Formule Brunch</div>
                <div className="option-desc">Café ou thé + jus + 2 gâteaux + dessert complet</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Clés en main (style page 2 du flyer) */}
      <div className="formulas-services-banner">
        <div className="fs-left">
          <h3>Cœur d'Oran</h3>
          <span className="fs-tag">Traiteur Algérien Éco-Responsable</span>
          <p className="fs-bio">
            Cœur d'Oran est un traiteur algérien éco-responsable et unique basé en Gironde, qui vous propose une cuisine maison, saine et généreuse. Chaque plat raconte une histoire de partage, de saveurs et de passion.
          </p>
          <div className="fs-badge">
            <span>Fait Maison à Bordeaux 🇩🇿✨</span>
          </div>
        </div>
        <div className="fs-divider" />
        <div className="fs-right">
          <h4>Des Prestations Clés en Main</h4>
          <p className="fs-subtitle">Pour vous simplifier la vie, je m'occupe de tout :</p>
          
          <ul className="services-ul">
            <li><Check size={18} className="svc-check" /> <strong>Livraison et reprise</strong> de vos contenants</li>
            <li><Check size={18} className="svc-check" /> <strong>Location de matériel</strong> de réception</li>
            <li><Check size={18} className="svc-check" /> <strong>Service en salle</strong> professionnel</li>
            <li><Check size={18} className="svc-check" /> <strong>Mises en place</strong> et décoration de buffet</li>
          </ul>

          <div className="fs-disclaimer">
            <HelpCircle size={16} />
            <span>Les tarifs sont adaptés et personnalisés sur devis selon le nombre de personnes et la distance de livraison.</span>
          </div>

          <a href="#contact" className="btn btn-primary fs-btn">
            Demander un Devis Personnalisé
          </a>
        </div>
      </div>
    </section>
  );
}
