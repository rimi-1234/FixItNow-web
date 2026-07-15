import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 prose prose-sm max-w-none">
      <h1 className="text-3xl font-bold text-foreground mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground mb-4">Last updated: {new Date().getFullYear()}</p>
      <p className="text-muted-foreground mb-4">
        FixItNow collects and uses personal information to connect customers with technicians. We take your privacy seriously and handle all data in accordance with applicable data protection laws.
      </p>
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Information We Collect</h2>
      <ul className="text-muted-foreground space-y-1 list-disc list-inside">
        <li>Email address and account credentials</li>
        <li>Booking and payment history</li>
        <li>Service preferences and reviews</li>
        <li>Usage data and log files</li>
      </ul>
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">How We Use It</h2>
      <p className="text-muted-foreground">We use your information to facilitate bookings, process payments, improve our service, and communicate with you about your account.</p>
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Contact</h2>
      <p className="text-muted-foreground">For privacy inquiries, contact us at <a href="mailto:privacy@fixitnow.com" className="text-brand hover:underline">privacy@fixitnow.com</a></p>
    </div>
  );
}
