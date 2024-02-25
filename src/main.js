//import "./js/promise.js"
// 1. Створи застосунок для пошуку погоди в своєму місті
// Використовуй API https://openweathermap.org/api
// (Current Weather Data -> Built-in API request by city name)
// створи файл api.js що робитиме запит на бек
// створи файл create-markup.js для створення розмітки (https://prnt.sc/LEataI862RLd)
// додай пошук погоди в конкретному місті використовуючи форму
import { createMarkup } from './js/marckup';
import { getCity } from './js/API';
const weatherDetails = document.querySelector('#weatherDetails');
getCity().then(data =>
  weatherDetails.insertAdjacentHTML('beforeend', createMarkup(data))
);
