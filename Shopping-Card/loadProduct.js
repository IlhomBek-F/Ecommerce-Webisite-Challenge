const categories = document.getElementById("categories");

const latestDiv = document.querySelectorAll(".card");

const redmiDiv = document.querySelector(".redmi");

const realmeDiv = document.querySelector(".realme");

const oppoDiv = document.querySelector(".oppo");

const samsungDiv = document.querySelector(".samsung");

// Get categories from product json file

let count = 0;
async function getProduct() {
  const res = await fetch("./product.json");

  const data = await res.json();

  const product = await data.product;

  return product;
}

// categories function

function displayProduct(product, productInner) {
  let display = product.map(
    ({ name, img }) =>
      `
        <div class="brand">
        <div class="img-container">
        <img src="${img}" class="brand-img" alt="" />
        </div>
        <h4 id="brand-name">${name}</h4>
        </div>
        `
  );

  display = display.join("");
  productInner.innerHTML = display;
}

// latest function

function latestDisplayProduct(product, productDiv) {
  let display = product.map(
    ({ img, price, name }) =>
      `
               <div class="item-container">
                 <div  id="${count++}" class="card-item">
                   <img src="${img}" id="card-img" alt="" />
                   <p id="item-name">${name}</p>
                   <h3 id="item-price">Price : $ ${price}</h3>
                 </div>
                 <i id="add-to-cart" class="fa fa-shopping-cart"></i>
               
               </div>
      `
  );
  display = display.join("");
  productDiv.innerHTML = display;
}

// filter Function

const filterArray = async (type) => {
  const product = await getProduct();
  return product.filter((product) => product.category === type);
};
console.log(filterArray());

window.addEventListener("load", async () => {
  const products = await getProduct();
  const optionProduct = await filterArray("option");
  const latestProduct = await filterArray("latest");
  const redmi = await filterArray("redmi");
  const realme = await filterArray("realme");
  const oppo = await filterArray("oppo");
  const samsung = await filterArray("samsung");
  console.log(optionProduct);
  // categories
  displayProduct(optionProduct, categories);
  // latest product
  latestDisplayProduct(latestProduct, latestDiv);
  // redmi product
  latestDisplayProduct(redmi, redmiDiv);
  // realme product
  latestDisplayProduct(realme, realmeDiv);
  // oppo product
  latestDisplayProduct(oppo, oppoDiv);
  // samsung product
  latestDisplayProduct(samsung, samsungDiv);
});

// <<<<<<<<<<***************  EVENTS  FUNCTIONS *****************>>>>>>>>>>      \\
const cardBtn = document.querySelectorAll(".card");
const addTocart = document.getElementById("card-add");
let itemId = 0;
const backBtn = document.getElementById("back");
const detailId = document.getElementById("details-id");
const detailImg = detailId.querySelector("img");
const detailName = detailId.querySelector("#detail-title");
const detailPrice = detailId.querySelector("#detail-price");

addTocart.addEventListener("click", async (e) => {
  let priceFromJson = await getProduct();

  // priceFromJson.forEach((item) => {});
  let addTo = e.target.parentNode;

  let data = {
    id: itemId++,
    title: addTo.querySelector("#detail-title").innerText,
    price: addTo.querySelector("#detail-price").innerText,
  };
  console.log(data.price + data.price);
  addToLocal(data);
});
backBtn.addEventListener("click", () => {
  detailId.style.display = "none";
});

cardBtn.forEach((item) => {
  item.addEventListener("click", (e) => {
    const getImg = e.target;

    if (getImg.classList.contains("card-item")) {
      console.log(getImg);
      detailId.style.display = "block";
      let detail = {
        img: getImg.querySelector("img").src,
        title: getImg.querySelector("#item-name"),
        price: getImg.querySelector("#item-price"),
      };
      detailImg.src = detail.img;
      const text = detail.title.innerText;
      const prices = detail.price.innerText;
      detailName.innerText = text;
      detailPrice.innerText = prices;
    }
  });
});

/// add item  to  the cart

function fromLocal() {
  let fromLocal = JSON.parse(localStorage.getItem("product"));
  return fromLocal === null ? [] : fromLocal;
}

function addToLocal(data) {
  const fromData = fromLocal();
  localStorage.setItem("product", JSON.stringify([...fromData, data]));
}
