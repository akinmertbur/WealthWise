// src/components/ExpensesIncomesBarChart/ExpensesIncomesBarChart.jsx
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./ExpensesIncomesBarChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpensesIncomesBarChart = function ({ userId, onError }) {
  const [transactions, setTransactions] = useState([]);
  const [incomesTotal, setIncomesTotal] = useState(0);
  const [expensesTotal, setExpensesTotal] = useState(0);

  useEffect(() => {
    // Fetch transactions function
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
          onError("Failed to load transactions");
        }
      } catch (error) {
        onError("An error occurred while fetching transactions.");
      }
    };

    if (userId) {
      fetchTransactions();
    }
  }, [userId, onError]);

  // Calculate incomes and expenses after transactions are fetched
  useEffect(() => {
    let incomesTotal = 0;
    let expensesTotal = 0;

    // Today's date
    let today = new Date();

    // Calculate the date 6 months before today
    let sixMonthsEarlier = new Date();
    sixMonthsEarlier.setMonth(today.getMonth() - 6);

    transactions.forEach((transaction) => {
      // Ensure transaction_date is a Date object
      let transactionDate = new Date(transaction.transaction_date);

      if (transactionDate >= sixMonthsEarlier) {
        if (transaction.transaction_type === "income") {
          incomesTotal += Number(transaction.amount);
        } else {
          expensesTotal += Number(transaction.amount);
        }
      }
    });

    setIncomesTotal(incomesTotal);
    setExpensesTotal(expensesTotal);
  }, [transactions]);

  const data = {
    labels: ["Incomes", "Expenses"],
    datasets: [
      {
        label: "Quantity",
        data: [incomesTotal, expensesTotal],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Incomes / Expenses",
      },
    },
  };

  return (
    <>
      {incomesTotal === 0 && expensesTotal === 0 ? (
        <p>No Expenses & Incomes statistics found.</p>
      ) : (
        <div className="bar-chart">
          <Bar data={data} options={options} />
        </div>
      )}
    </>
  );
};

export default ExpensesIncomesBarChart;
