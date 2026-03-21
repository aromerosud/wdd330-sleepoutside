import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import SearchFilter from "./SearchFilter.mjs";

loadHeaderFooter();

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);


listing.init().then(() => {
  const searchFilter = new SearchFilter("#product-search", listing.getRenderFunction());
  searchFilter.setProducts(listing.getProducts());
});