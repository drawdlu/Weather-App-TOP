import getWeatherData from "./weather";
import { displayWeather } from "./displayData";
import { displayLoader, hideLoaderAndData, displayNoData, hideNoData } from "./loader";
import { saveWeatherData } from "./storage";

function getWeatherInformation(event) {
  displayLoader();
  hideNoData();
  event.preventDefault();
  const locationInput = document.getElementById("location");
  const location = locationInput.value;

  getWeatherData(location)
    .then((data) => {
      saveWeatherData(data);
      displayWeather(data);
    })
    .catch((err) => {
      hideLoaderAndData();
      displayNoData();
      console.error(err.message);
    });
}

export function listenToSearch() {
  const searchButton = document.getElementById("search");
  searchButton.addEventListener("click", getWeatherInformation);
}

export function clearInputOnReload() {
  const entries = performance.getEntriesByType('navigation');

  if (entries.length > 0) {
      const navigationType = entries[0].type;

      if (navigationType === 'reload') {
          clearSearchInput();
      }
  }
}

function clearSearchInput() {
  const inputNode = document.querySelector("header form #location");
  inputNode.value = "";
}