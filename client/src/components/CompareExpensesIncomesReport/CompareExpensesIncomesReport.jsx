// src/components/CompareExpensesIncomesReport/CompareExpensesIncomesReport.jsx
import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CompareExpensesIncomesReport = function ({ reportData }) {
  const data = {
    labels: ["Incomes", "Expenses"],
    datasets: [
      {
        label: "Quantity",
        data: [
          Number(JSON.parse(reportData).income),
          Number(JSON.parse(reportData).expense),
        ],
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
    <div className="bar-chart">
      <Bar data={data} options={options} />
    </div>
  );
};

export default CompareExpensesIncomesReport;
