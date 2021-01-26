// Display the current date and time
let now = new Date();

// Day display
let currentDay = document.querySelector("#current-day");
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
currentDay.innerHTML = `Last updated: ${days[now.getDay()]}`;

// Hour display
let currentHour = document.querySelector("#current-hour");
let hours = now.getHours();
let minutes = now.getMinutes();

if (hours < 10) {
    hours = `0${hours}`;
}
if (minutes < 10) {
    minutes = `0${minutes}`;
}

currentHour.innerHTML = `${hours}:${minutes}`;

// Format hours - timestamp
function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
}

// When a user searches for a city (example: New York), it displays the name of the city on the result page and the current weather conditions of the city

// Display the next hours forecast
function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    // Fixing forecast duplication element
    forecastElement.innerHTML = null;
    // Init forecast
    let forecast = null;
    // Display forecasts col
    for (let index = 0; index < 3; index++) {
        forecast = response.data.list[index];
        forecastElement.innerHTML += `
      <div class="col p-0">
            <ul>
                <li class="forecast-hours">${formatHours(forecast.dt * 1000)}</li>
                <li class="forecast-icons">
                    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
                </li>
                <li class="forecast-temperatures">
                    <strong>${Math.round(forecast.main.temp_max)}°</strong>
                    ${Math.round(forecast.main.temp_min)}°
                </li>
            </ul>
        </div>
    `;
    }
}

// Display the current temperature of the city, via the API.
function showTemperature(response) {
    celsiusTemperature = response.data.main.temp;
    let apiTemperature = Math.round(celsiusTemperature);
    let temperatureDisplay = document.querySelector("#current-temperature");
    temperatureDisplay.innerHTML = `${apiTemperature}`;
    // Get & display the parameters
    feelsTemperature = response.data.main.feels_like;
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    feels.innerHTML = `<i class="fas fa-info-circle"></i> Feels like: ${Math.round(feelsTemperature)}°`;
    humidity.innerHTML = `<i class="fas fa-umbrella"></i> Humidity: ${response.data.main.humidity}%`;
    wind.innerHTML = `<i class="fas fa-wind"></i> Wind: ${Math.round(response.data.wind.speed)}km/h`;
}

// When searching for a city, display the city name on the page after the user submits the form. Use axios to get the API datas related to this city.
function cityDisplay(event) {
    event.preventDefault();
    // Get the data
    cityInput = document.querySelector("#city-input");
    let cityName = document.querySelector("#city-name");
    cityName.innerHTML = `${cityInput.value}`;
    let apiUnit = "metric";
    let apiKey = "c3713b1bcebb5ce5f896fa8a7eec12ab";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${apiUnit}&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

// Form submission
let formSubmit = document.querySelector("form");
formSubmit.addEventListener("submit", cityDisplay);

// Add a Current Location button. 
// When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

function showGeolocation(response) {
    // Get and display the temperature
    celsiusTemperature = response.data.main.temp;
    let apiTemperature = Math.round(celsiusTemperature);
    let temperatureDisplay = document.querySelector("#current-temperature");
    temperatureDisplay.innerHTML = `${apiTemperature}`;
    // Get & display the location
    let cityName = document.querySelector("#city-name");
    cityName.innerHTML = `${response.data.name}`;
    // Get & display the parameters
    let feels = document.querySelector("#feels-like");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    feelsTemperature = response.data.main.feels_like;
    feels.innerHTML = `<i class="fas fa-info-circle"></i> Feels like: ${Math.round(feelsTemperature)}°`;
    humidity.innerHTML = `<i class="fas fa-umbrella"></i> Humidity: ${response.data.main.humidity}%`;
    wind.innerHTML = `<i class="fas fa-wind"></i> Wind: ${Math.round(response.data.wind.speed)}km/h`;
}

function geolocationData(event) {
    event.preventDefault();
    function getData(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let unit = "metric";
        let apiKey = "c3713b1bcebb5ce5f896fa8a7eec12ab";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
        axios.get(apiUrl).then(showGeolocation);
    }
    // Let's first get the temperature of the current position via getTemperature and then show it via showGeolocation
    navigator.geolocation.getCurrentPosition(getData);
}

// Geolocation Btn events
let geolocationBtn = document.querySelector("#geolocation-button");
geolocationBtn.addEventListener("click", geolocationData);

//  Temperature unit conversion: Celsius <-> Fahrenheit
let temperatureValue = document.querySelector("#current-temperature");
let feels = document.querySelector("#feels-like");
// Setting celsius as global variable to fix conversion bug
let celsiusTemperature = null;

let feelsTemperature = null;

// Celsius display
function displayCelsius(event) {
    event.preventDefault();
    fahrenheit.classList.remove("active");
    celsius.classList.add("active");
    temperatureValue.innerHTML = Math.round(celsiusTemperature);
}

// Fahrenheit display
function displayFahrenheit(event) {
    event.preventDefault();
    celsius.classList.remove("active");
    fahrenheit.classList.add("active");
    let fahrenheitValue = Math.round(celsiusTemperature * 9 / 5) + 32;
    temperatureValue.innerHTML = fahrenheitValue;
    feels.innerHTML = `<i class="fas fa-info-circle"></i> Feels like: ${Math.round((feelsTemperature * 9 / 5) + 32)}°`;
}

// Conversion click Events
let celsius = document.querySelector("#celsius-temperature");
celsius.addEventListener("click", displayCelsius);

let fahrenheit = document.querySelector("#fahrenheit-temperature");
fahrenheit.addEventListener("click", displayFahrenheit);