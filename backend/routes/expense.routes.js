const express = require("express");
const expenseController = require("../controllers/expense.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Protected Add Expense route.
router.post("/", authMiddleware, expenseController.createExpense);

module.exports = router;
