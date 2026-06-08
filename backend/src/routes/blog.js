// src/routes/blog.js
const express  = require("express");
const { Op }   = require("sequelize");
const BlogPost = require("../models/BlogPost");
const { protect } = require("../middleware/auth");

const router = express.Router();

// ── GET /api/blog  (public – published posts) ──────────────────────────────
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, tag } = req.query;
    const where = { isPublished: true };

    // Tag filter: tags is stored as JSON array
    if (tag) {
      where.tags = { [Op.like]: `%"${tag}"%` };
    }

    const offset = (Number(page) - 1) * Number(limit);
    const { count: total, rows: posts } = await BlogPost.findAndCountAll({
      where,
      attributes: { exclude: ["content"] },
      order: [["publishedAt", "DESC"]],
      limit: Number(limit),
      offset,
    });

    return res.json({ success: true, data: posts, total, page: Number(page) });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ── GET /api/blog/admin/all  (admin – all posts) ───────────────────────────
router.get("/admin/all", protect, async (_req, res) => {
  try {
    const posts = await BlogPost.findAll({ order: [["createdAt", "DESC"]] });
    return res.json({ success: true, data: posts });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ── GET /api/blog/:slug  (public) ─────────────────────────────────────────
router.get("/:slug", async (req, res) => {
  try {
    const post = await BlogPost.findOne({
      where: { slug: req.params.slug, isPublished: true },
    });
    if (!post) return res.status(404).json({ success: false, message: "Post not found." });
    // Increment view count
    await post.increment("views");
    await post.reload();
    return res.json({ success: true, data: post });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ── POST /api/blog  (admin – create) ──────────────────────────────────────
router.post("/", protect, async (req, res) => {
  try {
    const post = await BlogPost.create(req.body);
    return res.status(201).json({ success: true, data: post });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ── PUT /api/blog/:id  (admin – update) ───────────────────────────────────
router.put("/:id", protect, async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Not found." });
    await post.update(req.body);
    return res.json({ success: true, data: post });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ── DELETE /api/blog/:id  (admin) ─────────────────────────────────────────
router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: "Not found." });
    await post.destroy();
    return res.json({ success: true, message: "Deleted." });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
