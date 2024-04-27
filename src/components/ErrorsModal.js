import React from "react";
import "../index.css";

const ErrorModal = ({ errorMessage, onClose }) => {
  const handleClose = () => {
    onClose();
    window.location.reload(); // Reload the page
  };

  return (
    <div className="error-modal-overlay">
      <div className="error-modal">
        <span className="close-btn" onClick={handleClose}>
          &times;
        </span>
        <p className="error-message">{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorModal;
