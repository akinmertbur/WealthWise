// server/data/repositories/categoryRepository.js
import Category from "../models/categoryModel.js";

const getAll = async () => {
  return await Category.findAll();
};

const getCategoryDetail = async (category_id) => {
  return await Category.findOne({ where: { category_id } });
};

export { getAll, getCategoryDetail };
