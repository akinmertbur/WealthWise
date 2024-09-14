import React, { useState, useEffect } from "react";
import "./EditTransactionForm.css";

const AddTransactionForm = ({ transaction, user, onSuccess, onError }) => {
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [description, setDescription] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Sync the state with the transaction prop when it changes
  useEffect(() => {
    if (transaction) {
      setCategoryId(transaction.category_id || "");
      setAmount(transaction.amount || "");
      setTransactionType(transaction.transaction_type || "");
      setDescription(transaction.description || "");
      setTransactionDate(
        transaction.transaction_date
          ? new Date(transaction.transaction_date).toISOString().split("T")[0]
          : ""
      );
    }
  }, [transaction]); // Add `transaction` as a dependency to re-run the effect when it changes

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

  const handleEditTransaction = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/transaction/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId: transaction.transaction_id,
          userId: user.id,
          categoryId,
          amount,
          transactionType,
          description,
          transactionDate,
          currency: "TL",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(data.message); // Notify parent of success
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
    <form onSubmit={handleEditTransaction}>
      <div>
        <label>Category:</label>
        <select
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
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="0.01"
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
      <button type="submit">Edit</button>
    </form>
  );
};

export default AddTransactionForm;
