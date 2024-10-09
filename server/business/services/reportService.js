// server/business/services/reportService.js
import {
  addReport,
  deleteReport,
  getReportDetail,
  getAllReports,
} from "../../data/repositories/reportRepository.js";
import {
  retrieveAllTransactionsByPeriod,
  retrieveAllTransactionsByYear,
} from "./transactionService.js";
import { getAllCategories } from "./categoryService.js";

const insertReport = async (userId, report, reportType, month, year) => {
  try {
    // Validate input values
    validateReportInput(userId, reportType, month, year);

    // Retrieve transactions based on report type
    const transactions = await getTransactionsByReportType(
      userId,
      reportType,
      month,
      year
    );

    // Generate report object based on the report type
    const reportObject = await generateReportObject(report, transactions);

    // Convert report object to JSON format
    const reportData = JSON.stringify(reportObject);

    // Add report to database
    return await addReport({
      user_id: userId,
      report_type: reportType,
      report_data: reportData,
    });
  } catch (err) {
    throw new Error(`Failed to add report: ${err.message}`);
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

// Helper function to validate report input values
const validateReportInput = (userId, reportType, month, year) => {
  if (!userId || !reportType || !month || !year) {
    throw new Error(
      "There are missing report values! Enter all the input values!"
    );
  }
};

// Helper function to retrieve transactions based on the report type
const getTransactionsByReportType = async (userId, reportType, month, year) => {
  if (reportType === "monthly") {
    return await retrieveAllTransactionsByPeriod(userId, month, year);
  } else {
    return await retrieveAllTransactionsByYear(userId, year);
  }
};

// Helper function to generate income and expense report
const generateIncomeExpenseReport = (transactions) => {
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

  return { expense: totalExpense, income: totalIncome };
};

// Helper function to generate categorical expense report
const generateCategoricalExpenseReport = async (transactions) => {
  const categories = await getAllCategories();

  return transactions.reduce((acc, transaction) => {
    const category = categories.find(
      (cat) => cat.category_id === transaction.category_id
    );
    if (category) {
      acc[category.name] = (acc[category.name] || 0) + 1;
    }

    return acc;
  }, {});
};

// Helper function to generate the report object based on report type
const generateReportObject = async (report, transactions) => {
  switch (report) {
    case "1":
      return generateIncomeExpenseReport(transactions);
    case "2":
      return await generateCategoricalExpenseReport(transactions);
    default:
      throw new Error("Invalid report type provided!");
  }
};

export { insertReport, removeReport, retrieveReportDetail, retrieveAllReports };
