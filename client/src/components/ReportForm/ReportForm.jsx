// src/components/ReportForm/ReportForm.jsx
import React from "react";
import "./ReportForm.css";

const ReportForm = ({
  report,
  setReport,
  reportType,
  setReportType,
  month,
  setMonth,
  year,
  setYear,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Report Type:</label>
        <div>
          <input
            type="radio"
            id="report1"
            name="report"
            value="1"
            checked={report === "1"}
            onChange={(e) => setReport(e.target.value)}
            required
          />
          <label htmlFor="report1">Compare Expenses & Incomes</label>
        </div>
        <div>
          <input
            type="radio"
            id="report2"
            name="report"
            value="2"
            checked={report === "2"}
            onChange={(e) => setReport(e.target.value)}
            required
          />
          <label htmlFor="report2">Categorical Expenses Report</label>
        </div>
      </div>
      <div>
        <label>Report Type:</label>
        <div>
          <input
            type="radio"
            id="monthly"
            name="reportType"
            value="monthly"
            checked={reportType === "monthly"}
            onChange={(e) => setReportType(e.target.value)}
            required
          />
          <label htmlFor="monthly">Monthly</label>
        </div>
        <div>
          <input
            type="radio"
            id="yearly"
            name="reportType"
            value="yearly"
            checked={reportType === "yearly"}
            onChange={(e) => setReportType(e.target.value)}
            required
          />
          <label htmlFor="yearly">Yearly</label>
        </div>
      </div>
      <div>
        <label htmlFor="month">Month:</label>
        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        >
          <option value="">Select Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <div>
        <label htmlFor="year">Year:</label>
        <select
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        >
          <option value="">Select Year</option>
          {Array.from({ length: 50 }, (_, i) => (
            <option key={i} value={2020 + i}>
              {2020 + i}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default ReportForm;
