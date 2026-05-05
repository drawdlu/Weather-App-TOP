import getWeatherData from "./weather";
import { displayWeather } from "./displayData";
import { displayLoader, hideLoaderAndData, displayNoData, hideNoData } from "./loader";

function getWeatherInformation(event) {
  displayLoader();
  hideNoData();
  event.preventDefault();
  const locationInput = document.getElementById("location");
  const location = locationInput.value;

  getWeatherData(location)
    .then((data) => {
      displayWeather(data);
    })
    .catch((err) => {
      hideLoaderAndData();
      displayNoData();
      console.error(err.message);
    });
}

export default function listenToSearch() {
  const searchButton = document.getElementById("search");
  searchButton.addEventListener("click", getWeatherInformation);
}
