import React, { useState, useEffect } from "react";

const TransactionList = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch transactions when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transaction/getAll", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }), // Sending the userId in the request body
        });

        const data = await response.json();

        if (response.ok) {
          setTransactions(data.result); // Store the transactions in state
        } else {
          setErrorMessage("Failed to load transactions");
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching transactions.");
      }
    };

    if (userId) {
      fetchTransactions(); // Only fetch if userId exists
    }
  }, [userId]); // Re-fetch when userId changes

  return (
    <div className="transaction-list">
      <h2>All Transactions</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {transactions.length > 0 ? (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.transaction_id}>
              <strong>{transaction.amount}</strong> - {transaction.description}{" "}
              ({transaction.transaction_type})
            </li>
          ))}
        </ul>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionList;
