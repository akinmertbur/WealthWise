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
import {
  updateActualAmount,
  retrieveBudgetByCategoryId,
} from "./budgetService.js";

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

    await computeActualAmount(categoryId, transactionDate, amount, null);

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

    await computeActualAmount(
      categoryId,
      transactionDate,
      amount,
      transactionId
    );

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

// Helper function to extract month and year from a date
const getMonthAndYear = (date) => {
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const year = date.getFullYear();
  return { month, year };
};

// Helper function to compute the actual amount
const computeActualAmount = async (
  categoryId,
  transactionDate,
  amount,
  transactionId
) => {
  try {
    // Create a new Date object
    const date = new Date(transactionDate);
    // Extract the month and year
    const { month, year } = getMonthAndYear(date);

    // Retrieve the budget
    const budget = await retrieveBudgetByCategoryId(categoryId, month, year);

    // If the budget exists, actual amount is updated with the new amount
    if (budget) {
      // If the transaction will be updated,
      // calculate the net amount before performing the operation
      if (transactionId) {
        const transaction = await retrieveTransactionDetail(transactionId);
        const previousAmount = transaction.amount;
        amount -= previousAmount;
      }

      const newAmount = Number(budget.actual_amount) + Number(amount);
      await updateActualAmount(budget.budget_id, newAmount);
    }
  } catch (err) {
    throw new Error(`Error computing actual amount: ${err.message}`);
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
