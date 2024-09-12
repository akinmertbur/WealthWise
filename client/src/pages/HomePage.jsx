import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SummaryCard from "../components/SummaryCard/SummaryCard";

const HomePage = ({ user }) => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savings, setSavings] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get the state passed from the login page

  useEffect(() => {
    // Fetch income, expenses, and savings data from an API or perform calculations
    const fetchFinancialSummary = async () => {
      try {
        const response = await fetch("/api/summary");
        const data = await response.json();
        if (response.ok) {
          setIncome(data.data.income); // Update income state
          setExpenses(data.data.expenses); // Update expenses state
          setSavings(data.data.savings); // Update savings state
        } else {
          setErrorMessage("Failed to display financial summary");
        }
      } catch (error) {
        console.error("Error fetching financial summary:", error);
      }
    };

    fetchFinancialSummary();
  }, []);

  useEffect(() => {
    // Check if there is a successMessage passed from the login page
    if (location.state && location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);
    }
  }, [location]);

  const handleLogout = async () => {
    // Clear previous messages
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // Include session cookies in the request
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        // Redirect to the login page after logging out and pass the success message
        navigate("/login", { state: { successMessage: data.message } });
      } else {
        setErrorMessage("Failed to log out. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during logout.");
    }
  };

  return (
    <div className="homepage">
      <SummaryCard income={income} expenses={expenses} savings={savings} />
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default HomePage;
