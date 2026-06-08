// src/config/db.js – Sequelize (SQLite/MySQL) connection
const { Sequelize } = require("sequelize");
const path = require("path");

const dialect = process.env.DB_DIALECT || "sqlite";

let sequelize;

if (dialect === "sqlite") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_STORAGE || path.join(__dirname, "../../database.sqlite"),
    logging: process.env.NODE_ENV === "development" ? console.log : false,
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || "ignite_edulink",
    process.env.DB_USER || "root",
    process.env.DB_PASS || "",
    {
      host:    process.env.DB_HOST || "localhost",
      port:    Number(process.env.DB_PORT) || 3306,
      dialect: "mysql",
      logging: process.env.NODE_ENV === "development" ? console.log : false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );
}

let isConnected = false;

async function connectDB({ exitOnFail = false } = {}) {
  if (isConnected) return;
  try {
    await sequelize.authenticate();
    isConnected = true;
    console.log(`✅  Database connected via Sequelize (${dialect})`);

    // Sync all models — use alter only in development to avoid data loss in production
    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: true });
    } else {
      await sequelize.sync();
    }
    console.log("✅  Database tables synced");
  } catch (err) {
    // AggregateError wraps the real cause – print the full error
    const cause = err.cause || err;
    console.error("❌  Database connection failed:");
    console.error("    Code   :", cause.code    || "(unknown)");
    console.error("    Message:", cause.message  || err.message || String(err));
    if (dialect === "sqlite") {
      console.error("    Storage:", process.env.DB_STORAGE || path.join(__dirname, "../../database.sqlite"));
    } else {
      console.error("    Host   :", process.env.DB_HOST || "localhost");
      console.error("    Port   :", process.env.DB_PORT || 3306);
      console.error("    DB     :", process.env.DB_NAME || "ignite_edulink");
      console.error("    User   :", process.env.DB_USER || "root");
    }
    if (exitOnFail) {
      // Called from seed/CLI – crash so the error is visible
      throw cause;
    }
    console.log("⚠️   Running without database – data will NOT be persisted.");
    // Do NOT crash the HTTP server; routes will return graceful errors when DB is absent.
  }
}

module.exports = { sequelize, connectDB };
