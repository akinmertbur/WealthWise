import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js";
import Category from "../models/categoryModel.js";
import Goal from "../models/goalModel.js";
import Budget from "../models/budgetModel.js";
import Report from "../models/reportModel.js";

// User has many Transactions
User.hasMany(Transaction, { foreignKey: "user_id", onDelete: "CASCADE" });
Transaction.belongsTo(User, { foreignKey: "user_id" });

// User has many Goals
User.hasMany(Goal, { foreignKey: "user_id", onDelete: "CASCADE" });
Goal.belongsTo(User, { foreignKey: "user_id" });

// User has many Budgets
User.hasMany(Budget, { foreignKey: "user_id", onDelete: "CASCADE" });
Budget.belongsTo(User, { foreignKey: "user_id" });

// Budget belongs to Category
Budget.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Budget, { foreignKey: "category_id" });

// User has many Reports
User.hasMany(Report, { foreignKey: "user_id", onDelete: "CASCADE" });
Report.belongsTo(User, { foreignKey: "user_id" });

// Category has many Transactions
Category.hasMany(Transaction, { foreignKey: "category_id" });
Transaction.belongsTo(Category, { foreignKey: "category_id" });

// Sync associations
export default async () => {
  await sequelize.sync({ force: false });
};
