// Responsive Navbar Building
const menuBtn = document.querySelector('.menu-btn');
const menuBurger = document.querySelector('.menu-btn__burger');
const navList = document.querySelector('.menu-nav');
const listItems = document.querySelectorAll('.menu-nav__item');
const socialIcons = document.querySelector('.social-icons');

let showMenu = false;

menuBtn.addEventListener('click', toggleMenu)

function toggleMenu() {
    if (!showMenu) {
        menuBurger.classList.add('open')
        navList.classList.add('open')
        socialIcons.classList.add('open')

        listItems.forEach(item => item.classList.add('open'))

        showMenu = true;
    } else {
        menuBurger.classList.remove('open')
        navList.classList.remove('open')
        socialIcons.classList.remove('open')

        listItems.forEach(item => item.classList.remove('open'))

        showMenu =false;
    }
}




