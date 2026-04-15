function renderCheckoutSummary() {
    const cart = getCart();
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    if (subtotalEl) subtotalEl.textContent = total.toLocaleString() + "₫";
    if (totalEl) totalEl.textContent = total.toLocaleString() + "₫";
}

// Gọi hàm khi trang load
document.addEventListener("DOMContentLoaded", () => {
    renderCheckoutSummary();
});

function submitOrder(event) {
  event.preventDefault();
  const cart = getCart();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  // validate SĐT (chỉ số, đúng 10 ký tự, bắt đầu bằng đầu số hợp lệ tại VN)
  if (!/^0[35789]\d{8}$/.test(phone)) {
    alert("Số điện thoại không hợp lệ (Yêu cầu đúng 10 chữ số và bắt đầu bằng đầu số hợp lệ).");
    return;
  }

  const paymentMethod = getSelectedPayment();

  const order = {
    id: "OD" + Date.now(),
    name,
    phone,
    address,
    paymentMethod,
    items: cart,
    total: getTotal(),
    date: new Date().toLocaleString()
  };

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.removeItem("aurora_store_cart");
  alert("Đặt hàng thành công!");
  location.href = "index.html";
}
