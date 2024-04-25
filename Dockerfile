FROM node:18 AS builder

ENV NODE_OPTIONS="--max-old-space-size=500"

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
# RUN npx prisma generate
RUN npx prisma db push
RUN npm run build

# Installez les dépendances supplémentaires requises
RUN apt-get update && apt-get install -y libssl-dev procps

# Nettoyage des installations
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Exposez un port (si nécessaire, pour le service principal ou un proxy)
EXPOSE $PORT

# Copiez un script de démarrage personnalisé qui lancera vos services
COPY entrypoint.sh /app
RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]
