// server/business/services/reportService.js
import {
  addReport,
  editReport,
  deleteReport,
  getReportDetail,
  getAllReports,
} from "../../data/repositories/reportRepository.js";

const insertReport = async (userId, reportType, reportData) => {
  try {
    // Check whether all the input values are entered
    if (!userId || !reportType || !reportData) {
      throw new Error(
        "There are missing report values! Enter all the input values!"
      );
    }

    return await addReport({
      user_id: userId,
      report_type: reportType,
      report_data: reportData,
    });
  } catch (err) {
    throw new Error(`Failed to add report: ${err.message}`);
  }
};

const updateReport = async (reportId, userId, reportType, reportData) => {
  try {
    // Check whether all the input values are entered
    if (!reportId || !userId || !reportType || !reportData) {
      throw new Error(
        "There are missing report values! Enter all the input values!"
      );
    }

    return await editReport({
      report_id: reportId,
      user_id: userId,
      report_type: reportType,
      report_data: reportData,
    });
  } catch (err) {
    throw new Error(`Failed to update report: ${err.message}`);
  }
};

const removeReport = async (reportId) => {
  try {
    // Check whether reportId is entered
    if (!reportId) {
      throw new Error("Report Id is required for the report deletion!");
    }

    return await deleteReport(reportId);
  } catch (err) {
    throw new Error(`Failed to remove report: ${err.message}`);
  }
};

const retrieveReportDetail = async (reportId) => {
  try {
    // Check whether reportId is entered
    if (!reportId) {
      throw new Error("Report Id is required for getting report detail!");
    }

    return await getReportDetail(reportId);
  } catch (err) {
    throw new Error(`Failed to retrieve report detail: ${err.message}`);
  }
};

const retrieveAllReports = async (userId) => {
  try {
    // Check whether userId is entered
    if (!userId) {
      throw new Error("User Id is required for getting all reports!");
    }

    return await getAllReports(userId);
  } catch (err) {
    throw new Error(`Failed to retrieve all reports: ${err.message}`);
  }
};

export {
  insertReport,
  updateReport,
  removeReport,
  retrieveReportDetail,
  retrieveAllReports,
};
