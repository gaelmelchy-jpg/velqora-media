"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const INITIAL_STATE: FormState = { name: "", email: "", company: "", message: "" };

/**
 * Posts to /api/public/contact — Velqora Media's own inquiry form. On success the
 * server has already saved the lead and fired off (best-effort) the confirmation +
 * internal-notify emails, so the client just needs to show the "someone will be in
 * touch" state.
 */
export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<"idle" | "pending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("pending");
    setError(null);
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          typeof data.error === "string" ? data.error : "Something went wrong — try again."
        );
      }
      setStatus("sent");
      setForm(INITIAL_STATE);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong — try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="glass-panel-raised rounded-2xl p-8 text-center sm:p-10">
        <p className="font-heading text-lg font-semibold tracking-tight">You&rsquo;re in.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          We&rsquo;ve got your details — someone from Velqora Media will reach out shortly. Check
          your inbox for a confirmation.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel-raised flex flex-col gap-4 rounded-2xl p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-name" className="text-sm font-medium">
            Name
          </label>
          <Input
            id="contact-name"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-company" className="text-sm font-medium">
          Company <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <Input
          id="contact-company"
          value={form.company}
          onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium">
          What are you looking to scale?{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <Textarea
          id="contact-message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        />
      </div>

      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "pending"}
        className="w-full shadow-[0_0_32px_-8px_rgba(47,111,238,0.65)] transition-shadow hover:shadow-[0_0_44px_-6px_rgba(47,111,238,0.85)] sm:w-fit"
      >
        {status === "pending" ? "Sending…" : "Send inquiry"}
      </Button>
    </form>
  );
}
