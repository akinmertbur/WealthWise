// src/components/GoalSummary/GoalSummary.jsx
import React, { useState, useEffect } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import GoalRemainingTime from "../GoalRemainingTime/GoalRemainingTime";
import "./GoalSummary.css";

function GoalSummary({ userId, onSuccess, onError }) {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
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
          onError("Failed to load goals");
        }
      } catch (error) {
        onError("An error occurred while fetching goals.");
      }
    };

    if (userId) {
      fetchGoals();
    }
  }, [userId]);
  return (
    <div className="goal-summary">
      <h2>Future Goals</h2>
      <p className="goal-msg">Check your future goals</p>
      {/* Display the goals with progress bar*/}
      {goals.length > 0 ? (
        goals.map((goal) =>
          Math.ceil(
            (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24) > 0
          ) ? (
            <div key={goal.goal_id} className="goal-sum">
              <div className="goal-head">
                <h3>{goal.goal_name}</h3>
                <GoalRemainingTime
                  className="goal-remaining"
                  deadline={goal.deadline}
                />
              </div>
              <div className="goal-detail">
                <ProgressBar
                  goalId={goal.goal_id}
                  targetAmount={goal.target_amount}
                  currentAmount={goal.current_amount}
                  isSettable={false}
                  onSuccess={onSuccess}
                  onError={onError}
                />
              </div>
            </div>
          ) : null
        )
      ) : (
        <p>No goals found.</p>
      )}
    </div>
  );
}

export default GoalSummary;
