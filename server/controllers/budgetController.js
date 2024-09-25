// server/controllers/budgetController.js
import {
  insertBudget,
  updateBudget,
  removeBudget,
  retrieveBudgetDetail,
  retrieveAllBudgets,
  retrieveAllBudgetsByPeriod,
} from "../business/services/budgetService.js";
import { log, error } from "../utils/logger.js";

const addBudget = async (req, res) => {
  try {
    const {
      userId,
      categoryId,
      month,
      year,
      plannedAmount,
      actualAmount,
      carryoverAmount,
      budgetAlertThreshold,
    } = req.body;

    const result = await insertBudget(
      userId,
      categoryId,
      month,
      year,
      plannedAmount,
      actualAmount,
      carryoverAmount,
      budgetAlertThreshold
    );

    log(`Budget added successfully!`);
    res.status(200).json({ message: `Budget added successfully!` });
  } catch (err) {
    error(`Failed to add budget: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const editBudget = async (req, res) => {
  try {
    const {
      budgetId,
      userId,
      categoryId,
      month,
      year,
      plannedAmount,
      actualAmount,
      carryoverAmount,
      budgetAlertThreshold,
    } = req.body;

    const result = await updateBudget(
      budgetId,
      userId,
      categoryId,
      month,
      year,
      plannedAmount,
      actualAmount,
      carryoverAmount,
      budgetAlertThreshold
    );

    log(`Budget edited successfully!`);
    res.status(200).json({ message: `Budget edited successfully!` });
  } catch (err) {
    error(`Failed to edit budget: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const deleteBudget = async (req, res) => {
  try {
    const { budgetId } = req.body;

    const result = await removeBudget(budgetId);

    log(`Budget deleted successfully!`);
    res.status(200).json({ message: `Budget deleted successfully!` });
  } catch (err) {
    error(`Failed to delete budget: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const getBudgetDetail = async (req, res) => {
  try {
    const { budgetId } = req.body;

    const result = await retrieveBudgetDetail(budgetId);

    log(`Budget detail retrieved successfully!`);
    res.status(200).json({ result });
  } catch (err) {
    error(`Failed to retrieve budget detail: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const getAllBudgets = async (req, res) => {
  try {
    const { userId } = req.body;

    const result = await retrieveAllBudgets(userId);

    log(`All budgets retrieved successfully!`);
    res.status(200).json({ result });
  } catch (err) {
    error(`Failed to retrieve all budgets: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const getAllBudgetsByPeriod = async (req, res) => {
  try {
    const { userId, month, year } = req.body;

    const result = await retrieveAllBudgetsByPeriod(userId, month, year);

    log(`All budgets by period retrieved successfully!`);
    res.status(200).json({ result });
  } catch (err) {
    error(`Failed to retrieve all budgets by period: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export {
  addBudget,
  editBudget,
  deleteBudget,
  getBudgetDetail,
  getAllBudgets,
  getAllBudgetsByPeriod,
};
