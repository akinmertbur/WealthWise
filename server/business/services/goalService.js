// server/business/services/goalService.js
import {
  addGoal,
  editGoal,
  deleteGoal,
  getGoalDetail,
  getAllGoals,
} from "../../data/repositories/goalRepository.js";

const insertGoal = async (
  userId,
  goalName,
  targetAmount,
  currentAmount,
  deadline,
  priorityLevel,
  status
) => {
  try {
    // Check whether all the input values are entered
    if (
      !userId ||
      !goalName ||
      !targetAmount ||
      !currentAmount ||
      !deadline ||
      !priorityLevel ||
      !status
    ) {
      throw new Error(
        "There are missing goal values! Enter all the input values!"
      );
    }

    return await addGoal({
      user_id: userId,
      goal_name: goalName,
      target_amount: targetAmount,
      current_amount: currentAmount,
      deadline,
      priority_level: priorityLevel,
      status,
    });
  } catch (err) {
    throw new Error(`Failed to add goal: ${err.message}`);
  }
};

const updateGoal = async (
  goalId,
  userId,
  goalName,
  targetAmount,
  currentAmount,
  deadline,
  priorityLevel,
  status
) => {
  try {
    // Check whether all the input values are entered
    if (
      !goalId ||
      !userId ||
      !goalName ||
      !targetAmount ||
      !currentAmount ||
      !deadline ||
      !priorityLevel ||
      !status
    ) {
      throw new Error(
        "There are missing goal values! Enter all the input values!"
      );
    }

    return await editGoal({
      goal_id: goalId,
      user_id: userId,
      goal_name: goalName,
      target_amount: targetAmount,
      current_amount: currentAmount,
      deadline,
      priority_level: priorityLevel,
      status,
    });
  } catch (err) {
    throw new Error(`Failed to update goal: ${err.message}`);
  }
};

const removeGoal = async (goalId) => {
  try {
    // Check whether goalId is entered
    if (!goalId) {
      throw new Error("Goal Id is required for deletion of the goal!");
    }

    return await deleteGoal(goalId);
  } catch (err) {
    throw new Error(`Failed to remove goal: ${err.message}`);
  }
};

const retrieveGoalDetail = async (goalId) => {
  try {
    // Check whether goalId is entered
    if (!goalId) {
      throw new Error("Goal Id is required for getting goal detail!");
    }

    return await getGoalDetail(goalId);
  } catch (err) {
    throw new Error(`Failed to retrieve goal detail: ${err.message}`);
  }
};

const retrieveAllGoals = async (userId) => {
  try {
    // Check whether userId is entered
    if (!userId) {
      throw new Error("User Id is required for getting all goals!");
    }

    return await getAllGoals(userId);
  } catch (err) {
    throw new Error(`Failed to retrieve all goals: ${err.message}`);
  }
};

export {
  insertGoal,
  updateGoal,
  removeGoal,
  retrieveGoalDetail,
  retrieveAllGoals,
};
