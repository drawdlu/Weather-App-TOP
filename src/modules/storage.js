import { displayWeather } from "./displayData";
import { displayLocalWeather } from "./geolocation";
import { displayLoader } from "./loader";
import { pageReloaded } from "./helper";

export function saveWeatherData(data) {
  localStorage.setItem("weatherData", JSON.stringify(data));
}

export function loadWeatherData() {
  const weatherData = localStorage.getItem("weatherData");

  if ( pageReloaded() && weatherData ) {
    displayWeather(JSON.parse(weatherData));
  } else if (navigator.geolocation) {
    displayLoader();
    displayLocalWeather();
  }
}