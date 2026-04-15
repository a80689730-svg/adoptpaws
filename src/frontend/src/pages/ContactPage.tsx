import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { submitContactMessage } from "../lib/backend";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validate(d: FormState): FormErrors {
  const e: FormErrors = {};
  if (d.name.trim().length < 2)
    e.name = "Name is required (at least 2 characters)";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))
    e.email = "A valid email address is required";
  if (!d.subject) e.subject = "Please select a subject";
  if (d.message.trim().length < 10)
    e.message = "Message must be at least 10 characters";
  return e;
}

function generateRefId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AP-${ts}-${rand}`;
}

const INITIAL: FormState = { name: "", email: "", subject: "", message: "" };

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@adoptpaws.org",
    href: "mailto:hello@adoptpaws.org",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 234-5678",
    href: "tel:+15552345678",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Paw Street, New York, NY 10001",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri 9am–6pm · Sat 10am–4pm",
    href: null,
  },
];

const SOCIALS = [
  {
    icon: SiFacebook,
    href: "#",
    label: "Facebook",
    color: "hover:text-blue-600",
  },
  {
    icon: SiInstagram,
    href: "#",
    label: "Instagram",
    color: "hover:text-pink-500",
  },
  {
    icon: SiX,
    href: "#",
    label: "Twitter / X",
    color: "hover:text-foreground",
  },
  { icon: SiYoutube, href: "#", label: "YouTube", color: "hover:text-red-500" },
];

export function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");
  const [loading, setLoading] = useState(false);

  const set =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleBlur = (field: keyof FormState) => () => {
    const fieldErrors = validate(form);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      await submitContactMessage(form);
      setRefId(generateRefId());
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-ocid="contact.page">
      {/* Page header */}
      <section className="bg-card border-b border-border py-12">
        <div className="container mx-auto px-4 md:px-8">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            Contact
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            We'd love to hear from you — whether you have questions about
            adoption, want to partner with us, or simply want to say hello.
          </p>
        </div>
      </section>

      {/* Main two-column content */}
      <section className="bg-background py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            {/* LEFT — Contact Form */}
            <div data-ocid="contact.form_panel">
              <h2 className="font-display text-2xl font-bold text-foreground mb-7">
                Send Us a Message
              </h2>

              {submitted ? (
                <div
                  className="flex flex-col items-center text-center py-14 px-8 rounded-2xl bg-secondary/5 border border-secondary/20"
                  data-ocid="contact.success_state"
                >
                  <CheckCircle2 className="w-16 h-16 text-secondary mb-5" />
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                    Thank you!
                  </h3>
                  <p className="text-muted-foreground mb-5 max-w-sm leading-relaxed">
                    We'll get back to you within 24 hours. Your message has been
                    received and we look forward to connecting with you.
                  </p>
                  <div className="bg-muted/60 rounded-lg px-5 py-3 border border-border">
                    <p className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wider font-medium">
                      Reference ID
                    </p>
                    <p className="font-mono text-sm font-semibold text-primary">
                      {refId}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="mt-8"
                    onClick={() => {
                      setSubmitted(false);
                      setForm(INITIAL);
                      setErrors({});
                    }}
                    data-ocid="contact.send_another_button"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                  data-ocid="contact.form"
                >
                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-name">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contact-name"
                        value={form.name}
                        onChange={set("name")}
                        onBlur={handleBlur("name")}
                        placeholder="Jane Smith"
                        aria-invalid={!!errors.name}
                        data-ocid="contact.name_input"
                      />
                      {errors.name && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="contact.name_field_error"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-email">
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        onBlur={handleBlur("email")}
                        placeholder="jane@example.com"
                        aria-invalid={!!errors.email}
                        data-ocid="contact.email_input"
                      />
                      {errors.email && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="contact.email_field_error"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <Label>
                      Subject <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={form.subject}
                      onValueChange={(v) => {
                        setForm((prev) => ({ ...prev, subject: v }));
                        setErrors((prev) => ({ ...prev, subject: undefined }));
                      }}
                    >
                      <SelectTrigger
                        aria-invalid={!!errors.subject}
                        data-ocid="contact.subject_select"
                      >
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General Inquiry">
                          General Inquiry
                        </SelectItem>
                        <SelectItem value="Adoption Question">
                          Adoption Question
                        </SelectItem>
                        <SelectItem value="Volunteer Interest">
                          Volunteer Interest
                        </SelectItem>
                        <SelectItem value="Partnership">Partnership</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.subject && (
                      <p
                        className="text-xs text-destructive"
                        data-ocid="contact.subject_field_error"
                      >
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-message">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="contact-message"
                      value={form.message}
                      onChange={set("message")}
                      onBlur={handleBlur("message")}
                      placeholder="How can we help you today?"
                      rows={6}
                      aria-invalid={!!errors.message}
                      data-ocid="contact.message_textarea"
                    />
                    {errors.message && (
                      <p
                        className="text-xs text-destructive"
                        data-ocid="contact.message_field_error"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full font-semibold"
                    disabled={loading}
                    data-ocid="contact.submit_button"
                  >
                    {loading ? "Sending…" : "Send Message"}
                  </Button>
                </form>
              )}
            </div>

            {/* RIGHT — Contact Info + Map */}
            <div className="space-y-7" data-ocid="contact.info_panel">
              {/* Contact info card */}
              <Card className="border-border shadow-pet-card">
                <CardContent className="p-7 space-y-5">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                      <div key={label} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">
                            {label}
                          </p>
                          {href ? (
                            <a
                              href={href}
                              className="text-foreground hover:text-primary transition-smooth text-sm font-medium"
                            >
                              {value}
                            </a>
                          ) : (
                            <span className="text-foreground text-sm font-medium">
                              {value}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="border-border shadow-pet-card">
                <CardContent className="p-7">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Follow Our Journey
                  </h3>
                  <div className="flex gap-3" data-ocid="contact.social_links">
                    {SOCIALS.map(({ icon: SocialIcon, href, label, color }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className={`w-11 h-11 rounded-xl bg-muted/60 border border-border flex items-center justify-center text-muted-foreground ${color} hover:border-primary/30 hover:bg-primary/5 transition-smooth`}
                        data-ocid={`contact.social_${label.toLowerCase().replace(/[^a-z0-9]/g, "_")}_link`}
                      >
                        <SocialIcon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    Stay updated with new arrivals, adoption stories, and pet
                    care tips.
                  </p>
                </CardContent>
              </Card>

              {/* Map placeholder */}
              <Card
                className="border-border shadow-pet-card overflow-hidden"
                data-ocid="contact.map_card"
              >
                {/* Map area */}
                <div
                  className="relative w-full h-44 bg-muted/50"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(var(--muted)) 0%, oklch(var(--card)) 60%, oklch(var(--primary)/0.07) 100%)",
                  }}
                >
                  {/* Grid lines for map effect */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Map grid background"
                    role="img"
                  >
                    <defs>
                      <pattern
                        id="map-grid"
                        width="32"
                        height="32"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 32 0 L 0 0 0 32"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          className="text-primary"
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#map-grid)" />
                    {/* Roads */}
                    <line
                      x1="0"
                      y1="50%"
                      x2="100%"
                      y2="50%"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-primary"
                      opacity="0.3"
                    />
                    <line
                      x1="40%"
                      y1="0"
                      x2="40%"
                      y2="100%"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-primary"
                      opacity="0.3"
                    />
                    <line
                      x1="70%"
                      y1="0"
                      x2="70%"
                      y2="100%"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-primary"
                      opacity="0.2"
                    />
                    <line
                      x1="0"
                      y1="30%"
                      x2="100%"
                      y2="30%"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-primary"
                      opacity="0.2"
                    />
                    <line
                      x1="0"
                      y1="75%"
                      x2="100%"
                      y2="75%"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-primary"
                      opacity="0.2"
                    />
                  </svg>
                  {/* Map pin */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg mb-1">
                        <MapPin className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="w-2 h-2 rounded-full bg-primary/30" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-display text-base font-semibold text-foreground mb-1">
                    Visit Us
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    123 Paw Street, New York, NY 10001
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Open Mon–Fri 9am–6pm · Sat 10am–4pm
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA band */}
      <section className="bg-muted/40 border-t border-border py-10">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-muted-foreground text-sm">
            Prefer email?{" "}
            <a
              href="mailto:hello@adoptpaws.org"
              className="text-primary font-medium hover:underline"
            >
              hello@adoptpaws.org
            </a>{" "}
            · We aim to respond within 24 hours.
          </p>
        </div>
      </section>
    </div>
  );
}
