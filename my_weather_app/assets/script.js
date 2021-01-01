// Feature #1 - Display the current date and time
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
currentDay.innerHTML = days[now.getDay()];

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

// Feature #2 - Using API: When a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.

// Display the current temperature of the city, via the API.
function showTemperature(response) {
    let apiTemperature = Math.round(response.data.main.temp);
    let temperatureDisplay = document.querySelector("#current-temperature");
    temperatureDisplay.innerHTML = `${apiTemperature}`;
}

// When searching for a city, display the city name on the page after the user submits the form. Use axios to get the API datas related to this city.
function cityDisplay(event) {
    event.preventDefault();
    // Get the data
    let cityInput = document.querySelector("#city-input");
    let cityName = document.querySelector("#city-name");
    cityName.innerHTML = `${cityInput.value}`;
    let apiUnit = "metric";
    let apiKey = "c3713b1bcebb5ce5f896fa8a7eec12ab";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=${apiUnit}&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
}

// Form submission
let formSubmit = document.querySelector("form");
formSubmit.addEventListener("submit", cityDisplay);

// Add a Current Location button. 
// When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

function showGeolocation(response) {
    // Get and display the temperature
    let apiTemperature = Math.round(response.data.main.temp);
    let temperatureDisplay = document.querySelector("#current-temperature");
    temperatureDisplay.innerHTML = `${apiTemperature}`;
    // Get & display the location
    let cityName = document.querySelector("#city-name");
    cityName.innerHTML = `${response.data.name}`;
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

// Geolocation Btn 
let geolocationBtn = document.querySelector("#geolocation-button");
geolocationBtn.addEventListener("click", geolocationData);

