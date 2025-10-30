
const menu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menu.addEventListener('click', () => {
  menu.classList.toggle('active');
  navLinks.classList.toggle('active');
});
