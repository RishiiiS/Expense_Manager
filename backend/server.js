require("dotenv").config();
const { sequelize } = require("./config/db");
const express = require("express");
const { connectDB } = require("./config/db");
require("./models/user.model");
const app = express();
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middlewares/auth.middleware");

app.use(express.json());

connectDB();
sequelize.sync({ alter: true })
  .then(() => console.log("Tables synced"))
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

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});