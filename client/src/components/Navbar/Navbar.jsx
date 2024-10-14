// src/components/Navbar/Navbar.jsx
import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get the state passed from the login page

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // Include session cookies in the request
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to the login page after logging out and pass the success message
        navigate("/login", { state: { successMessage: data.message } });
      } else {
      }
    } catch (error) {}
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-container">
            <img
              src={"../../../wealthWise.svg"}
              alt="WealthWise Logo"
              className="logo-img"
            />
            <h2>WealthWise</h2>
          </div>
        </Link>
        <div className="menu-icon" onClick={toggleNavbar}>
          <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={toggleNavbar}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/transaction"
              className="nav-links"
              onClick={toggleNavbar}
            >
              Transaction
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/goals" className="nav-links" onClick={toggleNavbar}>
              Goals
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/budget" className="nav-links" onClick={toggleNavbar}>
              Budget
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/report" className="nav-links" onClick={toggleNavbar}>
              Report
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-links" onClick={toggleNavbar}>
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="#"
              className="nav-links"
              onClick={(e) => {
                e.preventDefault(); // Prevent the default link action
                handleLogout();
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
