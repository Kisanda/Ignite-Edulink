// src/routes/consultations.js
const express = require("express");
const { body, validationResult } = require("express-validator");
const Consultation = require("../models/Consultation");
const { protect } = require("../middleware/auth");
const { sendConsultationConfirmation, notifyAdminConsultation } = require("../utils/email");

const router = express.Router();

// ── Validation rules ──────────────────────────────────────────────────────
const submitRules = [
  body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters."),
  body("email").isEmail().normalizeEmail().withMessage("Valid email required."),
  body("phone").trim().isLength({ min: 6 }).withMessage("Valid phone number required."),
  body("office").notEmpty().withMessage("Please select an office."),
  body("destination").notEmpty().withMessage("Please select a destination."),
  body("year").notEmpty().withMessage("Please select a study year."),
  body("intake").notEmpty().withMessage("Please select a study intake."),
];

// ── POST /api/consultations  (public – submit booking) ─────────────────────
router.post("/", submitRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email, phone, office, destination, year, intake } = req.body;

    const consultation = await Consultation.create({
      name, email, phone, office, destination, year, intake,
      ipAddress: req.ip,
    });

    // Fire-and-forget emails (do not block the response)
    sendConsultationConfirmation({ name, email, office, destination, year, intake }).catch(() => {});
    notifyAdminConsultation({ name, email, phone, office, destination, year, intake }).catch(() => {});

    return res.status(201).json({
      success: true,
      message: "Consultation request received! We will contact you shortly.",
      data: { id: consultation.id },
    });
  } catch (err) {
    console.error("Consultation POST error:", err);
    return res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
});

// ── GET /api/consultations  (admin – list all) ────────────────────────────
router.get("/", protect, async (req, res) => {
  try {
    const consultations = await Consultation.findAll({ order: [["createdAt", "DESC"]] });
    return res.json({ success: true, data: consultations });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ── PATCH /api/consultations/:id/status  (admin – update status) ──────────
router.patch("/:id/status", protect, async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["new", "contacted", "in-progress", "completed", "cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value." });
    }
    const doc = await Consultation.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found." });
    await doc.update({ status });
    return res.json({ success: true, data: doc });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ── DELETE /api/consultations/:id  (admin) ───────────────────────────────
router.delete("/:id", protect, async (req, res) => {
  try {
    const doc = await Consultation.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found." });
    await doc.destroy();
    return res.json({ success: true, message: "Deleted." });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
