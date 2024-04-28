// Descriptions.test.js

import React from "react";
import { render, screen } from "@testing-library/react";
import Descriptions from "../../../src/components/Descriptions.jsx";
import { IntlProvider } from "react-intl"; // Import IntlProvider

describe("Descriptions Component", () => {
  it("renders without crashing", () => {
    render(
      <IntlProvider locale="en">
        <Descriptions />
      </IntlProvider>
    );
  });

  it("displays error message when weather data is not available", () => {
    render(
      <IntlProvider locale="en">
        <Descriptions />
      </IntlProvider>
    );
    const errorMessage = screen.getByText("Weather data not available");
    expect(errorMessage).toBeTruthy();
  });

  it("displays temperature descriptions correctly", () => {
    const weatherData = {
      temp_min: 10,
      temp_max: 20,
      feels_like: 15,
      pressure: 1000,
      humidity: 70,
      speed: 5,
    };
  });

  it("displays default values for undefined weather data", () => {
    render(
      <IntlProvider locale="en">
        <Descriptions />
      </IntlProvider>
    );
  });

  it("applies loaded class when data is loaded", () => {
    const weatherData = {
      temp_min: 10,
      temp_max: 20,
      feels_like: 15,
      pressure: 1000,
      humidity: 70,
      speed: 5,
    };
  });

  it("does not apply loaded class when data is not loaded", () => {
    render(
      <IntlProvider locale="en">
        <Descriptions />
      </IntlProvider>
    );
    const sectionElement = screen.queryByTestId("descriptions-section");

    // expect(sectionElement).not.toHaveClass("loaded");
  });
});
