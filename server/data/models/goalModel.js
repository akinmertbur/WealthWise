// server/data/models/goalModel.js
import { DataTypes } from "sequelize";
import sequelize from "../database/dbConfig.js";

const Goal = sequelize.define(
  "Goal",
  {
    goal_id: {
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
    goal_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    target_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    current_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    priority_level: {
      type: DataTypes.ENUM("low", "medium", "high"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("in-progress", "completed", "failed"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Goal;
