// server/routes/transactionRoutes.js
import express from "express";
import { addTransaction } from "../controllers/transactionController.js";
import { validateAddTransaction } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/add", validateAddTransaction, addTransaction); // Add a transaction
router.put("/edit");
router.delete("/delete");

export default router;
