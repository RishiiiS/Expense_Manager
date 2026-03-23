const Category = require("../models/category.model");
const { Op } = require("sequelize");

class CategoryService {
  async seedDefaultCategories() {
    const count = await Category.count();
    if (count > 0) return;

    const defaultCategories = [
      { name: "Food", type: "expense" },
      { name: "Travel", type: "expense" },
      { name: "Bills", type: "expense" },
      { name: "Shopping", type: "expense" },
      { name: "Entertainment", type: "expense" },
      { name: "Health", type: "expense" },
      { name: "Other", type: "expense" },
      { name: "Salary", type: "income" },
      { name: "Freelance", type: "income" },
      { name: "Investments", type: "income" },
    ];

    await Category.bulkCreate(defaultCategories);

    console.log("Default categories seeded");
  }

  async getAllCategories(userId) {
    const whereClause = userId 
      ? { user_id: { [Op.or]: [null, userId] } }
      : { user_id: null };
      
    return await Category.findAll({
      where: whereClause
    });
  }
}

module.exports = new CategoryService();