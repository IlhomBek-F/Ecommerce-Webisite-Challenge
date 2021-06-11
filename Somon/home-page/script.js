const nav = document.querySelector(".nav-menu");
const navigation = document.querySelector(".navigation");
const openBtn = document.querySelector(".hamburger");
const closeBtn = document.querySelector(".close");

openBtn.addEventListener("click", () => {
  nav.classList.add("show");
  navigation.classList.add("show");
  document.body.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  nav.classList.remove("show");
  navigation.classList.remove("show");
  document.body.classList.remove("show");
});

// fix nav

const navbar = document.querySelector(".navigation");
const navHeight = navbar.getBoundingClientRect().height;

window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fix-nav");
  } else {
    navbar.classList.remove("fix-nav");
  }
});

// Popup

const popup = document.querySelector(".popup");
const closePop = document.querySelector(".popup-close");

closePop.addEventListener("click", () => {
  popup.classList.remove("show");
});

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    popup.classList.add("show");
  }, 2000);
});

// loader

window.addEventListener("load", () => {
  const loader = document.getElementById("preloader");
  setTimeout(() => {
    loader.classList.add("hide");
  }, 2000);
});

// smooth scroll

const links = [...document.querySelectorAll(".scroll-link")];

links.map((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const id = e.target.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const fixNav = navbar.classList.contains("fix-nav");
    let position = element.offsetTop - navHeight;

    if (!fixNav) {
      position = position - navHeight;
    }

    window.scrollTo({
      top: position,
      left: 0,
    });

    navigation.classList.remove("show");
    nav.classList.remove("show");
    document.body.classList.remove("show");
  });
});
