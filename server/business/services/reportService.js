// server/business/services/reportService.js
import {
  addReport,
  editReport,
  deleteReport,
  getReportDetail,
  getAllReports,
} from "../../data/repositories/reportRepository.js";
import { retrieveAllTransactionsByPeriod } from "./transactionService.js";
import { getAllCategories } from "./categoryService.js";

const insertReport = async (userId, report, reportType, month, year) => {
  try {
    // Check whether all the input values are entered
    if (!userId || !reportType || !month || !year) {
      throw new Error(
        "There are missing report values! Enter all the input values!"
      );
    }

    const transactions = await retrieveAllTransactionsByPeriod(
      userId,
      month,
      year
    );

    let reportObject;

    // report = '1' stands for the compare expenses & incomes report
    // report = '2' stands for the categorical expenses report

    if (report === "1") {
      let totalIncome = 0;
      let totalExpense = 0;

      if (transactions) {
        transactions.forEach((transaction) => {
          if (transaction.transaction_type === "income") {
            totalIncome += Number(transaction.amount);
          } else {
            totalExpense += Number(transaction.amount);
          }
        });
      }

      reportObject = { expense: totalExpense, income: totalIncome };
    } else if (report === "2") {
      const categories = await getAllCategories();

      reportObject = transactions.reduce((acc, transaction) => {
        const category = categories.find(
          (cat) => cat.category_id === transaction.category_id
        );
        if (category) {
          acc[category.name] = (acc[category.name] || 0) + 1;
        }

        return acc; // Ensure the accumulator is always returned
      }, {});
    }

    const reportData = JSON.stringify(reportObject);

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
