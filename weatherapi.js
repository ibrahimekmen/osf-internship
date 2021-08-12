const https = require('https');
const fetch = require("node-fetch");

let cityName = process.argv[2];

function wQuery(cityName){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=fdd808cb28881dd4a3214e1eb2c819c1`)
    .then(response => response.json())
    .then(data => console.log("Weather is " + data.weather[0].description + ". The temperature is " + Math.round((data.main.temp-270) * 10)/10));
}

wQuery(cityName);






