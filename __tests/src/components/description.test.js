/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import Descriptions from "../../../src/components/Descriptions";

// Mocked weather data for testing
const mockWeatherData = {
  temp_min: 10,
  temp_max: 20,
  feels_like: 15,
  pressure: 1013,
  humidity: 70,
  speed: 5,
};

describe("Descriptions component", () => {
  it("renders without crashing", () => {
    render(<Descriptions weather={mockWeatherData} units="metric" />);
  });

  it("displays error message when weather data is not available", () => {
    const { getByText } = render(
      <Descriptions weather={null} units="metric" />
    );
    expect(getByText("Weather data not available")).toBeInTheDocument();
  });

  it("renders temperature cards correctly", () => {
    const { getByText } = render(
      <Descriptions weather={mockWeatherData} units="metric" />
    );
    expect(getByText("10 °C")).toBeInTheDocument(); // Min temperature
    expect(getByText("20 °C")).toBeInTheDocument(); // Max temperature
    expect(getByText("15 °C")).toBeInTheDocument(); // Feels like temperature
  });

  it("renders pressure card correctly", () => {
    const { getByText } = render(
      <Descriptions weather={mockWeatherData} units="metric" />
    );
    expect(getByText("1013 hPa")).toBeInTheDocument(); // Pressure
  });

  it("renders humidity card correctly", () => {
    const { getByText } = render(
      <Descriptions weather={mockWeatherData} units="metric" />
    );
    expect(getByText("70 %")).toBeInTheDocument(); // Humidity
  });

  it("renders wind speed card correctly", () => {
    const { getByText } = render(
      <Descriptions weather={mockWeatherData} units="metric" />
    );
    expect(getByText("5 m/s")).toBeInTheDocument(); // Wind speed
  });
});
