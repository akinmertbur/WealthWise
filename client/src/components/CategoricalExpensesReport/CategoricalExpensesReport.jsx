// src/components/CategoricalExpensesReport/CategoricalExpensesReport.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./CategoricalExpensesReport.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoricalExpensesReport = function ({ reportData }) {
  const data = {
    labels: Object.keys(JSON.parse(reportData)),
    datasets: [
      {
        label: "Quantity",
        data: Object.values(JSON.parse(reportData)),
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
    <div className="pie-chrt">
      <Pie data={data} options={options} />
    </div>
  );
};

export default CategoricalExpensesReport;
