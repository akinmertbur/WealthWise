// src/components/ExpensesPieChart/ExpensesPieChart.jsx
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./ExpensesPieChart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesPieChart = function ({ userId, onError }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});

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

  // Calculate category counts after transactions and categories are fetched
  useEffect(() => {
    // Today's date
    let today = new Date();

    // Calculate the date 6 months before today
    let sixMonthsEarlier = new Date();
    sixMonthsEarlier.setMonth(today.getMonth() - 6);

    const counts = transactions.reduce((acc, transaction) => {
      // Ensure transaction_date is a Date object
      let transactionDate = new Date(transaction.transaction_date);

      if (
        transaction.transaction_type === "expense" &&
        transactionDate >= sixMonthsEarlier
      ) {
        const category = categories.find(
          (cat) => cat.category_id === transaction.category_id
        );
        if (category) {
          acc[category.name] = (acc[category.name] || 0) + 1;
        }
      }
      return acc; // Ensure the accumulator is always returned
    }, {});

    setCategoryCounts(counts);
  }, [transactions, categories]);

  const data = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Quantity",
        data: Object.values(categoryCounts),
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
