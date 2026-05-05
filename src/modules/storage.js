import { displayWeather } from "./displayData";

export function saveWeatherData(data) {
  localStorage.setItem("weatherData", JSON.stringify(data));
}

export function loadWeatherData() {
  const weatherData = localStorage.getItem("weatherData");

  if ( weatherData ) {
    displayWeather(JSON.parse(weatherData));
  }
}