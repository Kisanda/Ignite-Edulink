// src/routes/dashboard.js
const express           = require("express");
const Consultation      = require("../models/Consultation");
const Contact           = require("../models/Contact");
const Newsletter        = require("../models/Newsletter");
const BlogPost          = require("../models/BlogPost");
const { Event }         = require("../models/Event");
const UniversityEnquiry = require("../models/UniversityEnquiry");
const CalculatorSession = require("../models/CalculatorSession");
const { protect }       = require("../middleware/auth");
const { Op }            = require("sequelize");

const router = express.Router();

// ── GET /api/dashboard/stats  (admin) ────────────────────────────────────
router.get("/stats", protect, async (_req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [
      totalConsultations,
      newConsultations,
      totalContacts,
      newContacts,
      totalSubscribers,
      totalBlogPosts,
      publishedPosts,
      totalEvents,
      totalEnquiries,
      totalCalculatorSessions,
      recentConsultations,
    ] = await Promise.all([
      Consultation.count(),
      Consultation.count({ where: { status: "new" } }),
      Contact.count(),
      Contact.count({ where: { status: "new" } }),
      Newsletter.count({ where: { isActive: true } }),
      BlogPost.count(),
      BlogPost.count({ where: { isPublished: true } }),
      Event.count(),
      UniversityEnquiry.count(),
      CalculatorSession.count(),
      Consultation.count({ where: { createdAt: { [Op.gte]: sevenDaysAgo } } }),
    ]);

    return res.json({
      success: true,
      data: {
        consultations: { total: totalConsultations, new: newConsultations, recent7Days: recentConsultations },
        contacts:      { total: totalContacts, new: newContacts },
        newsletter:    { subscribers: totalSubscribers },
        blog:          { total: totalBlogPosts, published: publishedPosts },
        events:        { total: totalEvents },
        enquiries:     { total: totalEnquiries },
        calculator:    { sessions: totalCalculatorSessions },
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
