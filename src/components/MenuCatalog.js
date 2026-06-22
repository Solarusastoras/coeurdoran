import React, { useState } from 'react';
import { Search, Sparkles, AlertCircle, X } from 'lucide-react';
import { getImageUrl } from '../utils/api';
import './MenuCatalog.scss';

export default function MenuCatalog({ menuItems }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeImage, setActiveImage] = useState(null);

  const categories = [
    { id: 'all', label: 'Tous les délices' },
    { id: 'entree', label: 'Entrées' },
    { id: 'plat', label: 'Plats Principaux' },
    { id: 'desert', label: 'Desserts' },
    { id: 'boisson', label: 'Boissons & Vins' }
  ];

  // Filtrer les éléments par catégorie et recherche
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.tags && item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  // Helper pour formater le prix
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };

  const categoriesList = [
    { id: 'entree', label: 'Nos Entrées Gourmandes' },
    { id: 'plat', label: 'Nos Plats de Prestige' },
    { id: 'desert', label: 'Nos Douceurs & Desserts' },
    { id: 'boisson', label: 'Boissons & Sélection du Sommelier' }
  ];

  // Rendu d'une carte d'article individuelle
  const renderItemCard = (item) => {
    const imgUrl = getImageUrl(item.image);
    return (
      <div key={item.id} className="menu-card">
        <div 
          className="menu-card-image-container"
          style={{ cursor: imgUrl ? 'pointer' : 'default' }}
          onClick={imgUrl ? () => setActiveImage({ src: imgUrl, alt: item.name, title: item.name }) : undefined}
        >
          {imgUrl ? (
            <img 
              src={imgUrl} 
              alt={item.name} 
              className="menu-card-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="menu-card-image-fallback" style={{ display: imgUrl ? 'none' : 'flex' }}>
            <div className="fallback-inner">
              <span className="fallback-initials">
                {item.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
              </span>
            </div>
          </div>
          
          {/* Badge de catégorie */}
          <span className="menu-card-category-badge">
            {item.category === 'entree' && 'Entrée'}
            {item.category === 'plat' && 'Plat'}
            {item.category === 'desert' && 'Dessert'}
            {item.category === 'boisson' && 'Boisson'}
          </span>
        </div>

        <div className="menu-card-content">
          <div className="menu-card-header">
            <h3 className="menu-card-title" style={{ width: '100%' }}>{item.name}</h3>
          </div>
          
          <p className="menu-card-desc">{item.description}</p>

          <div className="menu-card-footer">
            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="menu-card-tags">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="tag">
                    <Sparkles size={10} className="tag-icon" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Allergènes */}
            {item.allergens && item.allergens.length > 0 && (
              <div className="menu-card-allergens" title="Informations allergènes">
                <AlertCircle size={14} className="allergen-icon" />
                <span>Allergènes : {item.allergens.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="catalog-section" id="menu-catalog">
      <div className="catalog-header">
        <h2 className="section-title">Notre Collection Culinaire</h2>
        <p className="section-subtitle">Découvrez notre sélection de mets préparés avec soin pour éveiller vos papilles</p>
      </div>

      {/* Barre de recherche et Filtres */}
      <div className="catalog-controls">
        <div className="search-bar-wrapper">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Rechercher un plat, un ingrédient, une spécialité..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grille du Menu */}
      {filteredItems.length > 0 ? (
        selectedCategory === 'all' ? (
          <div className="catalog-groups-wrapper">
            {categoriesList.map(cat => {
              const catItems = filteredItems.filter(item => item.category === cat.id);
              if (catItems.length === 0) return null;
              return (
                <div key={cat.id} className="catalog-category-group">
                  <h3 className="catalog-group-title">{cat.label}</h3>
                  <div className="catalog-group-underline"></div>
                  <div className="menu-grid">
                    {catItems.map(item => renderItemCard(item))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="menu-grid">
            {filteredItems.map(item => renderItemCard(item))}
          </div>
        )
      ) : (
        <div className="no-results">
          <h3>Aucun plat trouvé</h3>
          <p>Essayez de modifier vos filtres ou d'affiner votre recherche.</p>
        </div>
      )}
      {/* Lightbox Modal for Dish Images */}
      {activeImage && (
        <div className="image-modal-overlay" onClick={() => setActiveImage(null)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveImage(null)} aria-label="Fermer">
              <X size={28} />
            </button>
            <img src={activeImage.src} alt={activeImage.alt} className="modal-full-image" />
            <p className="modal-image-caption">{activeImage.title}</p>
          </div>
        </div>
      )}
    </section>
  );
}
