// server/routes/transactionRoutes.js
import express from "express";
import { addTransaction } from "../controllers/transactionController.js";
import { validateAddTransaction } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/add", validateAddTransaction, addTransaction);
router.put("/edit");
router.delete("/delete");
