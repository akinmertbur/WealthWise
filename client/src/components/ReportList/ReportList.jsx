// src/components/ReportList/ReportList.jsx
import React, { useState } from "react";
import Modal from "../../components/ReportModal/ReportModal";
import ReportVisual from "../ReportVisual/ReportVisual";
import "./ReportList.css";

const ReportList = function ({ reports, loading, onSuccess, onError }) {
  const [currentReport, setCurrentReport] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const handleDelete = async (reportId) => {
    try {
      const response = await fetch("/api/report/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reportId }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(data.message);
      } else {
        onError(data.message);
      }
    } catch (error) {
      onError("An error occurred while deleting the report.");
    }
  };

  const handleDisplay = (report) => {
    setCurrentReport(report);
    setShowModal(true);
  };

  const checkReportCategory = (report) => {
    if (report) {
      const reportData = JSON.parse(report.report_data);
      const income = reportData?.income ?? false;

      let reportCategory = 0;

      if (income || income === 0 || income === "0") {
        reportCategory = 1;
      } else {
        reportCategory = 2;
      }

      return reportCategory;
    }
  };

  return (
    <div className="rprt-list">
      {loading ? (
        <p>Loading...</p> // Display a loading message while fetching reports
      ) : (
        <div>
          <h2>Statistical Reports</h2>
          <p className="chck-msg">Check your statistics</p>
          {reports.length > 0 ? (
            <table className="rprt-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Period</th>
                  <th>Creation Date</th>
                  <th>Show/Delete Report</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.report_id}>
                    <td>
                      {checkReportCategory(report) === 1
                        ? "Compare Expenses & Incomes"
                        : "Categorical Expenses Report"}
                    </td>
                    <td>{report.report_type}</td>
                    <td>
                      {report.month
                        ? report.month + " / " + report.year
                        : report.year}
                    </td>
                    <td>{new Date(report.updatedAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleDisplay(report)}
                        className="edt-button"
                      >
                        Show
                      </button>
                      <button
                        onClick={() => handleDelete(report.report_id)}
                        className="edt-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No statistical reports found.</p>
          )}
        </div>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ReportVisual
          report={currentReport}
          loading={loading}
          category={currentReport && checkReportCategory(currentReport)}
        />
      </Modal>
    </div>
  );
};

export default ReportList;
