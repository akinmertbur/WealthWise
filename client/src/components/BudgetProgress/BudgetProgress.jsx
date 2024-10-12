// src/components/BudgetProgress/BudgetProgress.jsx
import React, { useState, useEffect } from "react";
import "./BudgetProgress.css";

const BudgetProgress = ({ plannedAmount, actualAmount }) => {
  const [progress, setProgress] = useState(0);

  // Calculate progress when targetAmount or currentAmount change
  useEffect(() => {
    const handleProgress = () => {
      // Ensure targetAmount and currentAmount are valid numbers
      const validPlanned = Number(plannedAmount) || 0;
      const validActual = Number(actualAmount) || 0;

      if (validPlanned === 0) {
        setProgress(0); // Prevent division by zero or NaN
      } else {
        const progressValue = (validActual / validPlanned) * 100;
        setProgress(progressValue);
      }
    };

    handleProgress();
  }, [plannedAmount, actualAmount]); // Re-calculate when targetAmount or currentAmount change
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${Math.min(progress, 100)}%`,
            backgroundColor: progress >= 80 && "red",
          }}
        >
          {Math.min(progress, 100).toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default BudgetProgress;
