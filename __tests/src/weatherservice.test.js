import { getFormattedWeatherData } from "../../src/weatherservice";

// Mocking fetch globally
global.fetch = require("jest-fetch-mock");

const mockWeatherData = {
  weather: [{ description: "Clear", icon: "01d" }],
  main: {
    temp: 25,
    feels_like: 26,
    temp_min: 23,
    temp_max: 28,
    pressure: 1013,
    humidity: 50,
  },
  wind: { speed: 5 },
  sys: { country: "US" },
  name: "New York",
};

describe("getFormattedWeatherData", () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  test("fetches weather data for a city successfully", async () => {
    fetch.mockResponseOnce(JSON.stringify(mockWeatherData));

    const data = await getFormattedWeatherData("New York");

    expect(data.description).toBe("Clear");
    expect(data.temp).toBe(25);
    expect(data.feels_like).toBe(26);
    expect(data.temp_min).toBe(23);
    expect(data.temp_max).toBe(28);
    expect(data.pressure).toBe(1013);
    expect(data.humidity).toBe(50);
    expect(data.speed).toBe(5);
    expect(data.country).toBe("US");
    expect(data.name).toBe("New York");
  });

  test("throws an error when city is not found", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ cod: "404", message: "City not found" }),
      { status: 404 }
    );

    await expect(getFormattedWeatherData("UnknownCity")).rejects.toThrow(
      "City not found"
    );
  });

  test("throws an error for other non-200 HTTP responses", async () => {
    fetch.mockResponseOnce("", { status: 500 });

    await expect(getFormattedWeatherData("New York")).rejects.toThrow(
      "HTTP error! Status: 500"
    );
  });

  test("throws an error for API error response", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ cod: "401", message: "Invalid API key" })
    );

    await expect(getFormattedWeatherData("New York")).rejects.toThrow(
      "API error! Code: 401, Message: Invalid API key"
    );
  });

  test("throws an error for network errors", async () => {
    fetch.mockReject(new Error("Network error"));

    await expect(getFormattedWeatherData("New York")).rejects.toThrow(
      "Network error"
    );
  });
});
