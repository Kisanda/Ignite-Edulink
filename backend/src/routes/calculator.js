// src/routes/calculator.js
const express           = require("express");
const { fn, col, literal } = require("sequelize");
const CalculatorSession = require("../models/CalculatorSession");
const { protect }       = require("../middleware/auth");

const router = express.Router();

// ── POST /api/calculator/session  (public – track usage) ──────────────────
router.post("/session", async (req, res) => {
  try {
    const doc = await CalculatorSession.create({ ...req.body, ipAddress: req.ip });
    return res.status(201).json({ success: true, data: { id: doc.id } });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ── GET /api/calculator/stats  (admin) ────────────────────────────────────
router.get("/stats", protect, async (_req, res) => {
  try {
    const total = await CalculatorSession.count();

    const byCountry = await CalculatorSession.findAll({
      attributes: [
        ["country", "country"],
        [fn("COUNT", col("id")), "count"],
      ],
      group: ["country"],
      order: [[fn("COUNT", col("id")), "DESC"]],
      limit: 10,
      raw: true,
    });

    const avgRow = await CalculatorSession.findOne({
      attributes: [[fn("AVG", col("totalEstimate")), "avgEstimate"]],
      raw: true,
    });

    return res.json({
      success: true,
      data: {
        total,
        byCountry: byCountry.map(r => ({ _id: r.country, count: Number(r.count) })),
        avgEstimate: avgRow?.avgEstimate ? Number(avgRow.avgEstimate) : 0,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
