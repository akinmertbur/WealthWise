import React from "react";
import "./GoalForm.css";

const GoalForm = ({
  goalName,
  setGoalName,
  targetAmount,
  setTargetAmount,
  currentAmount,
  setCurrentAmount,
  deadline,
  setDeadline,
  priorityLevel,
  setPriorityLevel,
  status,
  setStatus,
  edit,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
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
      {/* Priority Level Radio Buttons */}
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
      {/* Status Radio Buttons */}
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
      <button type="submit">{edit ? "Edit" : "Add"}</button>
    </form>
  );
};

export default GoalForm;
