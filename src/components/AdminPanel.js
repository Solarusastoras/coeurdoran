import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Check, Lock, Unlock, Upload, AlertTriangle, Eye, Calendar } from 'lucide-react';
import { 
  createMenuItem, 
  updateMenuItem, 
  deleteMenuItem, 
  uploadImage, 
  getImageUrl, 
  getWorkshops, 
  createWorkshop, 
  updateWorkshop, 
  deleteWorkshop 
} from '../utils/api';
import './AdminPanel.scss';

export default function AdminPanel({ menuItems, onRefresh, isAdmin, setIsAdmin }) {
  const navigate = useNavigate();
  // Sécurité d'accès
  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState('');

  // Gestion des onglets
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' ou 'workshops'

  // État de gestion des ateliers
  const [workshopsAvailability, setWorkshopsAvailability] = useState([]);
  const [isLoadingWorkshops, setIsLoadingWorkshops] = useState(false);
  const [workshopMessage, setWorkshopMessage] = useState({ text: '', type: '' });

  // Formulaire d'édition / ajout d'ateliers
  const [editingWorkshop, setEditingWorkshop] = useState(null); // null = mode ajout
  const [wTitle, setWTitle] = useState('');
  const [wPrice, setWPrice] = useState('');
  const [wDuration, setWDuration] = useState('');
  const [wLevel, setWLevel] = useState('Tous niveaux / Débutant');
  const [wAvailablePlaces, setWAvailablePlaces] = useState(8);
  const [wDescription, setWDescription] = useState('');
  const [wIncludesText, setWIncludesText] = useState('');

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

  const fetchWorkshops = async () => {
    setIsLoadingWorkshops(true);
    try {
      const data = await getWorkshops();
      setWorkshopsAvailability(data);
    } catch (err) {
      console.error("Erreur de chargement des ateliers :", err);
    } finally {
      setIsLoadingWorkshops(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchWorkshops();
    }
  }, [isAdmin]);

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

  const handleWorkshopEditClick = (workshop) => {
    setEditingWorkshop(workshop);
    setWTitle(workshop.title || '');
    setWPrice(workshop.price ? workshop.price.toString() : '');
    setWDuration(workshop.duration || '');
    setWLevel(workshop.level || 'Tous niveaux / Débutant');
    setWAvailablePlaces(workshop.availablePlaces !== undefined ? workshop.availablePlaces : 8);
    setWDescription(workshop.description || '');
    setWIncludesText(workshop.includes ? workshop.includes.join('\n') : '');
    setWorkshopMessage({ text: '', type: '' });
    
    // Scroll vers le formulaire
    document.getElementById('admin-workshop-form-anchor')?.scrollIntoView({ behavior: 'smooth' });
  };

  const resetWorkshopForm = () => {
    setEditingWorkshop(null);
    setWTitle('');
    setWPrice('');
    setWDuration('');
    setWLevel('Tous niveaux / Débutant');
    setWAvailablePlaces(8);
    setWDescription('');
    setWIncludesText('');
    setWorkshopMessage({ text: '', type: '' });
  };

  const handleWorkshopFormSubmit = async (e) => {
    e.preventDefault();

    if (!wTitle.trim() || !wPrice || isNaN(parseFloat(wPrice)) || !wDuration.trim() || !wLevel.trim()) {
      setWorkshopMessage({ text: 'Veuillez remplir tous les champs obligatoires.', type: 'error' });
      return;
    }

    const priceNum = parseFloat(wPrice);
    const spotsNum = Math.min(Math.max(parseInt(wAvailablePlaces, 10) || 0, 0), 8);
    const includesArray = wIncludesText.split('\n').map(line => line.trim()).filter(Boolean);

    let workshopId = editingWorkshop?.id;
    if (!workshopId) {
      workshopId = wTitle.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      if (workshopsAvailability.some(w => w.id === workshopId)) {
        workshopId = `${workshopId}-${Date.now()}`;
      }
    }

    const workshopData = {
      id: workshopId,
      title: wTitle.trim(),
      price: priceNum,
      duration: wDuration.trim(),
      level: wLevel.trim(),
      availablePlaces: spotsNum,
      description: wDescription.trim(),
      includes: includesArray
    };

    try {
      if (editingWorkshop) {
        await updateWorkshop(workshopId, workshopData);
        setWorkshopMessage({ text: `L'atelier "${wTitle}" a été modifié avec succès sur le NAS.`, type: 'success' });
      } else {
        await createWorkshop(workshopData);
        setWorkshopMessage({ text: `L'atelier "${wTitle}" a été créé avec succès sur le NAS.`, type: 'success' });
      }
      resetWorkshopForm();
      fetchWorkshops();
    } catch (error) {
      console.error(error);
      setWorkshopMessage({ text: error.message || 'Erreur lors de la sauvegarde.', type: 'error' });
    }
  };

  const handleWorkshopDeleteClick = async (workshop) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'atelier "${workshop.title}" ? Cette action est irréversible sur votre NAS.`)) {
      try {
        await deleteWorkshop(workshop.id);
        setWorkshopMessage({ text: `L'atelier "${workshop.title}" a été supprimé du NAS.`, type: 'success' });
        if (editingWorkshop && editingWorkshop.id === workshop.id) {
          resetWorkshopForm();
        }
        fetchWorkshops();
      } catch (error) {
        console.error(error);
        setWorkshopMessage({ text: error.message || 'Erreur lors de la suppression.', type: 'error' });
      }
    }
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
          <h2 className="section-title">
            {activeTab === 'menu' ? 'Gestion de la Carte Traiteur' : 'Gestion des Ateliers Culinaires'}
          </h2>
          <p className="section-subtitle">
            {activeTab === 'menu'
              ? "Interface d'administration synchronisée en direct avec votre stockage NAS."
              : "Interface de gestion des disponibilités des places pour vos ateliers de cuisine."}
          </p>
        </div>
        <button className="btn btn-outline" onClick={() => { setIsAdmin(false); navigate('/'); }}>
          <Lock size={16} />
          Verrouiller la session
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          Carte Traiteur
        </button>
        <button
          className={`admin-tab-btn ${activeTab === 'workshops' ? 'active' : ''}`}
          onClick={() => setActiveTab('workshops')}
        >
          Ateliers Culinaires
        </button>
      </div>

      {activeTab === 'workshops' ? (
        <div className="workshops-admin-container" id="admin-workshop-form-anchor">
          {workshopMessage.text && (
            <div className={`admin-alert ${workshopMessage.type === 'success' ? 'alert-success' : 'alert-error'}`}>
              {workshopMessage.type === 'success' ? <Check size={18} /> : <AlertTriangle size={18} />}
              <span>{workshopMessage.text}</span>
            </div>
          )}

          <div className="admin-grid">
            {/* Formulaire Workshop */}
            <div className="admin-form-card">
              <h3>{editingWorkshop ? 'Modifier l\'atelier' : 'Ajouter un nouvel atelier'}</h3>
              <p className="form-helper">
                {editingWorkshop ? `Modification de : ${editingWorkshop.title}` : 'Remplissez le formulaire ci-dessous pour ajouter un cours.'}
              </p>

              <form onSubmit={handleWorkshopFormSubmit} className="admin-form">
                <div className="form-row">
                  <label>
                    Titre de l'atelier *
                    <input 
                      type="text" 
                      value={wTitle} 
                      onChange={(e) => setWTitle(e.target.value)} 
                      placeholder="Ex: Couscous Traditionnel" 
                      required
                    />
                  </label>
                </div>

                <div className="form-row split-row">
                  <label>
                    Prix (€) *
                    <input 
                      type="number" 
                      value={wPrice} 
                      onChange={(e) => setWPrice(e.target.value)} 
                      placeholder="Ex: 75" 
                      required
                    />
                  </label>

                  <label>
                    Durée (ex: 3h30) *
                    <input 
                      type="text" 
                      value={wDuration} 
                      onChange={(e) => setWDuration(e.target.value)} 
                      placeholder="Ex: 3h00" 
                      required
                    />
                  </label>
                </div>

                <div className="form-row split-row">
                  <label>
                    Niveau *
                    <input 
                      type="text" 
                      value={wLevel} 
                      onChange={(e) => setWLevel(e.target.value)} 
                      placeholder="Ex: Tous niveaux / Débutant" 
                      required
                    />
                  </label>

                  <label>
                    Places disponibles (max 8) *
                    <input 
                      type="number" 
                      min="0"
                      max="8"
                      value={wAvailablePlaces} 
                      onChange={(e) => setWAvailablePlaces(e.target.value)} 
                      placeholder="Ex: 8" 
                      required
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    Description du cours *
                    <textarea 
                      value={wDescription} 
                      onChange={(e) => setWDescription(e.target.value)} 
                      placeholder="Détails du déroulement du cours, techniques enseignées..."
                      rows={3}
                      required
                    />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    Ce qui est inclus (une ligne par élément)
                    <textarea 
                      value={wIncludesText} 
                      onChange={(e) => setWIncludesText(e.target.value)} 
                      placeholder="Ex: Ingrédients bio de saison&#10;Dégustation sur place&#10;Fiche recette envoyée par e-mail"
                      rows={4}
                    />
                  </label>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {editingWorkshop ? <Check size={16} /> : <Plus size={16} />}
                    {editingWorkshop ? 'Enregistrer les modifications' : 'Créer l\'atelier'}
                  </button>
                  
                  {(editingWorkshop || wTitle || wPrice || wDuration || wDescription || wIncludesText) && (
                    <button type="button" className="btn btn-outline" onClick={resetWorkshopForm}>
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Liste des Ateliers */}
            <div className="admin-list-card">
              <div className="list-card-header">
                <h3>Ateliers enregistrés ({workshopsAvailability.length})</h3>
                <span className="list-subtitle">Stocké sur le NAS / localStorage</span>
              </div>

              {isLoadingWorkshops ? (
                <div className="admin-loading-state" style={{ padding: '2rem', textAlign: 'center' }}>
                  <span>Chargement des ateliers...</span>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Atelier / Informations</th>
                        <th>Durée</th>
                        <th>Prix</th>
                        <th>Places</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workshopsAvailability.map(w => (
                        <tr key={w.id}>
                          <td className="table-td-info">
                            <div className="table-item-name">{w.title || w.id}</div>
                            <div className="table-item-desc" style={{ WebkitLineClamp: 2 }}>{w.description}</div>
                          </td>
                          <td>{w.duration}</td>
                          <td className="table-item-price">{w.price}€</td>
                          <td style={{ fontWeight: 'bold', color: w.availablePlaces === 0 ? 'var(--color-error)' : 'var(--color-success)' }}>
                            {w.availablePlaces} / 8
                          </td>
                          <td className="table-actions-cell">
                            <button 
                              className="btn-action btn-edit" 
                              onClick={() => handleWorkshopEditClick(w)}
                              title="Modifier cet atelier"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button 
                              className="btn-action btn-delete" 
                              onClick={() => handleWorkshopDeleteClick(w)}
                              title="Supprimer cet atelier"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
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
      </>
      )}
    </section>
  );
}
