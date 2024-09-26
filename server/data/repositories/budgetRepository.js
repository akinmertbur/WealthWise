// server/data/repositories/budgetRepository.js
import Budget from "../models/budgetModel.js";

const addBudget = async (budgetData) => {
  return await Budget.create(budgetData);
};

const editBudget = async (budgetData) => {
  return await Budget.update(budgetData, {
    where: { budget_id: budgetData.budget_id },
  });
};

const deleteBudget = async (budget_id) => {
  const row = await Budget.findOne({ where: { budget_id } });

  if (row) {
    await row.destroy(); // deletes the row
  }
};

const getBudgetDetail = async (budget_id) => {
  return await Budget.findOne({ where: { budget_id } });
};

const getAllBudgets = async (user_id) => {
  return await Budget.findAll({
    where: { user_id },
  });
};

const getAllBudgetsByPeriod = async (user_id, month, year) => {
  return await Budget.findAll({
    where: { user_id, month, year },
    order: [["category_id", "ASC"]],
  });
};

export {
  addBudget,
  editBudget,
  deleteBudget,
  getBudgetDetail,
  getAllBudgets,
  getAllBudgetsByPeriod,
};
