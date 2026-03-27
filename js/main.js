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

// --- PHẦN LOGIC GIỎ HÀNG BỔ SUNG ---

// 1. Hàm cập nhật số lượng hiển thị trên icon giỏ hàng
function updateCartBadge() {
    // Đồng bộ key với storage_key trong cart.js
    const cart = JSON.parse(localStorage.getItem('aurora_store_cart')) || [];
    // Tính tổng số lượng tất cả mặt hàng trong giỏ
    const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const badge = document.querySelector('.badge');
    if (badge) {
        badge.textContent = totalCount;
    }
}

// 2. Hàm xử lý thêm sản phẩm (Dùng cho nút "Thêm vào giỏ" ở trang chi tiết)
function addToCart() {
    // Lấy thông tin sản phẩm từ giao diện (Selector dựa trên file HTML của bạn)
    const name = document.querySelector('.productCard__name')?.textContent || "Sản phẩm";
    const priceText = document.querySelector('.price')?.textContent || "0";
    // Chuyển "129.000₫" thành số 129000
    const price = parseInt(priceText.replace(/\D/g, ''));
    const img = document.querySelector('.hero__img')?.src || "";
    const quantity = parseInt(document.querySelector('.quantity-input')?.value) || 1;

    // Lấy ID từ URL (ví dụ: product.html?id=2)
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id') || "default-id";

    const product = { id, name, price, img, quantity };

    // Lưu vào localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex(item => item.id === id);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem('aurora_store_cart', JSON.stringify(cart));
    
    // Cập nhật badge ngay lập tức
    updateCartBadge();
    
    alert("Đã thêm vào giỏ hàng thành công!");
}

// 3. Gán sự kiện cho nút "Thêm vào giỏ" khi trang load xong
document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector('.btn--primary[onclick="alert(...)"]') 
                || document.querySelector('.btn--primary'); // Tìm nút thêm vào giỏ

    if (addBtn) {
        // Nếu nút đang có thuộc tính onclick="alert...", hãy xóa nó đi để dùng addEventListener
        addBtn.removeAttribute('onclick'); 
        addBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addToCart();
        });
    }
    
    // Luôn cập nhật badge khi mở bất kỳ trang nào
    updateCartBadge();
});