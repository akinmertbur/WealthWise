// server/routes/transactionRoutes.js
import express from "express";
import {
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import {
  validateAddTransaction,
  validateEditTransaction,
  validateDeleteTransaction,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/add", validateAddTransaction, addTransaction); // Add a transaction
router.put("/edit", validateEditTransaction, editTransaction); // Edit the transaction
router.delete("/delete", validateDeleteTransaction, deleteTransaction); // Delete the transaction

export default router;
