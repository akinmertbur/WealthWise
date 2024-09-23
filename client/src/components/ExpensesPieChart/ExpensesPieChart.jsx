// src/components/ExpensesPieChart/ExpensesPieChart.jsx
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./ExpensesPieChart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesPieChart = function ({ userId, onError }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

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
  }, [userId]);

  const handleTransactions = function () {};

  const data = {
    labels: ["Apples", "Bananas", "Cherries", "Dates", "Elderberries"],
    datasets: [
      {
        label: "Quantity",
        data: [10, 15, 7, 20, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
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
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="pie-chart">
      <Pie data={data} options={options} />
    </div>
  );
};

export default ExpensesPieChart;
