import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = ({ user }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // Include session cookies in the request
      });
      if (response.ok) {
        navigate("/login"); // Redirect to the login page after logging out
      } else {
        setErrorMessage("Failed to log out. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during logout.");
    }
  };

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default HomePage;
