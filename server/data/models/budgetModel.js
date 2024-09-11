// server/data/models/budgetModel.js
import { DataTypes } from "sequelize";
import sequelize from "../database/dbConfig.js";

const Budget = sequelize.define(
  "Budget",
  {
    budget_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categories",
        key: "category_id",
      },
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    planned_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    actual_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    carryover_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    budget_alert_threshold: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default Budget;
