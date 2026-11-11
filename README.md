# Citoyens de la Terre — maquette fonctionnelle du site

Site statique (HTML, CSS, JavaScript), sans framework ni étape de compilation.
Il reprend la maquette Figma « RSE » (6 pages).

## Ouvrir le site

Double-cliquer sur `index.html` : il s'ouvre dans le navigateur, sans installation.

## Organisation des fichiers

```
citoyens-de-la-terre/
├── index.html          Accueil
├── asso.html           L'association (histoire, équipe, partenaires, procuration AG)
├── actions.html        Nos actions
├── actus.html          Actualités, agenda, carte collaborative
├── contact.html        Contact + formulaire
├── adherer.html        Formules d'adhésion + formulaire
├── assets/
│   ├── css/style.css   Toute la mise en forme (couleurs, typo, composants, mobile)
│   ├── js/main.js      Menu mobile, formulaires, messages « à brancher »
│   ├── img/
│   │   ├── logo.svg
│   │   ├── equipe/      Photos de l'équipe (à ajouter)
│   │   └── partenaires/ Logos des partenaires (à ajouter)
│   └── icons/          Icônes SVG
└── docs/               PDF téléchargeables (à ajouter)
```

## Repères dans le CSS

`style.css` est organisé de haut en bas : variables de couleur, en-tête, boutons, typographie,
grilles et cartes, puis une section par page, l'adaptation mobile, et enfin les classes
utilitaires (`fs-21`, `mw-760`, `pb-80`…) pour les petits ajustements propres à la maquette.

Les couleurs sont définies une seule fois en haut du fichier :

| Variable   | Couleur   | Usage                            |
|------------|-----------|----------------------------------|
| `--bg`     | `#0f2a1e` | fond vert sombre, texte foncé    |
| `--lime`   | `#c8f04a` | accent principal, boutons        |
| `--orange` | `#ff8a5b` | accent secondaire                |
| `--cream`  | `#f3f1e7` | sections claires, texte clair    |
| `--mint`   | `#cfe3d8` | texte secondaire sur fond sombre |

Police : Bricolage Grotesque (Google Fonts).

## Ce qui reste à brancher

Tout ce qui n'est pas encore relié affiche un petit message au clic (attribut `data-toast` dans le HTML) :

- **Formulaires** (contact, adhésion, procuration) : vérifient les champs puis affichent une confirmation, mais n'envoient rien. À relier à un service d'envoi (Formspree, HelloAsso, outil de l'asso…).
- **Liens externes** : Facebook, HelloAsso, aremdt.org, espace de paiement.
- **Médias** : vidéo de présentation, vidéo du projet trame verte et bleue, carte uMap, plan d'accès.
- **Contenus** : photos de l'équipe, logos des partenaires, PDF (bulletin d'adhésion, charte AREMDT), pages Mentions légales / Confidentialité / Plan du site.
- **Logo** : `assets/img/logo.svg` est une reconstitution, à remplacer par le fichier officiel.
