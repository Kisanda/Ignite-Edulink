// src/models/BlogPost.js
const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");

class BlogPost extends Model {}

BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue("slug", value.toLowerCase().trim());
      },
    },
    excerpt: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    coverImage: {
      type: DataTypes.STRING(1000),
    },
    author: {
      type: DataTypes.STRING(255),
      defaultValue: "Ignite Edulink Team",
    },
    tags: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    publishedAt: {
      type: DataTypes.DATE,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "BlogPost",
    tableName: "blog_posts",
    timestamps: true,
    hooks: {
      beforeSave: (post) => {
        if (post.changed("isPublished") && post.isPublished && !post.publishedAt) {
          post.publishedAt = new Date();
        }
      },
    },
  }
);

module.exports = BlogPost;
