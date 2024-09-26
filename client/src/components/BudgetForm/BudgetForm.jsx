// src/components/BudgetForm/BudgetForm.jsx
import React, { useState, useEffect } from "react";
import "./BudgetForm.css";

const BudgetForm = ({
  categoryId,
  setCategoryId,
  month,
  setMonth,
  year,
  setYear,
  plannedAmount,
  setPlannedAmount,
  actualAmount,
  setActualAmount,
  carryoverAmount,
  setCarryoverAmount,
  budgetAlertThreshold,
  setBudgetAlertThreshold,
  edit,
  handleSubmit,
  onError,
}) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Fetch categories when the component is mounted
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await fetch("/api/category/getAll");
        const data = await response.json();
        if (response.ok) {
          setCategories(data.result); // Update categories state
        } else {
          onError("Failed to load categories");
        }
      } catch (error) {
        onError("An error occurred while fetching categories.");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [onError]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="categoryId">Category:</label>
        <select
          id="categoryId"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {loadingCategories || categories.length == 0 ? (
            <option disabled>Loading categories...</option>
          ) : (
            categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name}
              </option>
            ))
          )}
        </select>
      </div>
      <div>
        <label htmlFor="month">Month:</label>
        <input
          id="month"
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="year">Year:</label>
        <input
          id="year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="plannedAmount">Planned Amount:</label>
        <input
          id="plannedAmount"
          type="number"
          value={plannedAmount}
          onChange={(e) => setPlannedAmount(e.target.value)}
          min="0"
          step="0.01"
          required
        />
      </div>
      <div>
        <label htmlFor="actualAmount">Actual Amount:</label>
        <input
          id="actualAmount"
          type="number"
          value={actualAmount}
          onChange={(e) => setActualAmount(e.target.value)}
          min="0"
          step="0.01"
          required
        />
      </div>
      <div>
        <label htmlFor="carryoverAmount">Carryover Amount:</label>
        <input
          id="carryoverAmount"
          type="number"
          value={carryoverAmount}
          onChange={(e) => setCarryoverAmount(e.target.value)}
          min="0"
          step="0.01"
          required
        />
      </div>
      <div>
        <label htmlFor="budgetAlertThreshold">Budget Alert Threshold:</label>
        <input
          id="budgetAlertThreshold"
          type="number"
          value={budgetAlertThreshold}
          onChange={(e) => setBudgetAlertThreshold(e.target.value)}
          min="0"
          step="0.01"
          required
        />
      </div>
      <button type="submit">{edit ? "Edit" : "Add"}</button>
    </form>
  );
};

export default BudgetForm;
