// src/routes/universities.js
const express           = require("express");
const { body, validationResult } = require("express-validator");
const UniversityEnquiry = require("../models/UniversityEnquiry");
const { protect }       = require("../middleware/auth");

const router = express.Router();

// ── POST /api/universities/enquire  (public) ──────────────────────────────
router.post(
  "/enquire",
  [
    body("name").trim().notEmpty(),
    body("email").isEmail().normalizeEmail(),
    body("university").trim().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }
    try {
      const doc = await UniversityEnquiry.create({ ...req.body });
      return res.status(201).json({ success: true, message: "Enquiry received!", data: { id: doc.id } });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Server error." });
    }
  }
);

// ── GET /api/universities  (admin) ────────────────────────────────────────
router.get("/", protect, async (_req, res) => {
  try {
    const docs = await UniversityEnquiry.findAll({ order: [["createdAt", "DESC"]] });
    return res.json({ success: true, data: docs });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ── PATCH /api/universities/:id/status  (admin) ───────────────────────────
router.patch("/:id/status", protect, async (req, res) => {
  try {
    const { status } = req.body;
    const doc = await UniversityEnquiry.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found." });
    await doc.update({ status });
    return res.json({ success: true, data: doc });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
