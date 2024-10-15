// src/components/Logo/Logo.jsx
import React, { useState } from "react";
import "./Logo.css";

const Logo = function () {
  return (
    <div className="logo-cont">
      <img
        src={"../../../wealthWise.svg"}
        alt="WealthWise Logo"
        className="logo-image"
      />
      <h2>WealthWise</h2>
      <p> "Your Financial Advisor" </p>
    </div>
  );
};

export default Logo;
