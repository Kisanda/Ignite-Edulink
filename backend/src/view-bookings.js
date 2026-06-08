// src/view-bookings.js
require("dotenv").config();
const { connectDB, sequelize } = require("./config/db");
const Consultation = require("./models/Consultation");

(async () => {
  try {
    // Connect to database silently (without crashing or alter)
    process.env.NODE_ENV = "production"; // suppress alter log
    await connectDB();

    const bookings = await Consultation.findAll({
      order: [["createdAt", "DESC"]],
      raw: true,
    });

    if (bookings.length === 0) {
      console.log("\nℹ️   No bookings/consultations found in the database.\n");
    } else {
      console.log(`\n📋  List of Consultation Bookings (${bookings.length} total):\n`);
      console.table(
        bookings.map(b => ({
          ID: b.id,
          Name: b.name,
          Email: b.email,
          Phone: b.phone,
          Office: b.office,
          Destination: b.destination,
          Year: b.year,
          Intake: b.intake,
          Status: b.status,
          "Booked At": b.createdAt,
        }))
      );
      console.log("\n");
    }

    await sequelize.close();
  } catch (err) {
    console.error("❌  Error reading bookings:", err.message);
  }
})();
