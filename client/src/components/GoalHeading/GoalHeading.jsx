// src/components/GoalHeading/GoalHeading.jsx
import EditGoalButton from "../EditGoalButton.jsx";
import DeleteGoalButton from "../DeleteGoalButton.jsx";
import "./GoalHeading.css";
function GoalHeading({
  goalId,
  name,
  currentAmount,
  targetAmount,
  onEdit,
  onDelete,
}) {
  return (
    <div className="goal-heading">
      <p>
        <i>
          [{Math.round(currentAmount)}/{Math.round(targetAmount)}]
        </i>
      </p>
      <h3>{name}</h3>
      <EditGoalButton goalId={goalId} onEdit={onEdit} />
      <DeleteGoalButton goalId={goalId} onDelete={onDelete} />
    </div>
  );
}

export default GoalHeading;
