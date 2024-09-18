import React, { useState, useEffect } from "react";
import "./AddEditGoalForm.css";

const AddEditGoalForm = ({ user, onSuccess, onError }) => {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [deadline, setDeadline] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [status, setStatus] = useState("");

  const handleAddGoal = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/goal/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          goalName,
          targetAmount,
          currentAmount,
          deadline,
          priorityLevel,
          status,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(data.message); // Notify parent of success
      } else {
        onError(data.message); // Notify parent of error
      }
    } catch (err) {
      onError("An error occurred during goal submission. Please try again.");
    }
  };

  return (
    <form onSubmit={handleAddGoal}>
      <div>
        <label htmlFor="goalName">Goal Name:</label>
        <input
          id="goalName"
          type="text"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="targetAmount">Target Amount:</label>
        <input
          id="targetAmount"
          type="number"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          min="0"
          step="0.01"
          required
        />
      </div>
      <div>
        <label htmlFor="currentAmount">Current Amount:</label>
        <input
          id="currentAmount"
          type="number"
          value={currentAmount}
          onChange={(e) => setCurrentAmount(e.target.value)}
          min="0"
          step="0.01"
          required
        />
      </div>
      <div>
        <label htmlFor="deadline">Deadline:</label>
        <input
          id="deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Priority Level:</label>
        <div>
          <input
            type="radio"
            id="low"
            name="priorityLevel"
            value="low"
            checked={priorityLevel === "low"}
            onChange={(e) => setPriorityLevel(e.target.value)}
            required
          />
          <label htmlFor="low">Low</label>
        </div>
        <div>
          <input
            type="radio"
            id="medium"
            name="priorityLevel"
            value="medium"
            checked={priorityLevel === "medium"}
            onChange={(e) => setPriorityLevel(e.target.value)}
            required
          />
          <label htmlFor="medium">Medium</label>
        </div>
        <div>
          <input
            type="radio"
            id="high"
            name="priorityLevel"
            value="high"
            checked={priorityLevel === "high"}
            onChange={(e) => setPriorityLevel(e.target.value)}
            required
          />
          <label htmlFor="high">High</label>
        </div>
      </div>
      <div>
        <label>Status:</label>
        <div>
          <input
            type="radio"
            id="in-progress"
            name="status"
            value="in-progress"
            checked={status === "in-progress"}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
          <label htmlFor="in-progress">In progress</label>
        </div>
        <div>
          <input
            type="radio"
            id="completed"
            name="status"
            value="completed"
            checked={status === "completed"}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
          <label htmlFor="completed">Completed</label>
        </div>
        <div>
          <input
            type="radio"
            id="failed"
            name="status"
            value="failed"
            checked={status === "failed"}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
          <label htmlFor="failed">Failed</label>
        </div>
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddEditGoalForm;
