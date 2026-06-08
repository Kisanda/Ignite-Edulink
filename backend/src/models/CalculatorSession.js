// src/models/CalculatorSession.js
const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");

class CalculatorSession extends Model {}

CalculatorSession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    country: {
      type: DataTypes.STRING(100),
    },
    course: {
      type: DataTypes.STRING(255),
    },
    duration: {
      type: DataTypes.FLOAT,
    },
    tuitionFee: {
      type: DataTypes.FLOAT,
    },
    livingCost: {
      type: DataTypes.FLOAT,
    },
    totalEstimate: {
      type: DataTypes.FLOAT,
    },
    sessionId: {
      type: DataTypes.STRING(255),
    },
    ipAddress: {
      type: DataTypes.STRING(100),
    },
  },
  {
    sequelize,
    modelName: "CalculatorSession",
    tableName: "calculator_sessions",
    timestamps: true,
  }
);

module.exports = CalculatorSession;
