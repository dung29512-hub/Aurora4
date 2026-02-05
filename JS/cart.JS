// js/cart.js
const CART_KEY = "cart";

/* ===== CART CORE ===== */
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(product) {
  const cart = getCart();
  const found = cart.find(i => i.id === product.id);

  if (found) {
    found.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty: 1
    });
  }
  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
}

function updateQty(id, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty = qty;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  saveCart(cart);
}

function getTotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}

/* ===== BADGE ===== */
function updateCartBadge() {
  const badge = document.querySelector(".iconBtn .badge");
  if (!badge) return;

  const count = getCart().reduce((sum, i) => sum + i.qty, 0);
  badge.textContent = count;
}

/* ===== FORMAT ===== */
function formatVND(x) {
  return x.toLocaleString("vi-VN") + "₫";
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}
