// src/components/Budgets/Budgets.jsx
import React, { useState, useEffect } from "react";
import BudgetProgress from "../../components/BudgetProgress/BudgetProgress";
import BudgetHeading from "../../components/BudgetHeading/BudgetHeading";

function Budgets({
  month,
  year,
  user,
  onError,
  refetchBudgets,
  onEdit,
  onDelete,
}) {
  const userId = user.id;
  const [budgets, setBudgets] = useState([]);

  // Fetch budgets function
  const fetchBudgetsByPeriod = async () => {
    try {
      const response = await fetch("/api/budget/getAllByPeriod", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, month, year }), // Sending the userId, month, year in the request body
      });

      const data = await response.json();

      if (response.ok) {
        setBudgets(data.result); // Store the goals in state
      } else {
        onError("Failed to load goals");
      }
    } catch (error) {
      onError("An error occurred while fetching goals.");
    }
  };

  // Fetch budgets when the component mounts or when userId and refetchBudgets change
  useEffect(() => {
    if (userId) {
      fetchBudgetsByPeriod();
    }
  }, [userId, refetchBudgets]);

  return (
    <>
      {/* Display the budgets with progress bar*/}
      {budgets.length > 0 ? (
        budgets.map((budget) => (
          <div key={budget.budget_id} className="budget">
            <BudgetHeading
              budgetId={budget.budget_id}
              budgetPeriod={`[${month}/${year}]`}
              categoryId={budget.category_id}
              onError={onError}
              onEdit={onEdit}
              onDelete={onDelete}
            />
            <div className="budget-detail">
              <BudgetProgress
                plannedAmount={budget.planned_amount}
                actualAmount={budget.actual_amount}
              />
            </div>
          </div>
        ))
      ) : (
        <p>No budgets found.</p>
      )}
    </>
  );
}

export default Budgets;
