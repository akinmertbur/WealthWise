// src/components/Footer/Footer.jsx
import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {year} WealthWise. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
