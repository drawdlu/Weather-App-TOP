async function getWeatherData(location, unit) {
  const key = "YE4X6AZZPRW5PHAXXZGU87VDJ";
  const url =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
    location +
    "?key=" +
    key +
    "&unitGroup=" +
    unit;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Response status: " + response.status);
  }

  return response.json();
}

export async function getRequiredWeatherData(locationName) {
  try {
    const [metric, us] = await Promise.all([
      getWeatherData(locationName, "metric"),
      getWeatherData(locationName, "us")
    ])

    return {
      metric: formatWeatherData(metric),
      us: formatWeatherData(us)
    };
  } catch (err) {
    alert("Location not found");
    throw err;
  }
}

function formatWeatherData(data) {
  const days = formatDailyData(data.days);

  return {
    address: data.address,
    timezone: data.timezone,
    days: days,
  };
}

function formatDailyData(days) {
  return days.map((day) => ({
    date: day.datetime,
    conditions: day.conditions,
    icon: day.icon,
    windspeed: day.windspeed,
    temp: day.temp,
    humidity: day.humidity,
    precipitation: day.precip,
  }));
}
