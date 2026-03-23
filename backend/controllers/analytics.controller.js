const analyticsService = require("../services/analytics.service");

class AnalyticsController {
  async getAnalytics(req, res) {
    try {
      const userId = req.user.id;
      const { month, year } = req.query;

      const data = await analyticsService.getAnalytics(
        userId,
        parseInt(month),
        parseInt(year)
      );

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AnalyticsController();