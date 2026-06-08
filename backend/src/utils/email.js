// src/utils/email.js – Nodemailer helper
const nodemailer = require("nodemailer");

const enabled = process.env.EMAIL_ENABLED === "true";

const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST   || "smtp.gmail.com",
  port:   Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send an email. Silently logs if EMAIL_ENABLED=false.
 */
async function sendMail({ to, subject, html, text }) {
  if (!enabled) {
    console.log(`📧  [Email DISABLED] To: ${to} | Subject: ${subject}`);
    return;
  }
  await transporter.sendMail({
    from:    process.env.EMAIL_FROM || '"Ignite Edulink" <no-reply@igniteedulink.com>',
    to,
    subject,
    html,
    text,
  });
}

/**
 * Send confirmation email to the student after booking a consultation.
 */
async function sendConsultationConfirmation(data) {
  const { name, email, office, destination, year, intake } = data;
  await sendMail({
    to: email,
    subject: "✅ Your consultation request has been received – Ignite Edulink",
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <h2 style="color:#0B0A3F">Hi ${name},</h2>
        <p>Thank you for booking a free consultation with <strong>Ignite Edulink</strong>!</p>
        <p>Here are your submission details:</p>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:6px 0;color:#64748B">Nearest Office</td><td style="padding:6px 0"><strong>${office}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#64748B">Destination</td><td style="padding:6px 0"><strong>${destination}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#64748B">Year</td><td style="padding:6px 0"><strong>${year}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#64748B">Intake</td><td style="padding:6px 0"><strong>${intake}</strong></td></tr>
        </table>
        <p style="margin-top:24px">One of our certified counsellors will contact you shortly.</p>
        <p style="color:#64748B;font-size:13px">Ignite Edulink – Empowering Your Global Journey</p>
      </div>`,
    text: `Hi ${name},\n\nThank you for booking a consultation!\nDestination: ${destination} | Year: ${year} | Intake: ${intake}\n\nWe will contact you shortly.\n\nIgnite Edulink`,
  });
}

/**
 * Notify the admin about a new consultation booking.
 */
async function notifyAdminConsultation(data) {
  if (!process.env.ADMIN_EMAIL) return;
  await sendMail({
    to: process.env.ADMIN_EMAIL,
    subject: `🔔 New Consultation Request from ${data.name}`,
    html: `<pre style="font-family:monospace">${JSON.stringify(data, null, 2)}</pre>`,
    text: JSON.stringify(data, null, 2),
  });
}

module.exports = { sendMail, sendConsultationConfirmation, notifyAdminConsultation };
