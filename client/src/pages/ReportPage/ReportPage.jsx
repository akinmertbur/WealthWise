// src/Pages/ReportPage/ReportPage.jsx
import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import AddReportForm from "../../components/AddReportForm/AddReportForm";
import "./ReportPage.css";
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

function ReportPage({ user }) {
  const userId = user.id;
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading

  // Fetch reports function
  const fetchReports = async () => {
    try {
      const response = await fetch("/api/report/getAll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // Sending the userId in the request body
      });

      const data = await response.json();

      if (response.ok) {
        setReports(data.result); // Store the reports in state
      } else {
        handleError("Failed to load reports");
      }
    } catch (error) {
      handleError("An error occurred while fetching reports.");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Fetch reports when the component mounts or when userId changes
  useEffect(() => {
    if (userId) {
      fetchReports();
    }
  }, [userId]);

  // Success handler
  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setErrorMessage(null);

    if (showModal) {
      setShowModal(false); // Close the modal on success
    }
  };

  // Error handler
  const handleError = (message) => {
    setErrorMessage(message);
    setSuccessMessage(null);
  };

  const data = {
    labels: ["Incomes", "Expenses"],
    datasets: [
      {
        label: "Quantity",
        data:
          reports.length > 0
            ? [
                Number(JSON.parse(reports[1].report_data).income),
                Number(JSON.parse(reports[1].report_data).expense),
              ]
            : [0, 0],
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
    <div>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <button
        className="add-report-button"
        onClick={() => {
          setShowModal(true);
        }}
      >
        Add Report
      </button>

      {/* Modal for adding report */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <AddReportForm
          user={user}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </Modal>

      {loading ? (
        <p>Loading...</p> // Display a loading message while fetching reports
      ) : (
        <div className="bar-chart">
          <Bar data={data} options={options} />
        </div>
      )}

      {/* <ul>
        {reports.map((report) => (
          <li key={report.report_id}>
            {JSON.parse(report.report_data).expense}
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default ReportPage;
