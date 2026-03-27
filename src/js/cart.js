import { getLocalStorage, updateCartCount, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if(cartItems){
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(".product-list").innerHTML = htmlItems.join("");
  }
  
}

updateCartCount();

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
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