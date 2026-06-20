// IP locale du NAS (réseau maison)
const NAS_LOCAL_IP = '192.168.1.98';
const NAS_PORT = 5001;

/**
 * Détermine si l'utilisateur est sur le réseau local (maison).
 */
const isLocalNetwork = () => {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname;
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.startsWith('192.168.')
  );
};

/**
 * URL de base de l'API.
 * - Local (maison) : accès direct au NAS
 * - Public (Vercel) : passe par les fonctions proxy Vercel (HTTPS)
 */
const API_BASE_URL = isLocalNetwork()
  ? `http://${NAS_LOCAL_IP}:${NAS_PORT}/api`
  : '/api';

/**
 * Construit l'URL pour afficher une image.
 * - Local : accès direct au NAS
 * - Vercel : via le proxy /api/image (évite Mixed Content HTTP/HTTPS)
 */
export function getImageUrl(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;

  if (isLocalNetwork()) {
    return `http://${NAS_LOCAL_IP}:${NAS_PORT}${imagePath}`;
  }

  // Proxy Vercel : transforme HTTP NAS → HTTPS Vercel
  return `/api/image?path=${encodeURIComponent(imagePath)}`;
}

/**
 * Récupère tous les articles du menu.
 */
export async function getMenu() {
  const response = await fetch(`${API_BASE_URL}/menu`);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du menu.');
  }
  return response.json();
}

/**
 * Crée un nouvel article de menu.
 */
export async function createMenuItem(item) {
  const response = await fetch(`${API_BASE_URL}/menu`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création de l'article.");
  }
  return response.json();
}

/**
 * Modifie un article de menu existant.
 */
export async function updateMenuItem(id, item) {
  const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la modification de l'article.");
  }
  return response.json();
}

/**
 * Supprime un article de menu.
 */
export async function deleteMenuItem(id) {
  const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la suppression de l'article.");
  }
  return response.json();
}

/**
 * Upload une photo vers le NAS.
 * - Local : envoi direct au NAS
 * - Vercel : via le proxy /api/upload
 */
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const uploadUrl = isLocalNetwork()
    ? `http://${NAS_LOCAL_IP}:${NAS_PORT}/api/upload`
    : '/api/upload';

  const response = await fetch(uploadUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'envoi de la photo.");
  }

  return response.json();
}
