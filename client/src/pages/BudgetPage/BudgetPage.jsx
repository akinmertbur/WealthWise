// src/Pages/BudgetPage/BudgetPage.jsx
import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import AddEditBudgetForm from "../../components/AddEditBudgetForm/AddEditBudgetForm";
import Budgets from "../../components/Budgets/Budgets";
import "./BudgetPage.css";
import DateForm from "../../components/DateForm/DateForm";

function BudgetPage({ user }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [budget, setBudget] = useState(null);
  const [addEdit, setAddEdit] = useState(false);
  const [refetchBudgets, setRefetchBudgets] = useState(false);
  const [date, setDate] = useState({ month: "", year: "" });
  const today = new Date();

  // Success handler
  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setErrorMessage(null);

    if (showModal) {
      setShowModal(false); // Close the modal on success
    }

    setRefetchBudgets(!refetchBudgets);
  };

  // Error handler
  const handleError = (message) => {
    setErrorMessage(message);
    setSuccessMessage(null);
  };

  // Edit handler: when edit button is clicked,
  // the budget is retrieved and the model is opened.
  const handleEdit = async (budgetId) => {
    try {
      const response = await fetch("/api/budget/getBudget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ budgetId }),
      });

      const data = await response.json();

      if (response.ok) {
        setBudget(data.result); // Store the budget in state
        if (!addEdit) {
          setAddEdit(true);
        }

        setShowModal(true); // Open the edit modal
      } else {
        handleError(data.message);
      }
    } catch (err) {
      handleError("An error occurred while fetching the budget.");
    }
  };

  const handleDelete = async (budgetId) => {
    try {
      const response = await fetch("/api/budget/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ budgetId }),
      });

      const data = await response.json();

      if (response.ok) {
        handleSuccess(data.message);
      } else {
        handleError(data.message);
      }
    } catch (err) {
      handleError("An error occurred while deleting the budget.");
    }
  };

  return (
    <div className="App">
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <button
        className="add-budget-button"
        onClick={() => {
          if (budget) {
            setBudget(null);
          }

          if (addEdit) {
            setAddEdit(false);
          }

          setShowModal(true);
        }}
      >
        Add Budget
      </button>

      <DateForm date={date} setDate={setDate} />

      <Budgets
        month={date.month ? date.month : today.getMonth() + 1}
        year={date.year ? date.year : today.getFullYear()}
        user={user}
        onError={handleError}
        refetchBudgets={refetchBudgets}
        onEdit={handleEdit}
        onDelete={handleDelete}
        editable={true}
      />

      {/* Modal for adding/editing budget
          Adding or editing determined based on 'edit' prop */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <AddEditBudgetForm
          budget={budget}
          user={user}
          onSuccess={handleSuccess}
          onError={handleError}
          edit={addEdit}
        />
      </Modal>
    </div>
  );
}

export default BudgetPage;
