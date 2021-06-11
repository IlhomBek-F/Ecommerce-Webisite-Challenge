const getProduct = async () => {
  const res = await fetch("../product-json/product.json");
  const data = await res.json();
  const products = data.products;
  return products;
};

console.log(getProduct());
// Display Product

function displayProduct(products, center) {
  let display = products.map(
    ({ title, img, price }) =>
      `  <div class="product">
       <div class="product-header">
         <img src="${img}" />
       </div>
       <div class="product-footer">
         <h3>${title}</h3>
         <div class="rating">
           <i class="fas fa-star"></i>
           <i class="fas fa-star"></i>
           <i class="fas fa-star"></i>
           <i class="fas fa-star"></i>
           <i class="fas fa-star"></i>
         </div>
         <div class="product-price">
           <h4>$${price}</h4>
         </div>
         <ul>
           <li>
             <a href="#"><i class="far fa-eye"></i></a>
           </li>
           <li>
             <a href="#"><i class="far fa-heart"></i></a>
           </li>
           <li>
             <a href="#"><i class="fas fa-sync"></i></a>
           </li>
         </ul>
       </div>
     </div>`
  );

  display = display.join("");
  center.innerHTML = display;
}

// filteration
const productCenter = document.querySelector(".product-center");
const catContainer = document.querySelector(".sort-category");
const filterBtn = [...document.querySelectorAll(".filter-btn")];

if (catContainer)
  catContainer.addEventListener("click", async (e) => {
    const target = e.target.closest(".section-title");
    if (!target) return;

    const id = target.dataset.id;
    const products = await getProduct();

    if (id)
      filterBtn.forEach((btn) => {
        btn.classList.remove("active");
      });

    target.classList.add("active");
    const menuCat = products.filter((product) => product.category === id);

    console.log(menuCat);
    productCenter.classList.add("animate_animated", "animate_backInUp");

    setTimeout(() => {
      productCenter.classList.remove("animate_animated", "animate_backInUp");
    }, 1000);

    displayProduct(menuCat, productCenter);
  });

const filterArray = async (type) => {
  const products = await getProduct();
  return products.filter((product) => product.category === type);
};

const shopCenter = document.querySelector(".shop-center");
const latestCenter = document.querySelector(".latest-center");
const recentCenter = document.querySelector(".recent-center");
window.addEventListener("DOMContentLoaded", async () => {
  const products = await getProduct();
  const TrendProduct = await filterArray("trend");
  const latestProduct = await filterArray("latest");
  const recentProduct = await filterArray("recent");
  displayProduct(TrendProduct, productCenter);
  displayProduct(latestProduct, latestCenter);
  displayProduct(recentProduct, recentCenter);
  displayProduct(products, shopCenter);
});
