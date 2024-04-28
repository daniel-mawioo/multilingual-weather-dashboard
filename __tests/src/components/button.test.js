// button.test.js

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import ToggleButton from "../../../src/components/Button.jsx"; // Adjust path as needed

describe("ToggleButton Component", () => {
  it("renders correctly with given text", () => {
    render(<ToggleButton text="Click me" />);
    expect(screen.getByText("Click me")).toBeTruthy(); // Using screen.getByText with basic matcher
  });

  it("calls onClick handler when button is clicked", () => {
    const onClickMock = jest.fn();
    render(<ToggleButton text="Click me" onClick={onClickMock} />);
    const button = screen.getByText("Click me"); // Using screen.getByText
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
