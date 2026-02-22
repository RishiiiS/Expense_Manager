const Expense = require("../models/expense.model");

class ExpenseService {
    async createExpense({ amount, description, date, user_id, category_id }) {
        const expense = await Expense.create({
            amount,
            description,
            date,
            user_id,
            category_id,
        });
        return expense;
    }
    async getUserExpenses(userId) {
    return await Expense.findAll({
      where: { user_id: userId },
      order: [["date", "DESC"]],
    });
  }
  async deleteExpense(expenseId, userId) {
  const deleted = await Expense.destroy({
    where: {
      id: expenseId,
      user_id: userId,
    },
  });

  if (!deleted) {
    throw new Error("Expense not found or unauthorized");
  }

  return true;
}
}

module.exports = new ExpenseService();
