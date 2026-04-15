import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock,
  Heart,
  Home,
  PawPrint,
  Search,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const STEPS = [
  {
    number: 1,
    icon: Search,
    title: "Browse Pets",
    description:
      "Search our database of available animals, filter by species, age, breed, and location. Browse detailed profiles with photos and personality notes. When you find a companion you love, click the 'Adopt Me' button on any pet to start your application.",
    time: "At your own pace",
  },
  {
    number: 2,
    icon: ClipboardList,
    title: "Apply",
    description:
      "Fill out our adoption application with your personal details and home situation. We ask about your lifestyle, living environment, and prior pet experience to ensure every match is a lasting one. The form takes 10–15 minutes.",
    time: "10–15 minutes",
  },
  {
    number: 3,
    icon: ShieldCheck,
    title: "Verification",
    description:
      "Our team carefully reviews your application within 3–5 business days. We may contact your references or ask follow-up questions to ensure the best possible match for both you and the animal.",
    time: "3–5 business days",
  },
  {
    number: 4,
    icon: Heart,
    title: "Meet & Greet",
    description:
      "Arrange a supervised meeting with your potential new companion — at the shelter, a foster home, or a neutral location that's comfortable for everyone. Bring all household members, including any current pets.",
    time: "1–2 hours",
  },
  {
    number: 5,
    icon: Home,
    title: "Final Adoption",
    description:
      "Sign the adoption agreement, pay any applicable fees (which cover vaccinations and microchipping), and welcome your new family member home! Our team remains available after adoption for any questions or ongoing support.",
    time: "Same day",
  },
];

const FAQS = [
  {
    q: "How long does the entire adoption process take?",
    a: "From application to bringing your pet home, the process typically takes 1–2 weeks. The verification step alone takes 3–5 business days, and scheduling the Meet & Greet depends on availability. We prioritize quality matches over speed — the right fit is worth the wait.",
  },
  {
    q: "What are the adoption fees?",
    a: "Fees vary by animal and shelter, typically ranging from $50–$250. This covers vaccinations, microchipping, spay/neuter surgery, and an initial health check. Some senior animals have reduced or waived fees. All fees are clearly listed on each pet's profile page.",
  },
  {
    q: "Can I adopt a pet if I rent my home?",
    a: "Yes! Many renters successfully adopt pets. You'll need written permission from your landlord confirming that pets are allowed in your home. Some buildings have breed or size restrictions, so please verify these details before applying so we can guide you to compatible animals.",
  },
  {
    q: "What if the adoption doesn't work out?",
    a: "We understand that sometimes a match isn't perfect. If the adoption isn't working within the first 30 days, please contact us right away. We have a return policy that allows you to bring the animal back without judgment. The pet's wellbeing is always our top priority.",
  },
  {
    q: "Can I adopt multiple pets at once?",
    a: "Absolutely! Adopting bonded pairs or multiple animals is actively encouraged when it suits your home. You'll complete a separate application for each animal, and our team will assess whether your environment is well-suited for multiple pets living together.",
  },
  {
    q: "What documents do I need to prepare?",
    a: "You'll need a valid government-issued photo ID, proof of address (utility bill or lease), and if renting, written landlord permission. References (1–2 personal or professional contacts) are also required. All documents can be submitted digitally through our adoption form.",
  },
];

