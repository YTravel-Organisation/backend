# YTravel Backend

Le backend de YTravel est une API moderne et efficace construite avec [NestJS](https://nestjs.com/) et [Apollo GraphQL](https://www.apollographql.com/). Elle fournit une plateforme complète pour la réservation d'hôtels, d'activités, de transports et une gestion intégrée pour les établissements hôteliers.

## Fonctionnalités

- **Recherche Intelligente**: Utilisant le traitement du langage naturel pour interpréter les demandes complexes.
- **Gestion des Comptes**: Comprend des abonnements, un système de fidélité et des types de comptes spéciaux.
- **Réservation et Gestion d'Hébergement**: Inclut la vérification d'établissements, des suggestions d'activités locales et un processus de check-in en ligne.
- **Gestion Interne pour Hôtels**: Offre des outils pour la planification du personnel, la gestion des stocks et la maintenance.
- **Sécurité**: Authentification robuste, autorisations granulaires et chiffrement des données.

## Démarrage rapide

Pour lancer le projet localement, suivez les étapes ci-dessous :

```bash
# Clonez le dépôt
git clone https://github.com/votre-utilisateur/YTravel-backend.git

# Allez dans le répertoire du projet
cd YTravel-backend

# Installez les dépendances
npm install

# Lancez le serveur de développement
npm run start:dev
```

## Structure du projet

Le backend est structuré en modules reflétant les différentes entités de la base de données :

- `comments/`
- `events/`
- `hotels/`
- `notifications/`
- `payments/`
- `reservations/`
- `roles/`
- `rooms/`
- `users/`

Chaque module contient les fichiers de service, resolver, et le cas échéant, les DTOs pour la communication avec GraphQL.

## Documentation de l'API

Une fois le serveur en cours d'exécution, accédez à `http://localhost:3000/graphql` pour explorer l'API avec Apollo Studio.

## Tests

Pour exécuter les tests :

```bash
npm run test
```

Pour les tests de couverture :

```bash
npm run test:cov
```

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` (à créer) pour plus de détails.

## Contact

- [YTravel](mailto:contact@ytravel.com)

---

© 2023 YTravel, Inc. Tous droits réservés.