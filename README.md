# Memento Mori

> "Memento Mori" - Souvenez-vous que vous êtes mortel

Une application web philosophique et interactive qui vous permet de visualiser le temps qui vous reste à vivre. Inspirée par le concept stoïcien de "Memento Mori", cette application vous aide à prendre conscience de la précarité de la vie et à vivre chaque jour avec plus de conscience.

## 🌟 À Propos

Memento Mori est une application moderne qui transforme un concept philosophique profond en une expérience visuelle interactive. Elle vous permet de :

- Visualiser votre vie sous forme d'un calendrier interactif
- Calculer le temps restant en fonction de votre espérance de vie
- Personnaliser votre espérance de vie pour une visualisation plus précise
- Réfléchir sur le temps qui passe et l'importance de chaque moment

## 🎯 Objectifs

- Sensibiliser à la précarité de la vie
- Encourager une vie plus consciente et intentionnelle
- Fournir une visualisation claire du temps restant
- Offrir une expérience utilisateur élégante et réfléchie

## 🚀 Technologies

- **Framework**: Next.js 15.2.4
- **UI Library**: React 19
- **Styling**: TailwindCSS
- **Type Safety**: TypeScript
- **Package Manager**: pnpm
- **UI Components**: 
  - Radix UI (composants accessibles)
  - Framer Motion (animations)
  - Lucide React (icônes)
  - Embla Carousel (carrousel)
  - Recharts (graphiques)
  - Sonner (notifications)

## 📦 Installation

1. Clonez le repository :
```bash
git clone [URL_DU_REPO]
cd memento-mori
```

2. Installez les dépendances :
```bash
pnpm install
```

3. Lancez le serveur de développement :
```bash
pnpm dev
```

## 🛠️ Scripts Disponibles

- `pnpm dev` : Lance le serveur de développement
- `pnpm build` : Génère la version de production
- `pnpm start` : Lance la version de production
- `pnpm lint` : Vérifie le code avec ESLint

## 🏗️ Structure du Projet

```
memento-mori/
├── app/                 # Pages et layouts Next.js
├── components/          # Composants React réutilisables
├── hooks/              # Custom React hooks
├── lib/                # Utilitaires et configurations
├── public/             # Assets statiques
├── styles/             # Styles globaux
└── types/              # Types TypeScript
```

## 🎨 Fonctionnalités

### 📅 Calendrier de Vie
- Visualisation interactive de votre vie sous forme de calendrier
- Représentation claire des semaines, mois et années
- Indication visuelle du temps écoulé et du temps restant

### ⏳ Compteur de Temps Restant
- Calcul précis du temps restant en fonction de votre date de naissance
- Affichage en temps réel des années, mois, semaines et jours restants
- Mise à jour dynamique des compteurs

### ⚙️ Paramètres Personnalisables
- Formulaire de saisie de date de naissance intuitif
- Curseur d'ajustement de l'espérance de vie
- Interface de paramètres accessible à tout moment

### 🎭 Interface Utilisateur
- Design minimaliste et élégant
- Animations fluides avec Framer Motion
- Thème sombre/clair avec next-themes
- Composants UI accessibles avec Radix UI
- Notifications élégantes avec Sonner

### 📱 Responsive Design
- Interface adaptative pour tous les appareils
- Expérience utilisateur optimisée sur mobile et desktop
- Composants redimensionnables et flexibles

## 🚀 Déploiement

Le projet est configuré pour générer une version statique exportable. Pour construire :

```bash
pnpm build
```

Le build sera généré dans le dossier `out/` et peut être déployé sur n'importe quel hébergeur statique.

## 🔧 Configuration

Le projet utilise plusieurs configurations :

- `next.config.mjs` : Configuration Next.js
- `tailwind.config.js` : Configuration TailwindCSS
- `tsconfig.json` : Configuration TypeScript
- `postcss.config.mjs` : Configuration PostCSS

## 📝 Licence

© 2024 Memento Mori. Tous droits réservés.

Ce projet est propriétaire et est protégé par les lois sur la propriété intellectuelle. Toute utilisation, modification, distribution ou reproduction de ce code source est strictement interdite sans autorisation écrite préalable.

### Conditions d'utilisation

- ❌ Non redistribuable
- ❌ Non modifiable
- ❌ Non commercialisable
- ✅ Utilisation personnelle uniquement
- ✅ Consultation du code source autorisée

Pour toute demande d'utilisation ou de licence, veuillez contacter le propriétaire du projet.

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 🔐 Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet pour les variables d'environnement :

```env
# Exemple de variables d'environnement
NEXT_PUBLIC_API_URL=votre_url_api
```

## 🧪 Tests

Ce projet accorde une grande importance à la qualité et à la robustesse du code grâce à une stratégie de tests complète.

### Outils utilisés

- **Jest** : Framework de test principal
- **@testing-library/react** : Tests orientés utilisateur pour les composants React
- **@testing-library/jest-dom** : Assertions enrichies pour le DOM
- **Couverture** : Générée automatiquement à chaque exécution

### Structure des tests

Les tests sont organisés par type et par fonctionnalité :

```
__tests__/
  components/
    birth-date-form.test.tsx
    life-calendar.test.tsx
    life-expectancy-slider.test.tsx
    remaining-time-counter.test.tsx
    theme-provider.test.tsx
  integration/
    app.test.tsx
  lib/
    time-utils.test.ts
    utils.test.ts
```

- **Unitaires** : Fonctions utilitaires, logique métier
- **Composants** : Rendu, interactions, accessibilité
- **Intégration** : Parcours utilisateur, scénarios réels

### Lancer les tests

```bash
pnpm test           # Lancer tous les tests
pnpm test:watch     # Mode interactif (TDD)
pnpm test:coverage  # Générer le rapport de couverture
```

### Rapport de couverture (exemple)

| Fichier                        | Couverture |
|--------------------------------|:----------:|
| `birth-date-form.tsx`          |   100%     |
| `life-calendar.tsx`            |   100%     |
| `life-expectancy-slider.tsx`   |   100%     |
| `remaining-time-counter.tsx`   |   100%     |
| `theme-provider.tsx`           |   100%     |
| `time-utils.ts`                |   100%     |
| `utils.ts`                     |   100%     |

> **Remarque :** Les composants UI génériques (dossier `components/ui/`) ne sont pas testés ici car ils proviennent d'une bibliothèque externe.

---
