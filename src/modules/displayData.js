import { capitalize, getUnit, symbols } from "./helper";
import { format } from "date-fns/format";
import {
  displayAdditionalDays,
  updateSnippetsTemps,
  addActiveClassToFirstDay,
} from "./displayWeekData";
import { addIconToImg } from "./icons";
import { hideLoader } from "./loader";

export let savedData = undefined;
let currentDisplayDay = undefined;

export function displayWeather(dataRaw) {
  savedData = dataRaw;
  const data = dataRaw[getUnit()];

  hideLoader();
  displayDataHighlight(data);
  displayAdditionalDays(data.days);
  addActiveClassToFirstDay();
  makeMainVisible();
}

function displayDataHighlight(data) {
  displayAddressAndTimezone(data.address, data.timezone);
  displayMainWeatherData(data.days[0], data.unit);
}

function displayMainWeatherData(day, unit) {
  currentDisplayDay = day;
  displayTemp(day.temp, unit);
  displayMainWeatherIcon(day.icon);
  displayDate(day.date);
  displayConditions(day.conditions);
  displayAdditionalWeatherData(
    day.precipitation,
    day.humidity,
    day.windspeed,
    unit,
  );
}

function displayMainWeatherIcon(iconName) {
  const mainIconImg = document.querySelector(".main-weather-data .icon img");

  addIconToImg(iconName, mainIconImg);
}

function getDayIndex(date, unit) {
  let index = 0;
  const days = savedData[unit].days;

  for (const day of days) {
    if (day.date === date) {
      break;
    } else {
      ++index;
    }
  }

  return index;
}

function displayAdditionalWeatherData(precipitation, humidity, wind, unit) {
  const precipitationSpan = document.querySelector(
    ".main-weather-data .precipitation span",
  );
  const humiditySpan = document.querySelector(
    ".main-weather-data .humidity span",
  );
  const windSpan = document.querySelector(".main-weather-data .wind span");

  precipitationSpan.textContent = precipitation + "%";
  humiditySpan.textContent = humidity + "%";
  windSpan.textContent = wind + symbols[unit].speed;
}

function displayConditions(conditions) {
  const conditionsDiv = document.querySelector(
    ".main-weather-data .conditions",
  );
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
  const addressSpan = document.querySelector(
    ".main-location-data .address span",
  );
  const timezoneSpan = document.querySelector(
    ".main-location-data .timezone span",
  );

  addressSpan.textContent = capitalize(address);
  timezoneSpan.textContent = timezone;
}

function makeMainVisible() {
  const main = document.querySelector("main");
  main.style.visibility = "visible";
}

export function listenToUnitChange() {
  const unitSelect = document.getElementById("unit-select");

  unitSelect.addEventListener("change", updatePageData);
}

function updatePageData() {
  if (savedData) {
    const unit = getUnit();
    const day = getDayDataFromDate(currentDisplayDay.date, unit);

    displayTemp(day.temp, unit);
    displayAdditionalWeatherData(
      day.precipitation,
      day.humidity,
      day.windspeed,
      unit,
    );
    updateSnippetsTemps(unit);
  }
}

function getDayDataFromDate(date, unit) {
  const dayIndex = getDayIndex(date, unit);

  return savedData[unit].days[dayIndex];
}

export function updateHighlight(event) {
  const snippetDiv = event.target.closest(".day-weather-snippet");
  const date = snippetDiv.dataset.date;
  const unit = getUnit();
  const day = getDayDataFromDate(date, unit);

  displayMainWeatherData(day, unit);
}
