const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const MonthlyBalance = sequelize.define(
  "MonthlyBalance",
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

    starting_balance: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    tableName: "monthly_balances",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'month', 'year']
      }
    ]
  }
);

module.exports = MonthlyBalance;
