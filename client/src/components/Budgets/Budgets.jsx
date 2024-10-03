// src/components/Budgets/Budgets.jsx
import React, { useState, useEffect } from "react";
import BudgetProgress from "../../components/BudgetProgress/BudgetProgress";
import BudgetHeading from "../../components/BudgetHeading/BudgetHeading";
import "./Budgets.css";

function Budgets({
  month,
  year,
  user,
  onError,
  refetchBudgets,
  onEdit,
  onDelete,
  editable,
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

  // Fetch budgets when the component mounts or when userId, month, year and refetchBudgets change
  useEffect(() => {
    if (userId) {
      fetchBudgetsByPeriod();
    }
  }, [userId, month, year, refetchBudgets]);

  return (
    <>
      {!editable && (
        <>
          <h2 className="budget-head-msg">Planned Budgets</h2>
          <p className="budget-msg">Check your planned budgets</p>
        </>
      )}
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
              editable={editable}
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
