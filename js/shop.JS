function getLang() {
  return localStorage.getItem("lang") || "vi";
}

function formatPrice(vnd) {
  return vnd.toLocaleString("vi-VN") + "₫";
}

const CATEGORIES = [
  { key: "all", label: { vi: "Tất cả", ko: "전체", fr: "Tout", ja: "すべて" } },
  { key: "plush", label: { vi: "Gấu bông", ko: "봉제인형", fr: "Peluches", ja: "ぬいぐるみ" } },
  { key: "pen", label: { vi: "Bút", ko: "펜", fr: "Stylos", ja: "ペン" } },
  { key: "notebook", label: { vi: "Sổ", ko: "노트", fr: "Cahiers", ja: "ノート" } },
  { key: "sticker", label: { vi: "Sticker", ko: "스티커", fr: "Stickers", ja: "ステッカー" } },
  { key: "accessory", label: { vi: "Phụ kiện", ko: "액세서리", fr: "Accessoires", ja: "アクセサリー" } },
  { key: "combo", label: { vi: "Combo", ko: "세트", fr: "Combo", ja: "セット" } }
];

let state = {
  cat: "all",
  q: "",
  sort: "new"
};

function renderChips() {
  const lang = getLang();
  const wrap = document.getElementById("catChips");
  wrap.innerHTML = "";

  CATEGORIES.forEach(c => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chipBtn" + (state.cat === c.key ? " is-active" : "");
    btn.textContent = c.label[lang] || c.label.vi;

    btn.addEventListener("click", () => {
      state.cat = c.key;
      renderChips();
      renderShop();
    });

    wrap.appendChild(btn);
  });
}

function matches(p) {
  const lang = getLang();
  const q = state.q.trim().toLowerCase();

  const name = (p.name?.[lang] || p.name?.vi || "").toLowerCase();
  const desc = (p.desc?.[lang] || p.desc?.vi || "").toLowerCase();

  if (state.cat !== "all" && p.category !== state.cat) return false;
  if (q && !(name.includes(q) || desc.includes(q))) return false;

  return true;
}

function sortList(list) {
  const arr = [...list];
  if (state.sort === "priceAsc") arr.sort((a, b) => a.price - b.price);
  if (state.sort === "priceDesc") arr.sort((a, b) => b.price - a.price);
  // new => giữ thứ tự như PRODUCTS (bạn sắp xếp trong products.js)
  return arr;
}

function renderShop() {
  const lang = getLang();
  const listWrap = document.getElementById("productList");
  const empty = document.getElementById("empty");
  const count = document.getElementById("count");

  const filtered = sortList(PRODUCTS.filter(matches));

  count.textContent = `Hiển thị ${filtered.length} sản phẩm`;
  listWrap.innerHTML = "";

  if (filtered.length === 0) {
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  filtered.forEach(p => {
    const card = document.createElement("a");
    card.className = "productCard";
    card.href = `product.html?id=${p.id}`;

    card.innerHTML = `
      <div class="productCard__imgWrap">
        <img src="${p.img}" alt="" onerror="this.style.display='none'; this.parentElement.classList.add('imgFallback');">
      </div>
      <div class="productCard__body">
        <div class="productCard__name">${p.name[lang] || p.name.vi}</div>
        <div class="productCard__meta">
          <span class="price">${formatPrice(p.price)}</span>
          <span class="muted">• ${p.category}</span>
        </div>
        <button class="btn btn--dark btn--full" type="button">
          ${lang === "vi" ? "Xem chi tiết" : lang === "ko" ? "상세 보기" : lang === "fr" ? "Voir détails" : "詳細を見る"}
        </button>
      </div>
    `;

    listWrap.appendChild(card);
  });
}

function bindEvents() {
  document.getElementById("q").addEventListener("input", (e) => {
    state.q = e.target.value;
    renderShop();
  });

  document.getElementById("sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderShop();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderChips();
  bindEvents();
  renderShop();
});
