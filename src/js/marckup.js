
export function createMarkup({ name, sys:{country}, main:{feels_like, humidity, pressure,temp}, weather}) {
    return  `<div class="weather-card"><div><h2>${name}, ${
   country
  }</h2><img src="http://openweathermap.org/img/w/${
    weather[0].icon
  }.png" width="80px"><p>${
    weather[0].description
  }</p></div><div><p>Temperature: ${
    temp
  }&#8451;</p><p>Feels like: ${  feels_like
  }&#8451;</p><p>Humidity: ${humidity}%</p><p>Pressure: ${pressure}</p></div>
  </div>
  `;
}