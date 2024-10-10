// src/components/ReportVisual/ReportVisual.jsx
import React from "react";
import CompareExpensesIncomesReport from "../CompareExpensesIncomesReport/CompareExpensesIncomesReport";
import CategoricalExpensesReport from "../CategoricalExpensesReport/CategoricalExpensesReport";
import "./ReportVisual.css";

const ReportVisual = function ({ report, loading, category }) {
  return (
    <div>
      {loading ? (
        <p>Loading...</p> // Display a loading message while fetching reports
      ) : category === 1 ? (
        <CompareExpensesIncomesReport reportData={report.report_data} />
      ) : (
        <CategoricalExpensesReport reportData={report.report_data} />
      )}
    </div>
  );
};

export default ReportVisual;
