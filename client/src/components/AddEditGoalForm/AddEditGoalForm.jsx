import React, { useState, useEffect } from "react";
import GoalForm from "../GoalForm/GoalForm.jsx"; // Import the new form

const AddEditGoalForm = ({ goal, user, onSuccess, onError, edit }) => {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [deadline, setDeadline] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (edit && goal) {
      setGoalName(goal.goal_name || "");
      setTargetAmount(goal.target_amount || "");
      setCurrentAmount(goal.current_amount || "");
      setDeadline(
        goal.deadline ? new Date(goal.deadline).toISOString().split("T")[0] : ""
      );
      setPriorityLevel(goal.priority_level || "");
      setStatus(goal.status || "");
    }
  }, [edit, goal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = edit ? "/api/goal/edit" : "/api/goal/add";
      const method = edit ? "PUT" : "POST";
      const body = JSON.stringify({
        goalId: edit ? goal.goal_id : undefined,
        userId: user.id,
        goalName,
        targetAmount,
        currentAmount,
        deadline,
        priorityLevel,
        status,
      });

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(data.message);
      } else {
        onError(data.message);
      }
    } catch (err) {
      onError("An error occurred during goal submission. Please try again.");
    }
  };

  return (
    <GoalForm
      goalName={goalName}
      setGoalName={setGoalName}
      targetAmount={targetAmount}
      setTargetAmount={setTargetAmount}
      currentAmount={currentAmount}
      setCurrentAmount={setCurrentAmount}
      deadline={deadline}
      setDeadline={setDeadline}
      priorityLevel={priorityLevel}
      setPriorityLevel={setPriorityLevel}
      status={status}
      setStatus={setStatus}
      edit={edit}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddEditGoalForm;
