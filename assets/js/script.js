
const apiKey = 'c6d69ed5fd4fba13051095d8ed4ef0c9';

// current weather with function parameters

function getCurrentWeather(lat, lon) {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetch(queryURL)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const city = data.name;
    const currentDate = new Date(data.dt * 1000).toLocaleDateString("en-gb");
    console.log(currentDate);
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const currentCard = `<div class="card">
    <div class="card-body">
      <h5 class="card-title">${city}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">${currentDate}</h6>
      <p class="card-text">Temperature: ${temp}C</p>
      <p class="card-text">Humidity: ${humidity}C</p>
      <p class="card-text">Temperature: ${wind}C</p>
      <p class="card-text">Temperature: ${temp}C</p>
      <p class="card-text">Temperature: ${temp}C</p>
    </div>
  </div>`;
  document.getElementById('today').innerHTML = currentCard;
  })
  .catch(error => console.log(error));
}

// 5 day forecast with function parameters
function getForecast(lat, lon) {
  const forcastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetch(forcastURL)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const forecast = data.list;
    // console.log(forecast);
    
    console.log(forecast);
    // const forecastCard = forecast.map(day => {
    //   const date = new Date(day.dt * 1000).toLocaleDateString("en-gb");
    //   const temp = day.main.temp;
    //   const humidity = day.main.humidity;
    //   return `<div class="card">
    //   <div class="card-body">
    //     <h5 class="card-title">${date}</h5>
    //     <p class="card-text">Temperature: ${temp}C</p>
    //     <p class="card-text">Humidity: ${humidity}C</p>
    //   </div>
    // </div>`;
    // }).join('');
    // document.getElementById('forecast').innerHTML = forecastCard;
  })
}

// get geo location
function getGeoLocation(city) {
const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${apiKey}`;
fetch(geoURL)
.then(response => response.json())
.then(data => {
  console.log(data);
  const lat = data[0].lat;
  const lon = data[0].lon;
  getCurrentWeather(lat, lon);
  getForecast(lat, lon);
})
}

// event listener for search button
document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const city = document.getElementById('search-input').value;
  getGeoLocation(city);
});

