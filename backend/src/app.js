// src/app.js – Express application setup & middleware
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

// ── Route imports ──────────────────────────────────────────────────────────
const authRoutes          = require("./routes/auth");
const consultationRoutes  = require("./routes/consultations");
const contactRoutes       = require("./routes/contact");
const newsletterRoutes    = require("./routes/newsletter");
const blogRoutes          = require("./routes/blog");
const eventRoutes         = require("./routes/events");
const universityRoutes    = require("./routes/universities");
const calculatorRoutes    = require("./routes/calculator");
const dashboardRoutes     = require("./routes/dashboard");

const app = express();

// ── Security & logging middleware ─────────────────────────────────────────
app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

// ── CORS ──────────────────────────────────────────────────────────────────
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];
app.use(cors({
  origin: (origin, cb) => {
    console.log(`CORS request from origin: ${origin} (Allowed: ${allowedOrigins.join(", ")})`);
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
}));

// ── Body parsing ──────────────────────────────────────────────────────────
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// ── Global rate limiter ───────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Too many requests, please try again later." },
});
app.use("/api", limiter);

// ── Stricter limiter for write endpoints ──────────────────────────────────
const writeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,   // 1 hour
  max: 30,
  message: { success: false, message: "Submission limit reached. Try again in an hour." },
});

// ── Health check ──────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "Ignite Edulink API is healthy 🟢", timestamp: new Date().toISOString() });
});

// ── Mount routes ──────────────────────────────────────────────────────────
app.use("/api/auth",          writeLimiter, authRoutes);
app.use("/api/consultations", writeLimiter, consultationRoutes);
app.use("/api/contact",       writeLimiter, contactRoutes);
app.use("/api/newsletter",    writeLimiter, newsletterRoutes);
app.use("/api/blog",          blogRoutes);
app.use("/api/events",        eventRoutes);
app.use("/api/universities",  universityRoutes);
app.use("/api/calculator",    calculatorRoutes);
app.use("/api/dashboard",     dashboardRoutes);

// ── 404 ───────────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found." });
});

// ── Global error handler ──────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error("❌ Unhandled error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error.",
  });
});

module.exports = app;
