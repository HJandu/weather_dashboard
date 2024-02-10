const apiKey = 'c6d69ed5fd4fba13051095d8ed4ef0c9';
var cityHistory = document.getElementById('search-input').value;

// the start screen displays searched names from local storage which the user can click to display the weather, without inputting the city name again
$(document).ready(function () {
  displaySearchHistory();
  $("#history").on("click", "#historyBtn", function (event) {
    event.preventDefault();
    var city = $(this).attr("cityData");
    getGeoLocation(city);
    displaySearchHistory();
  });

});

// current weather with function parameters

function getCurrentWeather(lat, lon) {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetch(queryURL)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      const city = data.name;
      const currentDate = new Date(data.dt * 1000).toLocaleDateString("en-gb");
      // console.log(currentDate);
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;
      const pressure = data.main.pressure;
      const currentCard = `<div class="card">
    <div class="card-body">
      <h5 class="card-title header">${city} ${currentDate} <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather icon"> </h5>
      <p class="card-text">Temperature: ${temp}C</p>
      <p class="card-text">Humidity: ${humidity}%</p>
      <p class="card-text">Wind Speed: ${wind}mph</p>
      <p class="card-text">Pressure: ${pressure}mb</p>
    </div>
  </div>`;
      document.getElementById('today').innerHTML = currentCard;
    })
    .catch(error => console.log(error));
}

// 5 day forecast with function parameters
function getForecast(lat, lon) {
  $("#forecast").empty();
  const forcastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetch(forcastURL)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      const forecast = data.list;
      // add 5 day forecast heading
      const forecastHeading = $("<h2>").text("5 Day Forecast:");
      $("#forecast").prepend(forecastHeading);
      for (var i = 0; i < forecast.length; i++) {
        var date = forecast[i].dt_txt;
        if (date.includes('12:00:00')) {
          // create a card for each day          
          const forecastCard = `<div class="card col-2" style="width: 12rem;">`
          const forecastDate = `<div class="card-body forcast-row">
          <h5 class="card-title">${new Date(forecast[i].dt * 1000).toLocaleDateString("en-gb")}</h5>`
          const forecastTemp = `<p class="card-text">Temp: ${forecast[i].main.temp}C</p>`
          const forecastHumidity = `<p class="card-text">Humidity: ${forecast[i].main.humidity}%</p>`
          const forecastWind = `<p class="card-text">Wind Speed: ${forecast[i].wind.speed}mph</p>`
          const forecastPressure = `<p class="card-text">Pressure: ${forecast[i].main.pressure}mb</p>`
          const forecastIcon = `<img src="http://openweathermap.org/img/w/${forecast[i].weather[0].icon}.png" alt="weather icon">`
          const forecastCardEnd = `</div></div>`
          document.getElementById('forecast').innerHTML += forecastCard + forecastDate + forecastIcon + forecastTemp + forecastHumidity + forecastWind + forecastPressure;
      }}
    });
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

// console.log();

// event listener for search button
document.getElementById('search-form').addEventListener('submit', function (event) {
  event.preventDefault();
  let city = document.getElementById('search-input').value;
  getGeoLocation(city);
  saveCity(city);
  displaySearchHistory();
  // reset the search input
  $("#search-input").val("");
});


// save the city to local storage
function saveCity(city) {
  if (city === '') {
    return;
  }
  var cityList = JSON.parse(localStorage.getItem('city')) || [];
  if (cityList.includes(city)) {
    return;
  }
  // check if the city is duplicated regardless of the case
  if (checkDuplicate(city)) {
    return;
  }
  cityList.push(city);
  localStorage.setItem('city', JSON.stringify(cityList));
}

// display searched history
function displaySearchHistory() {
  const searchHistoryE1 = JSON.parse(window.localStorage.getItem('city'));
  $("#history").empty();
  if (!searchHistoryE1) {
    return;
  }
  //append searched cities from local storage to the search history
  for (var i = 0; i < searchHistoryE1.length; i++) {
    // create a button for each city in the array
    var cityNames = $("<button>").text(searchHistoryE1[i]);
    // change the first letter of the city to uppercase
    cityNames.text(titleCase(searchHistoryE1[i]));
    // add classes and attributes to the button
    cityNames.addClass("btn btn-block");
    // add the city name as a data attribute
    cityNames.attr("cityData", searchHistoryE1[i])
    // add an id to the button
    cityNames.attr("id", "historyBtn")
    $("#history").append(cityNames);
  }
}


// change the first letter of the city to uppercase
function titleCase(city) {
  return city.charAt(0).toUpperCase() + city.slice(1);
}

// check if the city is duplicated regardless of the case
function checkDuplicate(city) {
  const searchHistoryE1 = JSON.parse(window.localStorage.getItem('city'));
  if (!searchHistoryE1) {
    return;
  }
  for (var i = 0; i < searchHistoryE1.length; i++) {
    if (city.toLowerCase() === searchHistoryE1[i].toLowerCase()) {
      return true;
    }
  }
  return false;
}