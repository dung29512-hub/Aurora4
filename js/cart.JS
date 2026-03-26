const STORAGE_KEY = "aurora_store_cart";

function getCart() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
}

// Hàm này sẽ được gọi từ shop.html hoặc index.html
function addToCart(product) {
    const cart = getCart();
    const found = cart.find(item => item.id === product.id);

    if (found) {
        found.qty += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img || 'assets/img/default.jpg', // Đường dẫn ảnh rất quan trọng
            qty: 1
        });
    }
    saveCart(cart);
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
}

function updateQty(id, newQty) {
    let cart = getCart();
    const item = cart.find(item => item.id === id);
    if (item) {
        item.qty = newQty;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    }
    saveCart(cart);
}

function removeFromCart(id) {
    const cart = getCart().filter(item => item.id !== id);
    saveCart(cart);
} 
  function updateCartBadge() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    // Tìm tất cả các element có class 'badge' (vì bạn dùng class trong HTML)
    const badges = document.querySelectorAll(".badge");
    badges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? "flex" : "none";
    });
}

// Tự động cập nhật badge khi tải trang
document.addEventListener("DOMContentLoaded", updateCartBadge);