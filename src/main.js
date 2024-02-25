//import "./js/promise.js"
// 1. Створи застосунок для пошуку погоди в своєму місті
// Використовуй API https://openweathermap.org/api
// (Current Weather Data -> Built-in API request by city name)
// створи файл api.js що робитиме запит на бек
// створи файл create-markup.js для створення розмітки (https://prnt.sc/LEataI862RLd)
// додай пошук погоди в конкретному місті використовуючи форму
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { createMarkup } from './js/marckup';
import { getCity } from './js/API';
import './js/theme-switcher';

const inputForm = document.getElementById('searchForm');
const weatherDetails = document.querySelector('#weatherDetails');

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
    })
    .catch(error => {
      iziToast.error({ message: 'Something went wrong' });
    })
    .finally(() => inputForm.reset());
}
