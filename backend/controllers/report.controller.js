const reportService = require("../services/report.service");

class ReportController {
    async getWeeklyReport(req, res) {
        try {
            const userId = req.user.id;
            const report = await reportService.getWeeklyReport(userId);
            res.status(200).json(report);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ReportController();
