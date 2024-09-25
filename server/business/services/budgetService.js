// server/business/services/budgetService.js
import {
  addBudget,
  editBudget,
  deleteBudget,
  getBudgetDetail,
  getAllBudgets,
  getAllBudgetsByPeriod,
} from "../../data/repositories/budgetRepository.js";

const insertBudget = async (
  userId,
  categoryId,
  month,
  year,
  plannedAmount,
  actualAmount,
  carryoverAmount,
  budgetAlertThreshold
) => {
  try {
    // Check whether all the input values are entered
    if (
      !userId ||
      !categoryId ||
      !month ||
      !year ||
      !plannedAmount ||
      !actualAmount ||
      !carryoverAmount ||
      !budgetAlertThreshold
    ) {
      throw new Error(
        "There are missing budget values! Enter all the input values!"
      );
    }

    return await addBudget({
      user_id: userId,
      category_id: categoryId,
      month,
      year,
      planned_amount: plannedAmount,
      actual_amount: actualAmount,
      carryover_amount: carryoverAmount,
      budget_alert_threshold: budgetAlertThreshold,
    });
  } catch (err) {
    throw new Error(`Failed to add budget: ${err.message}`);
  }
};

const updateBudget = async (
  budgetId,
  userId,
  categoryId,
  month,
  year,
  plannedAmount,
  actualAmount,
  carryoverAmount,
  budgetAlertThreshold
) => {
  try {
    // Check whether all the input values are entered
    if (
      !budgetId ||
      !userId ||
      !categoryId ||
      !month ||
      !year ||
      !plannedAmount ||
      !actualAmount ||
      !carryoverAmount ||
      !budgetAlertThreshold
    ) {
      throw new Error(
        "There are missing budget values! Enter all the input values!"
      );
    }

    return await editBudget({
      budget_id: budgetId,
      user_id: userId,
      category_id: categoryId,
      month,
      year,
      planned_amount: plannedAmount,
      actual_amount: actualAmount,
      carryover_amount: carryoverAmount,
      budget_alert_threshold: budgetAlertThreshold,
    });
  } catch (err) {
    throw new Error(`Failed to edit budget: ${err.message}`);
  }
};

const removeBudget = async (budgetId) => {
  try {
    // Check whether budgetId is entered
    if (!budgetId) {
      throw new Error("Budget Id is required for deletion of the budget!");
    }

    return await deleteBudget(budgetId);
  } catch (err) {
    throw new Error(`Failed to delete budget: ${err.message}`);
  }
};

const retrieveBudgetDetail = async (budgetId) => {
  try {
    // Check whether budgetId is entered
    if (!budgetId) {
      throw new Error("Budget Id is required for getting budget detail!");
    }

    return await getBudgetDetail(budgetId);
  } catch (err) {
    throw new Error(`Failed to retrieve budget detail: ${err.message}`);
  }
};

const retrieveAllBudgets = async (userId) => {
  try {
    // Check whether userId is entered
    if (!userId) {
      throw new Error("User Id is required for getting all budgets!");
    }

    return await getAllBudgets(userId);
  } catch (err) {
    throw new Error(`Failed to retrieve all budgets: ${err.message}`);
  }
};

const retrieveAllBudgetsByPeriod = async (userId, month, year) => {
  try {
    if (!userId || !month || !year) {
      throw new Error(
        "User Id, month and year are required for getting all budgets by period!"
      );
    }

    return await getAllBudgetsByPeriod(userId, month, year);
  } catch (err) {
    throw new Error(`Failed to retrieve all budgets by period: ${err.message}`);
  }
};

export {
  insertBudget,
  updateBudget,
  removeBudget,
  retrieveBudgetDetail,
  retrieveAllBudgets,
  retrieveAllBudgetsByPeriod,
};
