// server/business/services/transactionService.js
import {
  addTransaction,
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
      throw new Error("There are missing values! Enter all input values!");
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
  retrieveIncomeTransactions,
  retrieveExpenseTransactions,
};
