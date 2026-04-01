function getLang() {
  return localStorage.getItem("lang") || "vi";
}
function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id"));
}
function formatPrice(vnd) {
  return (vnd || 0).toLocaleString("vi-VN") + "₫";
}
function stars(n){
  const full  = "★".repeat(Math.max(0, Math.min(5, n)));
  const empty = "☆".repeat(5 - full.length);
  return full + empty;
}

let current = { variantSku: null, imgIndex: 0 };

function renderProduct() {
  const lang  = getLang();
  const id    = getProductId();
  const p     = PRODUCTS.find(x => x.id === id);

  if (!p) {
    document.getElementById("productDetail").innerHTML = `<p class="muted">Không tìm thấy sản phẩm.</p>`;
    return;
  }

  const images   = (p.images && p.images.length) ? p.images : [p.img].filter(Boolean);
  const variants = Array.isArray(p.variants) ? p.variants : [];
  const hasVariants = variants.length > 0;

  if (hasVariants && !current.variantSku) current.variantSku = variants[0].sku;

  const selectedVariant = hasVariants ? variants.find(v => v.sku === current.variantSku) : null;
  const priceToShow     = selectedVariant?.price ?? p.price ?? p.basePrice ?? 0;

  const details  = p.details?.[lang]  || p.details?.vi  || [];
  const reviews  = Array.isArray(p.reviews) ? p.reviews : [];
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length)
    : 0;

  const related = PRODUCTS
    .filter(x => x.id !== p.id && x.category === p.category)
    .slice(0, 4);

  const addLabel = {
    vi: "🛒 Thêm vào giỏ hàng",
    ko: "🛒 장바구니에 추가",
    fr: "🛒 Ajouter au panier",
    ja: "🛒 カートに追加"
  };

  document.getElementById("productDetail").innerHTML = `
    <!-- TOP: Gallery + Info -->
    <div class="pd">
      <div class="pd__gallery">
        <div class="pd__mainImg">
          <img id="pdMainImg" src="${images[current.imgIndex]}" alt="">
        </div>
        <div class="pd__thumbs" id="pdThumbs">
          ${images.map((src, idx) => `
            <button class="pd__thumb ${idx === current.imgIndex ? "is-active" : ""}" data-idx="${idx}" type="button">
              <img src="${src}" alt="">
            </button>
          `).join("")}
        </div>
      </div>

      <div class="pd__info">
        <h1 class="pd__title">${p.name?.[lang] || p.name?.vi || "Sản phẩm"}</h1>

        <div class="pd__rating">
          <span class="pd__stars">${stars(Math.round(avgRating))}</span>
          <span class="muted">(${reviews.length} ${lang === "vi" ? "đánh giá" : "reviews"})</span>
        </div>

        <div class="pd__price">${formatPrice(priceToShow)}</div>
        <p class="muted">${p.desc?.[lang] || p.desc?.vi || ""}</p>

        ${hasVariants ? `
          <div class="pd__block">
            <div class="pd__label">${lang === "vi" ? "Chọn màu" : "Color"}</div>
            <div class="pd__variants" id="pdVariants">
              ${variants.map(v => `
                <button class="varBtn ${v.sku === current.variantSku ? "is-active" : ""}"
                        data-sku="${v.sku}" type="button">
                  ${v.colorName?.[lang] || v.colorName?.vi || v.sku}
                  <span class="muted">• ${formatPrice(v.price)}</span>
                </button>
              `).join("")}
            </div>
            <div class="muted" style="margin-top:6px;">
              ${lang === "vi" ? "Tồn kho: " : "Stock: "} ${selectedVariant?.stock ?? "—"}
            </div>
          </div>
        ` : ""}

        <div class="pd__actions">
          <div class="qty">
            <button class="qty__btn" id="qtyMinus" type="button">−</button>
            <input  class="qty__input" id="qtyInput" type="number" min="1" value="1">
            <button class="qty__btn" id="qtyPlus"  type="button">+</button>
          </div>

          <!-- FIX: data-product-id để bindProductEvents đọc -->
          <button class="btn btn--primary" id="addToCartBtn"
                  data-product-id="${p.id}" type="button">
            ${addLabel[lang] || addLabel.vi}
          </button>
        </div>
      </div>
    </div>

    <!-- BOTTOM -->
    <div class="pdBottom">
      <section class="pdSection">
        <div class="section__head">
          <h2>${lang === "vi" ? "Mô tả sản phẩm" : "Product description"}</h2>
        </div>
        ${details.length
          ? `<ul class="pdList">${details.map(x => `<li>${x}</li>`).join("")}</ul>`
          : `<p class="muted">${lang === "vi" ? "Chưa có mô tả chi tiết." : "No detailed description yet."}</p>`}
      </section>

      <section class="pdSection">
        <div class="section__head">
          <h2>${lang === "vi" ? "Video về sản phẩm" : "Product video"}</h2>
        </div>
        <div class="videoPlaceholder">
          <div class="videoPlaceholder__icon">▶</div>
          <div>
            <div class="videoPlaceholder__title">${lang === "vi" ? "Chưa nhúng video" : "Video placeholder"}</div>
            <div class="muted">${lang === "vi" ? "Bạn sẽ nhúng TikTok/YouTube vào đây sau." : "You can embed TikTok/YouTube later."}</div>
          </div>
        </div>
      </section>

      <section class="pdSection">
        <div class="section__head">
          <h2>${lang === "vi" ? "Đánh giá của khách hàng" : "Customer reviews"}</h2>
        </div>
        ${reviews.length
          ? reviews.map(r => `
              <div class="review">
                <div class="review__head">
                  <strong>${r.name}</strong>
                  <span class="muted">${r.date}</span>
                </div>
                <div class="review__stars">${stars(r.rating)}</div>
                <div>${r.text}</div>
              </div>`).join("")
          : `<p class="muted">${lang === "vi" ? "Chưa có đánh giá." : "No reviews yet."}</p>`}

        <div class="reviewForm">
          <div class="pd__label">${lang === "vi" ? "Viết đánh giá (demo)" : "Write a review (demo)"}</div>
          <input id="rvName" class="pdInput" placeholder="${lang === "vi" ? "Tên" : "Name"}">
          <select id="rvStar" class="pdInput">
            <option value="5">5 ★</option><option value="4">4 ★</option>
            <option value="3">3 ★</option><option value="2">2 ★</option>
            <option value="1">1 ★</option>
          </select>
          <textarea id="rvText" class="pdInput" rows="3"
                    placeholder="${lang === "vi" ? "Nội dung..." : "Message..."}"></textarea>
          <button id="rvSubmit" class="btn btn--dark" type="button">
            ${lang === "vi" ? "Gửi (demo)" : "Submit (demo)"}
          </button>
        </div>
      </section>

      ${related.length ? `
        <section class="pdSection">
          <div class="section__head">
            <h2>${lang === "vi" ? "Sản phẩm liên quan" : "Related products"}</h2>
            <a class="link" href="shop.html">${lang === "vi" ? "Xem tất cả →" : "View all →"}</a>
          </div>
          <div class="grid grid--4">
            ${related.map(x => `
              <a class="productCard" href="product.html?id=${x.id}">
                <div class="productCard__imgWrap">
                  <img src="${x.img}" alt=""
                       onerror="this.style.display='none'; this.parentElement.classList.add('imgFallback');"/>
                </div>
                <div class="productCard__body">
                  <div class="productCard__name">${x.name?.[lang] || x.name?.vi || ""}</div>
                  <div class="productCard__meta">
                    <span class="price">${formatPrice(x.price ?? x.basePrice ?? 0)}</span>
                    <span class="muted">• ${x.category}</span>
                  </div>
                  <button class="btn btn--dark btn--full" type="button">
                    ${lang === "vi" ? "Xem" : "View"}
                  </button>
                </div>
              </a>`).join("")}
          </div>
        </section>
      ` : ""}
    </div>
  `;

  bindProductEvents(p, images, variants, priceToShow);
}

