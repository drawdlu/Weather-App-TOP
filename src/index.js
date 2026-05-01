import { getWeatherData } from "./modules/weather";

getWeatherData('spain').then( response => { console.log(response)})