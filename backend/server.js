require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");
const { sequelize } = require("./models");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middlewares/auth.middleware");
const categoryService = require("./services/category.service");
const categoryRoutes = require("./routes/category.routes");
const expenseRoutes = require("./routes/expense.routes");
const budgetRoutes = require("./routes/budget.routes");
const reportRoutes = require("./routes/report.routes");
const analyticsRoutes = require("./routes/analytics.routes");

app.use(express.json());

let isDbReady = false;

// Support comma-separated origins: e.g. "https://foo.vercel.app,https://bar.vercel.app"
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  ...(process.env.ALLOWED_ORIGIN ? process.env.ALLOWED_ORIGIN.split(',').map(o => o.trim()) : []),
].filter(Boolean);

console.log('CORS allowed origins:', allowedOrigins);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.warn(`CORS blocked origin: ${origin}`);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));

// Handle JSON parsing errors gracefully
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error("Bad JSON received:", err.message);
    return res.status(400).json({ error: "Invalid JSON payload format" });
  }
  next();
});

// Health/readiness endpoints (useful for Render and uptime checks)
app.get("/healthz", (req, res) => {
  res.status(isDbReady ? 200 : 503).json({ ok: true, dbReady: isDbReady });
});

app.get("/", (req, res) => {
  res.status(isDbReady ? 200 : 503).send("MoneyTree API Running");
});

// If DB is not ready, keep the service up but block API routes
app.use((req, res, next) => {
  if (isDbReady) return next();
  if (req.path === "/" || req.path === "/healthz") return next();
  return res.status(503).json({ error: "Service is starting up. Please retry shortly." });
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
app.use("/api/v1/budgets", budgetRoutes);
app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/analytics", analyticsRoutes);


// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong! Please try again later." });
});
const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    await connectDB();
    await sequelize.sync({ force: false });
    console.log("Tables synced");
    await categoryService.seedDefaultCategories();
    isDbReady = true;
  } catch (err) {
    console.error("Startup error:", err);
    // Keep the process alive (so the port stays bound) but report 503 until DB is healthy.
    // This avoids Render failing the deploy solely due to DB cold-start/network delays.
    isDbReady = false;
  }
};

startServer();
