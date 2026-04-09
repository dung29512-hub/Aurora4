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

/* ── Cập nhật giao diện khi đã đăng nhập ── */
function updateAuthUI() {
  const container = document.getElementById('topbarAuth');
  if (!container) return;

  const userJson = localStorage.getItem('aurora_user');
  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      // Thay thế link Đăng nhập bằng tên User và nút Thoát
      container.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px;">
          <span style="font-size:13px; color:#fff;">Chào, <b>${user.displayName || user.email.split('@')[0]}</b></span>
          <a href="#" id="btnLogout" class="topbar__link" style="color:#ffb6c1; font-weight:800;">[Thoát]</a>
        </div>
      `;

      document.getElementById('btnLogout')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Bạn muốn đăng xuất?')) {
          localStorage.removeItem('aurora_user');
          // Nếu trang có load Firebase (như index.html) thì gọi signOut
          if (window.firebase && firebase.auth) {
            firebase.auth().signOut().finally(() => location.reload());
          } else {
            location.reload();
          }
        }
      });
    } catch (e) { console.error("Lỗi thông tin user", e); }
  }
}

/* ── Init duy nhất ── */
document.addEventListener("DOMContentLoaded", () => {
  /* 1. Cập nhật badge giỏ hàng (hàm từ cart.js) */
  if (typeof updateCartBadge === "function") updateCartBadge();

  /* 2. Kiểm tra Auth */
  updateAuthUI();

  /* 3. Language menu */
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
