export async function getWeatherData(location) {
  const key = "YE4X6AZZPRW5PHAXXZGU87VDJ";
  const url =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
    location +
    "?key=" +
    key;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error ('Response status: ' + response.status);
    }

    return response.json();
  } catch(err) {
    console.error(err.message);
  }
}


