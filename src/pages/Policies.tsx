import { Layout } from "@/components/Layout";
import { ReactNode } from "react";

export const PolicyShell = ({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) => (
  <Layout>
    <section className="bg-hero border-b border-border/60">
      <div className="container py-14">
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">{eyebrow}</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold max-w-3xl">{title}</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">{intro}</p>
        <p className="mt-3 text-xs font-mono text-muted-foreground">Last updated: December 2025</p>
      </div>
    </section>
    <section className="container py-12 max-w-3xl">
      <div className="prose-invert space-y-8 text-foreground/90 leading-relaxed">
        {children}
      </div>
    </section>
  </Layout>
);

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <div>
    <h2 className="font-display font-semibold text-xl mb-3">{title}</h2>
    <div className="text-muted-foreground space-y-3">{children}</div>
  </div>
);

export const Privacy = () => (
  <PolicyShell
    eyebrow="Legal"
    title="Privacy Policy"
    intro="What data DevPath Hub collects, how it's used, and the controls you have."
  >
    <Section title="What we collect">
      <p>For this prototype, your account email, name, and saved videos are stored only in your browser's local storage. No data is sent to a third-party server.</p>
    </Section>
    <Section title="How we use data">
      <p>Locally stored data powers your sign-in session, saved learning list, and creator dashboard. We do not sell, share, or transmit personal data.</p>
    </Section>
    <Section title="Your controls">
      <p>You can sign out at any time. Clearing your browser storage permanently removes your account and saved videos from this device.</p>
    </Section>
    <Section title="Production deployments">
      <p>If DevPath Hub is deployed with a real backend, this policy will be updated to disclose the storage provider, retention period, and lawful basis for processing under GDPR.</p>
    </Section>
    <Section title="Contact">
      <p>Questions about privacy: <a href="mailto:lazarbukejlovic@icloud.com" className="text-primary hover:underline">lazarbukejlovic@icloud.com</a>.</p>
    </Section>
  </PolicyShell>
);

export const Terms = () => (
  <PolicyShell
    eyebrow="Legal"
    title="Terms of Service"
    intro="The rules for using DevPath Hub as a viewer or creator."
  >
    <Section title="Acceptable use">
      <p>You agree not to upload content that is illegal, harmful, plagiarized, or misrepresents your identity or experience. Creators are responsible for the accuracy of their published content.</p>
    </Section>
    <Section title="Accounts">
      <p>You are responsible for keeping your account credentials secure. In this prototype, credentials are stored locally and are not recoverable if cleared.</p>
    </Section>
    <Section title="Subscriptions">
      <p>Paid creator plans (Boosted, Featured, Growth) are billed monthly or annually. The current build uses simulated checkout — no real charges occur until a payment provider is configured.</p>
    </Section>
    <Section title="Content ownership">
      <p>Creators retain full ownership of their uploaded content. By publishing, you grant DevPath Hub a non-exclusive license to display, distribute, and promote that content within the platform.</p>
    </Section>
    <Section title="Termination">
      <p>You may close your account at any time. We may suspend accounts that violate these terms or our Creator Guidelines.</p>
    </Section>
  </PolicyShell>
);

export const CreatorGuidelines = () => (
  <PolicyShell
    eyebrow="For creators"
    title="Creator Guidelines"
    intro="What we expect from creators publishing on DevPath Hub — and what gets rewarded."
  >
    <Section title="What belongs on DevPath Hub">
      <p>Practical content for web developer career growth: job search strategy, portfolio reviews, GitHub & LinkedIn optimization, interview prep, and applied technical content (React, full-stack, freelance).</p>
    </Section>
    <Section title="Quality bar">
      <ul className="list-disc list-inside space-y-1.5">
        <li>Clear audio and readable visuals.</li>
        <li>A focused outcome — what the viewer will be able to do after watching.</li>
        <li>Honest framing — no clickbait, no fake credentials.</li>
        <li>Accurate category, difficulty, and goal tags.</li>
      </ul>
    </Section>
    <Section title="What's not allowed">
      <ul className="list-disc list-inside space-y-1.5">
        <li>Plagiarized, AI-generated filler, or recycled content without attribution.</li>
        <li>Misleading thumbnails, titles, or claims about salary, hiring, or guaranteed outcomes.</li>
        <li>Content unrelated to web development careers.</li>
        <li>Harassment, hate speech, or discriminatory content.</li>
      </ul>
    </Section>
    <Section title="Promotion & boosting">
      <p>Paid plans amplify reach — they do not bypass the quality bar. Boosted videos that violate these guidelines are removed without refund.</p>
    </Section>
    <Section title="Reporting">
      <p>Report a video or creator: <a href="mailto:lazarbukejlovic@icloud.com" className="text-primary hover:underline">lazarbukejlovic@icloud.com</a>.</p>
    </Section>
  </PolicyShell>
);
