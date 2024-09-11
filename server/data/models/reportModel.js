// server/data/models/reportModel.js
import { DataTypes } from "sequelize";
import sequelize from "../database/dbConfig.js";

const Report = sequelize.define(
  "Report",
  {
    report_id: {
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
    report_type: {
      type: DataTypes.ENUM("monthly", "yearly"),
      allowNull: false,
    },
    report_data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Report;
