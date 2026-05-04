import { capitalize } from "./helper";
import { format } from 'date-fns/format';

const symbols = {
  metric: {
    degrees: "°C",
    speed: "km/h"
  }, 
  us: {
    degrees: "°F",
    speed: "mph"
  }
}

export default function displayWeather(dataRaw) {
  const data = dataRaw[getUnit()];

  displayDataHighlight(data);
  makeMainVisible();
}

function getUnit() {
  const unitSelect = document.getElementById("unit-select");
  return unitSelect.value;
}

function displayDataHighlight(data) {
  displayAddressAndTimezone(data.address, data.timezone);
  displayMainWeatherData(data.days[0], data.unit);
}

function displayMainWeatherData(day, unit) {
  displayTemp(day.temp, unit);
  displayDate(day.date);
  displayConditions(day.conditions);
  displayAdditionalWeatherData(day.precipitation, day.humidity, day.windspeed, unit);
}

function displayAdditionalWeatherData(precipitation, humidity, wind, unit) {
  const precipitationSpan = document.querySelector(".main-weather-data .precipitation span");
  const humiditySpan = document.querySelector(".main-weather-data .humidity span");
  const windSpan = document.querySelector(".main-weather-data .wind span");

  precipitationSpan.textContent = precipitation + "%";
  humiditySpan.textContent = humidity + "%";
  windSpan.textContent = wind + symbols[unit].speed;
}

function displayConditions (conditions) {
  const conditionsDiv = document.querySelector(".main-weather-data .conditions");
  conditionsDiv.textContent = conditions;
}

function displayDate(date) {
  const dateTime = new Date(date);
  const dateString = format(dateTime, "EEEE MMM d, y");
  const dateDiv = document.querySelector(".main-weather-data .date");
  dateDiv.textContent = dateString;
}

function displayTemp(temperature, unit) {
  const temp = document.querySelector(".main-weather-data .temp");
  temp.textContent = temperature + symbols[unit].degrees;
}

function displayAddressAndTimezone(address, timezone) {
  const addressSpan = document.querySelector(".main-location-data .address span");
  const timezoneSpan = document.querySelector(".main-location-data .timezone span");

  addressSpan.textContent = capitalize(address);
  timezoneSpan.textContent = timezone;
}

function makeMainVisible() {
  const main = document.querySelector("main");
  main.style.visibility = "visible";
}
