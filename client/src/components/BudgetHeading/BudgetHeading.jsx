// src/components/BudgetHeading/BudgetHeading.jsx
import React, { useState, useEffect } from "react";
import EditBudgetButton from "../EditBudgetButton.jsx";
import DeleteBudgetButton from "../DeleteBudgetButton.jsx";
import "./BudgetHeading.css";

function BudgetHeading({
  budgetId,
  budgetPeriod,
  categoryId,
  onError,
  onEdit,
  onDelete,
  editable,
}) {
  const [category, setCategory] = useState("");

  // Fetch the category when the component mounts
  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted

    const fetchCategoryName = async () => {
      try {
        const response = await fetch("/api/category/getCategory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryId }), // Sending the category_id in the request body
        });

        const data = await response.json();

        if (response.ok) {
          if (isMounted) {
            setCategory(data.result); // Store the category name in state
          }
        } else {
          onError("Failed to load category name");
        }
      } catch (error) {
        onError("An error occurred while fetching category name.");
      }
    };

    fetchCategoryName();

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, [categoryId]); // Re-fetch when categoryId changes

  return (
    <div className="budget-heading">
      {editable && (
        <div className="budget-buttons">
          <EditBudgetButton budgetId={budgetId} onEdit={onEdit} />
          <DeleteBudgetButton budgetId={budgetId} onDelete={onDelete} />
        </div>
      )}
      <div className="budget-title">
        <h3>{category.name}</h3>
        <p>{budgetPeriod}</p>
      </div>
    </div>
  );
}

export default BudgetHeading;
