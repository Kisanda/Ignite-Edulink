// src/models/Newsletter.js
const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");

class Newsletter extends Model {}

Newsletter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
      set(value) {
        this.setDataValue("email", value.toLowerCase().trim());
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    subscribedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    unsubscribedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Newsletter",
    tableName: "newsletters",
    timestamps: true,
  }
);

module.exports = Newsletter;
