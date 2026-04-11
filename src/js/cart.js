import { getLocalStorage, updateCartCount, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if(cartItems){
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(".product-list").innerHTML = htmlItems.join("");
      attachQuantityHandlers();
  }
}

updateCartCount();

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card cart-item" data-id="${item.Id}">
    <button class="remove-item">&times;</button>
      <div class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </div>
      <div class="cart-card__details">
        <h2>${item.Name}</h2>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <div class="item-quantity">
          <button class="decrease">-</button>
          <input type="number" value="${item.quantity || 1}" min="1" class="quantity-input"/>
          <button class="increase">+</button>
        </div>
      </div>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
  return newItem;
}

function attachQuantityHandlers() {
  document.querySelectorAll(".cart-item").forEach(itemEl => {
    const id = itemEl.dataset.id;
    const input = itemEl.querySelector(".quantity-input");
    const increaseBtn = itemEl.querySelector(".increase");
    const decreaseBtn = itemEl.querySelector(".decrease");
    const removeBtn = itemEl.querySelector(".remove-item");

    increaseBtn.addEventListener("click", () => updateQuantity(id, parseInt(input.value) + 1));
    decreaseBtn.addEventListener("click", () => {
      if (parseInt(input.value) > 1) {
        updateQuantity(id, parseInt(input.value) - 1);
      }
    });
    removeBtn.addEventListener("click", () => removeItem(id));
  });
}

function updateQuantity(id, newQuantity) {
  let cart = getLocalStorage("so-cart") || [];
  cart = cart.map(item => {
    if (item.Id === id) {
      item.quantity = newQuantity;
    }
    return item;
  });
  localStorage.setItem("so-cart", JSON.stringify(cart));
  renderCartContents(); 
  updateCartTotal();    
}

function updateCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartTotal = document.querySelector(".cart-total");
  let total = cartItems.reduce(
    (sum, item) => sum + Number(item.FinalPrice) * (item.quantity || 1),
    0
  );
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function removeItem(id) {
  let cart = getLocalStorage("so-cart") || [];
  cart = cart.filter(item => item.Id !== id); 
  localStorage.setItem("so-cart", JSON.stringify(cart));
  renderCartContents(); 
  updateCartTotal(); 
  updateCartCount();   
}


document.addEventListener("DOMContentLoaded", function (){
  const listFooter = document.querySelector(".list-footer");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");

  const cartItems = getLocalStorage("so-cart") || [];

  if(cartItems.length > 0) {
    listFooter.classList.remove("hide");
    cartFooter.classList.remove("hide");
    let total = cartItems.reduce(
    (sum, item) => sum + Number(item.FinalPrice) * (item.quantity || 1),
      0
    );
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }
});

renderCartContents();