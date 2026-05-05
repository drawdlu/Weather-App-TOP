export const symbols = {
  metric: {
    degrees: "°C",
    speed: "km/h",
  },
  us: {
    degrees: "°F",
    speed: "mph",
  },
};

export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function getUnit() {
  const unitSelect = document.getElementById("unit-select");
  return unitSelect.value;
}

export function pageReloaded() {
  const entries = performance.getEntriesByType("navigation");

  if (entries.length > 0) {
    const navigationType = entries[0].type;

    if (navigationType === "reload") {
      return true;
    }
  }
}
