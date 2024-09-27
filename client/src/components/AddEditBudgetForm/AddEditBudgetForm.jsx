// src/components/AddEditBudgetForm/AddEditBudgetForm.jsx
import React, { useState, useEffect } from "react";
import BudgetForm from "../BudgetForm/BudgetForm.jsx"; // Import the new form

const AddEditBudgetForm = ({ budget, user, onSuccess, onError, edit }) => {
  const [categoryId, setCategoryId] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [plannedAmount, setPlannedAmount] = useState("");
  // const [actualAmount, setActualAmount] = useState("");
  // const [carryoverAmount, setCarryoverAmount] = useState("");
  // const [budgetAlertThreshold, setBudgetAlertThreshold] = useState("");

  useEffect(() => {
    if (edit && budget) {
      setCategoryId(budget.category_id || "");
      setMonth(budget.month || "");
      setYear(budget.year || "");
      setPlannedAmount(budget.planned_amount || "");
      // setActualAmount(budget.actual_amount || "");
      // setCarryoverAmount(budget.carryover_amount || "");
      // setBudgetAlertThreshold(budget.budget_alert_threshold || "");
    }
  }, [edit, budget]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = edit ? "/api/budget/edit" : "/api/budget/add";
      const method = edit ? "PUT" : "POST";
      const body = JSON.stringify({
        budgetId: edit ? budget.budget_id : undefined,
        userId: user.id,
        categoryId,
        month,
        year,
        plannedAmount,
        actualAmount: edit ? budget.actual_amount : 100,
        carryoverAmount: 100,
        budgetAlertThreshold: 100,
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
      onError("An error occurred during budget submission. Please try again.");
    }
  };

  return (
    <BudgetForm
      categoryId={categoryId}
      setCategoryId={setCategoryId}
      month={month}
      setMonth={setMonth}
      year={year}
      setYear={setYear}
      plannedAmount={plannedAmount}
      setPlannedAmount={setPlannedAmount}
      // actualAmount={actualAmount}
      // setActualAmount={setActualAmount}
      // carryoverAmount={carryoverAmount}
      // setCarryoverAmount={setCarryoverAmount}
      // budgetAlertThreshold={budgetAlertThreshold}
      // setBudgetAlertThreshold={setBudgetAlertThreshold}
      edit={edit}
      handleSubmit={handleSubmit}
      onError={onError}
    />
  );
};

export default AddEditBudgetForm;
