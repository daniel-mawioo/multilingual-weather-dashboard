import React, { useEffect, useState } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import hotBg from "./assets/hotBg.jpeg";
import coldBg from "./assets/cold.png";
import Descriptions from "./components/Descriptions";
import { getFormattedWeatherData } from "./weatherservice";
import { FaGlobe } from "react-icons/fa";


// Import your translation files
import enMessages from "./languages/en.json";
import swMessages from "./languages/sw.json";
import ErrorModal from "./components/ErrorsModal";

function App() {
  const [city, setCity] = useState("nairobi");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(coldBg);
  const [locale, setLocale] = useState("en");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getFormattedWeatherData(city, units);
        setWeather(data);

        // dynamic bg
        const thresHold = units === "metric" ? 20 : 60;
        console.log("get it...", data.temp); // Adjusted threshold for Fahrenheit
        if (data.temp <= thresHold) setBg(coldBg);
        else setBg(hotBg);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
        // Set error state to display error message in UI
        setError(error.message);
        setWeather(null); // Reset weather data if an error occurs
      }
    };
    fetchWeatherData();
  }, [setWeather, units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const handleLanguageChange = () => {
    setLocale(locale === "en" ? "sw" : "en");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  // Define translations object
  const translations = {
    en: enMessages,
    sw: swMessages,
  };

  const closeModal = () => {
    setError(null);
  };

  return (
    <IntlProvider locale={locale} messages={translations[locale]}>
      <div className="app" style={{ backgroundImage: `url(${bg})` }}>
        <div className="overlay">
          {error && <ErrorModal errorMessage={error} onClose={closeModal} />}
          {weather && (
            <div className="container">
              <div className="section section__inputs">
                <input
                  onKeyDown={enterKeyPressed}
                  type="text"
                  name="city"
                  placeholder="Enter your city...."
                />
                <button onClick={(e) => handleUnitsClick(e)}>°C</button>
                <button onClick={handleLanguageChange} className="lang--btn">
                  <FormattedMessage id="language_button_text" />
                  <FaGlobe className="lang-icon" />
                </button>
              </div>
              <div className="section section__temperature">
                <div className="icon">
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
                  <img
                    className="icon-img"
                    src={weather.iconURL}
                    alt="weatherIcon"
                  />
                  <h3>
                    <FormattedMessage
                      id="weather_description"
                      values={{ description: weather.description }}
                    />
                  </h3>
                </div>
                <div className="temperature">
                  <h1>
                    {`${weather.temp.toFixed()} °${
                      units === "metric" ? "C" : "F"
                    }`}
                  </h1>
                </div>
              </div>

              {/* botton description */}
              <Descriptions weather={weather} units={units} />
            </div>
          )}
        </div>
      </div>
    </IntlProvider>
  );
}

export default App;
