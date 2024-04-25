#!/bin/sh

# Démarrer SMTP service en arrière-plan
npm run start smtp &

# Démarrer ytraveling-backend comme processus principal
npm run start ytraveling-backend
