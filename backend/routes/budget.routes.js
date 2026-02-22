const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budget.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, budgetController.setBudget);
router.get("/", authMiddleware, budgetController.getBudgetSummary);

module.exports = router;
