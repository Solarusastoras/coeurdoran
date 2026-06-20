const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5001;

// Configuration CORS pour autoriser l'accès depuis le client React (généralement port 3000)
app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'public', 'data');
const MENU_FILE = path.join(DATA_DIR, 'menu.json');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');

// S'assurer que les dossiers de stockage existent (idéalement sur le NAS)
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Servir les photos téléchargées de manière statique sur le port 5001
app.use('/uploads', express.static(UPLOADS_DIR));

// Configuration de multer pour stocker localement les images envoyées
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5Mo
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Seules les images (jpeg, jpg, png, webp) sont autorisées.'));
  }
});

// Helper pour lire le fichier menu
const readMenuData = () => {
  try {
    if (!fs.existsSync(MENU_FILE)) {
      return [];
    }
    const data = fs.readFileSync(MENU_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier menu.json:', error);
    return [];
  }
};

// Helper pour écrire dans le fichier menu
const writeMenuData = (data) => {
  try {
    fs.writeFileSync(MENU_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Erreur lors de l\'écriture dans le fichier menu.json:', error);
  }
};

// --- ENDPOINTS API ---

// 1. Lire le menu
app.get('/api/menu', (req, res) => {
  const menu = readMenuData();
  res.json(menu);
});

// 2. Ajouter un article
app.post('/api/menu', (req, res) => {
  const menu = readMenuData();
  const newItem = {
    id: Date.now().toString(),
    name: req.body.name || 'Sans nom',
    description: req.body.description || '',
    price: parseFloat(req.body.price) || 0,
    category: req.body.category || 'plat',
    image: req.body.image || '',
    tags: Array.isArray(req.body.tags) ? req.body.tags : [],
    allergens: Array.isArray(req.body.allergens) ? req.body.allergens : []
  };
  
  menu.push(newItem);
  writeMenuData(menu);
  res.status(201).json(newItem);
});

// 3. Modifier un article
app.put('/api/menu/:id', (req, res) => {
  const { id } = req.params;
  const menu = readMenuData();
  const index = menu.findIndex(item => item.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Article non trouvé' });
  }

  menu[index] = {
    ...menu[index],
    name: req.body.name !== undefined ? req.body.name : menu[index].name,
    description: req.body.description !== undefined ? req.body.description : menu[index].description,
    price: req.body.price !== undefined ? parseFloat(req.body.price) : menu[index].price,
    category: req.body.category !== undefined ? req.body.category : menu[index].category,
    image: req.body.image !== undefined ? req.body.image : menu[index].image,
    tags: Array.isArray(req.body.tags) ? req.body.tags : menu[index].tags,
    allergens: Array.isArray(req.body.allergens) ? req.body.allergens : menu[index].allergens
  };

  writeMenuData(menu);
  res.json(menu[index]);
});

// 4. Supprimer un article
app.delete('/api/menu/:id', (req, res) => {
  const { id } = req.params;
  let menu = readMenuData();
  const initialLength = menu.length;
  menu = menu.filter(item => item.id !== id);

  if (menu.length === initialLength) {
    return res.status(404).json({ error: 'Article non trouvé' });
  }

  writeMenuData(menu);
  res.json({ message: 'Article supprimé avec succès', id });
});

// 5. Upload d'une image
app.post('/api/upload', (req, res) => {
  upload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: `Erreur d'upload : ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier image fourni' });
    }
    
    // Retourne le chemin relatif de l'image stockée
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  });
});

// Lancement du serveur API
app.listen(PORT, () => {
  console.log(`[Backend] Serveur API lancé sur le port ${PORT}`);
});
