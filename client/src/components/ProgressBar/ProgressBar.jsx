import React, { useState, useEffect } from "react";
import "./ProgressBar.css";

const ProgressBar = ({ targetAmount, currentAmount, onError }) => {
  const [progress, setProgress] = useState(0);

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

  return (
    <div className="progress-bar">
      <div
        className="progress"
        style={{ width: `${Math.min(progress, 100)}%` }}
      >
        {Math.min(progress, 100).toFixed(2)}%
      </div>
    </div>
  );
};

export default ProgressBar;
