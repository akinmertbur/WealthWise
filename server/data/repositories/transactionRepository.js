// server/data/repositories/transactionRepository.js
import Transaction from "../models/transactionModel.js";

const addTransaction = async (transactionData) => {
  return await Transaction.create(transactionData);
};

export { addTransaction };
