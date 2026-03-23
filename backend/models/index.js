const { sequelize } = require("../config/db");

const User = require("./user.model");
const Category = require("./category.model");
const Expense = require("./expense.model");
const Budget = require("./budget.model");

// Define Associations here to avoid circular dependencies

// 1. User <-> Expense
User.hasMany(Expense, { foreignKey: "user_id", onDelete: "CASCADE" });
Expense.belongsTo(User, { foreignKey: "user_id" });

// 2. Category <-> Expense
Category.hasMany(Expense, { foreignKey: "category_id", onDelete: "SET NULL" });
Expense.belongsTo(Category, { foreignKey: "category_id" });

// 3. User <-> Budget
User.hasMany(Budget, { foreignKey: "user_id", onDelete: "CASCADE" });
Budget.belongsTo(User, { foreignKey: "user_id" });

// 4. User <-> Category (Custom Categories)
User.hasMany(Category, { foreignKey: "user_id", onDelete: "CASCADE" });
Category.belongsTo(User, { foreignKey: "user_id" });

module.exports = {
  sequelize,
  User,
  Category,
  Expense,
  Budget,
};
