import nodemailer from "nodemailer";

/**
 * Gmail SMTP sender — same SMTP_EMAIL/SMTP_APP_PASSWORD convention already used by
 * balm_home and balm_leads, so an existing Gmail App Password can be reused instead
 * of standing up a new transactional-email provider (Resend, SES, etc.) under time
 * pressure. No real email provider existed anywhere in this codebase before this.
 *
 * Graceful-degradation shape matches the AI chat widget's ANTHROPIC_API_KEY check
 * (balm_home/server.py): a missing credential returns `false` instead of throwing,
 * so a misconfigured env var never 500s the caller (e.g. the contact form must still
 * save the lead even if the confirmation email can't be sent).
 */
let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;
  const email = process.env.SMTP_EMAIL;
  const pass = process.env.SMTP_APP_PASSWORD;
  if (!email || !pass) return null;
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: email, pass },
  });
  return transporter;
}

export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const t = getTransporter();
  if (!t) return false;
  await t.sendMail({ from: process.env.SMTP_EMAIL, to, subject, html });
  return true;
}
