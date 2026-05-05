import "./styles.css";
import { listenToSearch, clearInputOnReload } from "./modules/search";
import { listenToUnitChange } from "./modules/displayData";
import { loadWeatherData } from "./modules/storage";

clearInputOnReload();
loadWeatherData();
listenToSearch();
listenToUnitChange();



