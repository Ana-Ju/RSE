/* =========================================================
   Citoyens de la Terre — interactions du site
   Aucun framework, aucune dépendance.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Menu mobile ---------- */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Message temporaire (toast) ---------- */
  var toastEl = document.getElementById("toast");
  var toastTimer;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("show");
    }, 2600);
  }

  /* ---------- Clics : liens à brancher, copie, formules ---------- */
  document.addEventListener("click", function (e) {
    // Liens pas encore branchés (Facebook, HelloAsso, PDF, vidéos…)
    var pending = e.target.closest("[data-toast]");
    if (pending) {
      e.preventDefault();
      toast(pending.getAttribute("data-toast"));
      return;
    }

    // Téléphone / e-mail : copie dans le presse-papiers
    var copy = e.target.closest("[data-copy]");
    if (copy) {
      e.preventDefault();
      var value = copy.getAttribute("data-copy");
      if (navigator.clipboard) {
        navigator.clipboard.writeText(value).then(
          function () { toast("Copié : " + value); },
          function () { toast(value); }
        );
      } else {
        toast(value);
      }
      return;
    }

    // Page Adhérer : choisir une formule pré-remplit le formulaire
    var formule = e.target.closest("[data-formule]");
    if (formule) {
      document.querySelectorAll("[data-formule]").forEach(function (f) {
        f.classList.remove("sel");
      });
      formule.classList.add("sel");
      var select = document.getElementById("qualite");
      if (select) select.selectedIndex = Number(formule.getAttribute("data-formule"));
      var demande = document.getElementById("demande");
      if (demande) demande.scrollIntoView({ behavior: "smooth" });
      toast("Formule « " + formule.querySelector(".k").textContent + " » sélectionnée");
    }
  });

  /* ---------- Page Actus : rubrique active ---------- */
  var rubriques = document.getElementById("rubriques");
  if (rubriques) {
    rubriques.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      rubriques.querySelectorAll(".chip").forEach(function (c) {
        c.classList.toggle("on", c === chip);
      });
    });
  }

  /* ---------- Carte : chargée seulement au clic (éco-conception) ---------- */
  var mapbox = document.getElementById("mapbox");
  if (mapbox) {
    mapbox.addEventListener(
      "click",
      function () {
        // TODO : remplacer par l'iframe uMap / OpenStreetMap de Symbiose Vallée
        mapbox.innerHTML =
          '<p class="t">La carte uMap s\'affichera ici.</p>' +
          '<p class="txt">Il suffira de coller le code d\'intégration uMap dans assets/js/main.js.</p>';
      },
      { once: true }
    );
  }

  /* ---------- Formulaires ---------- */
  // Pas de serveur pour l'instant : on vérifie les champs puis on affiche
  // un message de confirmation. À brancher sur un service d'envoi plus tard
  // (Formspree, HelloAsso, back-office de l'asso…).
  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.setAttribute("novalidate", "");

    form.addEventListener("input", function (e) {
      var field = e.target.closest(".field");
      if (field && e.target.checkValidity()) field.classList.remove("invalid");
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstInvalid = null;
      form.querySelectorAll("input, select, textarea").forEach(function (input) {
        var valid = input.checkValidity();
        var field = input.closest(".field");
        if (field) field.classList.toggle("invalid", !valid);
        if (!valid && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) {
        firstInvalid.focus();
        toast("Merci de compléter les champs obligatoires");
        return;
      }
      var height = Math.min(form.offsetHeight, 420);
      form.innerHTML =
        '<div class="success" style="min-height:' + height + 'px;justify-content:center">' +
        '<div class="check"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0f2a1e" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>' +
        "<h3>" + form.getAttribute("data-ok") + "</h3>" +
        '<p class="note" style="font-size:16px">' + form.getAttribute("data-ok-text") + "</p>" +
        "</div>";
    });
  });
})();
