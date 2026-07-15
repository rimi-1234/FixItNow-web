import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-6">Terms of Service</h1>
      <p className="text-muted-foreground mb-4">Last updated: {new Date().getFullYear()}</p>
      <p className="text-muted-foreground mb-4">
        By using FixItNow, you agree to these terms of service. Please read them carefully.
      </p>
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Use of Service</h2>
      <p className="text-muted-foreground">FixItNow provides a marketplace for connecting customers with home service technicians. We are not responsible for the quality of work performed by technicians.</p>
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Payments</h2>
      <p className="text-muted-foreground">Payments are processed securely through Stripe or SSLCommerz. FixItNow does not store payment card information.</p>
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Cancellations</h2>
      <p className="text-muted-foreground">Customers may cancel bookings before they reach IN_PROGRESS status. Refund policies are determined on a case-by-case basis.</p>
      <h2 className="text-xl font-semibold text-foreground mt-8 mb-3">Contact</h2>
      <p className="text-muted-foreground">For legal inquiries, contact <a href="mailto:legal@fixitnow.com" className="text-brand hover:underline">legal@fixitnow.com</a></p>
    </div>
  );
}
