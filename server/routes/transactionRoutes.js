// server/routes/transactionRoutes.js
import express from "express";
import {
  addTransaction,
  editTransaction,
  deleteTransaction,
  getTransactionDetail,
  getAllTransactions,
} from "../controllers/transactionController.js";
import {
  validateAddTransaction,
  validateEditTransaction,
  validateDeleteTransaction,
  validateGetTransactionDetail,
  validateGetAllTransactions,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/add", validateAddTransaction, addTransaction); // Add a transaction
router.put("/edit", validateEditTransaction, editTransaction); // Edit the transaction
router.delete("/delete", validateDeleteTransaction, deleteTransaction); // Delete the transaction
router.post(
  "/getTransaction",
  validateGetTransactionDetail,
  getTransactionDetail
); // Get transaction based on the transaction ID
router.post("/getAll", validateGetAllTransactions, getAllTransactions); // Get all transactions based on the user ID

export default router;
