const Category = require("../models/category.model");

class CategoryService {
  async seedDefaultCategories() {
    const count = await Category.count();
    if (count > 0) return;

    const defaultCategories = [
      "Food",
      "Travel",
      "Bills",
      "Shopping",
      "Entertainment",
      "Health",
      "Other",
    ];

    await Category.bulkCreate(
      defaultCategories.map((name) => ({ name }))
    );

    console.log("Default categories seeded");
  }

  async getAllCategories() {
    return await Category.findAll();
  }
}

module.exports = new CategoryService();