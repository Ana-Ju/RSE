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

## CMS (MVP) : les événements

Les événements ne sont plus écrits à la main dans le HTML. Ils sont stockés dans
`data/evenements.json` et affichés automatiquement par `assets/js/evenements.js` :

- page **Actualités** : les cartes des événements, du plus récent au plus ancien ;
- **Accueil** : l'agenda, avec les événements à venir en haut et la mention « Passé »
  calculée d'après la date (plus besoin de la mettre à jour à la main).

Le fichier est modifiable sans code avec [Pages CMS](https://pagescms.org) : le formulaire
« Événements » est défini dans `.pages.yml`. Chaque enregistrement crée un commit, et
GitHub Pages republie le site.

Le texte saisi dans le CMS est échappé avant affichage (pas d'injection de HTML).
Si le fichier ne peut pas être lu (site ouvert en double-clic, hors ligne), le contenu
écrit dans le HTML reste affiché : pour voir les données du CMS, ouvrir le site via
GitHub Pages ou un petit serveur local (`python3 -m http.server`).

Le lien d'inscription du deuxième événement est un lien générique HelloAsso, à remplacer.
