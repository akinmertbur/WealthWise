// server/routes/summaryRoutes.js
import express from "express";
import { getTransactionsSummary } from "../controllers/summaryController.js";

const router = express.Router();

router.get("/", getTransactionsSummary);

export default router;
