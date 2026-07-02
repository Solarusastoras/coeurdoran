import React, { useEffect } from 'react';
import './mentions.scss';

export default function MentionsLegales() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mentions-page">
      <h1>Mentions Légales</h1>
      
      <h2>1. Éditeur du site</h2>
      <p>
        Le présent site est édité par <strong>Traiteur Cœur d'Oran</strong>.<br />
        Siège social : [Votre adresse postale, ex: 33000 Bordeaux]<br />
        Téléphone : 07 81 42 59 58<br />
        Email : traiteurcoeurdoran@gmail.com<br />
        SIRET : [Votre numéro de SIRET]
      </p>

      <h2>2. Directeur de la publication</h2>
      <p>
        Le directeur de la publication du site est le représentant légal de Traiteur Cœur d'Oran.
      </p>

      <h2>3. Hébergement</h2>
      <p>
        Ce site est hébergé par <strong>Vercel Inc.</strong><br />
        340 S Lemon Ave #4133<br />
        Walnut, CA 91789, USA<br />
        Site web : https://vercel.com
      </p>

      <h2>4. Propriété intellectuelle</h2>
      <p>
        L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
      </p>

      <h2>5. Protection des données personnelles (RGPD)</h2>
      <p>
        Les informations recueillies via d'éventuels formulaires de contact ou adresses emails sont destinées uniquement à <strong>Traiteur Cœur d'Oran</strong> dans le but de répondre à vos demandes de devis ou de renseignements. Elles ne sont en aucun cas cédées à des tiers. Conformément à la loi « Informatique et Libertés » et au RGPD, vous disposez d'un droit d'accès, de modification et de suppression de vos données en nous contactant par email.
      </p>

      <h2>6. Cookies</h2>
      <p>
        La navigation sur ce site peut provoquer l'installation de cookie(s) technique(s) sur l'ordinateur de l'utilisateur (notamment pour la sécurisation de l'espace administrateur via le service d'authentification Auth0). Ces cookies sont strictement nécessaires au fonctionnement sécurisé du site. Vous pouvez configurer votre navigateur pour refuser l'installation des cookies.
      </p>
    </div>
  );
}
