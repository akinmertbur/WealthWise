// server/routes/budgetRoutes.js
import express from "express";
import {
  addBudget,
  editBudget,
  deleteBudget,
  getBudgetDetail,
  getAllBudgets,
  getAllBudgetsByPeriod,
} from "../controllers/budgetController.js";
import {
  validateAddBudget,
  validateEditBudget,
  validateDeleteBudget,
  validateGetBudgetDetail,
  validateGetAllBudgets,
  validateGetAllBudgetsByPeriod,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/add", validateAddBudget, addBudget);
router.put("/edit", validateEditBudget, editBudget);
router.delete("/delete", validateDeleteBudget, deleteBudget);
router.post("/getBudget", validateGetBudgetDetail, getBudgetDetail);
router.post("/getAll", validateGetAllBudgets, getAllBudgets);
router.post(
  "/getAllByPeriod",
  validateGetAllBudgetsByPeriod,
  getAllBudgetsByPeriod
);

export default router;
