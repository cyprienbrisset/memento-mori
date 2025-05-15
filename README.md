# Memento Mori - Visualiseur de Temps de Vie

Une application web interactive qui vous permet de visualiser votre temps de vie restant sous forme de calendrier, inspirée par le concept philosophique de "Memento Mori" (Souviens-toi que tu vas mourir).

## Fonctionnalités

### Visualisation du Temps
- Calendrier de vie interactif montrant les semaines passées et restantes
- Compteur de temps restant en temps réel
- Affichage des années écoulées et restantes
- Visualisation claire des différentes périodes de la vie

### Calculateur d'Espérance de Vie
Un calculateur sophistiqué qui estime votre espérance de vie en fonction de plusieurs facteurs, utilisant un système de score pondéré sur 100 points. L'espérance de vie finale est calculée selon la formule :
```
Espérance de vie finale = Base ajustée + (Score global / 100) × 15 ans
```
où la base est de 86 ans pour les femmes et 82 ans pour les hommes.

#### Facteurs pris en compte et leur poids :
1. **Informations de base (20 points)**
   - Niveau d'éducation (10 points)
     * Primaire : 2 points
     * Secondaire : 5 points
     * Supérieur : 10 points
   - Niveau de revenu (10 points)
     * Faible : 2 points
     * Moyen : 5 points
     * Élevé : 10 points

2. **Habitudes de consommation (35 points)**
   - Tabac (15 points)
     * Non-fumeur : 15 points
     * Occasionnel : 5 points
     * Fumeur régulier : 0 point
   - Alcool (10 points)
     * Aucune consommation : 10 points
     * Occasionnelle : 8 points
     * Modérée : 5 points
     * Forte : 0 point
   - Drogues (10 points)
     * Non-consommateur : 10 points
     * Occasionnel : 5 points
     * Consommateur régulier : 0 point

3. **Mode de vie (25 points)**
   - Activité physique (10 points)
     * 5+ fois/semaine : 10 points
     * 3-4 fois/semaine : 7 points
     * 1-2 fois/semaine : 3 points
     * Aucune : 0 point
   - Sommeil (10 points)
     * Durée (5 points)
       - 7-8h : 5 points
       - Plus de 8h : 3 points
       - 5-6h : 2 points
       - Moins de 5h : 0 point
     * Qualité (5 points)
       - Bonne : 5 points
       - Correcte : 3 points
       - Mauvaise : 0 point
   - Alimentation (10 points)
     * Saine : 10 points
     * Équilibrée : 7 points
     * Moyenne : 4 points
     * Déséquilibrée : 0 point

4. **Santé (20 points)**
   - IMC (5 points)
     * Normal (18.5-25) : 5 points
     * Surpoids (25-30) : 3 points
     * Sous-poids (<18.5) : 1 point
     * Obésité (>30) : 0 point
   - Maladies chroniques (5 points)
     * Aucune : 5 points
     * 1 maladie : 2 points
     * Plusieurs maladies : 0 point
   - Stress (5 points)
     * Rare : 5 points
     * Occasionnel : 3 points
     * Souvent : 1 point
     * Constant : 0 point
   - Suivi médical (5 points)
     * Suivi régulier : 5 points
     * Pas de suivi : 0 point

5. **Environnement (15 points)**
   - Type d'habitat (5 points)
     * Campagne : 5 points
     * Petite ville : 3 points
     * Grande ville : 2 points
     * Zone polluée : 0 point
   - Qualité de l'air (5 points)
     * Bonne : 5 points
     * Moyenne : 3 points
     * Mauvaise : 0 point
   - Support social (5 points)
     * Fort : 5 points
     * Modéré : 3 points
     * Faible : 0 point

6. **Facteurs supplémentaires (10 points)**
   - Consommation d'eau (5 points)
     * Excellente (>2L) : 5 points
     * Suffisante (1-2L) : 3 points
     * Insuffisante (<1L) : 0 point
   - Pratique de relaxation (5 points)
     * Quotidienne : 5 points
     * Occasionnelle : 3 points
     * Aucune : 0 point

### Interface Utilisateur
- Design moderne et épuré
- Thème sombre/clair
- Interface responsive
- Animations fluides
- Formulaires interactifs

## Technologies Utilisées

- **Frontend**
  - Next.js 14
  - React 18
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui
  - date-fns
  - React Testing Library
  - Jest

- **Tests**
  - Tests unitaires
  - Tests d'intégration
  - Couverture de tests

## Installation

1. Cloner le repository :
```bash
git clone [URL_DU_REPO]
cd memento-mori
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer l'application en mode développement :
```bash
npm run dev
```

4. Lancer les tests :
```bash
npm test
```

5. Générer le rapport de couverture de tests :
```bash
npm run test:coverage
```

## Structure du Projet

```
memento-mori/
├── app/                    # Pages de l'application
├── components/            # Composants React
│   ├── ui/               # Composants UI réutilisables
│   └── ...               # Autres composants
├── lib/                  # Utilitaires et configurations
├── public/              # Assets statiques
└── tests/               # Tests
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Auteur

[Votre Nom]

## Remerciements

- Inspiration : [Tim Urban's Life Calendar](https://waitbutwhy.com/2014/05/life-weeks.html)
- Design : [Shadcn/ui](https://ui.shadcn.com/)
- Icônes : [Lucide Icons](https://lucide.dev/)

---
