# La Billetterie du Havre

## Description
La Billetterie du Havre est une application web conçue pour gérer la billetterie. Le projet est divisé en plusieurs parties pour différents utilisateurs : Admin, Utilisateur non connecté, et Utilisateur connecté, offrant des fonctionnalités spécifiques à chaque profil.

## Fonctionnalités
- **Administration** : Gestion des billets et des événements.
- **Interface utilisateur** : Interface fluide pour l'achat et la gestion de billets.
- **Sécurité** : Authentification et sécurisation des transactions et des données utilisateurs.

## Technologies Utilisées
- **Backend** : PHP
- **Database** : MySQL/MariaDB
- **Frontend** : ReactJS
- **Tests Unitaires** : Jest pour React, PHPUnit pour PHP
- **Versioning** : GitHub

## Installation

### Prérequis
- PHP 7.4 ou plus
- Composer
- MySQL/MariaDB

### Clonage du repository

```bash
git clone https://github.com/MatisAgr/Materclass-Unit.git
cd Materclass-Unit
```
### Configuration et démarrage du Backend

- Importez le script SQL fourni à la racine du projet dans votre base de données MySQL ou MariaDB pour configurer la base de données initiale.
- Assurez-vous que le backend soit lancé par Apache. Déplacez le projet dans votre dossier `htdocs` si vous utilisez XAMPP ou un serveur équivalent.
- Naviguez au dossier du backend avec la commande suivante :

```bash
cd backend
```

- Pour exécuter les tests backend de l'application, utilisez :

```bash
php ./vendor/bin/phpunit
```

- Modifiez le fichier `.env` pour mettre à jour les variables de connexion à votre base de données.

### Configuration et démarrage du Frontend 

- Naviguez au dossier du frontend avec la commande suivante :

```bash
cd frontend/masterclass-unit
```

- Installez les dépendances nécessaires avec :

```bash
npm install
```

- Pour exécuter les tests de l'application, utilisez :

```bash
npm test
```

- Lancez l'application frontend sur le port 3000 avec :

```bash
npm start
```
