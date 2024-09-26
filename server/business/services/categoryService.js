// server/business/services/categoryService.js
import {
  getAll,
  getCategoryDetail,
} from "../../data/repositories/categoryRepository.js";

const getAllCategories = async () => {
  try {
    return await getAll();
  } catch (err) {
    throw new Error(`Failed to get all categories: ${err.message}`);
  }
};

const getCategory = async (categoryId) => {
  try {
    // Check whether categoryId is entered
    if (!categoryId) {
      throw new Error("Category Id is required for getting category detail!");
    }

    return await getCategoryDetail(categoryId);
  } catch (err) {
    throw new Error(`Failed to get category detail: ${err.message}`);
  }
};

export { getAllCategories, getCategory };
