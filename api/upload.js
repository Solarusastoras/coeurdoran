/**
 * Proxy Vercel — Relaye l'upload de photo vers le NAS.
 * Le body parser est désactivé pour transmettre le fichier brut (multipart).
 */

export const config = {
  api: {
    bodyParser: false, // Nécessaire pour les fichiers multipart
  },
};

const NAS_API = 'http://80.9.84.84:5001/api';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée.' });
  }

  try {
    // Lire le body brut (stream multipart)
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const rawBody = Buffer.concat(chunks);

    // Transmettre au NAS avec les mêmes headers
    const response = await fetch(`${NAS_API}/upload`, {
      method: 'POST',
      headers: {
        'content-type': req.headers['content-type'],
        'content-length': String(rawBody.length),
      },
      body: rawBody,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('[Proxy Upload] Erreur :', error.message);
    res.status(502).json({ error: 'Impossible d\'envoyer la photo au NAS.' });
  }
}
