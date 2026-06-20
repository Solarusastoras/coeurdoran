FROM node:20-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm install --only=production

# Copier le fichier serveur principal
COPY server.js ./

# Exposer le port de l'API
EXPOSE 5001

# Lancer l'application
CMD ["node", "server.js"]
