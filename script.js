// clock

let currentTime = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let displayDate = `${currentDay} | ${currentHour}:${currentMinute}`;

  return displayDate;
}

// search engine

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  console.log(input.value);

  searchCity(input.value);

  let cityListed = document.querySelector("#city-listed");
  cityListed.innerHTML = input.value;
}

// search form event

let form = document.querySelector("#city-form");
form.addEventListener("submit", search);
form.addEventListener("submit", searchCity);

// display current temp of city

function searchCity(city) {
  let apiKey = "9e0fb79c2f66d0cd0dcf06710976a873";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let bigTemp = document.querySelector("#big-temp");
  let iconElement = document.querySelector("#icon");
  celsiusTemp = response.data.main.temp;
  let temperature = Math.round(celsiusTemp);
  bigTemp.innerHTML = temperature;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//display current location temp

function cityTemperature(response) {
  let currentgeoTemp = document.querySelector("#big-temp");
  let temperature = Math.round(response.data.main.temp);
  currentgeoTemp.innerHTML = temperature;
  let currentGeoLocation = document.querySelector("#city-listed");
  currentGeoLocation.innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

// get current location city name and temp

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "6cc22b6303031b6448198cf91eb7cf8c";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(cityTemperature);
}

// current location button

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getPosition);

// celsius/fahrenheit

function showFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let bigTemp = document.querySelector("#big-temp");
  bigTemp.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let bigTemp = document.querySelector("#big-temp");
  bigTemp.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);
