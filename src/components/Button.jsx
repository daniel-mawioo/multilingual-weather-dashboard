// ToggleButton.js
import '../index.css'
import React from "react";

const ToggleButton = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
};

export default ToggleButton;
