  // Mobile Menu
  document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger__button');
    const mobileMenu = document.querySelector('.mobile__menu');
  
    hamburgerButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      hamburgerButton.classList.toggle('menu-open'); // Add class to button
    });
  });
