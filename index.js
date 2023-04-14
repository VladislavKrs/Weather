const apiKey = '5567bea6a7d08f6852f7bce15cb6fb18';

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchInput = document.querySelector('.search-box input');

const searchBtn = document.querySelector('.search-box button');

const iconWeather = document.querySelector('.weather-image i');

const weather = document.querySelector('.weather');

const error = document.querySelector('.error');

async function weatherCheck(city) {
  const response = await fetch(`${apiUrl + city}&appid=${apiKey}`);
  if (response.status === 404) {
    error.style.display = 'block';
    weather.style.display = 'none';
  }
  const data = await response.json();

  document.querySelector('.city').innerHTML = data.name;
  document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}°C`;
  document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;
  document.querySelector('.wind').innerHTML = `${data.wind.speed} km/h`;

  if (data.weather[0].main === 'Clear') {
    iconWeather.className = 'fa-solid fa-sun';
  } else if (data.weather[0].main === 'Rain') {
    iconWeather.className = 'fa-solid fa-cloud-rain';
  } else if (data.weather[0].main === 'Mist') {
    iconWeather.className = 'fa-solid fa-cloud-mist';
  } else if (data.weather[0].main === 'Drizzle') {
    iconWeather.className = 'fa-solid fa-cloud-drizzle';
  }

  weather.style.display = 'block';
  error.style.display = 'none';
}

searchBtn.addEventListener('click', () => {
  weatherCheck(searchInput.value);
  searchInput.value = '';
});

searchInput.addEventListener('keydown', (event) => {
  if (event.keyCode === 'Enter') {
    weatherCheck(searchInput.value);
    searchInput.value = '';
  }
});
