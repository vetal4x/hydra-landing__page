  // Mobile Menu
  document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger__button');
    const mobileMenu = document.querySelector('.mobile__menu');
    let menuVisible = false; 
  
    hamburgerButton.addEventListener('click', () => {
      menuVisible = !menuVisible;
      mobileMenu.classList.toggle('active', menuVisible);
    });
  
    let prevScrollpos = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentScrollPos = window.scrollY;
      if (menuVisible && prevScrollpos < currentScrollPos) {
        mobileMenu.style.left = "70vw";
        menuVisible = false; 
      }
      prevScrollpos = currentScrollPos;
    });
  });

// Slider

const slides = document.querySelectorAll(".slide");
let slideIndex = 0;
let intervalId = null;
let startX = 0;

document.addEventListener("DOMContentLoaded", () => {
  initializeSlider();
  addSwipeListeners(); 
});

function initializeSlider() {
  if (slides.length > 0) {
    slides[slideIndex].classList.add("displaySlide");
    intervalId = setInterval(() => {
      showSlide(slideIndex + 1, true);  
    }, 5000);
  }
}

function showSlide(index, isNext = true) {

  index = (index + slides.length) % slides.length;

  const currentSlide = slides[slideIndex];
  const nextSlide = slides[index];

  if (currentSlide === nextSlide) return;

  let animationIn, animationOut;

  if (isNext) {
    animationIn = "slideInRight";  
    animationOut = "slideOutRight"; 
  } else {
    animationIn = "slideInLeft";  
    animationOut = "slideOutLeft"; 
  }

  currentSlide.classList.add("slideOut");
  nextSlide.classList.add("displaySlide");

  currentSlide.style.animation = `${animationOut} 1s forwards`;
  nextSlide.style.animation = `${animationIn} 1s forwards`;

  currentSlide.addEventListener("animationend", function handleOut() {
    currentSlide.classList.remove("displaySlide", "slideOut");
    currentSlide.removeEventListener("animationend", handleOut);
  });

  slideIndex = index;
}

function prevSlide() {
  clearInterval(intervalId);
  showSlide(slideIndex - 1, false); 
  restartAutoSlide();
}

function nextSlide() {
  clearInterval(intervalId);
  showSlide(slideIndex + 1, true); 
  restartAutoSlide();
}

function restartAutoSlide() {
  intervalId = setInterval(() => {
    showSlide(slideIndex + 1, true); 
  }, 5000);
}

// Swipe for slider

function addSwipeListeners() {
  const slider = document.querySelector(".slider");

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;

    if (Math.abs(diffX) > 50) {  
      clearInterval(intervalId); 

      if (diffX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }
  });
}

