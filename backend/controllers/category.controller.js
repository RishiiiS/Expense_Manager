const categoryService = require("../services/category.service");

class CategoryController {
  async getAll(req, res) {
    try {
      const userId = req.user ? req.user.id : null;
      const categories = await categoryService.getAllCategories(userId);
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CategoryController();