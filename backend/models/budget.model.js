const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Budget = sequelize.define(
  "Budget",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },


    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    monthly_limit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "budgets",
    timestamps: true,
  }
);

module.exports = Budget;