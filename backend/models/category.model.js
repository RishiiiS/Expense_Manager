const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM("income", "expense"),
      allowNull: false,
      defaultValue: "expense", // 🔥 ADD THIS
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
  },
  {
    tableName: "categories",
    timestamps: true,
  }
);

module.exports = Category;