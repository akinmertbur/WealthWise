// server/controllers/transactionController.js
import {
  insertTransaction,
  updateTransaction,
  removeTransaction,
} from "../business/services/transactionService.js";
import { log, error } from "../utils/logger.js";

const addTransaction = async (req, res) => {
  try {
    const {
      userId,
      categoryId,
      amount,
      transactionType,
      description,
      transactionDate,
      currency,
    } = req.body;

    const result = await insertTransaction(
      userId,
      categoryId,
      amount,
      transactionType,
      description,
      transactionDate,
      currency
    );

    log(`Transaction added successfully!`);
    res.status(200).json({ message: `Transaction added successfully!` });
  } catch (err) {
    error(`Failed to add transaction: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const editTransaction = async (req, res) => {
  try {
    const {
      transactionId,
      userId,
      categoryId,
      amount,
      transactionType,
      description,
      transactionDate,
      currency,
    } = req.body;

    const result = await updateTransaction(
      transactionId,
      userId,
      categoryId,
      amount,
      transactionType,
      description,
      transactionDate,
      currency
    );

    log(`Transaction edited successfully!`);
    res.status(200).json({ message: `Transaction edited successfully!` });
  } catch (err) {
    error(`Failed to edit transaction: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const result = await removeTransaction(transactionId);

    log(`Transaction deleted successfully!`);
    res.status(200).json({ message: `Transaction deleted successfully!` });
  } catch (err) {
    error(`Failed to delete transaction: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export { addTransaction, editTransaction, deleteTransaction };
