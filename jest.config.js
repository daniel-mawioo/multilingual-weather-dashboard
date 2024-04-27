module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{html,js,jsx,css}"], // Corrected file extensions
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
};
