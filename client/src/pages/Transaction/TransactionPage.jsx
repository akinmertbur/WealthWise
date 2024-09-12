import React, { useState, useEffect } from "react";
import "./TransactionPage.css";

const TransactionPage = ({ user }) => {
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [description, setDescription] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [currency, setCurrency] = useState("");
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch categories when the component is mounted
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category/getAll");
        const data = await response.json();
        if (response.ok) {
          setCategories(data.result); // Update categories state
        } else {
          setErrorMessage("Failed to load categories");
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching categories.");
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures this runs only once when the component is mounted

  // Clear the input values
  const clearInputValues = () => {
    setCategoryId("");
    setAmount("");
    setTransactionType("");
    setDescription("");
    setTransactionDate("");
    setCurrency("");
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setSuccessMessage("");
    setErrorMessage("");

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
        setSuccessMessage(data.message);
        clearInputValues(); // Clear the input values
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="transaction-page">
      <h2>Transaction</h2>
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
        <div>
          <label>Currency:</label>
          <div>
            <input
              type="radio"
              id="tl"
              name="currency"
              value="TL"
              checked={currency === "TL"}
              onChange={(e) => setCurrency(e.target.value)}
              required
            />
            <label htmlFor="tl">TL</label>
          </div>
          <div>
            <input
              type="radio"
              id="usd"
              name="currency"
              value="USD"
              checked={currency === "USD"}
              onChange={(e) => setCurrency(e.target.value)}
              required
            />
            <label htmlFor="usd">USD</label>
          </div>
          <div>
            <input
              type="radio"
              id="eur"
              name="currency"
              value="EUR"
              checked={currency === "EUR"}
              onChange={(e) => setCurrency(e.target.value)}
              required
            />
            <label htmlFor="eur">EUR</label>
          </div>
        </div>

        <button type="submit">Add</button>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default TransactionPage;
