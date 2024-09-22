import React, { useState, useEffect } from "react";
import "./ProgressBar.css";

const ProgressBar = ({
  goalId,
  targetAmount,
  currentAmount,
  isSettable,
  onSuccess,
  onError,
}) => {
  const [progress, setProgress] = useState(0);
  const [newCurrentAmount, setNewCurrentAmount] = useState("");

  // Calculate progress when targetAmount or currentAmount change
  useEffect(() => {
    const handleProgress = () => {
      // Ensure targetAmount and currentAmount are valid numbers
      const validTarget = Number(targetAmount) || 0;
      const validCurrent = Number(currentAmount) || 0;

      if (validTarget === 0) {
        setProgress(0); // Prevent division by zero or NaN
      } else {
        const progressValue = (validCurrent / validTarget) * 100;
        setProgress(progressValue);
      }
    };

    handleProgress();
  }, [targetAmount, currentAmount]); // Re-calculate when targetAmount or currentAmount change

  const handleEditCurrentAmount = async (newCurrentAmount) => {
    try {
      const response = await fetch("/api/goal/editCurrentAmount", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goalId, currentAmount: newCurrentAmount }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(`Current Amount of the goal is edited successfully!`);
        setNewCurrentAmount("");
      } else {
        onError(data.message);
      }
    } catch (err) {
      onError(
        "An error occurred while editing the current amount of the goal."
      );
    }
  };

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${Math.min(progress, 100)}%` }}
        >
          {Math.min(progress, 100).toFixed(2)}%
        </div>
      </div>
      {isSettable && (
        <>
          <div className="current-amount">
            <input
              id={"setCurrentAmount" + goalId}
              type="number"
              value={newCurrentAmount}
              onChange={(e) => setNewCurrentAmount(e.target.value)}
              placeholder="Set Current Amount"
              required
            />
          </div>
          <div>
            <button
              className="edit-amount-btn"
              onClick={() => handleEditCurrentAmount(newCurrentAmount)}
            >
              Set
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProgressBar;
