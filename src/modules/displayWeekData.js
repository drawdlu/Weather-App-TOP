import { format } from "date-fns/format"
import { getUnit, symbols } from "./helper";

export default function displayAdditionalDays(days) {
  const compilationDiv = document.querySelector(".compilation");
  const template = document.getElementById("weather-snippet");
  const unit = getUnit();

  for ( const day of days ) {
    addOneDaySnippet(day, compilationDiv, template, unit);
  }
}

function addOneDaySnippet(data, div, template, unit) {
  const snippetDiv = template.content.cloneNode(true);
  const tempSymbol = symbols[unit].degrees;

  addDayToSnippet(data.date, snippetDiv);
  addDateToSnippet(data.date, snippetDiv);
  addTempToSnippet(data.temp, snippetDiv, tempSymbol);


  div.append(snippetDiv);
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