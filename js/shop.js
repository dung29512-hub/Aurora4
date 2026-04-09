function getLang() {
  return localStorage.getItem("lang") || "vi";
}

function formatPrice(vnd) {
  return vnd.toLocaleString("vi-VN") + "₫";
}

const CATEGORIES = [
  { key: "all",       label: { vi: "Tất cả",    ko: "전체",       fr: "Tout",         ja: "すべて"         } },
  { key: "plush",     label: { vi: "Gấu bông",   ko: "봉제인형",   fr: "Peluches",     ja: "ぬいぐるみ"     } },
  { key: "pen",       label: { vi: "Bút",         ko: "펜",         fr: "Stylos",       ja: "ペン"           } },
  { key: "notebook",  label: { vi: "Sổ",          ko: "노트",       fr: "Cahiers",      ja: "ノート"         } },
  { key: "sticker",   label: { vi: "Sticker",     ko: "스티커",     fr: "Stickers",     ja: "ステッカー"     } },
  { key: "accessory", label: { vi: "Phụ kiện",    ko: "액세서리",   fr: "Accessoires",  ja: "アクセサリー"   } },
  { key: "combo",     label: { vi: "Combo",        ko: "세트",       fr: "Combo",        ja: "セット"         } }
];

let state = { cat: "all", q: "", sort: "new" };

/* ── Cấu hình Firebase ── */
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC51aDs65qXDcJxkpuc2z4FgdRQ_L7YZho",
  authDomain: "aurorashop1-1246d.firebaseapp.com",
  projectId: "aurorashop1-1246d",
  storageBucket: "aurorashop1-1246d.firebasestorage.app",
  messagingSenderId: "220058602608",
  appId: "1:220058602608:web:7bc5f71ef2610a70a6f8b5"
};

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}
const db = firebase.firestore();

/** 
 * Lấy sản phẩm từ Firestore và gộp vào danh sách PRODUCTS hiện có
 */
async function syncFirestoreProducts() {
  try {
    const snapshot = await db.collection('products_db').get();
    snapshot.forEach(doc => {
      const data = doc.data();
      
      // Kiểm tra xem sản phẩm đã tồn tại trong mảng PRODUCTS chưa (tránh trùng lặp)
      const exists = PRODUCTS.find(p => p.firestoreId === doc.id);
      if (!exists) {
        // Chuẩn hóa dữ liệu Firestore (string) sang cấu trúc đa ngôn ngữ của App (object)
        const normalizedProduct = {
          id: data.id || Date.now() + Math.random(), 
          firestoreId: doc.id,
          category: data.category,
          price: data.price,
          img: data.img,
          // Vì Admin chỉ nhập 1 tên, ta gán cho tất cả các ngôn ngữ
          name: { vi: data.name, ko: data.name, fr: data.name, ja: data.name },
          desc: { vi: "Sản phẩm mới nhập", ko: "New product", fr: "Nouveau", ja: "新製品" },
          badge: "new"
        };
        PRODUCTS.push(normalizedProduct);
      }
    });
    // Sau khi gộp xong thì render lại shop
    renderShop();
  } catch (err) {
    console.error("Lỗi lấy dữ liệu từ Firestore:", err);
  }
}

