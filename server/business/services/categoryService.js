// server/business/services/categoryService.js
import { getAll } from "../../data/repositories/categoryRepository.js";

const getAllCategories = async () => {
  try {
    return await getAll();
  } catch (err) {
    throw new Error(`Failed to get all categories: ${err.message}`);
  }
};

export { getAllCategories };
