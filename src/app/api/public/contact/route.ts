import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/send";

/**
 * Public, unauthenticated endpoint for Velqora Media's own contact form
 * (src/components/marketing/contact-form.tsx). Writes to agency_leads — a separate
 * table from the Velqora (software) project's marketing_leads, even though both
 * currently share the same Supabase project for simplicity, because these are two
 * distinct businesses' inquiries and shouldn't commingle.
 *
 * The lead is saved first and the function still returns 200 even if email sending
 * fails or isn't configured (sendEmail degrades to a no-op without SMTP_EMAIL/
 * SMTP_APP_PASSWORD) — losing the auto-reply is much better than losing the lead.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, company, message } = (body ?? {}) as Record<string, unknown>;
  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (typeof email !== "string" || !email.trim().includes("@")) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  const trimmedName = name.trim().slice(0, 200);
  const trimmedEmail = email.trim().toLowerCase().slice(0, 200);
  const trimmedCompany = typeof company === "string" ? company.trim().slice(0, 200) : null;
  const trimmedMessage = typeof message === "string" ? message.trim().slice(0, 2000) : null;

  const supabase = createAdminClient();
  const { error } = await supabase.from("agency_leads").insert({
    name: trimmedName,
    email: trimmedEmail,
    company: trimmedCompany || null,
    message: trimmedMessage || null,
  });
  if (error) throw error;

  await sendEmail(
    trimmedEmail,
    "Thanks for reaching out to Velqora Media",
    `<p>Hi ${trimmedName},</p>
     <p>Thanks for your interest in Velqora Media — we got your details and someone from our team will be in touch shortly.</p>
     <p>— The Velqora Media team</p>`
  ).catch(() => false);

  const notifyTo = process.env.NOTIFY_TO_EMAIL;
  if (notifyTo) {
    await sendEmail(
      notifyTo,
      `New Velqora Media lead: ${trimmedName}`,
      `<p><strong>${trimmedName}</strong> (${trimmedEmail})${trimmedCompany ? ` — ${trimmedCompany}` : ""}</p>
       <p>${trimmedMessage ?? "(no message)"}</p>`
    ).catch(() => false);
  }

  return NextResponse.json({ ok: true });
}
