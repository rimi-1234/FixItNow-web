import { Search, Calendar, Star } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    step: "01",
    title: "Find Your Expert",
    description: "Browse verified technicians filtered by skill, location, experience, and rating. Read reviews from real customers.",
    color: "text-brand bg-brand-subtle",
  },
  {
    icon: Calendar,
    step: "02",
    title: "Book Instantly",
    description: "Pick a service, choose your preferred time slot, and book in seconds. No back-and-forth, no waiting.",
    color: "text-accent bg-accent/10",
  },
  {
    icon: Star,
    step: "03",
    title: "Get It Done & Review",
    description: "Your technician arrives, completes the job, and you pay securely online. Leave a review to help others.",
    color: "text-success bg-success/10",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-background" aria-labelledby="how-it-works-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 id="how-it-works-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How FixItNow works
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Get professional help in three simple steps
          </p>
        </div>

        <ol className="relative grid md:grid-cols-3 gap-8 md:gap-12" aria-label="Steps to book a service">
          {/* Connecting line on desktop */}
          <div className="absolute top-10 left-1/4 right-1/4 h-px bg-border hidden md:block" aria-hidden="true" />

          {STEPS.map(({ icon: Icon, step, title, description, color }) => (
            <li key={step} className="relative flex flex-col items-center text-center md:items-center">
              <div className="relative z-10 flex items-center justify-center">
                <span className={`flex h-20 w-20 items-center justify-center rounded-2xl ${color} border-4 border-background shadow-lg`}>
                  <Icon className="h-8 w-8" aria-hidden="true" />
                </span>
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-brand-foreground text-xs font-bold">
                  {step}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
