import React, { createContext, useContext, useState, useEffect } from "react";
import { getFormattedWeatherData } from "../weatherservice";

// Step 1: Create the Context
const WeatherContext = createContext();

// Step 2: Provide the Context
export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getFormattedWeatherData("CityName"); // You can set the city name here
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeatherData();
  }, []);

  return (
    <WeatherContext.Provider value={weatherData}>
      {children}
    </WeatherContext.Provider>
  );
};

// Step 3: Consume the Context
export const useWeather = () => useContext(WeatherContext);
