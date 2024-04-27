import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../../src/App";

// In your test file, mock the image imports
jest.mock("../../src/assets/hotBg.jpeg", () => "hotBg");
jest.mock("../../src/assets/cold.png", () => "coldBg");

// Mocking the getFormattedWeatherData function
jest.mock("../../src/weatherservice", () => ({
  getFormattedWeatherData: jest.fn(() =>
    Promise.resolve({
      name: "Nairobi",
      country: "KE",
      temp: 25,
      description: "Sunny",
      iconURL: "sunny.png",
    })
  ),
}));

describe("App component", () => {
  test("renders correctly", async () => {
    render(<App />);

    // Check if input field and buttons are rendered
    const cityInput = screen.getByPlaceholderText("Enter your city....");
    const celsiusButton = screen.getByText("°C");
    const languageButton = screen.getByText("Switch Language");

    expect(cityInput).toBeInTheDocument();
    expect(celsiusButton).toBeInTheDocument();
    expect(languageButton).toBeInTheDocument();

    // Wait for weather data to load
    await screen.findByText("Nairobi, KE");
  });

  test("changes temperature units when Celsius/Fahrenheit button is clicked", async () => {
    render(<App />);

    // Celsius button is initially displayed
    const celsiusButton = screen.getByText("°C");
    expect(celsiusButton).toBeInTheDocument();

    // Simulate clicking on the Celsius button
    fireEvent.click(celsiusButton);

    // Check if the button text changes to Fahrenheit
    const fahrenheitButton = screen.getByText("°F");
    expect(fahrenheitButton).toBeInTheDocument();
  });

  test("changes language when language button is clicked", async () => {
    render(<App />);

    // Language button is initially displayed
    const languageButton = screen.getByText("Switch Language");
    expect(languageButton).toBeInTheDocument();

    // Simulate clicking on the language button
    fireEvent.click(languageButton);

    // Check if the language button text changes
    expect(screen.getByText("Toggla Språk")).toBeInTheDocument();
  });

  test("displays error message when there is an error fetching weather data", async () => {
    // Mocking the getFormattedWeatherData function to throw an error
    jest.spyOn(console, "error").mockImplementation(() => {});
    require("./weatherservice").getFormattedWeatherData.mockRejectedValueOnce(
      new Error("Network error")
    );

    render(<App />);

    // Wait for error message to be displayed
    await screen.findByText("Network error");
  });
});
