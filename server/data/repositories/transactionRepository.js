// server/data/repositories/transactionRepository.js
import Transaction from "../models/transactionModel.js";

const addTransaction = async (transactionData) => {
  return await Transaction.create(transactionData);
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

export { addTransaction, getIncomeTransactions, getExpenseTransactions };
