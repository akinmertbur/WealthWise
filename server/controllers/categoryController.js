// server/controllers/categoryController.js
import {
  getAllCategories,
  getCategory,
} from "../business/services/categoryService.js";
import { log, error } from "../utils/logger.js";

const getAll = async (req, res) => {
  try {
    const result = await getAllCategories();
    log(`All categories retrieved successfully!`);
    res.status(200).json({ result });
  } catch (err) {
    error(`Failed to retrieve all categories: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const getCategoryDetail = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const result = await getCategory(categoryId);

    log(`Category detail retrieved successfully!`);
    res.status(200).json({ result });
  } catch (err) {
    error(`Failed to retrieve category detail: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export { getAll, getCategoryDetail };
