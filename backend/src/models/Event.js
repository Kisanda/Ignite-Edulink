// src/models/Event.js
const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");

// ── EventRegistration (child table) ─────────────────────────────────────────
class EventRegistration extends Model {}

EventRegistration.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "events", key: "id" },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      set(value) {
        this.setDataValue("email", value.toLowerCase().trim());
      },
    },
    phone: {
      type: DataTypes.STRING(50),
    },
    registeredAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "EventRegistration",
    tableName: "event_registrations",
    timestamps: false,
  }
);

// ── Event (parent table) ─────────────────────────────────────────────────────
class Event extends Model {}

Event.init(
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
    description: {
      type: DataTypes.TEXT,
    },
    location: {
      type: DataTypes.STRING(500),
      defaultValue: "Online / Virtual",
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    coverImage: {
      type: DataTypes.STRING(1000),
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    maxCapacity: {
      type: DataTypes.INTEGER,
      defaultValue: 100,
    },
  },
  {
    sequelize,
    modelName: "Event",
    tableName: "events",
    timestamps: true,
  }
);

// ── Association ──────────────────────────────────────────────────────────────
Event.hasMany(EventRegistration, { foreignKey: "eventId", as: "registrations" });
EventRegistration.belongsTo(Event, { foreignKey: "eventId" });

module.exports = { Event, EventRegistration };