function renderChips() {
  const lang = getLang();
  const wrap = document.getElementById("catChips");
  wrap.innerHTML = "";

  CATEGORIES.forEach(c => {
    const btn = document.createElement("button");
    btn.type      = "button";
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
  const q    = state.q.trim().toLowerCase();
  const name = (p.name?.[lang] || p.name?.vi || "").toLowerCase();
  const desc = (p.desc?.[lang] || p.desc?.vi || "").toLowerCase();
  if (state.cat !== "all" && p.category !== state.cat) return false;
  if (q && !(name.includes(q) || desc.includes(q))) return false;
  return true;
}

function sortList(list) {
  const arr = [...list];
  if (state.sort === "priceAsc")  arr.sort((a, b) => a.price - b.price);
  if (state.sort === "priceDesc") arr.sort((a, b) => b.price - a.price);
  return arr;
}

/* ── Label nút theo ngôn ngữ ── */
const LABEL = {
  detail: { vi: "Chi tiết",    ko: "상세 보기",    fr: "Détails",           ja: "詳細"       },
  add:    { vi: "🛒 Thêm giỏ", ko: "🛒 담기",     fr: "🛒 Ajouter",        ja: "🛒 追加"    },
  added:  { vi: "✓ Đã thêm",   ko: "✓ 추가됨",    fr: "✓ Ajouté",          ja: "✓ 追加済"  },
};

function renderShop() {
  const lang     = getLang();
  const listWrap = document.getElementById("productList");
  const empty    = document.getElementById("empty");
  const count    = document.getElementById("count");

  if (typeof PRODUCTS === 'undefined') {
    console.error("PRODUCTS không tồn tại. Kiểm tra products.js");
    return;
  }

  const filtered = sortList(PRODUCTS.filter(matches));
  count.textContent = `Hiển thị ${filtered.length} sản phẩm`;
  listWrap.innerHTML = "";

  if (filtered.length === 0) { empty.style.display = "block"; return; }
  empty.style.display = "none";

  filtered.forEach(p => {
    const displayName = p.name[lang] || p.name.vi;

    const card = document.createElement("div");   // div thay vì <a> để nút không bị nested
    card.className = "productCard";

    card.innerHTML = `
      <a href="product.html?id=${p.id}" style="display:block;text-decoration:none;color:inherit;">
        <div class="productCard__imgWrap">
          <img src="${p.img}" alt="${displayName}"
               onerror="this.style.display='none'; this.parentElement.classList.add('imgFallback');">
          ${p.badge ? `<span class="tag ${p.badge === 'new' || p.badge === 'hot' ? 'tag--soft' : ''}">${p.badge.toUpperCase()}</span>` : ''}
        </div>
      </a>

      <div class="productCard__body">
        <div class="productCard__name">${displayName}</div>
        <div class="productCard__meta">
          <span class="price">${formatPrice(p.price)}</span>
          <span class="muted">• ${p.category}</span>
        </div>

        <!-- Hai nút hành động -->
        <div style="display:flex;gap:8px;margin-top:10px;">
          <a href="product.html?id=${p.id}"
             class="btn btn--ghost"
             style="flex:1;font-size:12px;padding:9px 6px;text-align:center;">
            ${LABEL.detail[lang] || LABEL.detail.vi}
          </a>
          <button
            class="btn btn--primary shop-add-btn"
            style="flex:1.3;font-size:12px;padding:9px 6px;"
            data-id="${p.id}"
            type="button">
            ${LABEL.add[lang] || LABEL.add.vi}
          </button>
        </div>
      </div>
    `;

    listWrap.appendChild(card);
  });

  /* Gán sự kiện cho tất cả nút "Thêm giỏ" sau khi render */
  listWrap.querySelectorAll(".shop-add-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id      = Number(btn.dataset.id);
      const product = PRODUCTS.find(p => p.id === id);
      if (!product) return;

      const lang = getLang();
      addToCart({
        id:    product.id,
        name:  product.name[lang] || product.name.vi,
        price: product.price,
        img:   product.img,
        qty:   1
      });

      /* Feedback animation */
      const original      = btn.textContent;
      btn.textContent     = LABEL.added[lang] || LABEL.added.vi;
      btn.disabled        = true;
      btn.style.background = '#22c55e';
      setTimeout(() => {
        btn.textContent     = original;
        btn.disabled        = false;
        btn.style.background = '';
      }, 1400);
    });
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

document.addEventListener("DOMContentLoaded", async () => {
  renderChips();
  bindEvents();
  renderShop();
  await syncFirestoreProducts(); // Gọi đồng bộ dữ liệu sau khi load trang
});
