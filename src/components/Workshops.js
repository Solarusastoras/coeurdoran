import React, { useState, useEffect } from 'react';
import { ChefHat, Clock, BookOpen, Check, Calendar, Mail, Phone, Sparkles, Heart, X } from 'lucide-react';
import { getWorkshops, updateWorkshopSpots } from '../utils/api';
import './Workshops.scss';

export default function Workshops() {
  const [formData, setFormData] = useState({
    workshopId: '',
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    participants: 1,
    isCompany: false,
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [availability, setAvailability] = useState({});
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (workshopId) => {
    setFormData({
      workshopId: workshopId || '',
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
      participants: 1,
      isCompany: false,
      notes: ''
    });
    setIsSubmitted(false);
    setError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setFormData({
      workshopId: '',
      lastName: '',
      firstName: '',
      email: '',
      phone: '',
      participants: 1,
      isCompany: false,
      notes: ''
    });
  };

  const [workshopsList, setWorkshopsList] = useState([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const data = await getWorkshops();
        setWorkshopsList(data);
        const map = {};
        data.forEach(w => {
          map[w.id] = w.availablePlaces;
        });
        setAvailability(map);
      } catch (err) {
        console.error("Erreur de chargement des places disponibles :", err);
      } finally {
        setIsLoadingAvailability(false);
      }
    };
    fetchAvailability();
  }, []);

  const getSpotsLeft = (workshopId) => {
    let spots = 8;
    if (availability[workshopId] !== undefined) {
      spots = availability[workshopId];
    }
    return Math.min(spots, 8);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.workshopId || !formData.lastName || !formData.firstName || !formData.email || !formData.phone) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const spotsLeft = getSpotsLeft(formData.workshopId);
    if (formData.participants > spotsLeft) {
      setError(`Il ne reste que ${spotsLeft} place(s) disponible(s) pour cet atelier.`);
      return;
    }

    setError('');

    try {
      const newSpots = spotsLeft - formData.participants;
      await updateWorkshopSpots(formData.workshopId, newSpots);
      setAvailability(prev => ({
        ...prev,
        [formData.workshopId]: newSpots
      }));
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la réservation. Veuillez réessayer.');
    }
  };

  const selectedWorkshopDetails = workshopsList.find(w => w.id === formData.workshopId);

  return (
    <div className="workshops-page">
      {/* Hero Section Page Ateliers */}
      <div className="workshops-hero-banner">
        <div className="workshops-hero-content">
          <div className="hero-badge">
            <ChefHat size={14} className="hero-badge-icon" />
            <span>Partage & Transmission</span>
          </div>
          <h1>
            Ateliers Culinaires Cœur d’<span className="underlined-o">o</span>ran
          </h1>
          <p>
            Découvrez les secrets de la cuisine traditionnelle algérienne lors de cours et d'ateliers interactifs animés par Djaouida. Venez partager un moment convivial et repartez avec un savoir-faire unique.
          </p>
        </div>
      </div>

      <div className="workshops-grid-container">
        {/* Grille des Ateliers */}
        <div className="workshops-list">
          <h2 className="section-title">Nos Ateliers Proposés</h2>
          <p className="section-subtitle">Sélectionnez l'atelier de votre choix pour découvrir les secrets d'un repas fait maison.</p>

          <div className="workshops-grid">
            {workshopsList.map((workshop) => {
              const spotsLeft = getSpotsLeft(workshop.id);
              const isComplet = spotsLeft === 0;

              return (
                <div key={workshop.id} className={`workshop-card ${isComplet ? 'is-complet' : ''}`}>
                  <div className="workshop-card-header">
                    <div className="header-title-row">
                      <h3>{workshop.title}</h3>
                      {isComplet && (
                        <span className="badge-complet">Complet</span>
                      )}
                    </div>
                    <div className="header-price-availability-row">
                      <div className="workshop-price-tag">
                        <span className="price-amount">{workshop.price}€</span>
                        <span className="price-unit">/ pers</span>
                      </div>
                      <div className={`header-availability-badge ${isComplet ? 'out-of-stock' : 'in-stock'}`}>
                        {isComplet ? (
                          'Complet'
                        ) : (
                          <>
                            <span className="badge-count">{spotsLeft} place{spotsLeft > 1 ? 's' : ''}</span>
                            <span className="badge-label">disponible{spotsLeft > 1 ? 's' : ''}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="workshop-card-body">
                    <p className="workshop-desc">{workshop.description}</p>

                    <div className="workshop-meta">
                      <div className="meta-item">
                        <Clock size={16} />
                        <span>{workshop.duration}</span>
                      </div>
                      <div className="meta-item">
                        <BookOpen size={16} />
                        <span>{workshop.level}</span>
                      </div>
                    </div>

                    <div className="workshop-includes">
                      <h4>Ce qui est inclus :</h4>
                      <ul>
                        {(workshop.includes || []).map((inc, index) => (
                          <li key={index}>
                            <Check size={14} className="check-icon" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="workshop-card-footer">
                    <button
                      className={`btn btn-block ${isComplet ? 'btn-disabled' : 'btn-primary'}`}
                      disabled={isComplet}
                      onClick={() => {
                        openModal(workshop.id);
                      }}
                    >
                      {isComplet ? 'Complet' : 'Réserver cet Atelier'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section Informations Complémentaires */}
          <div className="workshops-extra-card">
            <div className="extra-badge">
              <Sparkles size={16} />
              <span>Sur-Mesure & Privé</span>
            </div>
            <h3>Ateliers Privatisés & Team Building</h3>
            <p>
              Vous souhaitez organiser un atelier privé pour un anniversaire, un enterrement de vie de jeune fille (EVJF) ou un événement d'entreprise ? Nous organisons des sessions sur-mesure à domicile ou dans nos locaux partenaires à Bordeaux et aux alentours.
            </p>
            <div className="extra-contact">
              <p>Contactez Djaouida directement pour un devis personnalisé :</p>
              <div className="extra-contact-links">
                <a href="tel:0781425958" className="contact-pill">
                  <Phone size={16} />
                  <span>07 81 42 59 58</span>
                </a>
                <a href="mailto:traiteurcoeurdoran@gmail.com" className="contact-pill">
                  <Mail size={16} />
                  <span>traiteurcoeurdoran@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modal de Réservation */}
      {isModalOpen && (
        <div className="booking-modal-overlay" onClick={closeModal}>
          <div className="booking-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal} aria-label="Fermer">
              <X size={22} />
            </button>
            <h3>Demande d'Inscription</h3>
            <p className="booking-intro">Choisissez votre cours et la date souhaitée. Djaouida vous recontactera sous 24h à 48h pour finaliser le paiement et valider votre réservation.</p>

            {isSubmitted ? (
              <div className="booking-success-state">
                <div className="success-icon-wrapper">
                  <Heart size={32} className="heart-icon animate-pulse" />
                </div>
                <h4>Demande Reçue !</h4>
                <p>Merci pour votre intérêt, <strong>{formData.firstName} {formData.lastName}</strong> !</p>
                <div className="success-details">
                  <p><strong>Atelier choisi :</strong> {selectedWorkshopDetails?.title}</p>
                  <p><strong>Profil :</strong> {formData.isCompany ? 'Entreprise / Professionnel' : 'Particulier'}</p>
                  <p><strong>Places :</strong> {formData.participants} {formData.participants > 1 ? 'personnes' : 'personne'}</p>
                  <p className="price-total"><strong>Montant estimé :</strong> {selectedWorkshopDetails ? selectedWorkshopDetails.price * formData.participants : 0}€</p>
                </div>
                <p className="success-next-steps">
                  Djaouida étudie votre demande et prendra contact avec vous par téléphone au <strong>{formData.phone}</strong> ou par email à <strong>{formData.email}</strong>.
                </p>
                <button
                  className="btn btn-outline btn-block"
                  onClick={closeModal}
                >
                  Fermer la fenêtre
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="booking-form">
                {error && (
                  <div className="form-error">
                    <span>{error}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="workshopId">Choisir un Atelier <span className="required">*</span></label>
                  <select
                    id="workshopId"
                    name="workshopId"
                    value={formData.workshopId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Sélectionnez un cours --</option>
                    {workshopsList.map(w => {
                      const spots = getSpotsLeft(w.id);
                      return (
                        <option key={w.id} value={w.id} disabled={spots === 0}>
                          {w.title} ({w.price}€/pers) {spots === 0 ? ' - COMPLET' : ` (${spots} places dispo)`}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="lastName">Nom <span className="required">*</span></label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Nom"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="firstName">Prénom <span className="required">*</span></label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Prénom"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Profil du participant <span className="required">*</span></label>
                  <div className="profile-radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="isCompany"
                        checked={formData.isCompany === false}
                        onChange={() => setFormData({ ...formData, isCompany: false })}
                      />
                      <span>Particulier</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="isCompany"
                        checked={formData.isCompany === true}
                        onChange={() => setFormData({ ...formData, isCompany: true })}
                      />
                      <span>Entreprise</span>
                    </label>
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="email">Adresse E-mail <span className="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="exemple@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Téléphone <span className="required">*</span></label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="06 12 34 56 78"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="participants">Nombre de places <span className="required">*</span></label>
                  <input
                    type="number"
                    id="participants"
                    name="participants"
                    min="1"
                    max={formData.workshopId ? getSpotsLeft(formData.workshopId) : 8}
                    value={formData.participants}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="notes">Remarques ou demandes particulières</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows="3"
                    placeholder="Allergies, événement spécial, privatisation..."
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>

                {formData.workshopId && selectedWorkshopDetails && (
                  <div className="booking-summary-box">
                    <p className="summary-title">Récapitulatif provisoire :</p>
                    <div className="summary-row">
                      <span>Tarif unitaire :</span>
                      <span>{selectedWorkshopDetails.price}€</span>
                    </div>
                    <div className="summary-row">
                      <span>Nombre de places :</span>
                      <span>{formData.participants}</span>
                    </div>
                    <div className="summary-total">
                      <span>Montant total indicatif :</span>
                      <span>{selectedWorkshopDetails.price * formData.participants}€</span>
                    </div>
                  </div>
                )}

                <button type="submit" className="btn btn-primary btn-block btn-lg">
                  Envoyer ma Demande
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
