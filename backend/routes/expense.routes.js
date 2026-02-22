const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, expenseController.createExpense);
router.get("/", authMiddleware, expenseController.getUserExpenses);

module.exports = router;