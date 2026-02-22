const expenseService = require("../services/expense.service");

class ExpenseController {
    async createExpense(req, res) {
        try {
            const { amount, description, date, category_id } = req.body;
            const user_id = req.user.id;

            if (!amount || !date || !category_id) {
                return res.status(400).json({ error: "Amount, date, and category_id are required" });
            }

            const expense = await expenseService.createExpense({
                amount,
                description,
                date,
                user_id,
                category_id,
            });

            res.status(201).json({
                message: "Expense added successfully",
                expense,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new ExpenseController();
