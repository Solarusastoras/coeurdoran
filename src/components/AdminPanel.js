import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Check, Lock, Unlock, Upload, AlertTriangle, Eye } from 'lucide-react';
import { createMenuItem, updateMenuItem, deleteMenuItem, uploadImage, getImageUrl } from '../utils/api';
import './AdminPanel.scss';

export default function AdminPanel({ menuItems, onRefresh, isAdmin, setIsAdmin }) {
  const navigate = useNavigate();
  // Sécurité d'accès
  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState('');

  // Formulaire d'édition / ajout
  const [editingItem, setEditingItem] = useState(null); // null = mode ajout, sinon contient l'objet complet
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('plat');
  const [image, setImage] = useState('');
  const [tags, setTags] = useState([]);
  const [allergens, setAllergens] = useState([]);
  
  // États d'envois et messages
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // type: success / error
  const [tagInput, setTagInput] = useState('');
  const [allergenInput, setAllergenInput] = useState('');

  // Liste des tags/allergènes courants pour sélection rapide
  const suggestedTags = ['Spécialité', 'Chef\'s Special', 'Local', 'Végétarien', 'Sans Gluten', 'Chaud', 'Froid', 'Poisson', 'Signature'];
  const suggestedAllergens = ['Gluten', 'Lactose', 'Œufs', 'Crustacés', 'Poisson', 'Fruits à coque', 'Sulfites', 'Soja'];

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinCode === '1234') { // PIN de sécurité simple par défaut
      setIsAdmin(true);
      setPinError('');
    } else {
      setPinError('Code PIN incorrect. Veuillez réessayer.');
      setPinCode('');
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price.toString());
    setCategory(item.category);
    setImage(item.image);
    setTags(item.tags || []);
    setAllergens(item.allergens || []);
    setMessage({ text: '', type: '' });
    
    // Scroll vers le formulaire
    document.getElementById('admin-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingItem(null);
    setName('');
    setDescription('');
    setPrice('');
    setCategory('plat');
    setImage('');
    setTags([]);
    setAllergens([]);
    setTagInput('');
    setAllergenInput('');
    setMessage({ text: '', type: '' });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setMessage({ text: '', type: '' });
    
    try {
      const result = await uploadImage(file);
      setImage(result.imageUrl);
      setMessage({ text: 'Image téléchargée avec succès sur le NAS.', type: 'success' });
    } catch (error) {
      console.error(error);
      setMessage({ text: error.message || 'Erreur lors de l\'upload de l\'image.', type: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price || isNaN(parseFloat(price))) {
      setMessage({ text: 'Veuillez saisir un nom et un prix valide.', type: 'error' });
      return;
    }

    const itemData = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      category,
      image,
      tags,
      allergens
    };

    try {
      if (editingItem) {
        // Mode Modification
        await updateMenuItem(editingItem.id, itemData);
        setMessage({ text: `L'article "${name}" a été modifié avec succès sur le NAS.`, type: 'success' });
      } else {
        // Mode Ajout
        await createMenuItem(itemData);
        setMessage({ text: `L'article "${name}" a été ajouté au menu sur le NAS.`, type: 'success' });
      }
      resetForm();
      onRefresh(); // Recharge le menu
    } catch (error) {
      console.error(error);
      setMessage({ text: error.message || 'Erreur lors de la sauvegarde.', type: 'error' });
    }
  };

  const handleDeleteClick = async (item) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'article "${item.name}" ? Cette action est irréversible sur votre NAS.`)) {
      try {
        await deleteMenuItem(item.id);
        setMessage({ text: `L'article "${item.name}" a été supprimé du NAS.`, type: 'success' });
        if (editingItem && editingItem.id === item.id) {
          resetForm();
        }
        onRefresh();
      } catch (error) {
        console.error(error);
        setMessage({ text: error.message || 'Erreur lors de la suppression.', type: 'error' });
      }
    }
  };

  // Gestion des tags rapides
  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const addCustomTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  // Gestion des allergènes rapides
  const toggleAllergen = (allergen) => {
    if (allergens.includes(allergen)) {
      setAllergens(allergens.filter(a => a !== allergen));
    } else {
      setAllergens([...allergens, allergen]);
    }
  };

  const addCustomAllergen = () => {
    if (allergenInput.trim() && !allergens.includes(allergenInput.trim())) {
      setAllergens([...allergens, allergenInput.trim()]);
      setAllergenInput('');
    }
  };

  // Helper pour formater le prix
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);
  };



  // --- 1. Rendu Écran de Connexion (Verrouillé) ---
  if (!isAdmin) {
    return (
      <section className="admin-lock-screen">
        <div className="lock-card">
          <div className="lock-icon-container">
            <Lock className="lock-icon" size={32} />
          </div>
          <h2>Administration Protégée</h2>
          <p>
            Veuillez saisir votre code d'accès administrateur pour gérer les menus stockés sur votre NAS.
          </p>
          <form onSubmit={handlePinSubmit} className="lock-form">
            <input
              type="password"
              placeholder="Saisir le code PIN"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className="lock-input"
              maxLength={6}
              autoFocus
            />
            {pinError && <p className="lock-error">{pinError}</p>}
            <button type="submit" className="btn btn-primary btn-block">
              <Unlock size={16} />
              Déverrouiller (PIN: 1234)
            </button>
          </form>
        </div>
      </section>
    );
  }

  // --- 2. Rendu Panneau d'Administration Déverrouillé ---
  return (
    <section className="admin-section">
      <div className="admin-header-row">
        <div>
          <h2 className="section-title">Gestion de la Carte Traiteur</h2>
          <p className="section-subtitle">Interface d'administration synchronisée en direct avec votre stockage NAS.</p>
        </div>
        <button className="btn btn-outline" onClick={() => { setIsAdmin(false); navigate('/'); }}>
          <Lock size={16} />
          Verrouiller la session
        </button>
      </div>

      {message.text && (
        <div className={`admin-alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {message.type === 'success' ? <Check size={18} /> : <AlertTriangle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="admin-grid" id="admin-form-anchor">
        {/* Formulaire (Ajout / Modification) */}
        <div className="admin-form-card">
          <h3>{editingItem ? 'Modifier l\'article' : 'Ajouter un nouvel article'}</h3>
          <p className="form-helper">
            {editingItem ? `Modification de : ${editingItem.name}` : 'Remplissez le formulaire ci-dessous pour ajouter un article sur le NAS.'}
          </p>

          <form onSubmit={handleFormSubmit} className="admin-form">
            <div className="form-row">
              <label>
                Nom du plat / de l'article *
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Ex: Noix de Saint-Jacques persillées" 
                  required
                />
              </label>
            </div>

            <div className="form-row split-row">
              <label>
                Prix (€) *
                <input 
                  type="number" 
                  step="0.01" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  placeholder="Ex: 24.50" 
                  required
                />
              </label>

              <label>
                Catégorie *
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="entree">Entrée</option>
                  <option value="plat">Plat</option>
                  <option value="desert">Dessert</option>
                  <option value="boisson">Boisson</option>
                </select>
              </label>
            </div>

            <div className="form-row">
              <label>
                Description du mets
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="Détails des saveurs, accompagnements, cuisson..."
                  rows={3}
                />
              </label>
            </div>

            {/* Upload de Photo */}
            <div className="form-row image-upload-block">
              <span className="field-label">Image de présentation</span>
              <div className="upload-controls">
                <label className="upload-file-btn">
                  <Upload size={16} />
                  <span>{isUploading ? 'Téléchargement...' : 'Sélectionner une photo'}</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    disabled={isUploading}
                    style={{ display: 'none' }}
                  />
                </label>
                <span className="upload-tip">Format JPG/PNG/WebP, max 5Mo</span>
              </div>

              {image && (
                <div className="form-image-preview">
                  <img src={getImageUrl(image)} alt="Aperçu" className="preview-thumbnail" />
                  <div className="preview-overlay">
                    <button type="button" className="btn-remove-img" onClick={() => setImage('')}>Supprimer la photo</button>
                  </div>
                </div>
              )}
            </div>

            {/* Gestion des Tags */}
            <div className="form-row flex-col-field">
              <span className="field-label">Étiquettes & Catégories spécifiques</span>
              <div className="suggested-chips">
                {suggestedTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    className={`chip ${tags.includes(tag) ? 'active' : ''}`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="custom-input-row">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Ajouter une étiquette personnalisée..."
                />
                <button type="button" className="btn btn-outline" onClick={addCustomTag}>
                  Ajouter
                </button>
              </div>
            </div>

            {/* Gestion des Allergènes */}
            <div className="form-row flex-col-field">
              <span className="field-label">Allergènes présents</span>
              <div className="suggested-chips allergen-chips">
                {suggestedAllergens.map(allergen => (
                  <button
                    key={allergen}
                    type="button"
                    className={`chip chip-danger ${allergens.includes(allergen) ? 'active' : ''}`}
                    onClick={() => toggleAllergen(allergen)}
                  >
                    {allergen}
                  </button>
                ))}
              </div>
              <div className="custom-input-row">
                <input
                  type="text"
                  value={allergenInput}
                  onChange={(e) => setAllergenInput(e.target.value)}
                  placeholder="Ajouter un allergène personnalisé..."
                />
                <button type="button" className="btn btn-outline" onClick={addCustomAllergen}>
                  Ajouter
                </button>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={isUploading}>
                {editingItem ? <Check size={16} /> : <Plus size={16} />}
                {editingItem ? 'Enregistrer les modifications' : 'Ajouter à la carte'}
              </button>
              
              {(editingItem || name || description || price !== '' || image) && (
                <button type="button" className="btn btn-outline" onClick={resetForm}>
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Liste / Tableau des plats existants */}
        <div className="admin-list-card">
          <div className="list-card-header">
            <h3>Articles enregistrés ({menuItems.length})</h3>
            <span className="list-subtitle">Stocké localement sur le NAS</span>
          </div>

          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Visuel</th>
                  <th>Nom / Description</th>
                  <th>Catégorie</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      {item.image ? (
                        <img 
                          src={getImageUrl(item.image)} 
                          alt={item.name} 
                          className="table-img" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="table-img-fallback" style={{ display: item.image ? 'none' : 'flex' }}>
                        <span>{item.name[0].toUpperCase()}</span>
                      </div>
                    </td>
                    <td className="table-td-info">
                      <div className="table-item-name">{item.name}</div>
                      <div className="table-item-desc">{item.description || 'Aucune description'}</div>
                      <div className="table-item-tags">
                        {item.tags?.map((t, i) => (
                          <span key={i} className="tiny-tag">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={`cat-label cat-${item.category}`}>
                        {item.category === 'entree' && 'Entrée'}
                        {item.category === 'plat' && 'Plat'}
                        {item.category === 'desert' && 'Dessert'}
                        {item.category === 'boisson' && 'Boisson'}
                      </span>
                    </td>
                    <td className="table-item-price">{formatPrice(item.price)}</td>
                    <td className="table-actions-cell">
                      <button 
                        className="btn-action btn-edit" 
                        onClick={() => handleEditClick(item)}
                        title="Modifier cet article"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        className="btn-action btn-delete" 
                        onClick={() => handleDeleteClick(item)}
                        title="Supprimer cet article"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
