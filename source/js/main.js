const toggleButtonElement = document.querySelector('.main-header__button');
const menuElement = document.querySelector('.main-header__nav');
const nojsElement = document.querySelector('.no-js');

nojsElement.classList.remove('no-js');

toggleButtonElement.addEventListener('click', function(){
  toggleButtonElement.classList.toggle('toggle_closed');
  menuElement.classList.toggle('menu-nav_opened')
})
