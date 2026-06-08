// src/routes/auth.js
const express = require("express");
const jwt     = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const Admin   = require("../models/Admin");
const { protect } = require("../middleware/auth");

const router = express.Router();

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

// ── POST /api/auth/login ──────────────────────────────────────────────────
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, message: "Invalid credentials." });
    }

    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ where: { email: email.toLowerCase() } });
      if (!admin || !(await admin.comparePassword(password))) {
        return res.status(401).json({ success: false, message: "Invalid email or password." });
      }
      const token = signToken(admin.id);
      return res.json({
        success: true,
        token,
        admin: { id: admin.id, name: admin.name, email: admin.email, role: admin.role },
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Server error." });
    }
  }
);

// ── GET /api/auth/me ──────────────────────────────────────────────────────
router.get("/me", protect, (req, res) => {
  const { id, name, email, role } = req.admin;
  return res.json({ success: true, admin: { id, name, email, role } });
});

module.exports = router;