export function AdoptionProcessPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div data-ocid="adoption-process.page">
      {/* Hero */}
      <section className="bg-card border-b py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-5 inline-flex items-center gap-1.5 px-3 py-1">
              <PawPrint className="w-3.5 h-3.5" />
              How It Works
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight mb-4">
              Our Adoption Process
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              We make finding your perfect companion simple, safe, and
              transparent — every step designed with your pet's wellbeing and
              your peace of mind in focus.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section
        className="bg-background py-16 px-4"
        data-ocid="adoption-process.steps-section"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Five Steps to Your New Best Friend
            </h2>
          </motion.div>

          {/* Desktop: horizontal steps */}
          <div className="hidden md:block">
            {/* Connector line + numbered circles */}
            <div className="flex items-center justify-between relative mb-8 px-8">
              <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-0.5 bg-border" />
              {STEPS.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.35 }}
                  className="relative z-10 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg shadow-md border-4 border-background"
                >
                  {step.number}
                </motion.div>
              ))}
            </div>

            {/* Step cards */}
            <div className="grid grid-cols-5 gap-4">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    data-ocid={`adoption-process.step.${step.number}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="bg-card border rounded-xl p-4 shadow-pet-card hover:shadow-pet-hover transition-smooth flex flex-col"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2 text-sm leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed flex-1 mb-3">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 text-secondary flex-shrink-0" />
                      <span>{step.time}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="flex flex-col md:hidden">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === STEPS.length - 1;
              return (
                <motion.div
                  key={step.number}
                  data-ocid={`adoption-process.step.${step.number}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex gap-4"
                >
                  {/* Timeline spine */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg shadow-md border-4 border-background flex-shrink-0 z-10">
                      {step.number}
                    </div>
                    {!isLast && (
                      <div className="w-0.5 flex-1 bg-border my-1 min-h-8" />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className={`bg-card border rounded-xl p-5 shadow-pet-card flex-1 min-w-0 ${isLast ? "mb-0" : "mb-4"}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-display font-semibold text-foreground min-w-0">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                      <span>{step.time}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements strip */}
      <section className="bg-muted/30 border-y py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center font-display font-semibold text-foreground mb-6">
            What You'll Need
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Valid government-issued photo ID",
              "Proof of address (lease or utility bill)",
              "Landlord permission letter (if renting)",
              "1–2 personal or professional references",
              "All household members must agree",
              "Prior vet records (if you've owned pets)",
            ].map((req) => (
              <div
                key={req}
                className="flex items-start gap-2.5 bg-card border rounded-lg px-4 py-3"
              >
                <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground leading-snug">
                  {req}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-5">
            All documents can be submitted digitally through our online adoption
            form.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="bg-background py-16 px-4"
        data-ocid="adoption-process.faq-section"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know before starting your adoption journey.
            </p>
          </motion.div>

          <div
            className="flex flex-col gap-2.5"
            data-ocid="adoption-process.faq-list"
          >
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <motion.div
                  key={faq.q}
                  data-ocid={`adoption-process.faq.${index + 1}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.35 }}
                >
                  <Collapsible
                    open={isOpen}
                    onOpenChange={(open) => setOpenFaq(open ? index : null)}
                  >
                    <CollapsibleTrigger
                      data-ocid={`adoption-process.faq-toggle.${index + 1}`}
                      className="w-full flex items-center justify-between gap-4 bg-card border rounded-xl px-5 py-4 text-left hover:bg-muted/40 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      style={{
                        borderBottomLeftRadius: isOpen ? "0" : undefined,
                        borderBottomRightRadius: isOpen ? "0" : undefined,
                      }}
                    >
                      <span className="font-medium text-foreground text-sm md:text-base leading-snug">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className="w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200"
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="bg-muted/30 border border-t-0 rounded-b-xl px-5 py-4">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="bg-primary/5 border-t py-16 px-4"
        data-ocid="adoption-process.cta-section"
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-5xl mb-5">🐾</div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Ready to Start?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Hundreds of loving animals are waiting for their forever home.
              Your perfect companion might be just a search away.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="gap-2 text-base px-8"
                data-ocid="adoption-process.find-pet-button"
              >
                <Link to="/pets">
                  <Search className="w-5 h-5" />
                  Find a Pet
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 text-base px-8"
                data-ocid="adoption-process.apply-button"
              >
                <Link to="/adopt">
                  <ClipboardList className="w-5 h-5" />
                  Apply Now
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
