import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import TransactionList from "../../components/TransactionList/TransactionList";
import GoalSummary from "../../components/GoalSummary/GoalSummary";
import ExpensesPieChart from "../../components/ExpensesPieChart/ExpensesPieChart";
import ExpensesIncomesBarChart from "../../components/ExpensesIncomesBarChart/ExpensesIncomesBarChart";
import "./HomePage.css";

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

  // Success handler
  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setErrorMessage(null);
  };

  // Error handler
  const handleError = (message) => {
    setErrorMessage(message);
    setSuccessMessage(null);
  };

  return (
    <div className="homepage">
      <button onClick={handleLogout}>Logout</button>
      <div className="success-error">
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
      <h2 className="welcome">Hello, {user.username}!</h2>
      <SummaryCard income={income} expenses={expenses} savings={savings} />
      {/* Pass the userId to the TransactionList component */}
      <TransactionList userId={user.id} edit={false} onError={handleError} />
      <GoalSummary
        userId={user.id}
        onSuccess={handleSuccess}
        onError={handleError}
      />
      <div className="summary-charts">
        <ExpensesPieChart />
        <ExpensesIncomesBarChart userId={user.id} onError={handleError} />
      </div>
    </div>
  );
};

export default HomePage;
