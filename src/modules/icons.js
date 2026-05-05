export function displayMainWeatherIcon(iconName) {
  import(`../images/icons/${iconName}.png`)
    .then((image) => {
      const iconSrc = image.default;

      const mainIcon = document.querySelector(".main-weather-data .icon img");
      mainIcon.src = iconSrc;
    })
    .catch((err) => {
      console.error("Icon could not be loaded: ", err);
    });
}
