const openMenu = document.querySelector('.open-menu');
const closeMenu = document.querySelector('.close-menu');

const navbar = document.querySelector('.navbar');

openMenu.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);

function toggleMenu() {
    navbar.classList.toggle('is-active');
}