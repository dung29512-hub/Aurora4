/* =============================================
   cart-page.js – Logic trang giỏ hàng (cart.html)
   ============================================= */

function renderCartPage() {
    const cart       = getCart();
    const list       = document.getElementById("cartList");
    const empty      = document.getElementById("cartEmpty");
    const totalEl    = document.getElementById("cartTotal");
    const subtotalEl = document.getElementById("subtotal");

    if (!cart.length) {
        if (empty)      empty.style.display = "block";
        if (list)       list.innerHTML      = "";
        if (totalEl)    totalEl.textContent  = "0₫";
        if (subtotalEl) subtotalEl.textContent = "0₫";
        updateCartBadge();
        return;
    }

    if (empty) empty.style.display = "none";

    if (list) {
        list.innerHTML = cart.map(item => `
            <div class="cart-item" id="ci-${item.id}">
                <img src="${item.img}" alt="${item.name}"
                     onerror="this.src='';this.style.background='#f0f0f8';">

                <div style="flex:1;min-width:0;">
                    <strong style="display:block;margin-bottom:3px;">${item.name}</strong>
                    <span style="color:#7c3aed;font-weight:800;">${item.price.toLocaleString("vi-VN")}₫</span>
                </div>

                <!-- Qty controls -->
                <div style="display:flex;align-items:center;gap:6px;">
                    <div class="qty-box">
                        <button onclick="uiChangeQty(${item.id}, ${item.qty - 1})">−</button>
                        <span style="padding:0 10px;font-weight:800;min-width:24px;text-align:center;">${item.qty}</span>
                        <button onclick="uiChangeQty('${item.id}', ${item.qty + 1})">+</button>
                    </div>
                </div>

                <!-- Subtotal -->
                <div style="min-width:88px;text-align:right;font-weight:900;">
                    ${(item.price * item.qty).toLocaleString("vi-VN")}₫
                </div>

                <!-- Xóa -->
                <button
                    onclick="uiRemoveItem(${item.id}, '${item.name.replace(/'/g, "\\'")}')"
                    title="Xóa sản phẩm"
                    style="background:none;border:none;cursor:pointer;color:#ccc;font-size:20px;
                           padding:4px 6px;border-radius:8px;transition:color .15s;flex-shrink:0;"
                    onmouseover="this.style.color='#ef4444'"
                    onmouseout="this.style.color='#ccc'"
                >✕</button>
            </div>
        `).join("");
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    if (totalEl)    totalEl.textContent    = total.toLocaleString("vi-VN") + "₫";
    if (subtotalEl) subtotalEl.textContent = total.toLocaleString("vi-VN") + "₫";
}

/* ── Tăng / giảm số lượng ── */
function uiChangeQty(id, qty) {
    if (qty < 1) {
        // Lấy tên sản phẩm trước khi xóa
        const item = getCart().find(i => i.id === id);
        uiRemoveItem(id, item?.name || "");
        return;
    }
    updateQty(id, qty);
    renderCartPage();
}

/* ── Xóa 1 sản phẩm (không dùng confirm()) ── */
function uiRemoveItem(id, name) {
    const row = document.getElementById(`ci-${id}`);
    if (row) {
        row.style.transition = "opacity .2s, transform .2s";
        row.style.opacity    = "0";
        row.style.transform  = "translateX(30px)";
        setTimeout(() => {
            removeFromCart(id);
            renderCartPage();
        }, 200);
    } else {
        removeFromCart(id);
        renderCartPage();
    }
    if (typeof showCartToast === "function") {
        showCartToast(`🗑️ Đã xóa "<b>${name}</b>"`, 'remove');
    }
}

/* ── Xóa toàn bộ (nút "Xóa hết") ── */
function handleClearCart() {
    const cart = getCart();
    if (!cart.length) return;

    // Dùng confirm một lần duy nhất ở đây (xóa hết quan trọng hơn)
    if (!confirm("Xóa tất cả sản phẩm trong giỏ?")) return;

    // Xóa từng item có animation
    document.querySelectorAll(".cart-item").forEach((row, i) => {
        setTimeout(() => {
            row.style.transition = "opacity .2s, transform .2s";
            row.style.opacity    = "0";
            row.style.transform  = "translateX(30px)";
        }, i * 60);
    });

    setTimeout(() => {
        localStorage.removeItem("aurora_store_cart");
        renderCartPage();
        updateCartBadge();
        if (typeof showCartToast === "function") {
            showCartToast("🗑️ Đã xóa toàn bộ giỏ hàng", 'remove');
        }
    }, cart.length * 60 + 220);
}

/* ── Đặt hàng ── */
function processCheckout() {
    const nameEl = document.getElementById("customer-name");
    const name   = nameEl ? nameEl.value.trim() : "";

    if (!name) {
        if (typeof showCartToast === "function") {
            showCartToast("⚠️ Vui lòng nhập tên người nhận!", 'remove');
        } else {
            alert("Vui lòng nhập tên khách hàng!");
        }
        if (nameEl) nameEl.focus();
        return;
    }

    const cart = getCart();
    if (!cart.length) {
        if (typeof showCartToast === "function") {
            showCartToast("❌ Giỏ hàng đang trống!", 'remove');
        }
        return;
    }

    /* TODO: gửi đơn lên Firebase/backend */
    _showSuccessModal(name, cart.reduce((s, i) => s + i.price * i.qty, 0));
    localStorage.removeItem("aurora_store_cart");
    renderCartPage();
    updateCartBadge();
}

/* ── Modal thành công ── */
function _showSuccessModal(name, total) {
    const overlay = document.createElement("div");
    overlay.style.cssText =
        "position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9999;" +
        "display:flex;align-items:center;justify-content:center;";

    overlay.innerHTML = `
        <div style="background:#fff;border-radius:22px;padding:32px 28px;max-width:380px;
                    width:90%;text-align:center;box-shadow:0 24px 60px rgba(0,0,0,.2);">
            <div style="font-size:48px;margin-bottom:10px;">🎉</div>
            <h2 style="margin:0 0 8px;color:#111;">Đặt hàng thành công!</h2>
            <p style="color:#666;margin:0 0 6px;">Cảm ơn <b>${name}</b> đã mua sắm tại Aurora Store!</p>
            <p style="color:#7c3aed;font-weight:900;font-size:18px;margin:10px 0 20px;">
                Tổng: ${total.toLocaleString("vi-VN")}₫
            </p>
            <a href="shop.html"
               style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#22c55e);
                      color:#fff;padding:12px 28px;border-radius:14px;font-weight:900;
                      text-decoration:none;">
                Tiếp tục mua sắm ✦
            </a>
        </div>
    `;
    overlay.addEventListener("click", e => { if (e.target === overlay) overlay.remove(); });
    document.body.appendChild(overlay);
}

document.addEventListener("DOMContentLoaded", renderCartPage);
