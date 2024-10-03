// server/data/repositories/reportRepository.js
import Report from "../models/reportModel.js";

const addReport = async (reportData) => {
  return await Report.create(reportData);
};

const editReport = async (reportData) => {
  return await Report.update(reportData, {
    where: { report_id: reportData.report_id },
  });
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

export { addReport, editReport, deleteReport, getReportDetail, getAllReports };
