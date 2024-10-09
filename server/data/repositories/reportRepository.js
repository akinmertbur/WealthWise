// server/data/repositories/reportRepository.js
import Report from "../models/reportModel.js";

const addReport = async (reportData) => {
  return await Report.create(reportData);
};

const deleteReport = async (report_id) => {
  const row = await Report.findOne({ where: { report_id } });

  if (row) {
    await row.destroy(); // deletes the row
  }
};

const getReportDetail = async (report_id) => {
  return await Report.findOne({ where: { report_id } });
};

const getAllReports = async (user_id) => {
  return await Report.findAll({
    where: { user_id },
  });
};

export { addReport, deleteReport, getReportDetail, getAllReports };
