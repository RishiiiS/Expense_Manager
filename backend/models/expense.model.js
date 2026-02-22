const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./user.model");
const Category = require("./category.model");

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
            allowNull: true,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Category,
                key: "id",
            },
            onDelete: "RESTRICT",
        },
    },
    {
        tableName: "expenses",
        timestamps: true,
    }
);

// Define Associations
User.hasMany(Expense, { foreignKey: "user_id" });
Expense.belongsTo(User, { foreignKey: "user_id" });

Category.hasMany(Expense, { foreignKey: "category_id" });
Expense.belongsTo(Category, { foreignKey: "category_id" });

module.exports = Expense;
