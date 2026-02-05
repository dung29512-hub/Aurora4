function getSelectedPayment() {
  const el = document.querySelector('input[name="payment"]:checked');
  return el ? el.value : "COD";
}

function toggleBankInfo() {
  const bankInfo = document.getElementById("bankInfo");
  if (!bankInfo) return;
  bankInfo.style.display = getSelectedPayment() === "BANK" ? "block" : "none";
}

document.addEventListener("change", (e) => {
  if (e.target && e.target.name === "payment") toggleBankInfo();
});

function submitOrder(e) {
  e.preventDefault();

  const cart = getCart();
  if (!cart.length) {
    alert("Giỏ hàng trống!");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  // demo validate SĐT (chỉ số, 9-11 ký tự)
  if (!/^\d{9,11}$/.test(phone)) {
    alert("SĐT không hợp lệ (demo: 9-11 chữ số).");
    return;
  }

  const paymentMethod = getSelectedPayment();

  const order = {
    id: "OD" + Date.now(),
    name,
    phone,
    address,
    paymentMethod,         // ✅ thêm
    items: cart,
    total: getTotal(),
    date: new Date().toLocaleString()
  };

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  clearCart();
  alert("Đặt hàng thành công!");
  location.href = "index.html";
}

document.getElementById("checkoutTotal").textContent = formatVND(getTotal());
toggleBankInfo();
