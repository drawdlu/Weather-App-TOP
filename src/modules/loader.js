import lottie from "lottie-web";
import animationData from "../lottie/weather-loading.json";

const container = document.getElementById("loader");
const main = document.querySelector("main");
const noDataDiv = document.querySelector(".no-data");

lottie.loadAnimation({
  container: container,
  renderer: "svg",
  loop: true,
  autoplay: true,
  animationData: animationData,
});

export function displayLoader() {
  main.style.display = "none";
  container.style.display = "block";
}

export function hideLoader() {
  main.style.display = "block";
  container.style.display = "none";
}

export function hideLoaderAndData() {
  main.style.display = "block";
  main.style.visibility = "hidden";
  container.style.display = "none";
}

export function displayNoData() {
  noDataDiv.style.display = "block";
}

export function hideNoData() {
  noDataDiv.style.display = "none";
}
