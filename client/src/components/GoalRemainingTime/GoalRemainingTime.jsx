// src/components/GoalRemainingTime/GoalRemainingTime.jsx
import "./GoalRemainingTime.css";

function GoalRemainingTime({ deadline }) {
  return (
    <p
      className="remaining-time"
      style={{
        color: (() => {
          const daysLeft = Math.ceil(
            (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
          );
          return daysLeft >= 0 ? "green" : "red";
        })(),
      }}
    >
      {(() => {
        const daysLeft = Math.ceil(
          (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
        );
        return daysLeft >= 0
          ? `${daysLeft} days left`
          : `${Math.abs(daysLeft)} days passed`;
      })()}
    </p>
  );
}

export default GoalRemainingTime;
