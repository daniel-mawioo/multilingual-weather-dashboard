import React, { useEffect, useState } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import hotBg from "./assets/hotBg.jpeg";
import coldBg from "./assets/cold.png";
import Descriptions from "./components/Descriptions";
import { getFormattedWeatherData } from "./weatherservice";

// Import translation files
import enMessages from "./languages/en.json";
import swMessages from "./languages/sw.json";
import ErrorModal from "./components/ErrorsModal";
import ToggleButton from "./components/Button";
import LanguageSelect from "./components/LanguageSelect";

function App() {
  const [city, setCity] = useState("nairobi");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(coldBg);
  const [locale, setLocale] = useState("en");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true); 
      try {
        const data = await getFormattedWeatherData(city, units);
        setWeather(data);

        // dynamic bg
        const thresHold = units === "metric" ? 20 : 60;
        if (data.temp <= thresHold) setBg(coldBg);
        else setBg(hotBg);
        setError(null); 
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
        setError(error.message);
        setWeather(null);
      } finally {
        setLoading(false); 
      }
    };
    fetchWeatherData();
  }, [setWeather, units, city]);


  const handleUnitsClick = () => {
    setUnits((prevUnits) => (prevUnits === "metric" ? "imperial" : "metric"));
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
  const reloadWindow = () => {
    window.location.reload();
  };

  const closeModal = () => {
    setError(null);
  };

  return (
    <IntlProvider locale={locale} messages={translations[locale]}>
      <div className="app" style={{ backgroundImage: `url(${bg})` }}>
        <div className="overlay">
          {error && (
            <ErrorModal
              errorMessage={error}
              onClose={closeModal}
              reload={reloadWindow}
            />
          )}
          {weather && (
            <div className="container">
              <div className="section section__inputs">
                <input
                  onKeyDown={enterKeyPressed}
                  type="text"
                  name="city"
                  placeholder="Enter your city...."
                />
                <ToggleButton
                  text={`${units === "metric" ? "°C" : "°F"}`}
                  onClick={handleUnitsClick}
                />

                <LanguageSelect
                  locale={locale}
                  onChange={handleLanguageChange}
                />
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
