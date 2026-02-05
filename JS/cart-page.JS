// js/cart-page.js

function renderCart() {
  const cart = getCart();
  updateCartBadge();

  const list = document.getElementById("cartList");
  const empty = document.getElementById("cartEmpty");
  const total = document.getElementById("cartTotal");

  if (!cart.length) {
    empty.style.display = "block";
    list.innerHTML = "";
    total.textContent = formatVND(0);
    return;
  }

  empty.style.display = "none";

  list.innerHTML = cart.map(item => `
    <div class="card" style="padding:12px; margin:12px 0; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <strong>${item.name}</strong><br>
        <span class="muted">${formatVND(item.price)} × ${item.qty}</span>
      </div>

      <div style="display:flex; gap:6px; align-items:center;">
        <button class="btn btn--ghost" onclick="updateQty('${item.id}', ${item.qty - 1})">−</button>
        <span>${item.qty}</span>
        <button class="btn btn--ghost" onclick="updateQty('${item.id}', ${item.qty + 1})">+</button>
        <button class="btn btn--dark" onclick="removeFromCart('${item.id}')">Xóa</button>
      </div>
    </div>
  `).join("");

  total.textContent = formatVND(getTotal());
}

document.addEventListener("DOMContentLoaded", renderCart);
