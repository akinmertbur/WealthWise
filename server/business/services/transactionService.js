// server/business/services/transactionService.js
import {
  addTransaction,
  editTransaction,
  deleteTransaction,
  getIncomeTransactions,
  getExpenseTransactions,
} from "../../data/repositories/transactionRepository.js";

const insertTransaction = async (
  userId,
  categoryId,
  amount,
  transactionType,
  description,
  transactionDate,
  currency
) => {
  try {
    // Check whether all the input values are entered
    if (
      !userId ||
      !categoryId ||
      !amount ||
      !transactionType ||
      !description ||
      !transactionDate ||
      !currency
    ) {
      throw new Error("There are missing values! Enter all the input values!");
    }

    return await addTransaction({
      user_id: userId,
      category_id: categoryId,
      amount,
      transaction_type: transactionType,
      description,
      transaction_date: transactionDate,
      currency,
    });
  } catch (err) {
    throw new Error(`Failed to add transaction: ${err.message}`);
  }
};

const updateTransaction = async (
  transactionId,
  userId,
  categoryId,
  amount,
  transactionType,
  description,
  transactionDate,
  currency
) => {
  try {
    // Check whether all the input values are entered
    if (
      !transactionId ||
      !userId ||
      !categoryId ||
      !amount ||
      !transactionType ||
      !description ||
      !transactionDate ||
      !currency
    ) {
      throw new Error("There are missing values! Enter all the input values!");
    }

    return await editTransaction({
      transaction_id: transactionId,
      user_id: userId,
      category_id: categoryId,
      amount,
      transaction_type: transactionType,
      description,
      transaction_date: transactionDate,
      currency,
    });
  } catch (err) {
    throw new Error(`Failed to update transaction: ${err.message}`);
  }
};

const removeTransaction = async (transactionId) => {
  try {
    // Check whether transactionId is entered
    if (!transactionId) {
      throw new Error(
        "Transaction Id is required for deletion of the transaction!"
      );
    }

    return await deleteTransaction(transactionId);
  } catch (err) {
    throw new Error(`Failed to remove transaction: ${err.message}`);
  }
};

const retrieveIncomeTransactions = async () => {
  try {
    return await getIncomeTransactions();
  } catch (err) {
    throw new Error(
      `Failed to retrieve the income transactions: ${err.message}`
    );
  }
};

const retrieveExpenseTransactions = async () => {
  try {
    return await getExpenseTransactions();
  } catch (err) {
    throw new Error(
      `Failed to retrieve the expense transactions: ${err.message}`
    );
  }
};

export {
  insertTransaction,
  updateTransaction,
  removeTransaction,
  retrieveIncomeTransactions,
  retrieveExpenseTransactions,
};
