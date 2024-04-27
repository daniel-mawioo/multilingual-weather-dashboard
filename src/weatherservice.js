const API_KEY = "975e60a4fff6f2131e35f30f3742fa23";
const makeIconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormattedWeatherData = async (city, units = "metric") => {
  try {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const response = await fetch(URL);

    if (response.status === 404) {
      // Handle 404 error
      throw new Error(`City not found: ${city}`);
    }

    if (!response.ok) {
      // Handle other non-200 HTTP responses
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.cod && data.cod !== 200) {
      // Handle API error response
      throw new Error(`API error! Code: ${data.cod}, Message: ${data.message}`);
    }

    const {
      weather,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed },
      sys: { country },
      name,
    } = data;

    const { description, icon } = weather[0];

    return {
      description,
      iconURL: makeIconURL(icon),
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      speed,
      country,
      name,
    };
  } catch (error) {
    // Handle network errors or any other errors
    console.error(
      "Error fetching weather data:Check your internet connection",
      error.message
    );
    throw error; // Rethrow the error to be caught by the caller
  }
};

export { getFormattedWeatherData };
