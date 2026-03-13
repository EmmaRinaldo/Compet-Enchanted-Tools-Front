## Compet Enchanted Tools – Front (Application Joueur)

### 1. Documentation technique

- **Technologie principale**: `Next.js` (App Router) avec React et TypeScript  
- **Gestion de styles**: Tailwind CSS (ou système de design **défini** dans le projet)  
- **Routing**: dossier `app/` (par exemple `app/reward`, `app/parcours`, `app/module/[slug]`)  
- **Appels API**: communication avec l’API du back `Compet-Enchanted-Tools-Back` (endpoints à préciser selon l’implémentation)  
- **Authentification**: gérée côté front via les endpoints d’authentification du back (token JWT / session – dépend de ton implémentation réelle, à décrire ici)  
- **Organisation du code**:
  - `app/` : pages et routes Next.js
  - `components/` : composants UI réutilisables (ex. `MissionProgressHeader`, `QuizGame`, etc.)
  - `public/` : assets statiques (icônes, fonds SVG, images de récompenses, etc.)

### 2. Schéma d’architecture (vue globale)

Architecture logique de l’application joueur :

- **Joueur (navigateur)**  
  ⟶ **Front Next.js (ce dépôt)**  
  ⟶ appelle l’**API REST** du `Back` pour :
  - récupérer les modules, missions, parcours, jeux/quiz
  - récupérer et mettre à jour la progression du joueur
  - récupérer et valider les récompenses

Le front ne contient pas de logique métier lourde : il se concentre sur l’affichage, la navigation, la gestion de l’état local et la communication avec l’API.

### 3. Guide d’installation

#### Prérequis

- Node.js (version LTS recommandée, ex. 18+)
- npm, yarn, pnpm ou bun

#### Installation

```bash
cd Compet-Enchanted-Tools-Front/my-app
npm install
# ou
yarn install
```

### 4. Guide d’utilisation (front joueur)

#### Lancer l’application en développement

```bash
cd Compet-Enchanted-Tools-Front/my-app
npm run dev
```

Puis ouvrir `http://localhost:3000` dans un navigateur.

#### Fonctionnalités principales

- **Accueil / Parcours**: le joueur voit ses parcours, modules et missions disponibles.  
- **Module / Mission**: pour un module donné (`/module/[slug]/mission`), le joueur voit la liste des missions et sa progression (via le composant `MissionProgressHeader`).  
- **Jeux / Quiz**: certains écrans présentent des mini‑jeux ou quiz (`QuizGame`) permettant de valider des compétences.  
- **Récompenses**: la page `/reward` affiche les récompenses gagnées ou à débloquer, avec un visuel gamifié.

### 5. Exemples de données

Les données d’exemple (JSON, seeds, etc.) sont centralisées côté back (`Compet-Enchanted-Tools-Back`) afin de garder une source de vérité unique pour les modules, missions, parcours et récompenses.  
Pour tester rapidement le front, assure‑toi que le back est démarré avec ses données de démo, puis configure l’URL de l’API (variable d’environnement, par exemple `NEXT_PUBLIC_API_URL`).

### 6. Instructions de déploiement

- **Build de production**

```bash
cd Compet-Enchanted-Tools-Front/my-app
npm run build
npm run start
```

- **Environnement recommandé**
  - Variable d’environnement pour l’URL API (`NEXT_PUBLIC_API_URL`)
  - Optionnel: configuration d’analytics ou de monitoring (Sentry, etc.)

- **Plateformes possibles**
  - Déploiement sur Vercel, Netlify, ou sur un serveur Node dédié derrière un reverse proxy (Nginx, etc.).

Assure‑toi que le back est accessible depuis l’URL configurée, et que les CORS/token d’authentification sont correctement paramétrés entre front et back.

