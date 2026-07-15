import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { ArrowRight, Wrench } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-brand" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <Wrench className="mx-auto h-12 w-12 text-brand-foreground/80 mb-4" aria-hidden="true" />
        <h2 id="cta-heading" className="text-3xl font-bold text-brand-foreground sm:text-4xl">
          Ready to get started?
        </h2>
        <p className="mt-4 text-lg text-brand-foreground/80 max-w-xl mx-auto leading-relaxed">
          Join thousands of homeowners who trust FixItNow for their home service needs.
          Book a service in minutes.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="xl" variant="secondary" asChild>
            <Link href={ROUTES.register}>
              Book Your First Service
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            size="xl"
            variant="outline"
            className="border-white/30 text-brand-foreground hover:bg-white/10"
            asChild
          >
            <Link href={`${ROUTES.register}?role=TECHNICIAN`}>
              Join as Technician
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
