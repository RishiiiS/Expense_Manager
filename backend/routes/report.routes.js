const express = require("express");
const router = express.Router();
const reportController = require("../controllers/report.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Weekly report endpoint
router.get("/weekly", authMiddleware, reportController.getWeeklyReport);

module.exports = router;
