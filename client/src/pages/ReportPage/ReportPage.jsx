// src/Pages/ReportPage/ReportPage.jsx
import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import AddReportForm from "../../components/AddReportForm/AddReportForm";
import "./ReportPage.css";
import ReportVisual from "../../components/ReportVisual/ReportVisual";

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

    fetchReports(); // Re-fetch reports immediately after success
  };

  // Error handler
  const handleError = (message) => {
    setErrorMessage(message);
    setSuccessMessage(null);
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

      {reports.length > 0 && (
        <ReportVisual report={reports[3]} loading={loading} />
      )}
    </div>
  );
}

export default ReportPage;
