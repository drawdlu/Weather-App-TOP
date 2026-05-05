import { getWeatherInformation } from "./search";

export function displayLocalWeather() {
  getCountryName().then((value) => {
    getWeatherInformation(value.countryName);
  });
}

async function getCountryName() {
  const coordinates = await getLongLat();

  const url =
    "https://api.bigdatacloud.net/data/reverse-geocode-client?" +
    "latitude=" +
    coordinates.lat +
    "&longitude=" +
    coordinates.long +
    "&localityLanguage=en";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Response status: " + response.status);
  }

  return response.json();
}

function getLongLat() {
  return new Promise((result, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;

        result({ long: long, lat: lat });
      },
      (err) => {
        reject(err);
      },
    );
  });
}
