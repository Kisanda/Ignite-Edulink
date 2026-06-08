// src/seed.js – Create the default admin user
require("dotenv").config();
const { sequelize, connectDB } = require("./config/db");
const Admin = require("./models/Admin");

(async () => {
  try {
    await connectDB({ exitOnFail: true });

    const email    = process.env.ADMIN_EMAIL    || "admin@igniteedulink.com";
    const password = process.env.ADMIN_PASSWORD || "Admin@1234";

    const existing = await Admin.findOne({ where: { email } });
    if (existing) {
      console.log(`ℹ️   Admin already exists: ${email}`);
    } else {
      await Admin.create({ name: "Super Admin", email, password, role: "superadmin" });
      console.log(`✅  Admin created: ${email}`);
    }

    await sequelize.close();
    console.log("✅  Done. Disconnected from MySQL.");
    process.exit(0);
  } catch (err) {
    console.error("❌  Seed error:", err.message);
    process.exit(1);
  }
})();
