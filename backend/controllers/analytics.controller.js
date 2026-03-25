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

  async setStartingBalance(req, res) {
    try {
      const userId = req.user.id;
      const { month, year, starting_balance } = req.body;

      if (!month || !year || starting_balance === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const data = await analyticsService.setStartingBalance(
        userId,
        parseInt(month),
        parseInt(year),
        parseFloat(starting_balance)
      );

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AnalyticsController();