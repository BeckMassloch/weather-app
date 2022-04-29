function displayDate() {
  let now = new Date();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = weekdays[now.getDay()];
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let currentDate = document.querySelector(".current-date");
  currentDate.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;
}
displayDate();

function getCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let city = cityInput.value;
  searchCity(cityInput.value);
}

function searchCity(city) {
  let apiKey = "3153a29ca3b931fcc59027a2462c1744";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityValue = document.querySelector("h3");
  cityValue.innerHTML = response.data.name;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}°C`;
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", getCity);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "3153a29ca3b931fcc59027a2462c1744";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", getCurrentPosition);

function showCelsiusTemp() {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "19°";
}

function showFarenheitTemp() {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = "66°";
}

let showCelsius = document.querySelector("#celsius-btn");
showCelsius.addEventListener("click", showCelsiusTemp);

let showFarenheit = document.querySelector("#farenheit-btn");
showFarenheit.addEventListener("click", showFarenheitTemp);
