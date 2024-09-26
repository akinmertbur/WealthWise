// server/routes/categoryRoutes.js
import express from "express";
import {
  getAll,
  getCategoryDetail,
} from "../controllers/categoryController.js";
import { validateGetCategoryDetail } from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/getAll", getAll); // Get all categories
router.post("/getCategory", validateGetCategoryDetail, getCategoryDetail); // Get category detail based on category ID

export default router;
