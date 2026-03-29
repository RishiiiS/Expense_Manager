const { Sequelize } = require("sequelize");

const isSslDisabled = String(process.env.DB_SSL || '').toLowerCase() === 'false';

const baseSequelizeOptions = {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ...(isSslDisabled
      ? {}
      : {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }),
    connectTimeout: 60000, // 60s – survive cold-starts
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 60000, // wait up to 60s for a connection from pool
    idle: 10000,
  },
};

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, baseSequelizeOptions)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        ...baseSequelizeOptions,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
      }
    );

const connectDB = async (retries = 5, delay = 3000) => {
  for (let i = 1; i <= retries; i++) {
    try {
      await sequelize.authenticate();
      console.log("PostgreSQL Connected");
      return;
    } catch (error) {
      console.error(`DB connection attempt ${i}/${retries} failed:`, error.message);
      if (i === retries) {
        console.error("Could not connect to DB after multiple retries. Exiting.");
        process.exit(1);
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

module.exports = { sequelize, connectDB };
