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
