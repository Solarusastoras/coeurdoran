import React, { useState } from 'react';
import { ChefHat, Clock, Users, BookOpen, Check, Calendar, Mail, Phone, Sparkles, Heart } from 'lucide-react';

export default function Workshops() {
  const [formData, setFormData] = useState({
    workshopId: '',
    name: '',
    email: '',
    phone: '',
    date: '',
    participants: 1,
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const workshopsList = [
    {
      id: 'couscous',
      title: "Couscous Traditionnel de Ma Mère",
      duration: "3h30",
      capacity: "6 à 8 personnes",
      price: 75,
      level: "Tous niveaux",
      description: "Apprenez l'art ancestral de rouler le couscous à la main, la cuisson en trois étapes à la vapeur dans le couscoussier traditionnel, et la préparation d'un bouillon parfumé aux épices secrètes d'Oran.",
      includes: [
        "Ingrédients frais et bio de saison",
        "Dégustation conviviale sur place",
        "Un sachet d'épices d'Oran maison offert",
        "Fiche recette illustrée envoyée par email"
      ]
    },
    {
      id: 'patisseries',
      title: "Pâtisseries Orientales & Thé à la Menthe",
      duration: "2h30",
      capacity: "8 à 10 personnes",
      price: 60,
      level: "Amateur de douceurs",
      description: "Maîtrisez le feuilletage et le pliage de la Baklawa, la confection des Cornes de Gazelle parfumées à la fleur d'oranger, et le rituel authentique du service du thé à la menthe algérien.",
      includes: [
        "Ingrédients premium (amandes, miel pur, eau de rose)",
        "Boîte cadeau de vos réalisations (10-12 pièces)",
        "Dégustation de thé sur place",
        "Livret numérique des secrets de Djaouida"
      ]
    },
    {
      id: 'chorba',
      title: "Chorba Frik & Boureks Croustillants",
      duration: "2h00",
      capacity: "6 à 8 personnes",
      price: 50,
      level: "Débutant & Familial",
      description: "Un grand classique des tables de fête algériennes. Apprenez à mijoter la Chorba Frik traditionnelle au blé concassé et façonnez des boureks croustillants en cigares ou triangles.",
      includes: [
        "Tous les ingrédients inclus",
        "Dégustation chaleureuse sur place",
        "Technique infaillible de pliage des feuilles de dioul",
        "Fiche recette imprimée"
      ]
    },
    {
      id: 'tajines',
      title: "Atelier Prestige : Tajines & Pain Matlouh",
      duration: "3h00",
      capacity: "4 à 6 personnes",
      price: 80,
      level: "Passionnés de cuisine",
      description: "Initiez-vous à la cuisson lente et harmonieuse en tajine de terre cuite (tajine d'agneau sucré-salé aux pruneaux et amandes grillées) et pétrissez le pain gonflé traditionnel cuit sur plaque en fonte.",
      includes: [
        "Ingrédients de qualité bouchère et épices rares",
        "Repas complet partagé (entrée, plat, boisson)",
        "Votre pain Matlouh chaud à emporter",
        "Fiche technique de cuisson lente"
      ]
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.workshopId || !formData.name || !formData.email || !formData.phone || !formData.date) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setError('');
    setIsSubmitted(true);
    // Dans une version de production, nous enverrions les données via API ou email
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
            Ateliers Culinaires Cœur d’<span className="underlined-o">O</span>ran
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
            {workshopsList.map((workshop) => (
              <div key={workshop.id} className="workshop-card">
                <div className="workshop-card-header">
                  <h3>{workshop.title}</h3>
                  <div className="workshop-price-tag">
                    <span className="price-amount">{workshop.price}€</span>
                    <span className="price-unit">/ pers</span>
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
                      <Users size={16} />
                      <span>{workshop.capacity}</span>
                    </div>
                    <div className="meta-item">
                      <BookOpen size={16} />
                      <span>{workshop.level}</span>
                    </div>
                  </div>

                  <div className="workshop-includes">
                    <h4>Ce qui est inclus :</h4>
                    <ul>
                      {workshop.includes.map((inc, index) => (
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
                    className="btn btn-primary btn-block"
                    onClick={() => {
                      setFormData({ ...formData, workshopId: workshop.id });
                      document.getElementById('booking-form-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Réserver cet Atelier
                  </button>
                </div>
              </div>
            ))}
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

        {/* Formulaire de Réservation */}
        <div className="booking-sidebar" id="booking-form-section">
          <div className="booking-card">
            <h3>Demande d'Inscription</h3>
            <p className="booking-intro">Choisissez votre cours et la date souhaitée. Djaouida vous recontactera sous 24h à 48h pour finaliser le paiement et valider votre réservation.</p>

            {isSubmitted ? (
              <div className="booking-success-state">
                <div className="success-icon-wrapper">
                  <Heart size={32} className="heart-icon animate-pulse" />
                </div>
                <h4>Demande Reçue !</h4>
                <p>Merci pour votre intérêt, <strong>{formData.name}</strong> !</p>
                <div className="success-details">
                  <p><strong>Atelier choisi :</strong> {selectedWorkshopDetails?.title}</p>
                  <p><strong>Date souhaitée :</strong> {new Date(formData.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p><strong>Places :</strong> {formData.participants} {formData.participants > 1 ? 'personnes' : 'personne'}</p>
                  <p className="price-total"><strong>Montant estimé :</strong> {selectedWorkshopDetails ? selectedWorkshopDetails.price * formData.participants : 0}€</p>
                </div>
                <p className="success-next-steps">
                  Djaouida étudie votre demande et prendra contact avec vous par téléphone au <strong>{formData.phone}</strong> ou par email à <strong>{formData.email}</strong>.
                </p>
                <button 
                  className="btn btn-outline btn-block"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      workshopId: '',
                      name: '',
                      email: '',
                      phone: '',
                      date: '',
                      participants: 1,
                      notes: ''
                    });
                  }}
                >
                  Faire une autre demande
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
                    {workshopsList.map(w => (
                      <option key={w.id} value={w.id}>{w.title} ({w.price}€/pers)</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="name">Nom Complet <span className="required">*</span></label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Votre prénom et nom" 
                    value={formData.name} 
                    onChange={handleInputChange}
                    required 
                  />
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

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="date">Date Souhaitée <span className="required">*</span></label>
                    <input 
                      type="date" 
                      id="date" 
                      name="date" 
                      value={formData.date} 
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="participants">Nombre de places <span className="required">*</span></label>
                    <input 
                      type="number" 
                      id="participants" 
                      name="participants" 
                      min="1" 
                      max="12" 
                      value={formData.participants} 
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
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
      </div>
    </div>
  );
}
