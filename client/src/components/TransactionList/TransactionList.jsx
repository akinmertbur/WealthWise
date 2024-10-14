import React, { useState, useEffect } from "react";
import "./TransactionList.css";

const TransactionList = ({
  userId,
  updateList,
  edit,
  onEdit,
  onError,
  month,
  year,
}) => {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/transaction/getAllByPeriod", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, month, year }), // Sending the userId, month and year in the request body
        });

        const data = await response.json();

        if (response.ok) {
          setTransactions(data.result); // Store the transactions in state
        } else {
          onError("Failed to load transactions");
        }
      } catch (error) {
        onError("An error occurred while fetching transactions.");
      }
    };

    if (userId) {
      fetchTransactions(); // Only fetch if userId exists
    }
  }, [userId, updateList, month, year]); // Re-fetch when userId, updateList, month and year change

  const handleDelete = async (transactionId) => {
    try {
      const response = await fetch("/api/transaction/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transactionId }),
      });

      const data = await response.json();

      if (response.ok) {
        // Remove the deleted transaction from the state
        setTransactions((prevTransactions) =>
          prevTransactions.filter(
            (transaction) => transaction.transaction_id !== transactionId
          )
        );
      } else {
        onError(data.message);
      }
    } catch (error) {
      onError("An error occurred while fetching transactions.");
    }
  };

  return (
    <div className="transaction-list">
      <h2>
        {edit ? "Transactions with selected time period" : "Last transactions"}
      </h2>
      <p className="check-msg">Check your {!edit && "last"} transactions</p>

      {transactions.length > 0 ? (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Type</th>
              <th>Date</th>
              <th>Amount</th>
              {edit && <th>Edit Transaction</th>}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transaction_id}>
                <td>{transaction.description}</td>
                <td>{transaction.transaction_type}</td>
                <td>
                  {new Date(transaction.transaction_date).toLocaleDateString()}
                </td>
                <td
                  className={
                    transaction.transaction_type === "income"
                      ? "positive-amount"
                      : "negative-amount"
                  }
                >
                  {transaction.transaction_type === "income"
                    ? `+${transaction.amount}₺`
                    : `-${transaction.amount}₺`}
                </td>
                {edit && (
                  <td>
                    <button
                      onClick={() => onEdit(transaction.transaction_id)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(transaction.transaction_id)}
                      className="edit-button"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionList;
