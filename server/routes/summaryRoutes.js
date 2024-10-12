// server/routes/summaryRoutes.js
import express from "express";
import { getTransactionsSummary } from "../controllers/summaryController.js";
import { validateSummary } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/", validateSummary, getTransactionsSummary);

export default router;
