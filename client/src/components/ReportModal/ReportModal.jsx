// src/components/ReportModal/ReportModal.jsx
import React from "react";
import "./ReportModal.css";

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="mdl-overlay">
      <div className="mdl-content">
        <button className="cls-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
