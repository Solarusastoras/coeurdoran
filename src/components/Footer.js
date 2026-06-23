import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import './Footer.scss';

const FacebookIcon = ({ size = 18, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 18, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TikTokIcon = ({ size = 18, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>Traiteur Cœur d’<span className="underlined-o">o</span>ran</h3>
          <p className="footer-about">
            Spécialités algériennes & pâtisseries orientales. Repas sur-mesure pour particuliers & professionnels. Basée à Bordeaux, ma maison sublime vos réceptions dans toute la Nouvelle-Aquitaine.
          </p>
          <div className="footer-badges">
            <span className="badge-gironde">Prestations Gironde & Nouvelle-Aquitaine</span>
          </div>
        </div>

        <div className="footer-contact">
          <h4>Coordonnées</h4>
          <ul className="contact-list">
            {/* 
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>45 Cours de l'Intendance, 33000 Bordeaux</span>
            </li>
            */}
            <li>
              <Phone size={18} className="contact-icon" />
              <a href="tel:0781425958">07 81 42 59 58</a>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <a href="mailto:traiteurcoeurdoran@gmail.com">traiteurcoeurdoran@gmail.com</a>
            </li>
            <li>
              <InstagramIcon size={18} className="contact-icon" />
              <a href="https://www.instagram.com/coeur.doran.33/" target="_blank" rel="noopener noreferrer">Nous suivre sur Instagram</a>
            </li>
            <li>
              <TikTokIcon size={18} className="contact-icon" />
              <a href="https://www.tiktok.com/@coeur.doran33" target="_blank" rel="noopener noreferrer">Nous suivre sur TikTok</a>
            </li>
            <li>
              <FacebookIcon size={18} className="contact-icon" />
              <a href="https://www.facebook.com/profile.php?id=61568603632434" target="_blank" rel="noopener noreferrer">Nous suivre sur Facebook</a>
            </li>
          </ul>
        </div>

        <div className="footer-hours">
          <h4>Horaires d'Accueil</h4>
          <ul className="hours-list">
            <li>
              <Clock size={16} className="hours-icon" />
              <span>Lundi - Samedi : 09h00 - 19h00</span>
            </li>
            <li>
              <Clock size={16} className="hours-icon" />
              <span>Dimanche (Événements) : Sur demande</span>
            </li>
          </ul>
          <p className="hours-note">De préférence, contactez-nous 48h à l'avance pour planifier vos repas.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>&copy; {currentYear} Traiteur Cœur d’<span className="underlined-o">o</span>ran. Tous droits réservés. Bordeaux, France.</p>
          <div className="footer-legal">
            <a href="#mentions">Mentions Légales</a>
            <span className="dot">•</span>
            <a href="#nas">Stockage local NAS actif</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
