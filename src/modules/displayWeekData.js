import { format } from "date-fns/format";
import { getUnit, symbols } from "./helper";
import { savedData, updateHighlight } from "./displayData";
import { addIconToImg } from "./icons";

export function displayAdditionalDays(days) {
  const compilationDiv = document.querySelector(".compilation");
  compilationDiv.textContent = "";
  const template = document.getElementById("weather-snippet");
  const unit = getUnit();

  for (const day of days) {
    addOneDaySnippet(day, compilationDiv, template, unit);
  }
}

function addOneDaySnippet(data, div, template, unit) {
  const snippetDiv = template.content.cloneNode(true);
  const tempSymbol = symbols[unit].degrees;

  addDayToSnippet(data.date, snippetDiv);
  addDateToSnippet(data.date, snippetDiv);
  addTempToSnippet(data.temp, snippetDiv, tempSymbol);
  addIconToSnippet(data.icon, snippetDiv);

  div.append(snippetDiv);
  addDateDataToSnippet(data.date, div);
  addClickListener(div);
}

function addIconToSnippet(iconName, snippetDiv) {
  const snippetImg = snippetDiv.querySelector("img");

  addIconToImg(iconName, snippetImg);
}

function addClickListener(div) {
  const snippetDiv = div.lastElementChild;

  snippetDiv.addEventListener("click", updateHighlight);
  snippetDiv.addEventListener("click", () => {
    addActiveClass(snippetDiv);
  });
}

function addDateDataToSnippet(date, div) {
  div.lastElementChild.dataset.date = date;
}

function addDayToSnippet(date, snippetDiv) {
  const day = format(new Date(date), "E");
  const dayDiv = snippetDiv.querySelector(".day-name");

  dayDiv.textContent = day;
}

function addDateToSnippet(date, snippetDiv) {
  const day = format(new Date(date), "LLL d");
  const dateDiv = snippetDiv.querySelector(".day-date");

  dateDiv.textContent = day;
}

function addTempToSnippet(temp, snippetDiv, tempSymbol) {
  const tempDiv = snippetDiv.querySelector(".day-temp");

  tempDiv.textContent = temp + tempSymbol;
}

export function updateSnippetsTemps(unit) {
  const days = savedData[unit].days;
  const tempSymbol = symbols[unit].degrees;
  const snippetDivs = document.querySelectorAll(".day-weather-snippet");

  snippetDivs.forEach((div, index) => {
    const temp = days[index].temp;
    addTempToSnippet(temp, div, tempSymbol);
  });
}

let activeDiv = undefined;

export function addActiveClassToFirstDay() {
  const firstDayDiv = document.querySelector(
    ".compilation .day-weather-snippet:nth-child(1)",
  );

  addActiveClass(firstDayDiv);
}

function addActiveClass(div) {
  removeActiveFromLastActive();
  activeDiv = div;

  activeDiv.classList.add("active");
}

function removeActiveFromLastActive() {
  if (activeDiv) {
    activeDiv.classList.remove("active");
  }
}
