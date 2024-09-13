import React, { useState, useEffect } from "react";
import "./AddTransactionForm.css";

const AddTransactionForm = ({ user, onSuccess, onError }) => {
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [description, setDescription] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [currency, setCurrency] = useState("TL");
  const [categories, setCategories] = useState([]);

  // Fetch categories when the component is mounted
  useEffect(() => {
    const fetchCategories = async () => {
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
      }
    };

    fetchCategories();
  }, [onError]);

  // Clear the input values
  const clearInputValues = () => {
    setCategoryId("");
    setAmount("");
    setTransactionType("");
    setDescription("");
    setTransactionDate("");
    setCurrency("TL");
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/transaction/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          categoryId,
          amount,
          transactionType,
          description,
          transactionDate,
          currency,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(data.message); // Notify parent of success
        clearInputValues(); // Clear the input values
      } else {
        onError(data.message); // Notify parent of error
      }
    } catch (error) {
      onError(
        "An error occurred during transaction submission. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleAddTransaction}>
      <div>
        <label>Category:</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.length > 0 ? (
            categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name}
              </option>
            ))
          ) : (
            <option disabled>Loading categories...</option>
          )}
        </select>
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Transaction Type:</label>
        <div>
          <input
            type="radio"
            id="income"
            name="transactionType"
            value="income"
            checked={transactionType === "income"}
            onChange={(e) => setTransactionType(e.target.value)}
            required
          />
          <label htmlFor="income">Income</label>
        </div>
        <div>
          <input
            type="radio"
            id="expense"
            name="transactionType"
            value="expense"
            checked={transactionType === "expense"}
            onChange={(e) => setTransactionType(e.target.value)}
            required
          />
          <label htmlFor="expense">Expense</label>
        </div>
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Transaction Date:</label>
        <input
          type="date"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTransactionForm;
