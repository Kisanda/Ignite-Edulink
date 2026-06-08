// src/models/UniversityEnquiry.js
const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db");

class UniversityEnquiry extends Model {}

UniversityEnquiry.init(
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
    university: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING(100),
    },
    course: {
      type: DataTypes.STRING(255),
    },
    message: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("new", "contacted", "processing", "completed"),
      defaultValue: "new",
    },
  },
  {
    sequelize,
    modelName: "UniversityEnquiry",
    tableName: "university_enquiries",
    timestamps: true,
  }
);

module.exports = UniversityEnquiry;
