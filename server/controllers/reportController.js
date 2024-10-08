// server/controllers/reportController.js
import {
  insertReport,
  updateReport,
  removeReport,
  retrieveReportDetail,
  retrieveAllReports,
} from "../business/services/reportService.js";
import { log, error } from "../utils/logger.js";

const addReport = async (req, res) => {
  try {
    const { userId, report, reportType, month, year } = req.body;

    const result = await insertReport(userId, report, reportType, month, year);
    log(`Report added successfully!`);
    res.status(200).json({ message: `Report added successfully!` });
  } catch (err) {
    error(`Failed to add report: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const editReport = async (req, res) => {
  try {
    const { reportId, userId, reportType, reportData } = req.body;

    const result = await updateReport(reportId, userId, reportType, reportData);
    log(`Report edited successfully!`);
    res.status(200).json({ message: `Report edited successfully!` });
  } catch (err) {
    error(`Failed to edit report: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const deleteReport = async (req, res) => {
  try {
    const { reportId } = req.body;

    const result = await removeReport(reportId);
    log(`Report deleted successfully!`);
    res.status(200).json({ message: `Report deleted successfully!` });
  } catch (err) {
    error(`Failed to delete report: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const getReportDetail = async (req, res) => {
  try {
    const { reportId } = req.body;

    const result = await retrieveReportDetail(reportId);
    log(`Report detail retrieved successfully!`);
    res.status(200).json({ result });
  } catch (err) {
    error(`Failed to retrieve report detail: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const getAllReports = async (req, res) => {
  try {
    const { userId } = req.body;

    const result = await retrieveAllReports(userId);
    log(`All reports retrieved successfully!`);
    res.status(200).json({ result });
  } catch (err) {
    error(`Failed to retrieve all reports: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export { addReport, editReport, deleteReport, getReportDetail, getAllReports };
