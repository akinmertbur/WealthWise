// server/business/services/transactionService.js
import {
  addTransaction,
  editTransaction,
  deleteTransaction,
  getTransactionDetail,
  getAllTransactions,
  getIncomeTransactions,
  getExpenseTransactions,
  getTransactionsByCategoryId,
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
      throw new Error(
        "There are missing transaction values! Enter all the input values!"
      );
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
      throw new Error(
        "There are missing transaction values! Enter all the input values!"
      );
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

const retrieveTransactionDetail = async (transactionId) => {
  try {
    // Check whether transactionId is entered
    if (!transactionId) {
      throw new Error(
        "Transaction Id is required for getting transaction detail!"
      );
    }

    return await getTransactionDetail(transactionId);
  } catch (err) {
    throw new Error(`Failed to retrieve transaction detail: ${err.message}`);
  }
};

const retrieveAllTransactions = async (userId) => {
  try {
    // Check whether userId is entered
    if (!userId) {
      throw new Error("User Id is required for getting all transactions!");
    }

    return await getAllTransactions(userId);
  } catch (err) {
    throw new Error(`Failed to retrieve all transactions: ${err.message}`);
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

const retrieveTransactionsByCategoryId = async (userId, categoryId) => {
  try {
    // Check whether all the input values are entered
    if (!userId || !categoryId) {
      throw new Error(
        "There are missing transaction values! Enter all the input values!"
      );
    }

    return await getTransactionsByCategoryId(userId, categoryId);
  } catch (err) {
    throw new Error(
      `Failed to retrieve all transactions by category Id: ${err.message}`
    );
  }
};

const filterTransactionsByDate = async (transactions, month, year) => {
  try {
    // Check whether transactions, month and year values are entered
    if (!transactions || !month || !year) {
      throw new Error(
        "Transactions, month and year are required inputs for filtering transactions by date!"
      );
    }

    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.transaction_date);
      const targetDate = new Date(Date.UTC(year, month - 1)); // month is 0-indexed in JavaScript Date

      // Compare year and month
      return (
        transactionDate.getUTCFullYear() === targetDate.getUTCFullYear() &&
        transactionDate.getUTCMonth() === targetDate.getUTCMonth()
      );
    });

    return filteredTransactions;
  } catch (err) {
    throw new Error(`Failed to filter transactions by date: ${err.message}`);
  }
};

export {
  insertTransaction,
  updateTransaction,
  removeTransaction,
  retrieveTransactionDetail,
  retrieveAllTransactions,
  retrieveIncomeTransactions,
  retrieveExpenseTransactions,
  retrieveTransactionsByCategoryId,
  filterTransactionsByDate,
};
