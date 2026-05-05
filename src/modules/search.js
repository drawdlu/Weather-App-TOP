import getWeatherData from "./weather";
import { displayWeather } from "./displayData";
import { displayLoader, hideLoaderAndData, displayNoData, hideNoData } from "./loader";
import { saveWeatherData } from "./storage";
import { pageReloaded } from "./helper";

function getWeatherFromInput(event) {
  event.preventDefault();
  const locationInput = document.getElementById("location");
  getWeatherInformation(locationInput.value);
}

export function getWeatherInformation(location) {
  displayLoader();
  hideNoData();

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
  searchButton.addEventListener("click", getWeatherFromInput);
}

export function clearInputOnReload() {
  if (pageReloaded()) {
    clearSearchInput();
  }
}

function clearSearchInput() {
  const inputNode = document.querySelector("header form #location");
  inputNode.value = "";
}