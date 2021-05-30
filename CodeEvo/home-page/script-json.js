/*---------> Advert Product  <---------*/
const advertBox = document.getElementById("ad");

window.addEventListener("DOMContentLoaded", () => {
  advertProduct();
  featuredProductLoaded();
  latestProducts();
  testimonials();
});

function advertProduct() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "../korvon-json/advert.json", true);

  xhr.onload = function () {
    if (this.status == 200) {
      let adv = JSON.parse(this.responseText);
      loadAdvertIntoBody(adv);
      featuredProductLoaded(adv);
      latestProducts(adv);
      testimonials(adv);
    }
  };
  xhr.send();
}

function loadAdvertIntoBody(adv) {
  adv[0].forEach((item) => {
    let adBox = document.createElement("div");
    adBox.classList.add("advert-box");
    adBox.innerHTML = `
    <div class="dotted">
      <div class="content">
        <h2>
          ${item.category} <br />
          Closthing
        </h2>
        <h4>${item.title}</h4>
      </div>
    </div>
    <img src="${item.img}" />
    `;
    advertBox.appendChild(adBox);
  });
}

/*---------> Featured Product  <---------*/

const prodCenter = document.getElementById("product-center");

function featuredProductLoaded(adv) {
  adv[1].forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
        <div class="product-header">
        <img src="${item.img}" />
        <ul class="icons">
          <span><i class="fas fa-heart"></i></span>
          <span><i class="fas fa-shopping-bag"></i></span>
          <span><i class="fas fa-search"></i></span>
        </ul>
      </div>
      <div class="product-footer">
        <a href="#"><h3>${item.category} T-Shirt</h3></a>
        <div class="rating">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
        <h4 class="price">$ ${item.price}</h4>
      </div>
        `;
    prodCenter.appendChild(div);
  });
}

/*---------> Latest Product  <---------*/

function latestProducts(adv) {
  const prodCenter = document.getElementById("latest-product-center");

  adv[2].forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
            <div class="product-header">
            <img src="${item.img}" />
            <ul class="icons">
              <span><i class="fas fa-heart"></i></span>
              <span><i class="fas fa-shopping-bag"></i></span>
              <span><i class="fas fa-search"></i></span>
            </ul>
          </div>
          <div class="product-footer">
            <a href="#"><h3>${item.category} T-Shirt</h3></a>
            <div class="rating">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <h4 class="price">$ ${item.price}</h4>
          </div>
            `;
    prodCenter.appendChild(div);
  });
}

/*---------> Testimonials  <---------*/

function testimonials(adv) {
  const test = document.getElementById("testimonial");

  adv[3].forEach((tst) => {
    const div = document.createElement("div");
    div.classList.add("testimonial");
    div.innerHTML = `
    <span>&ldquo;</span>
    <p>${tst.comment}</p>
    <div class="rating">
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
    </div>
    <div class="img-cover">
      <img src="${tst.img}" />
    </div>
    <h1>${tst.name}</h1>
    `;

    test.appendChild(div);
  });
}
