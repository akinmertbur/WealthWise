// server/routes/goalRoutes.js
import express from "express";
import {
  addGoal,
  editGoal,
  deleteGoal,
  getGoalDetail,
  getAllGoals,
  editCurrentAmount,
} from "../controllers/goalController.js";
import {
  validateAddGoal,
  validateEditGoal,
  validateDeleteGoal,
  validateGetGoalDetail,
  validateGetAllGoals,
  validateEditCurrentAmount,
} from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.post("/add", validateAddGoal, addGoal);
router.put("/edit", validateEditGoal, editGoal);
router.delete("/delete", validateDeleteGoal, deleteGoal);
router.post("/getGoal", validateGetGoalDetail, getGoalDetail);
router.post("/getAll", validateGetAllGoals, getAllGoals);
router.patch(
  "/editCurrentAmount",
  validateEditCurrentAmount,
  editCurrentAmount
);

export default router;
