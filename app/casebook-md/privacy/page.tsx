// app/casebook-md/privacy/page.tsx
import type { Metadata } from "next";

const EFFECTIVE_DATE = "September 30, 2026";
const CONTACT = "helpdesk@stadialink.com";

export const metadata: Metadata = {
  title: "CaseBook MD Privacy Policy — Stadia Consulting Group",
  description:
    "How the CaseBook MD app collects, uses and deletes information.",
  openGraph: {
    title: "CaseBook MD Privacy Policy",
    url: "https://www.stadialink.com/casebook-md/privacy",
    type: "article",
  },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display font-bold text-xl md:text-2xl tracking-tight">{title}</h2>
      <div className="space-y-3 text-muted font-body leading-relaxed">{children}</div>
    </section>
  );
}

export default function CaseBookPrivacyPage() {
  const mail = <a className="text-accent underline underline-offset-4" href={`mailto:${CONTACT}`}>{CONTACT}</a>;
  return (
    <main className="relative">
      <section className="relative pt-32 pb-10 lg:pt-40">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-mono text-accent uppercase tracking-[0.25em]">CaseBook MD</p>
          <h1 className="mt-4 font-display font-extrabold text-4xl md:text-5xl tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-sm text-muted font-body">
            Effective {EFFECTIVE_DATE}. CaseBook MD is developed by Stadia Consulting Group, LLC (&ldquo;Stadia&rdquo;, &ldquo;we&rdquo;). Contact: {mail}.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 lg:px-8 pb-32 space-y-10">
        <Section title="What CaseBook MD is">
          <p>
            CaseBook MD is a note-taking app for healthcare professionals. You record notes by voice or document photo;
            an AI service transcribes them, and you review and confirm the text. The app is in an early trial with invited
            testers. <strong className="text-foreground">During this trial, use invented patients and values only. Do not enter real patient
            information.</strong> CaseBook MD does not diagnose, predict outcomes or recommend treatment.
          </p>
        </Section>

        <Section title="Information we collect">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-foreground">Your Google account email address and account ID.</strong> You sign in with Google, and we use these to confirm you are an invited tester.</li>
            <li><strong className="text-foreground">Voice recordings and document photos.</strong> These are sent only when you are signed in and the app transcribes a recording or reads a photo.</li>
            <li><strong className="text-foreground">Note text:</strong> the transcript or reading of each recording or photo, your corrections, and the text you confirm.</li>
            <li><strong className="text-foreground">Timing information:</strong> when a recording or photo was captured, and your device&rsquo;s time zone.</li>
          </ul>
          <p>We do not collect your location, contacts, device identifiers, advertising data or usage analytics. The app contains no ads.</p>
        </Section>

        <Section title="Information that stays on your phone">
          <p>
            The patient and study codes you create, how your notes are filed, your search queries, and the copies of your
            notes and recordings kept in the app are never sent to us. Uninstalling the app removes them.
          </p>
        </Section>

        <Section title="How we use information">
          <p>
            We use your information only to run the app: to sign you in, and to transcribe, read and store your notes so you
            can review and confirm them. We do not sell your information or use it for advertising.
          </p>
        </Section>

        <Section title="Service providers">
          <p>We use these providers, which process data on our behalf, to run the app:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-foreground">Google</strong>: sign-in.</li>
            <li><strong className="text-foreground">Cloudflare</strong>: hosting the CaseBook MD server and storing recordings, photos and note records.</li>
            <li>
              <strong className="text-foreground">OpenAI</strong>, through its API: transcribing recordings, reading document photos, and helping with corrections you request.
              According to OpenAI&rsquo;s API data-usage documentation, data sent through the API is not used to train OpenAI&rsquo;s models by default.
              OpenAI may keep API data for up to 30 days to monitor for abuse, unless longer retention is required by law.
            </li>
          </ul>
        </Section>

        <Section title="Security">
          <p>
            Information is sent over encrypted (HTTPS) connections, stored privately, and the app&rsquo;s server is only
            accessible to invited, signed-in testers. No method of storage or transmission is completely secure.
          </p>
        </Section>

        <Section title="How long we keep information">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-foreground">Recordings and photos:</strong> deleted automatically 7 days after you confirm the note.</li>
            <li><strong className="text-foreground">Note records and unconfirmed drafts:</strong> deleted automatically 30 days after their last activity.</li>
            <li><strong className="text-foreground">Your email address:</strong> kept while you are an invited tester.</li>
          </ul>
        </Section>

        <Section title="Your choices">
          <p>You can use the app to record and organize notes on your phone without signing in; nothing is sent to us until you do.</p>
          <p>To ask us to delete your information, or with any question about this policy, contact {mail}.</p>
        </Section>

        <Section title="Children">
          <p>
            CaseBook MD is intended for adult healthcare professionals. It is not directed at children, and we do not
            knowingly collect information from children.
          </p>
        </Section>

        <Section title="Changes">
          <p>We will update this policy when the app changes and show the new effective date above.</p>
        </Section>
      </div>
    </main>
  );
}
