// src/components/AddReportForm/AddReportForm.jsx
import React, { useState, useEffect } from "react";
import ReportForm from "../ReportForm/ReportForm";

const AddReportForm = ({ user, onSuccess, onError }) => {
  const [reportType, setReportType] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/api/report/add";
      const method = "POST";
      const body = JSON.stringify({
        userId: user.id,
        reportType,
        month,
        year,
      });

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(data.message);
      } else {
        onError(data.message);
      }
    } catch (err) {
      onError("An error occurred during report submission. Please try again.");
    }
  };

  return (
    <ReportForm
      reportType={reportType}
      setReportType={setReportType}
      month={month}
      setMonth={setMonth}
      year={year}
      setYear={setYear}
      handleSubmit={handleSubmit}
    />
  );
};

export default AddReportForm;
