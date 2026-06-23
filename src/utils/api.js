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
// Helper for fetch timeout to prevent the UI from freezing when NAS is offline
async function fetchWithTimeout(url, options = {}, timeout = 2500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

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
  const response = await fetchWithTimeout(`${API_BASE_URL}/menu`);
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du menu.');
  }
  return response.json();
}

/**
 * Crée un nouvel article de menu.
 */
export async function createMenuItem(item) {
  const response = await fetchWithTimeout(`${API_BASE_URL}/menu`, {
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
  const response = await fetchWithTimeout(`${API_BASE_URL}/menu/${id}`, {
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
  const response = await fetchWithTimeout(`${API_BASE_URL}/menu/${id}`, {
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

  const response = await fetchWithTimeout(uploadUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'envoi de la photo.");
  }

  return response.json();
}

/**
 * Récupère le statut des places disponibles pour les ateliers (avec repli localStorage).
 */
const DEFAULT_WORKSHOPS = [
  {
    id: 'couscous',
    title: "Couscous Traditionnel de Ma Mère",
    duration: "3h30",
    price: 75,
    level: "Tous niveaux / Débutant",
    description: "Apprenez l'art ancestral de rouler le couscous à la main, la cuisson en trois étapes à la vapeur dans le couscoussier traditionnel, et la préparation d'un bouillon parfumé aux épices secrètes d'Oran.",
    includes: [
      "Ingrédients frais et bio de saison",
      "Dégustation conviviale sur place",
      "Un sachet d'épices d'Oran maison offert",
      "Fiche recette illustrée envoyée par email"
    ],
    availablePlaces: 8
  },
  {
    id: 'patisseries',
    title: "Pâtisseries Orientales & Thé à la Menthe",
    duration: "2h30",
    price: 60,
    level: "Tous niveaux / Débutant",
    description: "Maîtrisez le feuilletage et le pliage de la Baklawa, la confection des Cornes de Gazelle parfumées à la fleur d'oranger, et le rituel authentique du service du thé à la menthe algérien.",
    includes: [
      "Ingrédients premium (amandes, miel pur, eau de rose)",
      "Boîte cadeau de vos réalisations (10-12 pièces)",
      "Dégustation de thé sur place",
      "Livret numérique des secrets de Djaouida"
    ],
    availablePlaces: 8
  },
  {
    id: 'chorba',
    title: "Chorba Frik & Boureks Croustillants",
    duration: "2h00",
    price: 50,
    level: "Tous niveaux / Débutant",
    description: "Un grand classique des tables de fête algériennes. Apprenez à mijoter la Chorba Frik traditionnelle au blé concassé et façonnez des boureks croustillants en cigares ou triangles.",
    includes: [
      "Tous les ingrédients inclus",
      "Dégustation chaleureuse sur place",
      "Technique infaillible de pliage des feuilles de dioul",
      "Fiche recette imprimée"
    ],
    availablePlaces: 8
  },
  {
    id: 'tajines',
    title: "Atelier Prestige : Tajines & Pain Matlouh",
    duration: "3h00",
    price: 80,
    level: "Tous niveaux / Débutant",
    description: "Initiez-vous à la cuisson lente et harmonieuse en tajine de terre cuite (tajine d'agneau sucré-salé aux pruneaux et amandes grillées) et pétrissez le pain gonflé traditionnel cuit sur plaque en fonte.",
    includes: [
      "Ingrédients de qualité bouchère et épices rares",
      "Repas complet partagé (entrée, plat, boisson)",
      "Votre pain Matlouh chaud à emporter",
      "Fiche technique de cuisson lente"
    ],
    availablePlaces: 8
  }
];

export async function getWorkshops() {
  let localWorkshops = [];
  const stored = localStorage.getItem('coeurdoran_workshops_v3');
  if (stored) {
    try {
      localWorkshops = JSON.parse(stored);
    } catch (e) {
      localWorkshops = DEFAULT_WORKSHOPS;
    }
  } else {
    localWorkshops = DEFAULT_WORKSHOPS;
    localStorage.setItem('coeurdoran_workshops_v3', JSON.stringify(DEFAULT_WORKSHOPS));
  }

  // S'assurer que chaque atelier local a ses valeurs par défaut
  localWorkshops = localWorkshops.map(w => {
    const defaultW = DEFAULT_WORKSHOPS.find(d => d.id === w.id);
    const merged = defaultW ? { ...defaultW, ...w } : w;
    return { ...merged, includes: merged.includes || [] };
  });

  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/workshops`, {}, 2500);
    if (!response.ok) {
      throw new Error('Point de terminaison non disponible sur le NAS.');
    }
    const data = await response.json();
    
    // Fusionner les données du NAS avec les modifications locales (localStorage) et valeurs par défaut
    let merged = data.map(w => {
      const defaultW = DEFAULT_WORKSHOPS.find(d => d.id === w.id) || {};
      const localW = localWorkshops.find(l => l.id === w.id) || {};
      const mergedW = { ...defaultW, ...localW, ...w };
      return { ...mergedW, includes: mergedW.includes || [] };
    });

    // Ajouter les ateliers créés localement qui ne sont pas encore sur le NAS
    let updated = [...merged];
    for (const localW of localWorkshops) {
      if (!merged.find(w => w.id === localW.id)) {
        try {
          await createWorkshop(localW);
        } catch (err) {
          console.error("Syncing local workshop to NAS failed:", err);
        }
        updated.push(localW);
      }
    }

    localStorage.setItem('coeurdoran_workshops_v3', JSON.stringify(updated));
    return updated.map(w => ({ ...w, availablePlaces: Math.min(w.availablePlaces, 8), includes: w.includes || [] }));
  } catch (error) {
    console.warn("Connexion NAS pour les ateliers impossible, chargement depuis le localStorage...", error);
    const localMerged = localWorkshops.map(w => {
      const defaultW = DEFAULT_WORKSHOPS.find(d => d.id === w.id) || {};
      const mergedW = { ...defaultW, ...w };
      return { ...mergedW, includes: mergedW.includes || [] };
    });
    return localMerged.map(w => ({ ...w, availablePlaces: Math.min(w.availablePlaces, 8), includes: w.includes || [] }));
  }
}

export async function updateWorkshopSpots(id, availablePlaces) {
  const spots = Math.min(parseInt(availablePlaces, 10), 8);
  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/workshops`, {}, 2500);
    if (!response.ok) {
      throw new Error('Impossible de charger les ateliers.');
    }
    const data = await response.json();
    const existing = data.find(w => w.id === id) || DEFAULT_WORKSHOPS.find(d => d.id === id);
    if (!existing) {
      throw new Error(`Atelier ${id} non trouvé.`);
    }
    
    const updated = { ...existing, availablePlaces: spots };
    await updateWorkshop(id, updated);
    return { ...updated, availablePlaces: spots };
  } catch (error) {
    console.warn("Mise à jour NAS impossible pour l'atelier, sauvegarde dans le localStorage...", error);
    let workshops = DEFAULT_WORKSHOPS;
    const stored = localStorage.getItem('coeurdoran_workshops_v3');
    if (stored) {
      workshops = JSON.parse(stored);
    }
    
    const updatedList = workshops.map(w => {
      if (w.id === id) {
        return { ...w, availablePlaces: spots };
      }
      return w;
    });
    localStorage.setItem('coeurdoran_workshops_v3', JSON.stringify(updatedList));
    return { id, availablePlaces: spots };
  }
}

export async function createWorkshop(workshop) {
  // S'assurer que 'includes' est bien un tableau
  const cleanWorkshop = { ...workshop, includes: workshop.includes || [] };

  // Enregistrer immédiatement en local (localStorage) pour réactivité
  let workshops = DEFAULT_WORKSHOPS;
  const stored = localStorage.getItem('coeurdoran_workshops_v3');
  if (stored) {
    try {
      workshops = JSON.parse(stored);
    } catch (e) {
      workshops = DEFAULT_WORKSHOPS;
    }
  }
  
  if (!workshops.find(w => w.id === cleanWorkshop.id)) {
    workshops.push(cleanWorkshop);
  } else {
    workshops = workshops.map(w => w.id === cleanWorkshop.id ? cleanWorkshop : w);
  }
  localStorage.setItem('coeurdoran_workshops_v3', JSON.stringify(workshops));

  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/workshops`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cleanWorkshop),
    }, 2500);
    if (!response.ok) {
      throw new Error("Erreur lors de la création de l'atelier sur le NAS.");
    }
    return response.json();
  } catch (error) {
    console.warn("Création NAS impossible, conservé dans le localStorage...", error);
    return cleanWorkshop;
  }
}

export async function updateWorkshop(id, workshop) {
  // S'assurer que 'includes' est bien un tableau
  const cleanWorkshop = { ...workshop, includes: workshop.includes || [] };

  // Enregistrer immédiatement en local (localStorage) pour réactivité
  let workshops = DEFAULT_WORKSHOPS;
  const stored = localStorage.getItem('coeurdoran_workshops_v3');
  if (stored) {
    try {
      workshops = JSON.parse(stored);
    } catch (e) {
      workshops = DEFAULT_WORKSHOPS;
    }
  }
  const updated = workshops.map(w => (w.id === id ? { ...w, ...cleanWorkshop } : w));
  localStorage.setItem('coeurdoran_workshops_v3', JSON.stringify(updated));

  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/workshops/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cleanWorkshop),
    }, 2500);
    if (!response.ok) {
      throw new Error("Erreur lors de la modification de l'atelier sur le NAS.");
    }
    return response.json();
  } catch (error) {
    console.warn("Mise à jour NAS impossible, conservé dans le localStorage...", error);
    return cleanWorkshop;
  }
}

export async function deleteWorkshop(id) {
  // Enregistrer immédiatement en local (localStorage) pour réactivité
  let workshops = DEFAULT_WORKSHOPS;
  const stored = localStorage.getItem('coeurdoran_workshops_v3');
  if (stored) {
    try {
      workshops = JSON.parse(stored);
    } catch (e) {
      workshops = DEFAULT_WORKSHOPS;
    }
  }
  const updated = workshops.filter(w => w.id !== id);
  localStorage.setItem('coeurdoran_workshops_v3', JSON.stringify(updated));

  try {
    const response = await fetchWithTimeout(`${API_BASE_URL}/workshops/${id}`, {
      method: 'DELETE',
    }, 2500);
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'atelier sur le NAS.");
    }
    return response.json();
  } catch (error) {
    console.warn("Suppression NAS impossible, conservé dans le localStorage...", error);
    return { id };
  }
}

