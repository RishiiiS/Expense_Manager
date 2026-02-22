const budgetService = require("../services/budget.service");

class BudgetController {
    async setBudget(req, res) {
        try {
            const { month, year, monthly_limit } = req.body;
            const user_id = req.user.id;

            if (!month || !year || !monthly_limit) {
                return res.status(400).json({ error: "Month, year, and monthly_limit are required" });
            }

            const budget = await budgetService.setBudget({
                user_id,
                month,
                year,
                monthly_limit,
            });

            res.status(201).json({
                message: "Budget set successfully",
                budget,
            });
        } catch (error) {
            const statusCode = error.message === "Budget already exists for this month" ? 400 : 500;
            res.status(statusCode).json({ error: error.message });
        }
    }

    async getBudgetSummary(req, res) {
        try {
            // Month and year can be passed as query parameters, defaulting to current month/year
            const currentDate = new Date();
            const month = parseInt(req.query.month) || currentDate.getMonth() + 1;
            const year = parseInt(req.query.year) || currentDate.getFullYear();
            const user_id = req.user.id;

            const summary = await budgetService.getBudgetSummary({
                user_id,
                month,
                year,
            });

            res.status(200).json(summary);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new BudgetController();
