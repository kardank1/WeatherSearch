//import "./js/promise.js"
// 1. Створи застосунок для пошуку погоди в своєму місті
// Використовуй API https://openweathermap.org/api
// (Current Weather Data -> Built-in API request by city name)
// створи файл api.js що робитиме запит на бек
// створи файл create-markup.js для створення розмітки (https://prnt.sc/LEataI862RLd)
// додай пошук погоди в конкретному місті використовуючи форму

// 4. Додай в картку з погодою кнопку Save для зберігання
// інформації про погоду в місті в localStorage, щоб при оновленні сторінки
// йшов запит за погодою в збереженому місті
// коли місто збережено, кнопка стає Delete і можна видалити місто, тоді запит
// не буде йти при оновленні сторінки

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { createMarkup } from './js/marckup';
import { getCity } from './js/API';
import './js/theme-switcher';

const inputForm = document.getElementById('searchForm');
const weatherDetails = document.querySelector('#weatherDetails');
const dateSpan = document.querySelector('.date span');

inputForm.addEventListener('submit', formSearch);

function formSearch(event) {
  event.preventDefault();
  const query = event.target.name.value.trim();
  weatherDetails.innerHTML = '';

  if (!query) {
    return iziToast.warning({ message: 'Enter city name' });
  }
  getCity(query)
    .then(data => {
      if (!data) {
        return iziToast.error({ message: 'Please write a real city name' });
      }
      weatherDetails.insertAdjacentHTML('beforeend', createMarkup(data));
      const saveBtn = document.querySelector('.save-btn');
      saveBtn.addEventListener('click', () => {
        localStorage.setItem('city', query);
      });
    })
    .catch(error => {
      iziToast.error({ message: 'Something went wrong' });
    })
    .finally(() => inputForm.reset());
}

dateSpan.textContent = new Date().toLocaleString();
setInterval(() => {
  dateSpan.textContent = new Date().toLocaleString();
}, 1000);

const savedCity = localStorage.getItem('city');
if (savedCity) {
  getCity(savedCity).then(data =>
    weatherDetails.insertAdjacentHTML('beforeend', createMarkup(data))
  );
}
