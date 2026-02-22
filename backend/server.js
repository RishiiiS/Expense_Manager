require("dotenv").config();
const { sequelize } = require("./config/db");
const express = require("express");
const { connectDB } = require("./config/db");
require("./models/user.model");
require("./models/category.model");
require("./models/expense.model");
const app = express();
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middlewares/auth.middleware");
const categoryService = require("./services/category.service");
const categoryRoutes = require("./routes/category.routes");
const expenseRoutes = require("./routes/expense.routes");
app.use(express.json());

// Handle JSON parsing errors gracefully
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error("Bad JSON received:", err.message);
    return res.status(400).json({ error: "Invalid JSON payload format" });
  }
  next();
});
connectDB();
sequelize.sync({ alter: true })
  .then(async () => {
    console.log("Tables synced");
    await categoryService.seedDefaultCategories();
  })
  .catch((err) => console.error("Sync error:", err));

app.get("/", (req, res) => {
  res.send("MoneyTree API Running 🌳");
});

app.use("/api/v1/auth", authRoutes);

app.get("/api/v1/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user,
  });
});
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/expenses", expenseRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong! Please try again later." });
});
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});