// src/Pages/GoalsPage/GoalsPage.jsx
import React, { useState, useEffect } from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import Modal from "../../components/Modal/Modal";
import AddEditGoalForm from "../../components/AddEditGoalForm/AddEditGoalForm.jsx";

function GoalsPage({ user }) {
  const userId = user.id;
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Fetch goals function
  const fetchGoals = async () => {
    try {
      const response = await fetch("/api/goal/getAll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // Sending the userId in the request body
      });

      const data = await response.json();

      if (response.ok) {
        setGoals(data.result); // Store the goals in state
      } else {
        handleError("Failed to load goals");
      }
    } catch (error) {
      handleError("An error occurred while fetching goals.");
    }
  };

  // Fetch goals when the component mounts or when userId changes
  useEffect(() => {
    if (userId) {
      fetchGoals();
    }
  }, [userId]);

  // Success handler
  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setErrorMessage(null);
    setShowModal(false); // Close the modal on success
    fetchGoals(); // Re-fetch goals immediately after success
  };

  // Error handler
  const handleError = (message) => {
    setErrorMessage(message);
    setSuccessMessage(null);
  };

  return (
    <div className="App">
      <h1>Financial Goal Tracker</h1>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <button className="add-goal-button" onClick={() => setShowModal(true)}>
        Add Goal
      </button>

      {goals.length > 0 ? (
        goals.map((goal) => (
          <div key={goal.goal_id}>
            <h3>{goal.goal_name}</h3>
            <ProgressBar
              targetAmount={goal.target_amount}
              currentAmount={goal.current_amount} // Fixed typo
              onError={handleError}
            />
          </div>
        ))
      ) : (
        <p>No goals found.</p>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <AddEditGoalForm
          user={user}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </Modal>

      {/* <input
        type="number"
        value={progress}
        onChange={handleInputChange}
        max="100"
        min="0"
      /> */}
    </div>
  );
}

export default GoalsPage;
