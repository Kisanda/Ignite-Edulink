// src/models/Consultation.js
const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");

class Consultation extends Model {}

Consultation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      allowNull: false,
    },
    office: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    intake: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("new", "contacted", "in-progress", "completed", "cancelled"),
      defaultValue: "new",
    },
    notes: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    ipAddress: {
      type: DataTypes.STRING(100),
    },
  },
  {
    sequelize,
    modelName: "Consultation",
    tableName: "consultations",
    timestamps: true,
  }
);

module.exports = Consultation;