function bindProductEvents(p, images, variants, basePrice) {
  const lang = getLang();

  /* Thumbs */
  document.getElementById("pdThumbs")?.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-idx]");
    if (!btn) return;
    current.imgIndex = Number(btn.dataset.idx);
    renderProduct();
  });

  /* Variants */
  document.getElementById("pdVariants")?.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-sku]");
    if (!btn) return;
    current.variantSku = btn.dataset.sku;
    const v = variants.find(x => x.sku === current.variantSku);
    if (v?.image) {
      const idx = images.indexOf(v.image);
      if (idx >= 0) current.imgIndex = idx;
    }
    renderProduct();
  });

  /* Qty */
  const qtyInput = document.getElementById("qtyInput");
  document.getElementById("qtyMinus")?.addEventListener("click", () => {
    qtyInput.value = Math.max(1, Number(qtyInput.value || 1) - 1);
  });
  document.getElementById("qtyPlus")?.addEventListener("click", () => {
    qtyInput.value = Math.max(1, Number(qtyInput.value || 1) + 1);
  });

  /* ── FIX: Thêm vào giỏ thật sự ── */
  document.getElementById("addToCartBtn")?.addEventListener("click", (e) => {
    const qty = Math.max(1, Number(qtyInput?.value || 1));

    // Lấy giá theo variant đang chọn (nếu có)
    const selectedVariant = variants.find(v => v.sku === current.variantSku);
    const price = selectedVariant?.price ?? basePrice ?? p.price ?? 0;

    addToCart({
      id:    p.id,
      name:  p.name?.[lang] || p.name?.vi || "Sản phẩm",
      price: price,
      img:   images[current.imgIndex] || p.img || '',
      qty:   qty
    });

    /* Feedback animation */
    const btn = e.currentTarget;
    const original = btn.textContent;
    const addedLabel = { vi:"✓ Đã thêm!", ko:"✓ 추가됨!", fr:"✓ Ajouté!", ja:"✓ 追加済!" };
    btn.textContent     = addedLabel[lang] || addedLabel.vi;
    btn.disabled        = true;
    btn.style.background = '#22c55e';
    setTimeout(() => {
      btn.textContent     = original;
      btn.disabled        = false;
      btn.style.background = '';
    }, 1500);
  });

  /* Review demo */
  document.getElementById("rvSubmit")?.addEventListener("click", () => {
    showCartToast("✅ Đã ghi nhận đánh giá (demo)", 'remove');
  });
}

document.addEventListener("DOMContentLoaded", renderProduct);
