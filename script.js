"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const footer = document.querySelector(".footer");
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// cookies
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML = `We use cookies to improve functionality and analytics. <button class = "btn 
  btn--close-cookie"> Got it! </button>`;
header.append(message);

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });
message.style.backgroundColor = "#37383d";
message.style.width = "105%";
console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

/*changing root element
document.documentElement.style.setProperty('--color-primary' , 'orange') */
// selecting and setting Attributes
const logo = document.querySelector(".nav-logo");
console.log(logo.alt);
logo.setAttribute("company", "Bankist");
/*classes
logo.classList.add('');
logo.classList.remove();
logo.classList.toggle('')
logo.classList.contains()
*/
// Scroll bar
const btnScrollto = document.querySelector(".btn--scroll-to");
const features = document.querySelector("#features");

btnScrollto.addEventListener("click", function (e) {
  const s1coords = features.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  features.scrollIntoView({ behavior: "smooth" });
});

// page navagation
/*event propagation
document.querySelector('.nav__link').forEach(function(el) {
  el.addEventListener('click' , function(e){
    e.preventDefault()
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  })
})
*/
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
// menu fade animation
const handleOver = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// passing argument into handler
nav.addEventListener("mouseover", handleOver.bind(0.5));

nav.addEventListener("mouseout", handleOver.bind(1));
/*sticky navigation
const intialCoords = features.getBoundingClientRect();
console.log(intialCoords);
window.addEventListener("scroll", function () {
  console.log(window.scrollY);
  if (window.scrollY > intialCoords.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});
*/
// Tabbed component
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);
  if (!clicked) return;
  // remove active classes
  tabs.forEach((t) => t.classList.remove("operations__content--active"));
  tabContent.forEach((c) => c.classList.remove("operations__content--active"));
  // actve tab
  clicked.classList.add("operations__content--active");
  //  active content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

/* Event propagation : Bubbling and capturing
const randomInt = (min , max) => 
Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav_links').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.log('container', e.target);
  e.stopPropagation();
});
document.querySelector('.nav_link').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.log('link' ,e.target);
});
document.querySelector('.nav').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.log('nav' ,e.target);
});
*/
/*const observerCallback = function(enteries,observer) {
  enteries.forEach(entry => {
    console.log(entry);
  });

}
const observerOptions = {
  root: null , 
  threshold: [0 , 0.2]
}
const observer =  new IntersectionObserver(observerCallback,observerOptions);
observer.observe(features)
*/
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll(".section");

const revelSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if(!entry.isIntersecting) return;

 entry.target.classList.remove('section--hidden');
 observer.unobserve(entry.target)
};
const sectionObserver = new IntersectionObserver(
  revelSection,{
    root: null,
    threshold: 0.15,
  });

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add(".section--hidden");
});

// lazy loading images 
const imgTargets =  document.querySelectorAll('img[data-src]');
const loadImg = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return; 
  entry.target.src = entry.target.dataset.src;
  
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
};

const imgObserver = new IntersectionObserver( loadImg,
   {
  root: null , 
  threshold: 0 ,
  rootMargin: '200px'

})

imgTargets.forEach(img => imgObserver.observe(img))

// slider 
const slides = document.querySelectorAll()




