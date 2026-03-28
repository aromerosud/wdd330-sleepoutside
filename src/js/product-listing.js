import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import SearchFilter from "./SearchFilter.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);


listing.init().then(() => {
  const searchFilter = new SearchFilter("#product-search", listing.getRenderFunction());
  searchFilter.setProducts(listing.getProducts());
});

const sortSelect = document.getElementById("sortOptions");

sortSelect.addEventListener("change", (e) => {
  listing.sortProducts(e.target.value);
});