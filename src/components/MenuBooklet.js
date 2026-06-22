import React, { useState } from 'react';
import { Printer, Eye, Settings, FileText, CheckSquare, Square } from 'lucide-react';
import './MenuBooklet.scss';

// Helper pour souligner le O dans les textes dynamiques contenant "Oran"
const renderTextWithUnderlineO = (text) => {
  if (!text) return text;
  const regex = /(oran)/i;
  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (part.toLowerCase() === 'oran') {
      const firstLetter = part[0].toLowerCase();
      const rest = part.slice(1);
      return (
        <span key={i}>
          <span className="underlined-o">{firstLetter}</span>{rest}
        </span>
      );
    }
    // Remplacer "Coeur" par "Cœur" si présent pour plus d'élégance
    const normalizedPart = part.replace(/Coeur/g, 'Cœur');
    return normalizedPart;
  });
};

export default function MenuBooklet({ menuItems }) {
  const [bookletTitle, setBookletTitle] = useState('Carte des Festivités');
  const [bookletSubtitle, setBookletSubtitle] = useState("Cœur d’Oran • Bordeaux & Nouvelle-Aquitaine");
  const [introText, setIntroText] = useState('Une sélection de nos plus belles créations culinaires préparées pour votre événement unique.');
  const [showPrices, setShowPrices] = useState(true);
  const [showDescriptions, setShowDescriptions] = useState(true);
  const [showAllergens, setShowAllergens] = useState(false);
  const [selectedIds, setSelectedIds] = useState(menuItems.map(item => item.id));

  // Toggle selection pour un plat
  const toggleItemSelection = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(itemId => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Sélectionner / Désélectionner tout
  const selectAll = () => {
    setSelectedIds(menuItems.map(item => item.id));
  };
  const selectNone = () => {
    setSelectedIds([]);
  };

  // Filtrer les plats sélectionnés
  const selectedItems = menuItems.filter(item => selectedIds.includes(item.id));

  // Regrouper par catégorie pour le fascicule
  const categoriesMap = {
    entree: { label: 'Entrées Raffinées', items: [] },
    plat: { label: 'Plats de Prestige', items: [] },
    desert: { label: 'Douceurs & Desserts', items: [] },
    boisson: { label: 'Boissons & Sélection du Sommelier', items: [] }
  };

  selectedItems.forEach(item => {
    if (categoriesMap[item.category]) {
      categoriesMap[item.category].items.push(item);
    }
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="booklet-section">
      <div className="booklet-intro-header">
        <h2 className="section-title">Impression de Fascicule</h2>
        <p className="section-subtitle">Concevez et imprimez un menu personnalisé élégant pour vos tables de réception.</p>
      </div>

      <div className="booklet-workspace">
        {/* Panneau de configuration (Masqué lors de l'impression) */}
        <div className="booklet-config-panel no-print">
          <div className="config-group">
            <h3>
              <Settings size={18} className="config-icon" />
              Personnalisation
            </h3>

            <label className="config-label">
              Titre du fascicule
              <input
                type="text"
                value={bookletTitle}
                onChange={(e) => setBookletTitle(e.target.value)}
                placeholder="Ex: Menu de Mariage"
                className="config-input"
              />
            </label>

            <label className="config-label">
              Sous-titre / Date
              <input
                type="text"
                value={bookletSubtitle}
                onChange={(e) => setBookletSubtitle(e.target.value)}
                placeholder="Ex: 20 Juin 2026 - Château..."
                className="config-input"
              />
            </label>

            <label className="config-label">
              Texte de bienvenue
              <textarea
                value={introText}
                onChange={(e) => setIntroText(e.target.value)}
                placeholder="Message court en première page..."
                className="config-textarea"
                rows={3}
              />
            </label>
          </div>

          <div className="config-group">
            <h3>
              <FileText size={18} className="config-icon" />
              Options d'affichage
            </h3>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={showPrices}
                onChange={(e) => setShowPrices(e.target.checked)}
              />
              Afficher les tarifs
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={showDescriptions}
                onChange={(e) => setShowDescriptions(e.target.checked)}
              />
              Afficher les descriptions
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={showAllergens}
                onChange={(e) => setShowAllergens(e.target.checked)}
              />
              Afficher les allergènes
            </label>
          </div>

          <div className="config-group">
            <div className="config-group-header">
              <h3>
                <CheckSquare size={18} className="config-icon" />
                Sélection des Plats ({selectedItems.length})
              </h3>
              <div className="selection-actions">
                <button onClick={selectAll} className="btn-link">Tout</button>
                <span>/</span>
                <button onClick={selectNone} className="btn-link">Aucun</button>
              </div>
            </div>

            <div className="item-selector-list">
              {menuItems.map(item => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`selector-item-row ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleItemSelection(item.id)}
                  >
                    {isSelected ? <CheckSquare size={16} className="checked-box" /> : <Square size={16} />}
                    <div className="selector-item-info">
                      <span className="selector-item-name">{item.name}</span>
                      <span className="selector-item-cat">
                        {item.category === 'entree' && 'Entrée'}
                        {item.category === 'plat' && 'Plat'}
                        {item.category === 'desert' && 'Dessert'}
                        {item.category === 'boisson' && 'Boisson'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button onClick={handlePrint} className="btn btn-primary btn-block btn-lg print-trigger-btn">
            <Printer size={20} />
            Imprimer / Enregistrer PDF
          </button>
        </div>

        {/* Aperçu du fascicule papier (Imprimé tel quel via @media print) */}
        <div className="booklet-preview-container">
          <div className="preview-watermark no-print">
            <Eye size={16} />
            <span>Aperçu de la page d'impression</span>
          </div>

          <div className="booklet-paper">
            {/* Page 1: Couverture */}
            <div className="booklet-page cover-page">
              <div className="cover-border">
                <div className="cover-header">
                  <img src="/logo.svg" alt="Logo Cœur d’Oran" className="cover-logo" />
                  <span className="cover-brand">{renderTextWithUnderlineO("Cœur d’Oran")}</span>
                  <span className="cover-location">Bordeaux • Gironde</span>
                </div>

                <div className="cover-title-block">
                  <h1 className="cover-title">{bookletTitle}</h1>
                  <div className="cover-divider">
                    <span className="divider-diamond"></span>
                  </div>
                  <p className="cover-subtitle">{renderTextWithUnderlineO(bookletSubtitle)}</p>
                </div>

                {introText && (
                  <div className="cover-intro">
                    <p>{introText}</p>
                  </div>
                )}

                <div className="cover-footer">
                  <p className="cover-website">www.coeur-doran.fr</p>
                  <p className="cover-phone">Prestations & Cocktails : 07 81 42 59 58</p>
                </div>
              </div>
            </div>

            {/* Page de Saut (Sera forcée à l'impression) */}
            <div className="print-page-break"></div>

            {/* Page 2: Contenu du Menu */}
            <div className="booklet-page menu-content-page">
              <div className="menu-page-header">
                <h2>{bookletTitle}</h2>
                <div className="header-line"></div>
              </div>

              <div className="menu-print-sections">
                {Object.entries(categoriesMap).map(([key, category]) => {
                  if (category.items.length === 0) return null;
                  return (
                    <div key={key} className="print-category-section">
                      <h3 className="print-category-title">{category.label}</h3>
                      <div className="print-category-divider"></div>

                      <div className="print-items-list">
                        {category.items.map(item => (
                          <div key={item.id} className="print-menu-item">
                            <div className="print-item-header">
                              <span className="print-item-name">{item.name}</span>
                              {showPrices && (
                                <>
                                  <span className="print-item-dots"></span>
                                  <span className="print-item-price">{formatPrice(item.price)}</span>
                                </>
                              )}
                            </div>

                            {showDescriptions && item.description && (
                              <p className="print-item-desc">{item.description}</p>
                            )}

                            {showAllergens && item.allergens && item.allergens.length > 0 && (
                              <span className="print-item-allergens">
                                * Allergènes : {item.allergens.join(', ')}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="menu-page-footer">
                <div className="footer-line"></div>
                 <p>{renderTextWithUnderlineO("Coeur d'Oran Bordeaux - 45 Cours de l'Intendance - Gironde - Tél: 07 81 42 59 58")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
