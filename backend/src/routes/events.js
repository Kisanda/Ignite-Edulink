// src/routes/events.js
const express = require("express");
const { body, validationResult } = require("express-validator");
const { Event, EventRegistration } = require("../models/Event");
const { protect } = require("../middleware/auth");

const router = express.Router();

// ── GET /api/events  (public) ──────────────────────────────────────────────
router.get("/", async (_req, res) => {
  try {
    const events = await Event.findAll({
      where: { isPublished: true },
      order: [["eventDate", "ASC"]],
    });
    return res.json({ success: true, data: events });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ── GET /api/events/admin/all  (admin) ────────────────────────────────────
// NOTE: must be registered BEFORE /:slug and /:id routes to avoid shadowing
router.get("/admin/all", protect, async (_req, res) => {
  try {
    const events = await Event.findAll({ order: [["eventDate", "DESC"]] });
    return res.json({ success: true, data: events });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ── GET /api/events/:slug  (public – single event detail) ─────────────────
router.get("/:slug", async (req, res) => {
  try {
    const event = await Event.findOne({
      where: { slug: req.params.slug, isPublished: true },
    });
    if (!event) return res.status(404).json({ success: false, message: "Event not found." });
    return res.json({ success: true, data: event });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ── GET /api/events/:id/registrations  (admin) ────────────────────────────
router.get("/:id/registrations", protect, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      attributes: ["id", "title"],
      include: [{ model: EventRegistration, as: "registrations" }],
    });
    if (!event) return res.status(404).json({ success: false, message: "Not found." });
    return res.json({ success: true, data: event });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ── POST /api/events/:slug/register  (public) ─────────────────────────────
router.post(
  "/:slug/register",
  [body("name").trim().notEmpty(), body("email").isEmail().normalizeEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }
    try {
      const { name, email, phone } = req.body;
      const event = await Event.findOne({
        where: { slug: req.params.slug, isPublished: true },
        include: [{ model: EventRegistration, as: "registrations" }],
      });
      if (!event) return res.status(404).json({ success: false, message: "Event not found." });

      if (event.registrations.length >= event.maxCapacity) {
        return res.status(400).json({ success: false, message: "Event is fully booked." });
      }
      const already = event.registrations.find(r => r.email === email.toLowerCase());
      if (already) {
        return res.status(409).json({ success: false, message: "Already registered." });
      }
      await EventRegistration.create({ eventId: event.id, name, email, phone });
      return res.status(201).json({ success: true, message: "Registered successfully!" });
    } catch (err) {
      return res.status(500).json({ success: false, message: "Server error." });
    }
  }
);

// ── POST /api/events/admin  (admin – create) ─────────────────────────────
router.post("/admin", protect, async (req, res) => {
  try {
    const event = await Event.create(req.body);
    return res.status(201).json({ success: true, data: event });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ── PUT /api/events/:id/admin  (admin – update) ───────────────────────────
router.put("/:id/admin", protect, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: "Not found." });
    await event.update(req.body);
    return res.json({ success: true, data: event });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ── DELETE /api/events/:id  (admin) ──────────────────────────────────────
router.delete("/:id", protect, async (req, res) => {
  try {
    const doc = await Event.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: "Not found." });
    await doc.destroy();
    return res.json({ success: true, message: "Deleted." });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
