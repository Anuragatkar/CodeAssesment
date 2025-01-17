// JavaScript to fetch and manage cart data
const cartApiUrl = "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889";
const cartItemsContainer = document.getElementById("cartItems");
const cartSubtotalElement = document.getElementById("cartSubtotal");
const cartTotalElement = document.getElementById("cartTotal");

let cartData = []; // To hold the fetched cart data

// Fetch cart data from the API
async function fetchCartData() {
  try {
    const response = await fetch(cartApiUrl);
    const data = await response.json();
    cartData = data.items;
    renderCartItems();
    updateCartTotals();
  } catch (error) {
    console.error("Failed to fetch cart data:", error);
  }
}

// Render cart items in the table
function renderCartItems() {
  cartItemsContainer.innerHTML = "";
  cartData.forEach((item, index) => {
    const itemRow = document.createElement("tr");
    itemRow.innerHTML = `
      <td><img src="${item.image}" alt="${item.title}" width="50" height="50"> ${item.title}</td>
      <td>${formatCurrency(item.price)}</td>
      <td><input type="number" value="${item.quantity}" min="1" class="quantity-input" data-index="${index}"></td>
      <td>${formatCurrency(item.price * item.quantity)}</td>
      <td><button class="remove-btn" data-index="${index}">🗑️</button></td>
    `;
    cartItemsContainer.appendChild(itemRow);
  });

  attachEventListeners();
}

// Attach event listeners for quantity changes and item removal
function attachEventListeners() {
  const quantityInputs = document.querySelectorAll(".quantity-input");
  const removeButtons = document.querySelectorAll(".remove-btn");

  quantityInputs.forEach((input) => {
    input.addEventListener("change", handleQuantityChange);
  });

  removeButtons.forEach((button) => {
    button.addEventListener("click", handleItemRemoval);
  });
}

// Handle quantity changes
function handleQuantityChange(event) {
  const index = event.target.dataset.index;
  const newQuantity = parseInt(event.target.value, 10);

  if (newQuantity > 0) {
    cartData[index].quantity = newQuantity;
    renderCartItems();
    updateCartTotals();
  }
}

// Handle item removal
function handleItemRemoval(event) {
  const index = event.target.dataset.index;
  cartData.splice(index, 1);
  renderCartItems();
  updateCartTotals();
}

// Update subtotal and total
function updateCartTotals() {
  const subtotal = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartSubtotalElement.textContent = `${formatCurrency(subtotal)}`;
  cartTotalElement.textContent = `${formatCurrency(subtotal)}`;
}

// Format numbers to currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount / 100);
}

// Checkout functionality
const checkoutButton = document.getElementById("checkoutButton");
checkoutButton.addEventListener("click", () => {
  alert("Thank you for your purchase! Checkout functionality coming soon.");
});

// Initial fetch of cart data
fetchCartData();
