// server/controllers/transactionController.js
import { insertTransaction } from "../business/services/transactionService.js";
import { log, error } from "../../utils/logger.js";

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

export { addTransaction };
