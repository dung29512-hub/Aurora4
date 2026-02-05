let DICT = {};
const LANG_LABEL = { vi: "VI", ko: "KO", fr: "FR", ja: "JA" };

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (DICT[key]) el.textContent = DICT[key];
  });
}

async function loadLang(lang) {
  const res = await fetch(`lang/${lang}.json`);
  DICT = await res.json();

  applyI18n();

  localStorage.setItem("lang", lang);
  const btn = document.getElementById("langBtn");
  if (btn) btn.textContent = `${LANG_LABEL[lang] || lang.toUpperCase()} ▾`;

  document.documentElement.lang = lang;
}

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("lang") || "vi";
  loadLang(saved);

  const langBtn = document.getElementById("langBtn");
  const langMenu = document.getElementById("langMenu");

  if (langBtn && langMenu) {
    langBtn.addEventListener("click", () => langMenu.classList.toggle("is-open"));

    langMenu.querySelectorAll("[data-lang]").forEach(item => {
      item.addEventListener("click", () => {
        loadLang(item.dataset.lang);
        langMenu.classList.remove("is-open");
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".lang")) langMenu.classList.remove("is-open");
    });
  }
});

// js/main.js
document.addEventListener("DOMContentLoaded", function () {
  if (typeof updateCartBadge === "function") {
    updateCartBadge();
  }
});