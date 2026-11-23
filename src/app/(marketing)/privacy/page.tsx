import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — Velqora Media",
  description: "What data Velqora Media collects through this site and how it's used.",
};

const LAST_UPDATED = "November 23, 2026";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      intro={
        <p>
          This Privacy Policy explains what information Velqora Media
          (&ldquo;Velqora Media,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) collects through
          this website, how we use it, and your choices.
        </p>
      }
      sections={[
        {
          id: "what-we-collect",
          heading: "What we collect",
          body: (
            <p>
              When you submit the contact form on this site, we collect your name, email
              address, and anything else you choose to tell us (company name, a message).
              We don&rsquo;t use cookies or trackers beyond what&rsquo;s strictly needed to
              serve the page itself.
            </p>
          ),
        },
        {
          id: "how-we-use-it",
          heading: "How we use it",
          body: (
            <p>
              We use the information you submit solely to respond to your inquiry and, if we
              work together, to run the engagement. We don&rsquo;t sell your information to
              third parties, and we don&rsquo;t use it for anything beyond what you&rsquo;d
              reasonably expect from submitting a contact form.
            </p>
          ),
        },
        {
          id: "who-sees-it",
          heading: "Who sees it",
          body: (
            <p>
              Submissions are stored with our database provider (Supabase) and may trigger an
              automated email through our email provider. Neither provider uses your
              information for anything other than delivering this service to us.
            </p>
          ),
        },
        {
          id: "your-rights",
          heading: "Your rights",
          body: (
            <p>
              You can ask us to delete any information you&rsquo;ve submitted at any time by
              emailing the address at the bottom of this page.
            </p>
          ),
        },
        {
          id: "contact",
          heading: "Contact",
          body: (
            <p>
              Questions about this policy: reach out through the contact form on our home
              page.
            </p>
          ),
        },
      ]}
    />
  );
}
