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
    async getUserExpenses(req, res) {
    try {
      const userId = req.user.id;

      const expenses = await expenseService.getUserExpenses(userId);

      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async deleteExpense(req, res) {
  try {
    const expenseId = req.params.id;
    const userId = req.user.id;

    await expenseService.deleteExpense(expenseId, userId);

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
}

module.exports = new ExpenseController();
