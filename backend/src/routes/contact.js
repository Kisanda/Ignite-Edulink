// src/routes/contact.js
const express = require("express");
const { body, validationResult } = require("express-validator");
const Contact = require("../models/Contact");
const { protect } = require("../middleware/auth");
const { sendMail } = require("../utils/email");

const router = express.Router();

// ── POST /api/contact  (public) ───────────────────────────────────────────
router.post(
  "/",
  [
    body("name").trim().isLength({ min: 2 }),
    body("email").isEmail().normalizeEmail(),
    body("message").trim().isLength({ min: 10 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }
    try {
      const { name, email, phone, subject, message } = req.body;
      const doc = await Contact.create({ name, email, phone, subject, message, ipAddress: req.ip });

      // Notify admin
      sendMail({
        to: process.env.ADMIN_EMAIL,
        subject: `📬 New Contact from ${name}`,
        html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`,
        text: `From: ${name} (${email})\n\n${message}`,
      }).catch(() => {});

      return res.status(201).json({ success: true, message: "Message received. We'll be in touch soon!", data: { id: doc.id } });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Server error." });
    }
  }
);

// ── GET /api/contact  (admin) ─────────────────────────────────────────────
router.get("/", protect, async (_req, res) => {
  try {
    const docs = await Contact.findAll({ order: [["createdAt", "DESC"]] });
    return res.json({ success: true, data: docs });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ── PATCH /api/contact/:id/status  (admin) ───────────────────────────────
router.patch("/:id/status", protect, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["new", "read", "replied", "closed"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value." });
    }
    const doc = await Contact.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found." });
    await doc.update({ status });
    return res.json({ success: true, data: doc });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ── DELETE /api/contact/:id  (admin) ─────────────────────────────────────
router.delete("/:id", protect, async (req, res) => {
  try {
    const doc = await Contact.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found." });
    await doc.destroy();
    return res.json({ success: true, message: "Deleted." });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
