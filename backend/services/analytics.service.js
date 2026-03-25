const { Op, fn, col } = require("sequelize");
const Transaction = require("../models/expense.model"); // or transactions model
const Category = require("../models/category.model");
const MonthlyBalance = require("../models/monthly_balance.model");

class AnalyticsService {
  async setStartingBalance(userId, month, year, startingBalance) {
    const [record] = await MonthlyBalance.findOrCreate({
      where: { user_id: userId, month, year },
      defaults: { starting_balance: startingBalance }
    });
    if (record && !record.isNewRecord) {
      record.starting_balance = startingBalance;
      await record.save();
    }
    return record;
  }

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

    // 🔹 Starting Balance
    const balanceRecord = await MonthlyBalance.findOne({
      where: { user_id: userId, month, year },
    });
    const starting_balance = balanceRecord ? parseFloat(balanceRecord.starting_balance) : 0.00;

    const computedTotalIncome = parseFloat(totalIncome || 0);
    const computedTotalExpense = parseFloat(totalExpense || 0);
    const current_balance = starting_balance + computedTotalIncome - computedTotalExpense;

    return {
      starting_balance,
      current_balance,
      total_savings: current_balance,
      totalIncome: computedTotalIncome,
      totalExpense: computedTotalExpense,
      balance: computedTotalIncome - computedTotalExpense,
      savings: computedTotalIncome - computedTotalExpense,
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