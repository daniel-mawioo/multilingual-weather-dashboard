import React from "react";

const ErrorModal = ({ errorMessage, onClose, reload }) => {
  const handleClose = () => {
    onClose();
    if (reload) {
      reload(); // Reload the page if reload function is provided
    }
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
