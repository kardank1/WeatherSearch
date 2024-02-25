// 2. Додай перемикач теми і реалізуй логіку переключення світлої-темної теми
// в окремому файлі theme-switcher.js
// якщо обрана темна тема, при оновленні сторінки вона має залишатись
/* theme-switcher */

const switcherToggle = document.querySelector('.switcher-toggle');
const body = document.querySelector('body');

switcherToggle.addEventListener('change', toggle);
function toggle(event) {
  if (event.target.checked) {
    body.classList.replace('light', 'dark');

    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.replace('dark', 'light');
    localStorage.setItem('theme', 'light');
  }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.replace('light', 'dark');
  switcherToggle.checked = true;
}
