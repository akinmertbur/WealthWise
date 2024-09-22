// src/Pages/GoalsPage/GoalsPage.jsx
import React, { useState, useEffect } from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import Modal from "../../components/Modal/Modal";
import AddEditGoalForm from "../../components/AddEditGoalForm/AddEditGoalForm.jsx";
import GoalHeading from "../../components/GoalHeading/GoalHeading.jsx";
import GoalRemainingTime from "../../components/GoalRemainingTime/GoalRemainingTime.jsx";
import "./GoalsPage.css";

function GoalsPage({ user }) {
  const userId = user.id;
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [goal, setGoal] = useState(null);
  const [addEdit, setAddEdit] = useState(false);

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
    if (showModal) {
      setShowModal(false); // Close the modal on success
    }
    fetchGoals(); // Re-fetch goals immediately after success
  };

  // Error handler
  const handleError = (message) => {
    setErrorMessage(message);
    setSuccessMessage(null);
  };

  // Edit handler: when edit button is clicked,
  // the goal is retrieved and the model is opened.
  const handleEdit = async (goalId) => {
    try {
      const response = await fetch("/api/goal/getGoal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goalId }),
      });

      const data = await response.json();

      if (response.ok) {
        setGoal(data.result); // Store the goal in state
        if (!addEdit) {
          setAddEdit(true);
        }

        setShowModal(true); // Open the edit modal
      } else {
        handleError(data.message);
      }
    } catch (err) {
      handleError("An error occurred while fetching the goal.");
    }
  };

  const handleDelete = async (goalId) => {
    try {
      const response = await fetch("/api/goal/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goalId }),
      });

      const data = await response.json();

      if (response.ok) {
        handleSuccess(data.message);
      } else {
        handleError(data.message);
      }
    } catch (err) {
      handleError("An error occurred while deleting the goal.");
    }
  };

  return (
    <div className="App">
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <button
        className="add-goal-button"
        onClick={() => {
          if (goal) {
            setGoal(null);
          }

          if (addEdit) {
            setAddEdit(false);
          }

          setShowModal(true);
        }}
      >
        Add Goal
      </button>

      {/* Display the goals with progress bar*/}
      {goals.length > 0 ? (
        goals.map((goal) => (
          <div key={goal.goal_id} className="goal">
            <GoalHeading
              goalId={goal.goal_id}
              name={goal.goal_name}
              currentAmount={goal.current_amount}
              targetAmount={goal.target_amount}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <div className="goal-detail">
              <ProgressBar
                goalId={goal.goal_id}
                targetAmount={goal.target_amount}
                currentAmount={goal.current_amount}
                onSuccess={handleSuccess}
                onError={handleError}
              />
            </div>
            <GoalRemainingTime deadline={goal.deadline} />
          </div>
        ))
      ) : (
        <p>No goals found.</p>
      )}

      {/* Modal for adding/editing goal
          Adding or editing determined based on 'edit' prop */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <AddEditGoalForm
          goal={goal}
          user={user}
          onSuccess={handleSuccess}
          onError={handleError}
          edit={addEdit}
        />
      </Modal>
    </div>
  );
}

export default GoalsPage;
