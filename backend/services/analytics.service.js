const { Op, fn, col } = require("sequelize");
const Transaction = require("../models/expense.model"); // or transactions model
const Category = require("../models/category.model");

class AnalyticsService {
  async getAnalytics(userId, month, year) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    // 🔹 Total Income
    const totalIncome = await Transaction.sum("amount", {
      where: {
        user_id: userId,
        type: "income",
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    // 🔹 Total Expense
    const totalExpense = await Transaction.sum("amount", {
      where: {
        user_id: userId,
        type: "expense",
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    // 🔹 Top Category
    const topCategory = await Transaction.findAll({
      attributes: [
        "category_id",
        [fn("SUM", col("amount")), "total"],
      ],
      where: {
        user_id: userId,
        type: "expense",
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: {
        model: Category,
        attributes: ["name"],
      },
      group: ["category_id", "Category.id"],
      order: [[fn("SUM", col("amount")), "DESC"]],
      limit: 1,
    });

    return {
      totalIncome: totalIncome || 0,
      totalExpense: totalExpense || 0,
      balance: (totalIncome || 0) - (totalExpense || 0),
      savings: (totalIncome || 0) - (totalExpense || 0),
      topCategory: topCategory[0]
        ? {
            name: topCategory[0].Category.name,
            amount: topCategory[0].get("total"),
          }
        : null,
    };
  }
}

module.exports = new AnalyticsService();