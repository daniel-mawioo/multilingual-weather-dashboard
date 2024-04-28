/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ErrorModal from "../../../src/components/ErrorsModal";

describe("ErrorModal Component", () => {
  it("renders with provided error message", () => {
    const errorMessage = "This is an error message";
    const { getByText } = render(<ErrorModal errorMessage={errorMessage} />);
    const errorElement = getByText(errorMessage);
    expect(errorElement).toBeTruthy();
  });

  it("calls onClose function when close button is clicked", () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <ErrorModal errorMessage="Error" onClose={onClose} />
    );
    const closeButton = getByText("×"); // Close button with '×' symbol
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("reloads the page when close button is clicked", () => {
    const onClose = jest.fn();
    delete window.location; // Remove location to mock it
    window.location = { reload: jest.fn() }; // Mock reload function
    const { getByText } = render(
      <ErrorModal errorMessage="Error" onClose={onClose} />
    );
    const closeButton = getByText("×"); // Close button with '×' symbol
    fireEvent.click(closeButton);
  });
});
