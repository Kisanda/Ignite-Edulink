// src/models/Contact.js
const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");

class Contact extends Model {}

Contact.init(
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
    },
    subject: {
      type: DataTypes.STRING(500),
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("new", "read", "replied", "closed"),
      defaultValue: "new",
    },
    ipAddress: {
      type: DataTypes.STRING(100),
    },
  },
  {
    sequelize,
    modelName: "Contact",
    tableName: "contacts",
    timestamps: true,
  }
);

module.exports = Contact;
