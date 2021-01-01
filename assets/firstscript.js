let weather = {
    "paris": {
        temp: 19.7,
        humidity: 80
    },
    "tokyo": {
        temp: 17.3,
        humidity: 50
    },
    "lisbon": {
        temp: 30.2,
        humidity: 20
    },
    "san francisco": {
        temp: 20.9,
        humidity: 100
    },
    "moscow": {
        temp: -5,
        humidity: 20
    }
};

let city = prompt("Enter a city, please");
city = city.trim();
city = city.toLowerCase();

// if (city === "paris") {
//     alert(`It is currently ${weather["paris"].temp} °C (${weather["paris"].temp + 32}°F) in ${city} with a humidity of ${weather["paris"].humidity} %.`);
// } else if (city === "tokyo") {
//     alert(`It is currently ${weather["tokyo"].temp} °C (${weather["tokyo"].temp + 32}°F) in ${city} with a humidity of ${weather["tokyo"].humidity} %.`);
// } else if (city === "lisbon") {
//     alert(`It is currently ${weather["lisbon"].temp} °C (${weather["lisbon"].temp + 32}°F) in ${city} with a humidity of ${weather["lisbon"].humidity} %.`);
// } else if (city === "san francisco") {
//     alert(`It is currently ${weather["san francisco"].temp} °C (${weather["san francisco"].temp + 32}°F) in ${city} with a humidity of ${weather["san francisco"].humidity} %.`);
// } else if (city === "moscow") {
//     alert(`It is currently ${weather["moscow"].temp} °C (${weather["moscow"].temp + 32}°F) in ${city} with a humidity of ${weather["moscow"].humidity} %.`);
// } else {
//     alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`);
// }

// Simplification du code

if (weather[city] !== undefined) {
    let temperature = weather[city].temp;
    let temperatureCelsius = Math.round(temperature);
    let temperatureFahrenheit = Math.round(temperatureCelsius * 9 / 5) + 32;
    let humidity = weather[city].humidity;
    alert(`It is currently ${temperatureCelsius} °C (${temperatureFahrenheit}°F) in ${city} with a humidity of ${humidity} %.`);
} else {
    alert(`Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`);
}
