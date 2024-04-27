// WeatherContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { getFormattedWeatherData } from "../weatherservice";

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getFormattedWeatherData(); // Call your API or fetch data from context here
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeatherData();

    return () => {
      // Cleanup function
    };
  }, []);

  return (
    <WeatherContext.Provider value={{ weatherData, loading }}>
      {children}
    </WeatherContext.Provider>
  );
};
