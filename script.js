// Get all add to cart buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Add event listener to each add to cart button
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get product details
    const productName = button.parentNode.querySelector("h3").textContent;
    const productPrice = button.parentNode.querySelector("p").textContent;
    const productImage = button.parentNode.querySelector("img").src;

    // Create a new product object
    const product = {
      name: productName,
      price: productPrice,
      image: productImage,
    };

    // Add product to cart
    addProductToCart(product);

    // Redirect to cart page
    window.location.href = "cart.html";
  });
});

// Function to add product to cart
function addProductToCart(product) {
  // Get existing cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Add product to cart items
  cartItems.push(product);

  // Save cart items to local storage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
// Get cart items from local storage
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Display cart items
const cartItemsHtml = cartItems.map((item) => {
  return `
    <li>
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>Price: ${item.price}</p>
      <button class="remove-btn" onclick="removeItemFromCart('${item.name}')">Remove</button>
    </li>
  `;
}).join("");
document.getElementById("cart-items").innerHTML = cartItemsHtml;

// Calculate cart total
const totalPrice = cartItems.reduce((acc, item) => {
  const price = parseFloat(item.price.replace("$", ""));
  return acc + price;
}, 0);
document.getElementById("total-price").innerText = `$${totalPrice.toFixed(2)}`;

// Function to remove item from cart
function removeItemFromCart(name) {
  const index = cartItems.findIndex((item) => item.name === name);
  if (index !== -1) {
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCart();
  }
}

// Function to update cart
function updateCart() {
  const cartItemsHtml = cartItems.map((item) => {
    return `
      <li>
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>Price: ${item.price}</p>
        <button class="remove-btn" onclick="removeItemFromCart('${item.name}')">Remove</button>
      </li>
    `;
  }).join("");
  document.getElementById("cart-items").innerHTML = cartItemsHtml;

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return acc + price;
  }, 0);
  document.getElementById("total-price").innerText = `$${totalPrice.toFixed(2)}`;
}

// Checkout functionality
document.getElementById("checkout-btn").addEventListener("click", () => {
  // Process payment and update cart
  processPayment();
  updateCart();
});

// Function to process payment
function processPayment() {
  // Process payment using payment gateway API
  // Update cart and display success message
  alert("Payment successful!");
  localStorage.removeItem("cartItems");
}
// Script.js
const apiUrl = "http://localhost:5000";

// Get products from backend
fetch(`${apiUrl}/products`)
  .then((response) => response.json())
  .then((products) => {
    const productGrid = document.querySelector(".product-grid");
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <h2>${product.name}</h2>
        <p>Price: ${product.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      `;
      productGrid.appendChild(productCard);
    });
  })
  .catch((error) => console.error(error));

// Add event listener to add to cart button
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const productId = event.target.parentNode.querySelector("h2").textContent;
    fetch(`${apiUrl}/add_to_cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
});
// Add event listener to add to cart button
document.querySelector(".add-to-cart").addEventListener("click", () => {
    // Add product to cart
    const productId = document.querySelector(".product-details h1").textContent;
    const productPrice = document.querySelector(".product-details p").textContent;
    const productImage = document.querySelector(".product-image img").src;
    const product = {
      id: productId,
      price: productPrice,
      image: productImage,
    };
    // Add product to cart
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    // Update cart total
    const cartTotal = document.querySelector(".cart-total");
    const total = cart.reduce((acc, product) => acc + parseFloat(product.price), 0);
    cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;
  });