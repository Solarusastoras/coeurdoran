/**
 * Proxy Vercel — Sert les images du NAS en HTTPS
 * Évite le blocage "Mixed Content" du navigateur.
 */

import Jimp from 'jimp';

const NAS_IP = '80.9.84.84';
const NAS_PORT = 5001;

export default async function handler(req, res) {
  const { path } = req.query;

  if (!path) {
    return res.status(400).json({ error: 'Paramètre "path" manquant.' });
  }

  const safePath = decodeURIComponent(path);

  // Sécurité : on n'autorise que les fichiers du dossier /uploads/
  if (!safePath.startsWith('/uploads/')) {
    return res.status(403).json({ error: 'Accès interdit.' });
  }

  try {
    const nasUrl = `http://${NAS_IP}:${NAS_PORT}${safePath}`;
    const response = await fetch(nasUrl);

    if (!response.ok) {
      return res.status(404).json({ error: 'Image introuvable sur le NAS.' });
    }

    const rawBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(rawBuffer);

    // Optimiser l'image à la volée avec Jimp
    const image = await Jimp.read(buffer);
    
    // Redimensionner si l'image est plus large que 800px (retina display pour les cartes de 419px)
    if (image.bitmap.width > 800) {
      image.resize(800, Jimp.AUTO);
    }
    
    // Compresser avec une qualité de 75%
    image.quality(75);
    
    // Obtenir le buffer de l'image optimisée au format JPEG
    const optimizedBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // Cache 1 an
    res.send(optimizedBuffer);
  } catch (error) {
    console.error('[Proxy Image] Erreur :', error.message);
    res.status(502).json({ error: 'Impossible de joindre le NAS.' });
  }
}
