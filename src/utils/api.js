const getApiHost = () => {
  const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';
  if (currentHost && currentHost !== 'localhost' && currentHost !== '127.0.0.1') {
    return currentHost;
  }
  return '192.168.1.98';
};

const API_BASE_URL = `http://${getApiHost()}:5001/api`;

/**
 * Construit l'URL complète pour accéder aux images hébergées sur le serveur local (NAS).
 */
export function getImageUrl(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  
  // Détecter si on accède localement (NAS) ou via le site public (OVH)
  const isLocal = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' || 
    window.location.hostname.startsWith('192.168.')
  );
  
  if (!isLocal) {
    return imagePath; // Chargement relatif depuis OVH
  }
  
  return `http://${getApiHost()}:5001${imagePath}`;
}

/**
 * Récupère tous les articles du menu depuis le serveur local.
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
 * @param {Object} item - Les données de l'article (nom, prix, description, etc.).
 */
export async function createMenuItem(item) {
  const response = await fetch(`${API_BASE_URL}/menu`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création de l'article.");
  }
  return response.json();
}

/**
 * Modifie un article de menu existant.
 * @param {string} id - L'identifiant de l'article.
 * @param {Object} item - Les données mises à jour de l'article.
 */
export async function updateMenuItem(id, item) {
  const response = await fetch(`${API_BASE_URL}/menu/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la modification de l'article.");
  }
  return response.json();
}

/**
 * Supprime un article de menu.
 * @param {string} id - L'identifiant de l'article à supprimer.
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
 * Importe un fichier image vers le serveur.
 * @param {File} file - Le fichier image sélectionné.
 * @returns {Promise<{ imageUrl: string }>} L'URL de l'image stockée en local.
 */
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'envoi de la photo.");
  }

  return response.json();
}
