const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Expense = sequelize.define(
  "Expense",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM("credit", "debit"),
      allowNull: false,
      defaultValue: "debit",
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "transactions",
    timestamps: true,
  }
);

module.exports = Expense;