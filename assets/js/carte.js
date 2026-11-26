/* =========================================================
   Carte des points d'intervention de l'association.
   Éco-conception : rien n'est chargé tant que l'utilisateur
   ne clique pas sur la carte. Au clic, on charge Leaflet et
   les tuiles OpenStreetMap, puis on place les points lus dans
   data/points.json. Chaque point renvoie vers l'activité
   correspondante.
   Les points sont modifiables dans le CMS (rubrique « Points
   de la carte »).
   ========================================================= */
(function () {
  "use strict";

  var box = document.getElementById("mapbox");
  if (!box) return;

  var LEAFLET_CSS = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
  var LEAFLET_JS = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
  var started = false;

  function esc(t) {
    return String(t == null ? "" : t)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function lienSur(u) {
    // on n'autorise que des liens internes (pages du site) ou http(s)
    u = String(u || "");
    if (/^https?:\/\//i.test(u)) return u;
    if (/^[\w./#-]+$/.test(u)) return u;
    return "";
  }

  function message(txt) {
    box.innerHTML =
      '<img alt="" height="40" src="assets/icons/carte.svg" width="40" />' +
      '<div class="t">' + esc(txt) + "</div>";
  }

  function chargerScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = function () { reject(new Error("script")); };
      document.head.appendChild(s);
    });
  }

  function initCarte() {
    // Remplace le contenu du bloc par la carte elle-même
    box.innerHTML = "";
    box.style.cursor = "default";
    box.style.display = "block";
    box.style.padding = "0";

    var carte = L.map(box, { scrollWheelZoom: false }).setView([43.3, 5.43], 11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(carte);

    fetch("data/points.json", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (points) {
        var marqueurs = [];
        (points || []).forEach(function (p) {
          if (typeof p.lat !== "number" || typeof p.lng !== "number" || !p.nom) return;
          var lien = lienSur(p.lien);
          var popup =
            "<strong>" + esc(p.nom) + "</strong>" +
            (p.lieu ? '<br><span style="color:#44607f">' + esc(p.lieu) + "</span>" : "") +
            (p.resume ? "<br>" + esc(p.resume) : "") +
            (lien ? '<br><a href="' + esc(lien) + '">Voir l\'activité &rarr;</a>' : "");
          var m = L.marker([p.lat, p.lng]).addTo(carte).bindPopup(popup);
          marqueurs.push(m);
        });
        if (marqueurs.length) {
          var groupe = L.featureGroup(marqueurs);
          carte.fitBounds(groupe.getBounds().pad(0.2));
        }
      })
      .catch(function () {
        // la carte reste affichée, sans les points
      });
  }

  function demarrer() {
    if (started) return;
    started = true;
    message("Chargement de la carte…");

    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = LEAFLET_CSS;
    document.head.appendChild(css);

    chargerScript(LEAFLET_JS)
      .then(initCarte)
      .catch(function () {
        started = false;
        message("Carte indisponible pour le moment. Réessaie plus tard.");
        box.style.cursor = "pointer";
      });
  }

  box.addEventListener("click", demarrer);
})();
