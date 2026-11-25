/* =========================================================
   Événements gérés depuis le CMS (data/evenements.json).
   - Page Actualités : cartes des événements de l'année.
   - Accueil : agenda, avec la mention « Passé » calculée
     automatiquement d'après la date.
   Si le fichier ne peut pas être lu (site ouvert en double-clic,
   hors ligne…), le contenu écrit dans le HTML reste affiché.
   ========================================================= */
(function () {
  "use strict";

  var cartes = document.getElementById("evenements");
  var agenda = document.getElementById("agenda");
  if (!cartes && !agenda) return;

  var MOIS = ["janv.", "févr.", "mars", "avril", "mai", "juin", "juil.",
              "août", "sept.", "oct.", "nov.", "déc."];

  // Le texte saisi dans le CMS est toujours échappé avant affichage.
  function esc(t) {
    return String(t == null ? "" : t)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function lienSur(u) {
    return /^https?:\/\//i.test(u || "") ? u : "";
  }
  function lireDate(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || "");
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
  }
  function jourMois(d) {
    return d.getDate() + (d.getDate() === 1 ? "er" : "") + " " + MOIS[d.getMonth()];
  }

  fetch("data/evenements.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (liste) {
      var aujourdHui = new Date(); aujourdHui.setHours(0, 0, 0, 0);
      var evts = (liste || [])
        .map(function (e) { e._d = lireDate(e.date); return e; })
        .filter(function (e) { return e._d && e.titre; })
        .sort(function (a, b) { return b._d - a._d; });

      if (cartes) {
        cartes.innerHTML = evts.map(function (e, i) {
          var infos = [e._d.getFullYear(), e.horaires, e.lieu].filter(Boolean).map(esc).join(" · ");
          var lien = lienSur(e.lien_inscription);
          return '<article class="ev ' + (i === 0 ? "c-lime" : "c-cream") + ' flex col">' +
            '<div class="d">' + jourMois(e._d) + "</div>" +
            '<div class="s">' + infos + "</div>" +
            "<h3>" + esc(e.titre) + "</h3>" +
            (e.resume ? '<p class="txt">' + esc(e.resume) + "</p>" : "") +
            (e.partenaires ? '<p class="txt fs-15">' + esc(e.partenaires) + "</p>" : "") +
            '<div class="grow"></div>' +
            (lien ? '<a class="btn btn-dark mt24 self-start" href="' + esc(lien) +
                    '" target="_blank" rel="noopener">Je m\'inscris</a>' : "") +
            "</article>";
        }).join("");
      }

      if (agenda) {
        var aVenir = evts.filter(function (e) { return e._d >= aujourdHui; }).reverse();
        var passes = evts.filter(function (e) { return e._d < aujourdHui; });
        agenda.innerHTML = aVenir.concat(passes).map(function (e) {
          var passe = e._d < aujourdHui;
          var lien = lienSur(e.lien_inscription);
          var action = passe
            ? '<span class="btn btn-ol-dark h-52 cursor-default">Passé</span>'
            : (lien ? '<a class="btn btn-md btn-dark h-52" href="' + esc(lien) +
                      '" target="_blank" rel="noopener">Je m\'inscris</a>'
                    : '<span class="btn btn-ol-dark h-52 cursor-default">À venir</span>');
          return '<div class="agenda-row">' +
            '<div><div class="d">' + jourMois(e._d) + '</div><div class="y">' + e._d.getFullYear() + "</div></div>" +
            '<div><div class="t">' + esc(e.titre) + '</div><div class="m">' +
              [e.horaires, e.lieu].filter(Boolean).map(esc).join(" · ") + "</div></div>" +
            action + "</div>";
        }).join("");
      }
    })
    .catch(function () { /* on garde le contenu statique */ });
})();
