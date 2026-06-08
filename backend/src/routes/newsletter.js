// src/routes/newsletter.js
const express    = require("express");
const { body, validationResult } = require("express-validator");
const Newsletter = require("../models/Newsletter");
const { protect } = require("../middleware/auth");

const router = express.Router();

// ── POST /api/newsletter/subscribe ───────────────────────────────────────
router.post("/subscribe", [body("email").isEmail().normalizeEmail()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, message: "Valid email required." });
  }
  try {
    const { email } = req.body;
    const [record, created] = await Newsletter.findOrCreate({
      where: { email: email.toLowerCase() },
      defaults: { email: email.toLowerCase(), isActive: true, subscribedAt: new Date() },
    });
    // Re-activate if previously unsubscribed (only update when necessary)
    if (!created && !record.isActive) {
      await record.update({ isActive: true, unsubscribedAt: null });
    }
    return res.json({ success: true, message: "Subscribed successfully!" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ── POST /api/newsletter/unsubscribe ─────────────────────────────────────
router.post("/unsubscribe", [body("email").isEmail().normalizeEmail()], async (req, res) => {
  try {
    const { email } = req.body;
    const record = await Newsletter.findOne({ where: { email: email.toLowerCase() } });
    if (record) {
      await record.update({ isActive: false, unsubscribedAt: new Date() });
    }
    return res.json({ success: true, message: "Unsubscribed." });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ── GET /api/newsletter  (admin) ─────────────────────────────────────────
router.get("/", protect, async (_req, res) => {
  try {
    const docs = await Newsletter.findAll({
      where: { isActive: true },
      order: [["subscribedAt", "DESC"]],
    });
    return res.json({ success: true, data: docs });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ── DELETE /api/newsletter/:id  (admin) ──────────────────────────────────
router.delete("/:id", protect, async (req, res) => {
  try {
    const doc = await Newsletter.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found." });
    await doc.destroy();
    return res.json({ success: true, message: "Deleted." });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
