// server/controllers/goalController.js
import {
  insertGoal,
  updateGoal,
  removeGoal,
  retrieveGoalDetail,
  retrieveAllGoals,
  updateCurrentAmount,
} from "../business/services/goalService.js";
import { log, error } from "../utils/logger.js";

const addGoal = async (req, res) => {
  try {
    const {
      userId,
      goalName,
      targetAmount,
      currentAmount,
      deadline,
      priorityLevel,
      status,
    } = req.body;

    const result = await insertGoal(
      userId,
      goalName,
      targetAmount,
      currentAmount,
      deadline,
      priorityLevel,
      status
    );

    log(`Goal added successfully!`);
    res.status(200).json({ message: `Goal added successfully!` });
  } catch (err) {
    error(`Failed to add goal: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const editGoal = async (req, res) => {
  try {
    const {
      goalId,
      userId,
      goalName,
      targetAmount,
      currentAmount,
      deadline,
      priorityLevel,
      status,
    } = req.body;

    const result = await updateGoal(
      goalId,
      userId,
      goalName,
      targetAmount,
      currentAmount,
      deadline,
      priorityLevel,
      status
    );

    log(`Goal edited successfully!`);
    res.status(200).json({ message: `Goal edited successfully!` });
  } catch (err) {
    error(`Failed to edit goal: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const deleteGoal = async (req, res) => {
  try {
    const { goalId } = req.body;

    const result = await removeGoal(goalId);

    log(`Goal deleted successfully!`);
    res.status(200).json({ message: `Goal deleted successfully!` });
  } catch (err) {
    error(`Failed to delete goal: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const getGoalDetail = async (req, res) => {
  try {
    const { goalId } = req.body;

    const result = await retrieveGoalDetail(goalId);

    log(`Goal detail retrieved successfully!`);
    res.status(200).json({ result });
  } catch (err) {
    error(`Failed to retrieve goal detail: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const getAllGoals = async (req, res) => {
  try {
    const { userId } = req.body;

    const result = await retrieveAllGoals(userId);

    log(`All goals retrieved successfully!`);
    res.status(200).json({ result });
  } catch (err) {
    error(`Failed to retrieve all goals: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const editCurrentAmount = async (req, res) => {
  try {
    const { goalId, currentAmount } = req.body;

    const result = await updateCurrentAmount(goalId, currentAmount);

    log(`Current amount of the goal edited successfully!`);
    res.status(200).json({ result });
  } catch (err) {
    error(`Failed to edit current amount of the goal: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export {
  addGoal,
  editGoal,
  deleteGoal,
  getGoalDetail,
  getAllGoals,
  editCurrentAmount,
};
