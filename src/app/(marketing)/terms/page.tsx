import type { Metadata } from "next";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service — Velqora Media",
  description: "The terms that govern using this website and contacting Velqora Media.",
};

const LAST_UPDATED = "November 23, 2026";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated={LAST_UPDATED}
      intro={
        <p>
          These terms govern your use of this website. Any paid engagement with Velqora
          Media is governed by a separate agreement signed between Velqora Media and the
          client — these terms cover the website only.
        </p>
      }
      sections={[
        {
          id: "use-of-site",
          heading: "Use of this site",
          body: (
            <p>
              This site is informational — it describes Velqora Media&rsquo;s services and
              lets you get in touch. You agree not to use it to submit false information,
              attempt to disrupt the site, or scrape it for unrelated purposes.
            </p>
          ),
        },
        {
          id: "no-guarantee",
          heading: "No guaranteed results",
          body: (
            <p>
              The performance figures shown on this site are real results from accounts we
              manage, shown as historical examples. They aren&rsquo;t a guarantee of results
              for any future engagement — advertising performance depends on factors outside
              our control (platform policy, market conditions, the brand&rsquo;s own product
              and pricing).
            </p>
          ),
        },
        {
          id: "intellectual-property",
          heading: "Intellectual property",
          body: (
            <p>
              The content on this site belongs to Velqora Media. Client names and brand
              marks shown here remain the property of their respective owners and are shown
              to describe our work for them, not to imply their endorsement beyond that.
            </p>
          ),
        },
        {
          id: "changes",
          heading: "Changes to these terms",
          body: <p>We may update these terms from time to time; the date above reflects the latest revision.</p>,
        },
        {
          id: "contact",
          heading: "Contact",
          body: <p>Questions about these terms: reach out through the contact form on our home page.</p>,
        },
      ]}
    />
  );
}
