/* =============================================
   main.js – Language switcher + cart badge init
   (đã xóa hàm addToCart() xung đột với cart.js,
    đã xóa DOMContentLoaded thứ 2 trùng lặp,
    đã xóa sai storage key 'cart')
   ============================================= */

let DICT = {};
const LANG_LABEL = { vi: "VI", ko: "KO", fr: "FR", ja: "JA" };

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (DICT[key]) el.textContent = DICT[key];
  });
}

async function loadLang(lang) {
  try {
    const res = await fetch(`lang/${lang}.json`);
    DICT = await res.json();
  } catch {
    // File lang chưa có → bỏ qua, giữ text HTML
    DICT = {};
  }

  applyI18n();
  localStorage.setItem("lang", lang);

  const btn = document.getElementById("langBtn");
  if (btn) btn.textContent = `${LANG_LABEL[lang] || lang.toUpperCase()} ▾`;
  document.documentElement.lang = lang;
}

/* ── Init duy nhất ── */
document.addEventListener("DOMContentLoaded", () => {
  /* 1. Cập nhật badge giỏ hàng (hàm từ cart.js) */
  if (typeof updateCartBadge === "function") updateCartBadge();

  /* 2. Language menu */
  const saved    = localStorage.getItem("lang") || "vi";
  const langBtn  = document.getElementById("langBtn");
  const langMenu = document.getElementById("langMenu");

  loadLang(saved);

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
