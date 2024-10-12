// server/data/repositories/transactionRepository.js
import { Sequelize, Op, fn, col, literal } from "sequelize";
import Transaction from "../models/transactionModel.js";

const addTransaction = async (transactionData) => {
  return await Transaction.create(transactionData);
};

const editTransaction = async (transactionData) => {
  return await Transaction.update(transactionData, {
    where: { transaction_id: transactionData.transaction_id },
  });
};

const deleteTransaction = async (transaction_id) => {
  const row = await Transaction.findOne({ where: { transaction_id } });

  if (row) {
    await row.destroy(); // deletes the row
  }
};

const getTransactionDetail = async (transaction_id) => {
  return await Transaction.findOne({ where: { transaction_id } });
};

const getAllTransactions = async (user_id) => {
  return await Transaction.findAll({
    where: { user_id },
    order: [
      ["transaction_date", "DESC"],
      ["updatedAt", "DESC"],
    ],
  });
};

const getIncomeTransactions = async () => {
  return await Transaction.findAll({
    where: { transaction_type: "income" },
  });
};

const getExpenseTransactions = async () => {
  return await Transaction.findAll({
    where: { transaction_type: "expense" },
  });
};

const getTransactionsByCategoryId = async (user_id, category_id) => {
  return await Transaction.findAll({
    where: { user_id, category_id },
    order: [["transaction_date", "DESC"]],
  });
};

const getAllTransactionsByPeriod = async (user_id, month, year) => {
  return await Transaction.findAll({
    where: {
      user_id,
      [Op.and]: [
        literal(`EXTRACT(MONTH FROM "transaction_date") = ${month}`),
        literal(`EXTRACT(YEAR FROM "transaction_date") = ${year}`),
      ],
    },
    order: [
      ["transaction_date", "DESC"],
      ["updatedAt", "DESC"],
    ],
  });
};

const getAllTransactionsByYear = async (user_id, year) => {
  return await Transaction.findAll({
    where: {
      user_id,
      [Op.and]: [
        Sequelize.where(fn("date_part", "year", col("transaction_date")), year),
      ],
    },
    order: [["transaction_date", "DESC"]],
  });
};

export {
  addTransaction,
  editTransaction,
  deleteTransaction,
  getTransactionDetail,
  getAllTransactions,
  getIncomeTransactions,
  getExpenseTransactions,
  getTransactionsByCategoryId,
  getAllTransactionsByPeriod,
  getAllTransactionsByYear,
};
