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
}

module.exports = new ExpenseService();
