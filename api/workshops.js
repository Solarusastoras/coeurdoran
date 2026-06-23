/**
 * Proxy Vercel — Relaye les appels GET /workshops et POST /workshops vers le NAS.
 */

const NAS_API = 'http://80.9.84.84:5001/api';

export default async function handler(req, res) {
  const nasUrl = `${NAS_API}/workshops`;

  try {
    const options = {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
    };

    if (req.method === 'POST') {
      options.body = JSON.stringify(req.body);
    }

    const response = await fetch(nasUrl, options);
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('[Proxy Workshops] Erreur :', error.message);
    res.status(502).json({ error: 'Impossible de joindre le NAS.' });
  }
}
