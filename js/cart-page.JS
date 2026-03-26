function renderCartPage() {
    const cart = getCart();
    const list = document.getElementById("cartList");
    const empty = document.getElementById("cartEmpty");
    
    // Sửa ID ở đây: Trong cart.html bạn dùng 'cartTotal' và 'subtotal'
    const totalEl = document.getElementById("cartTotal");
    const subtotalEl = document.getElementById("subtotal");

    if (!cart.length) {
        if (empty) empty.style.display = "block";
        if (list) list.innerHTML = "";
        if (totalEl) totalEl.textContent = "0₫";
        if (subtotalEl) subtotalEl.textContent = "0₫";
        return;
    }

    if (empty) empty.style.display = "none";
    if (list) {
        list.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div style="flex: 1;">
                    <strong>${item.name}</strong><br>
                    <span>${item.price.toLocaleString()}₫</span>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <button class="qty-btn" onclick="uiChangeQty('${item.id}', ${item.qty - 1})">−</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="uiChangeQty('${item.id}', ${item.qty + 1})">+</button>
                </div>
                <div style="width:100px; text-align:right; font-weight:bold;">
                    ${(item.price * item.qty).toLocaleString()}₫
                </div>
                <button onclick="uiRemoveItem('${item.id}')" style="background:none; border:none; color:red; cursor:pointer; margin-left:10px;">✕</button>
            </div>
        `).join("");
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    if (totalEl) totalEl.textContent = total.toLocaleString() + "₫";
    if (subtotalEl) subtotalEl.textContent = total.toLocaleString() + "₫";
}

function uiChangeQty(id, qty) { 
    updateQty(id, qty); 
    renderCartPage(); 
}

function uiRemoveItem(id) { 
    if(confirm("Xóa sản phẩm này khỏi giỏ hàng?")) {
        removeFromCart(id); 
        renderCartPage(); 
    }
}

// Hàm xử lý đặt hàng (khớp với onclick="processCheckout()" trong cart.html)
function processCheckout() {
    const name = document.getElementById("customer-name").value.trim();
    if (!name) {
        alert("Vui lòng nhập tên khách hàng!");
        return;
    }
    const cart = getCart();
    if (cart.length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
    }
    // Chuyển hướng sang trang thanh toán
    window.location.href = "checkout.html";
}

document.addEventListener("DOMContentLoaded", renderCartPage);