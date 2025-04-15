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
        mobileMenu.style.left = "100vw";
        menuVisible = false; 
      }
      prevScrollpos = currentScrollPos;
    });
  });

// Slider

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  let slideIndex = 0;
  let intervalId = null;
  let startX = 0;

  function initializeSlider(sliderSelector) {
    const slider = document.querySelector(sliderSelector);
    if (!slider) {
      console.error(`Slider ${sliderSelector} not found.`);
      return;
    }
    console.log(`Slider initialized: ${sliderSelector}`);
  
    const slides = Array.from(slider.querySelectorAll('.slide'));
    if (slides.length === 0) {
      console.error(`No slides found in ${sliderSelector}`);
      return;
    }
    console.log(`Found ${slides.length} slides in ${sliderSelector}`);
  
    slides[slideIndex].classList.add('displaySlide');
  
    function showSlide(index) {
      const currentSlide = slider.querySelector('.displaySlide');
      if (currentSlide) {
        currentSlide.classList.remove('displaySlide');
      }
  
      const nextSlide = slides[index];
      if (nextSlide) {
        nextSlide.classList.add('displaySlide');
      }
    }
  
    function nextSlide() {
      if (window.innerWidth > 768 && sliderSelector !== '.slider__contact') return;
      const currentSlide = slider.querySelector('.displaySlide');
      const slideIndex = slides.indexOf(currentSlide);
      let nextIndex = (slideIndex + 1) % slides.length;
      showSlide(nextIndex);
    }
  
    function prevSlide() {
      if (window.innerWidth > 768 && sliderSelector !== '.slider__contact') return;
      const currentSlide = slider.querySelector('.displaySlide');
      const slideIndex = slides.indexOf(currentSlide);
      let prevIndex = (slideIndex - 1 + slides.length) % slides.length;
      showSlide(prevIndex);
    }
  
    const prevButton = slider.querySelector('.slider__button__prev');
    const nextButton = slider.querySelector('.slider__button__next');
  
    if (prevButton && nextButton) {
      prevButton.addEventListener('click', prevSlide);
      nextButton.addEventListener('click', nextSlide);
    }
  
    let intervalId = setInterval(nextSlide, 5000);
  }
  

  initializeSlider('.slider__contact');
  initializeSlider('.slider__why__build');
  initializeSlider('.slider__brands');
  initializeSlider('.how__we__build');
});

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

