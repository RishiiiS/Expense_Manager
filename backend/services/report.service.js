const Expense = require("../models/expense.model");
const Category = require("../models/category.model");
const { Op } = require("sequelize");
const { sequelize } = require("../config/db");

class ReportService {
    async getWeeklyReport(userId) {
        // Calculate current date and start/end of the current week (assuming Monday start)
        const currentDate = new Date();
        const currentDay = currentDate.getDay(); // 0 is Sunday, 1 is Monday...
        const diffToMonday = currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1);

        const startOfWeek = new Date(currentDate.setDate(diffToMonday));
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        // Calculate start/end of the previous week
        const startOfPrevWeek = new Date(startOfWeek);
        startOfPrevWeek.setDate(startOfWeek.getDate() - 7);

        const endOfPrevWeek = new Date(endOfWeek);
        endOfPrevWeek.setDate(endOfWeek.getDate() - 7);

        // 1. Total spent this week
        const totalSpentThisWeekResult = await Expense.sum("amount", {
            where: {
                user_id: userId,
                date: {
                    [Op.between]: [startOfWeek, endOfWeek],
                },
            },
        });
        const totalSpentThisWeek = totalSpentThisWeekResult || 0;

        // 2. Spending grouped by category this week
        const categorySpendingRaw = await Expense.findAll({
            attributes: [
                "category_id",
                [sequelize.fn("SUM", sequelize.col("amount")), "total_amount"],
            ],
            where: {
                user_id: userId,
                date: {
                    [Op.between]: [startOfWeek, endOfWeek],
                },
            },
            include: [
                {
                    model: Category,
                    attributes: ["name"],
                },
            ],
            group: ["category_id", "Category.id"],
        });

        // Format the category spending nicely
        const categorySpending = categorySpendingRaw.map((record) => {
            const jsonRecord = record.toJSON();
            return {
                category_name: jsonRecord.Category?.name || "Unknown",
                total_amount: jsonRecord.total_amount,
            };
        });

        // 3. Compare with previous week
        const totalSpentPrevWeekResult = await Expense.sum("amount", {
            where: {
                user_id: userId,
                date: {
                    [Op.between]: [startOfPrevWeek, endOfPrevWeek],
                },
            },
        });
        const totalSpentPrevWeek = totalSpentPrevWeekResult || 0;

        let comparisonMessage = "";
        let trend = "neutral";
        if (totalSpentPrevWeek > 0) {
            const diff = totalSpentThisWeek - totalSpentPrevWeek;
            const percentageDiff = ((diff / totalSpentPrevWeek) * 100).toFixed(2);
            if (diff > 0) {
                trend = "up";
                comparisonMessage = `You spent ${percentageDiff}% more than last week.`;
            } else if (diff < 0) {
                trend = "down";
                comparisonMessage = `You spent ${Math.abs(percentageDiff)}% less than last week.`;
            } else {
                trend = "neutral";
                comparisonMessage = `You spent the exact same amount as last week.`;
            }
        } else {
            trend = "neutral";
            comparisonMessage = `No spending data from previous week for comparison.`;
        }

        return {
            current_week: {
                start: startOfWeek.toISOString().split("T")[0],
                end: endOfWeek.toISOString().split("T")[0],
                total_spent: totalSpentThisWeek,
            },
            previous_week: {
                start: startOfPrevWeek.toISOString().split("T")[0],
                end: endOfPrevWeek.toISOString().split("T")[0],
                total_spent: totalSpentPrevWeek,
            },
            comparison: {
                trend: trend,
                message: comparisonMessage,
            },
            category_spending: categorySpending,
        };
    }
}

module.exports = new ReportService();
