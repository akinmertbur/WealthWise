// src/components/ReportVisual/ReportVisual.jsx
import React from "react";
import CompareExpensesIncomesReport from "../CompareExpensesIncomesReport/CompareExpensesIncomesReport";
import CategoricalExpensesReport from "../CategoricalExpensesReport/CategoricalExpensesReport";

const ReportVisual = function ({ report, loading }) {
  const reportData = JSON.parse(report.report_data);
  const income = reportData?.income ?? false;

  return (
    <div>
      {loading ? (
        <p>Loading...</p> // Display a loading message while fetching reports
      ) : income || income === 0 || income === "0" ? (
        <CompareExpensesIncomesReport reportData={report.report_data} />
      ) : (
        <CategoricalExpensesReport reportData={report.report_data} />
      )}
    </div>
  );
};

export default ReportVisual;
