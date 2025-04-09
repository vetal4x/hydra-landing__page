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

  //Slider

const slides = document.querySelectorAll(".slide");
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
    if (slides.length > 0) {
        slides[slideIndex].classList.add("displaySlide");
        intervalId = setInterval(nextSlide, 5000);
    }
}

function showSlide(index) {
    if (index >= slides.length) {
        index = 0;
    } else if (index < 0) {
        index = slides.length - 1;
    }

    const currentSlide = slides[slideIndex];
    const nextSlide = slides[index];

    if (currentSlide === nextSlide) return;

    // Animate current slide out
    currentSlide.classList.add("slideOut");

    // Prepare next slide immediately (it'll animate in)
    nextSlide.classList.add("displaySlide");

    // When the out animation ends, clean up
    currentSlide.addEventListener("animationend", function handleOut() {
        currentSlide.classList.remove("displaySlide", "slideOut");
        currentSlide.removeEventListener("animationend", handleOut);
        slideIndex = index;
    });
}

function prevSlide() {
    clearInterval(intervalId);
    showSlide(slideIndex - 1);
}

function nextSlide() {
    showSlide(slideIndex + 1);
}
