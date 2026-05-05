import "./styles.css";
import { listenToSearch, clearInputOnReload } from "./modules/search";
import { listenToUnitChange } from "./modules/displayData";

clearInputOnReload();
listenToSearch();
listenToUnitChange();



