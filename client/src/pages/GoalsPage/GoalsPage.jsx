// src/Pages/GoalsPage/GoalsPage.jsx
import React, { useState, useEffect } from "react";
import ProgressBar from "../../components/ProgressBar/ProgressBar.jsx";
import Modal from "../../components/Modal/Modal";
import AddEditGoalForm from "../../components/AddEditGoalForm/AddEditGoalForm.jsx";
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
            <div className="goal-heading">
              <h3>{goal.goal_name}</h3>
              <button
                onClick={() => handleEdit(goal.goal_id)}
                className="edit-button edit-delete-goal-button"
              >
                <svg
                  fill="#000000"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="17px"
                  height="17px"
                  viewBox="0 0 528.899 528.899"
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
		c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
		C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
		L27.473,390.597L0.3,512.69z"
                    />
                  </g>
                </svg>
              </button>

              <button
                onClick={() => handleDelete(goal.goal_id)}
                className="edit-button edit-delete-goal-button"
              >
                <svg
                  width="17px"
                  height="17px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#000000"
                    d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"
                  />
                </svg>
              </button>
            </div>
            <div className="goal-detail">
              <ProgressBar
                goalId={goal.goal_id}
                targetAmount={goal.target_amount}
                currentAmount={goal.current_amount}
                onSuccess={handleSuccess}
                onError={handleError}
              />
            </div>
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
