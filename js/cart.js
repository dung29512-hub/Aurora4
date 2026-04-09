const STORAGE_KEY = "aurora_store_cart";

function getCart() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(product) {
    const cart = getCart();
    const found = cart.find(item => item.id == product.id);

    if (found) {
        found.qty += (product.qty || 1);
    } else {
        cart.push({
            id:    product.id,
            name:  product.name,
            price: product.price,
            img:   product.img || 'assets/img/default.jpg',
            qty:   product.qty || 1
        });
    }
    saveCart(cart);
    showCartToast(`🛒 Đã thêm "<b>${product.name}</b>" vào giỏ!`);
}

function updateQty(id, newQty) {
    let cart = getCart();
    const item = cart.find(item => item.id == id);
    if (item) {
        item.qty = newQty;
        if (item.qty <= 0) cart = cart.filter(i => i.id != id);
    }
    saveCart(cart);
}

/** Cập nhật số lượng dựa trên mức thay đổi (delta: +1 hoặc -1) */
function updateCartQty(id, delta) {
    let cart = getCart();
    const item = cart.find(i => i.id == id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id != id);
        }
        saveCart(cart);
    }
}

function removeFromCart(id) {
    const cart = getCart().filter(item => item.id != id);
    saveCart(cart);
}

function clearCart() {
    saveCart([]);
}

function updateCartBadge() {
    const cart  = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll(".badge").forEach(badge => {
        badge.textContent = count;
    });
}

/* ── Toast nhỏ gọn ── */
function showCartToast(html, type = 'success') {
    let wrap = document.getElementById('_cartToastWrap');
    if (!wrap) {
        wrap = document.createElement('div');
        wrap.id = '_cartToastWrap';
        wrap.style.cssText =
            'position:fixed;bottom:22px;right:22px;z-index:99999;' +
            'display:flex;flex-direction:column;gap:10px;pointer-events:none;';
        document.body.appendChild(wrap);
    }

    const bg = type === 'remove'
        ? 'linear-gradient(135deg,#64748b,#475569)'
        : 'linear-gradient(135deg,#7c3aed,#22c55e)';

    const t = document.createElement('div');
    t.innerHTML = html;
    t.style.cssText =
        `background:${bg};color:#fff;padding:11px 16px;border-radius:13px;` +
        'font-weight:700;font-size:13px;box-shadow:0 8px 22px rgba(0,0,0,.20);' +
        'transform:translateX(110%);opacity:0;max-width:270px;line-height:1.4;' +
        'transition:transform .28s cubic-bezier(.34,1.56,.64,1),opacity .25s ease;' +
        'pointer-events:auto;';
    wrap.appendChild(t);

    requestAnimationFrame(() => requestAnimationFrame(() => {
        t.style.transform = 'translateX(0)';
        t.style.opacity   = '1';
    }));
    setTimeout(() => {
        t.style.transform = 'translateX(110%)';
        t.style.opacity   = '0';
        setTimeout(() => t.remove(), 300);
    }, 2600);
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
