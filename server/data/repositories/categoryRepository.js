// server/data/repositories/categoryRepository.js
import Category from "../models/categoryModel.js";

const getAll = async () => {
  return await Category.findAll();
};

export { getAll };
