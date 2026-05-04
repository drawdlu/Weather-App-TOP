import getWeatherData from "./weather";
import displayWeather from "./displayData";

function getWeatherInformation(event) {
  event.preventDefault();
  const locationInput = document.getElementById("location");
  const location = locationInput.value;

  getWeatherData(location)
    .then((data) => {
      displayWeather(data);
    })
    .catch((err) => {
      alert("Location not found");
      console.error(err.message);
    });
}

export default function listenToSearch() {
  const searchButton = document.getElementById("search");
  searchButton.addEventListener("click", getWeatherInformation);
}
