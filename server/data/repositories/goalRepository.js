// server/data/repositories/goalRepository.js
import Goal from "../models/goalModel.js";

const addGoal = async (goalData) => {
  return await Goal.create(goalData);
};

const editGoal = async (goalData) => {
  return await Goal.update(goalData, { where: { goal_id: goalData.goal_id } });
};

const deleteGoal = async (goal_id) => {
  const row = await Goal.findOne({ where: { goal_id } });

  if (row) {
    await row.destroy(); // deletes the row
  }
};

const getGoalDetail = async (goal_id) => {
  return await Goal.findOne({ where: { goal_id } });
};

const getAllGoals = async (user_id) => {
  return await Goal.findAll({
    where: { user_id },
    order: [["deadline", "ASC"]],
  });
};

const editCurrentAmount = async (goal_id, current_amount) => {
  return await Goal.update({ current_amount }, { where: { goal_id } });
};

export {
  addGoal,
  editGoal,
  deleteGoal,
  getGoalDetail,
  getAllGoals,
  editCurrentAmount,
};
