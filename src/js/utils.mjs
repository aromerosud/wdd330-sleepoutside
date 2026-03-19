// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if(callback) {
    callback(data);
  }
}

export async function loadHeaderFooter() {

  const headerResponse = await fetch("/partials/header.html");
  const footerResponse = await fetch("/partials/footer.html");

  const headerHTML = await headerResponse.text();
  const footerHTML = await footerResponse.text();

  const header = document.querySelector("#header");
  const footer = document.querySelector("#footer");

  renderWithTemplate(headerHTML, header);
  renderWithTemplate(footerHTML, footer);
}

//Add a superscript number of items
export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const countElement = qs(".cart-count");

  if (!countElement) return;

  if (cartItems.length > 0) {
    countElement.textContent = cartItems.length;
    countElement.style.display = "flex";
  } else {
    countElement.style.display = "none";
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}