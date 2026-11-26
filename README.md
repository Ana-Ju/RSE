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

Les couleurs sont définies une seule fois en haut du fichier, en deux étages :

1. **La palette**, reprise de la zone « Style » du Figma : `--encre`, `--ardoise`, `--ocean`,
   `--azur`, `--glacier`, `--corail`, `--creme`, `--sable`, `--trait`, `--blanc`.
2. **Les rôles**, seuls utilisés dans le reste de la feuille :

| Rôle              | Couleur actuelle     | Usage                                          |
|-------------------|----------------------|------------------------------------------------|
| `--bg`            | sable `#efe5d0`      | fond de page                                   |
| `--bg-soft`       | crème `#f8f3e8`      | en-tête, sections et cartes claires            |
| `--surface`       | blanc                | cartes blanches, champs de formulaire          |
| `--text`          | bleu encre `#13294b` | titres et texte principal                      |
| `--text-soft`     | ardoise `#44607f`    | texte secondaire                               |
| `--accent`        | azur `#7db9ec`       | boutons et cartes mis en avant                 |
| `--accent-strong` | bleu océan `#1e63b5` | petits titres, chiffres clés, liens, icônes    |
| `--accent-2`      | corail `#f89901`     | second accent                                  |
| `--border`        | `#dcd2be`            | bordures et séparateurs                        |
| `--strong`        | bleu encre `#13294b` | boutons et cartes foncés                       |

Pour changer l'ambiance du site, il suffit de modifier ces variables.
Les classes portent le nom de leur rôle, pas de leur couleur : `btn-accent`, `btn-strong`,
`btn-outline`, `c-accent`, `c-soft`, `c-strong`, `on-soft`…
Les icônes (`assets/icons/`) ont leur couleur inscrite dans le fichier SVG.

Police : Bricolage Grotesque (Google Fonts).

## Ce qui reste à brancher

Tout ce qui n'est pas encore relié affiche un petit message au clic (attribut `data-toast` dans le HTML) :

- **Formulaires** (contact, adhésion, procuration) : vérifient les champs puis affichent une confirmation, mais n'envoient rien. À relier à un service d'envoi (Formspree, HelloAsso, outil de l'asso…).
- **Liens externes** : Facebook, HelloAsso, aremdt.org, espace de paiement.
- **Médias** : vidéo de présentation, vidéo du projet trame verte et bleue, plan d'accès (la carte des actions est branchée, voir plus bas).
- **Contenus** : photos de l'équipe, logos des partenaires, PDF (bulletin d'adhésion, charte AREMDT), pages Mentions légales / Confidentialité / Plan du site.

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


## Page « Éco-conception »

`eco-conception.html` présente, pour l'association et ses partenaires, comment le site
a été éco-conçu : la comparaison EcoIndex (note D de l'ancien site → note A du nouveau),
les choix concrets, l'impact estimé et les limites. La page est accessible depuis le
pied de page de toutes les pages (« En savoir plus → » et lien « Éco-conception »).

## Carte des actions

La section « La carte de nos actions » de `actus.html` affiche les points d'intervention
de l'association sur une carte OpenStreetMap. Par éco-conception, **la carte ne se charge
qu'au clic** : tant qu'on ne clique pas, aucune librairie ni tuile n'est téléchargée
(`assets/js/carte.js` charge Leaflet à la demande). Chaque point renvoie vers l'activité
correspondante.

Les points sont lus dans `data/points.json` et **modifiables dans le CMS** (rubrique
« Points de la carte », définie dans `.pages.yml`). Les points actuels sont des exemples
situés dans la région de Marseille, à remplacer par les vrais points avec l'association.
Si Leaflet ne peut pas être chargé, la carte affiche un message et le reste de la page
fonctionne normalement.
