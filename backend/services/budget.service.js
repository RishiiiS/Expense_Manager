const Budget = require("../models/budget.model");
const Expense = require("../models/expense.model");
const { Op } = require("sequelize");

class BudgetService {
    async setBudget({ user_id, month, year, monthly_limit }) {
        const existingBudget = await Budget.findOne({
            where: { user_id, month, year }
        });

        if (existingBudget) {
            throw new Error("Budget already exists for this month");
        }

        const budget = await Budget.create({
            user_id,
            month,
            year,
            monthly_limit,
        });

        return budget;
    }

    async getBudgetSummary({ user_id, month, year }) {
        // 1. Get the budget limit
        const budget = await Budget.findOne({
            where: { user_id, month, year },
        });

        if (!budget) {
            return { message: "No budget set for this month" };
        }

        // 2. Calculate total spent in that month and year
        // Create date range for the month
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0); // Last day of the month

        const totalSpentResult = await Expense.sum("amount", {
            where: {
                user_id,
                date: {
                    [Op.between]: [startDate, endDate],
                },
            },
        });

        const totalSpent = totalSpentResult || 0;
        const remaining = budget.monthly_limit - totalSpent;
        const percentageUsed = budget.monthly_limit > 0
            ? ((totalSpent / budget.monthly_limit) * 100).toFixed(2)
            : 0;

        return {
            budget_limit: budget.monthly_limit,
            total_spent: totalSpent,
            remaining: remaining,
            percentage_used: `${percentageUsed}%`,
        };
    }
}

module.exports = new BudgetService();
