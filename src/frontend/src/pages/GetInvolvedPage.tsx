import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  DollarSign,
  Heart,
  Home,
  Landmark,
  Mail,
  Phone,
  Users,
} from "lucide-react";
import { useState } from "react";
import { applyForFoster, registerVolunteer } from "../lib/backend";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FieldErrors {
  [key: string]: string | undefined;
}

type AvailabilityKey = "mondayFriday" | "weekends" | "holidays";

interface VolunteerState {
  name: string;
  email: string;
  phone: string;
  availability: Record<AvailabilityKey, boolean>;
  interestArea: string;
  message: string;
}

interface FosterState {
  name: string;
  email: string;
  phone: string;
  homeType: string;
  experienceLevel: string;
  petType: string;
  duration: string;
  message: string;
}

// ─── Validators ───────────────────────────────────────────────────────────────

function validateVol(d: VolunteerState): FieldErrors {
  const e: FieldErrors = {};
  if (d.name.trim().length < 2) e.name = "Full name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))
    e.email = "A valid email is required.";
  if (d.phone.trim().length < 7) e.phone = "Phone number is required.";
  const anyAvail = Object.values(d.availability).some(Boolean);
  if (!anyAvail)
    e.availability = "Please select at least one availability slot.";
  if (!d.interestArea) e.interestArea = "Please choose an interest area.";
  return e;
}

function validateFoster(d: FosterState): FieldErrors {
  const e: FieldErrors = {};
  if (d.name.trim().length < 2) e.name = "Full name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))
    e.email = "A valid email is required.";
  if (d.phone.trim().length < 7) e.phone = "Phone number is required.";
  if (!d.homeType) e.homeType = "Please select your home type.";
  if (!d.experienceLevel)
    e.experienceLevel = "Please select your experience level.";
  if (!d.petType)
    e.petType = "Please select the pet type you'd like to foster.";
  if (!d.duration) e.duration = "Please select your duration preference.";
  return e;
}

// ─── Initial state ─────────────────────────────────────────────────────────────

const VOL_INIT: VolunteerState = {
  name: "",
  email: "",
  phone: "",
  availability: { mondayFriday: false, weekends: false, holidays: false },
  interestArea: "",
  message: "",
};

const FOSTER_INIT: FosterState = {
  name: "",
  email: "",
  phone: "",
  homeType: "",
  experienceLevel: "",
  petType: "",
  duration: "",
  message: "",
};

// ─── Reusable field wrapper ────────────────────────────────────────────────────

function FieldGroup({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-foreground font-medium">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive mt-0.5">{error}</p>}
    </div>
  );
}

// ─── Volunteer Form ────────────────────────────────────────────────────────────

function VolunteerForm() {
  const [form, setForm] = useState<VolunteerState>(VOL_INIT);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const set =
    (
      field: keyof Pick<VolunteerState, "name" | "email" | "phone" | "message">,
    ) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const toggleAvail = (key: AvailabilityKey) =>
    setForm((prev) => ({
      ...prev,
      availability: { ...prev.availability, [key]: !prev.availability[key] },
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateVol(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      const availStr = (
        Object.entries(form.availability) as [AvailabilityKey, boolean][]
      )
        .filter(([, v]) => v)
        .map(
          ([k]) =>
            ({
              mondayFriday: "Monday–Friday",
              weekends: "Weekends",
              holidays: "Holidays",
            })[k],
        )
        .join(", ");
      await registerVolunteer({
        name: form.name,
        email: form.email,
        phone: form.phone,
        availability: availStr,
        skills: form.interestArea,
        message: form.message,
      });
      setSubmittedId(`VOL-${Date.now().toString().slice(-6)}`);
    } finally {
      setLoading(false);
    }
  };

  if (submittedId)
    return (
      <div
        className="text-center py-10 space-y-3"
        data-ocid="volunteer_form.success_state"
      >
        <CheckCircle2 className="w-14 h-14 text-secondary mx-auto" />
        <h3 className="font-display text-xl font-semibold text-foreground">
          Thank you for volunteering!
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
          We're so grateful for your time and heart. Our team will reach out
          within 3 business days.
        </p>
        <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary border border-secondary/20 rounded-full px-4 py-1.5 text-sm font-mono font-medium mt-1">
          Reference ID: {submittedId}
        </div>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      data-ocid="volunteer_form.form"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <FieldGroup label="Full Name *" error={errors.name}>
          <Input
            value={form.name}
            onChange={set("name")}
            placeholder="Jane Smith"
            data-ocid="volunteer_form.name_input"
          />
          {errors.name && (
            <p
              className="text-xs text-destructive"
              data-ocid="volunteer_form.name_field_error"
            >
              {errors.name}
            </p>
          )}
        </FieldGroup>
        <FieldGroup label="Email Address *" error={errors.email}>
          <Input
            value={form.email}
            onChange={set("email")}
            type="email"
            placeholder="you@example.com"
            data-ocid="volunteer_form.email_input"
          />
          {errors.email && (
            <p
              className="text-xs text-destructive"
              data-ocid="volunteer_form.email_field_error"
            >
              {errors.email}
            </p>
          )}
        </FieldGroup>
        <FieldGroup label="Phone Number *" error={errors.phone}>
          <Input
            value={form.phone}
            onChange={set("phone")}
            placeholder="(555) 000-0000"
            data-ocid="volunteer_form.phone_input"
          />
          {errors.phone && (
            <p
              className="text-xs text-destructive"
              data-ocid="volunteer_form.phone_field_error"
            >
              {errors.phone}
            </p>
          )}
        </FieldGroup>
        <FieldGroup label="Interest Area *" error={errors.interestArea}>
          <Select
            onValueChange={(v) =>
              setForm((prev) => ({ ...prev, interestArea: v }))
            }
          >
            <SelectTrigger data-ocid="volunteer_form.interest_area_select">
              <SelectValue placeholder="Choose an area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Shelter Care">Shelter Care</SelectItem>
              <SelectItem value="Adoption Events">Adoption Events</SelectItem>
              <SelectItem value="Community Education">
                Community Education
              </SelectItem>
              <SelectItem value="Dog Walking">Dog Walking</SelectItem>
              <SelectItem value="Social Media">Social Media</SelectItem>
            </SelectContent>
          </Select>
          {errors.interestArea && (
            <p
              className="text-xs text-destructive"
              data-ocid="volunteer_form.interest_area_field_error"
            >
              {errors.interestArea}
            </p>
          )}
        </FieldGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground font-medium">Availability *</Label>
        <div className="flex flex-wrap gap-4">
          {(
            [
              { key: "mondayFriday", label: "Monday – Friday" },
              { key: "weekends", label: "Weekends" },
              { key: "holidays", label: "Holidays" },
            ] as { key: AvailabilityKey; label: string }[]
          ).map(({ key, label }) => (
            <div key={key} className="flex items-center gap-2">
              <Checkbox
                id={`avail-${key}`}
                checked={form.availability[key]}
                onCheckedChange={() => toggleAvail(key)}
                data-ocid={`volunteer_form.availability_${key}_checkbox`}
              />
              <label
                htmlFor={`avail-${key}`}
                className="text-sm text-foreground cursor-pointer select-none"
              >
                {label}
              </label>
            </div>
          ))}
        </div>
        {errors.availability && (
          <p
            className="text-xs text-destructive"
            data-ocid="volunteer_form.availability_field_error"
          >
            {errors.availability}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="text-foreground font-medium">
          Anything you'd like to share? (Optional)
        </Label>
        <Textarea
          value={form.message}
          onChange={set("message")}
          placeholder="Tell us why you'd like to volunteer, any special skills, questions..."
          rows={3}
          data-ocid="volunteer_form.message_textarea"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-2.5 transition-smooth"
        data-ocid="volunteer_form.submit_button"
      >
        {loading ? "Submitting..." : "Submit Volunteer Application"}
      </Button>
    </form>
  );
}

// ─── Foster Form ───────────────────────────────────────────────────────────────

function FosterForm() {
  const [form, setForm] = useState<FosterState>(FOSTER_INIT);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const set =
    (field: keyof Pick<FosterState, "name" | "email" | "phone" | "message">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateFoster(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      await applyForFoster({
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: `${form.homeType} — Duration: ${form.duration}`,
        homeType: form.homeType,
        preferredPetType: form.petType,
        experience: form.experienceLevel,
        message: form.message,
      });
      setSubmittedId(`FST-${Date.now().toString().slice(-6)}`);
    } finally {
      setLoading(false);
    }
  };

  if (submittedId)
    return (
      <div
        className="text-center py-10 space-y-3"
        data-ocid="foster_form.success_state"
      >
        <CheckCircle2 className="w-14 h-14 text-secondary mx-auto" />
        <h3 className="font-display text-xl font-semibold text-foreground">
          Foster application received!
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
          You've taken a beautiful step for an animal in need. We'll match you
          with a pet within 5 business days.
        </p>
        <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary border border-secondary/20 rounded-full px-4 py-1.5 text-sm font-mono font-medium mt-1">
          Reference ID: {submittedId}
        </div>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      data-ocid="foster_form.form"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <FieldGroup label="Full Name *" error={errors.name}>
          <Input
            value={form.name}
            onChange={set("name")}
            placeholder="Jane Smith"
            data-ocid="foster_form.name_input"
          />
          {errors.name && (
            <p
              className="text-xs text-destructive"
              data-ocid="foster_form.name_field_error"
            >
              {errors.name}
            </p>
          )}
        </FieldGroup>
        <FieldGroup label="Email Address *" error={errors.email}>
          <Input
            value={form.email}
            onChange={set("email")}
            type="email"
            placeholder="you@example.com"
            data-ocid="foster_form.email_input"
          />
          {errors.email && (
            <p
              className="text-xs text-destructive"
              data-ocid="foster_form.email_field_error"
            >
              {errors.email}
            </p>
          )}
        </FieldGroup>
        <FieldGroup label="Phone Number *" error={errors.phone}>
          <Input
            value={form.phone}
            onChange={set("phone")}
            placeholder="(555) 000-0000"
            data-ocid="foster_form.phone_input"
          />
          {errors.phone && (
            <p
              className="text-xs text-destructive"
              data-ocid="foster_form.phone_field_error"
            >
              {errors.phone}
            </p>
          )}
        </FieldGroup>
        <FieldGroup label="Home Type *" error={errors.homeType}>
          <Select
            onValueChange={(v) => setForm((prev) => ({ ...prev, homeType: v }))}
          >
            <SelectTrigger data-ocid="foster_form.home_type_select">
              <SelectValue placeholder="Select home type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="House">House</SelectItem>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="Farm">Farm</SelectItem>
            </SelectContent>
          </Select>
          {errors.homeType && (
            <p
              className="text-xs text-destructive"
              data-ocid="foster_form.home_type_field_error"
            >
              {errors.homeType}
            </p>
          )}
        </FieldGroup>
        <FieldGroup label="Experience Level *" error={errors.experienceLevel}>
          <Select
            onValueChange={(v) =>
              setForm((prev) => ({ ...prev, experienceLevel: v }))
            }
          >
            <SelectTrigger data-ocid="foster_form.experience_level_select">
              <SelectValue placeholder="Your experience with pets" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None — first-time pet carer</SelectItem>
              <SelectItem value="Some">Some — had pets before</SelectItem>
              <SelectItem value="Experienced">
                Experienced — multiple pets / prior fostering
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.experienceLevel && (
            <p
              className="text-xs text-destructive"
              data-ocid="foster_form.experience_level_field_error"
            >
              {errors.experienceLevel}
            </p>
          )}
        </FieldGroup>
        <FieldGroup label="Pet Type to Foster *" error={errors.petType}>
          <Select
            onValueChange={(v) => setForm((prev) => ({ ...prev, petType: v }))}
          >
            <SelectTrigger data-ocid="foster_form.pet_type_select">
              <SelectValue placeholder="Choose a pet type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Dogs">Dogs</SelectItem>
              <SelectItem value="Cats">Cats</SelectItem>
              <SelectItem value="Rabbits">Rabbits</SelectItem>
              <SelectItem value="Any">Any — I'm open!</SelectItem>
            </SelectContent>
          </Select>
          {errors.petType && (
            <p
              className="text-xs text-destructive"
              data-ocid="foster_form.pet_type_field_error"
            >
              {errors.petType}
            </p>
          )}
        </FieldGroup>
      </div>

      <FieldGroup label="Duration Preference *" error={errors.duration}>
        <Select
          onValueChange={(v) => setForm((prev) => ({ ...prev, duration: v }))}
        >
          <SelectTrigger data-ocid="foster_form.duration_select">
            <SelectValue placeholder="How long can you foster?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Short-term (2–4 weeks)">
              Short-term — 2 to 4 weeks
            </SelectItem>
            <SelectItem value="Medium (1–3 months)">
              Medium — 1 to 3 months
            </SelectItem>
            <SelectItem value="Long-term (3+ months)">
              Long-term — 3 months or more
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.duration && (
          <p
            className="text-xs text-destructive"
            data-ocid="foster_form.duration_field_error"
          >
            {errors.duration}
          </p>
        )}
      </FieldGroup>

      <div className="space-y-1.5">
        <Label className="text-foreground font-medium">
          Anything else to share? (Optional)
        </Label>
        <Textarea
          value={form.message}
          onChange={set("message")}
          placeholder="Fenced yard? Other pets at home? Questions for us..."
          rows={3}
          data-ocid="foster_form.message_textarea"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-2.5 transition-smooth"
        data-ocid="foster_form.submit_button"
      >
        {loading ? "Submitting..." : "Apply to Foster a Pet"}
      </Button>
    </form>
  );
}

// ─── Donate Section ────────────────────────────────────────────────────────────

const IMPACT_TIERS = [
  { amount: "$25", impact: "Feeds a shelter pet for a full month" },
  { amount: "$50", impact: "Covers core vaccinations for one pet" },
  {
    amount: "$100",
    impact: "Sponsors a full adoption — vet check, microchip & more",
  },
];

function DonateSection() {
  return (
    <div className="space-y-8" data-ocid="donate.section">
      {/* Impact statements */}
      <div>
        <h3 className="font-display text-lg font-semibold text-primary mb-4">
          Your donation makes a real difference
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {IMPACT_TIERS.map(({ amount, impact }) => (
            <div
              key={amount}
              className="bg-secondary/8 border border-secondary/20 rounded-xl p-4 text-center space-y-1"
            >
              <p className="font-display text-2xl font-bold text-secondary">
                {amount}
              </p>
              <p className="text-sm text-muted-foreground leading-snug">
                {impact}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How donations help */}
      <div className="bg-muted/40 rounded-xl p-5 space-y-2">
        <h4 className="font-display font-semibold text-foreground">
          How your support helps
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1.5 list-none">
          {[
            "90¢ of every dollar goes directly to animal care",
            "Funds emergency veterinary treatment for rescued pets",
            "Supports our network of foster families with supplies",
            "Runs community adoption events across the city",
            "Provides behavioural training for difficult-to-adopt animals",
          ].map((line) => (
            <li key={line} className="flex items-start gap-2">
              <Heart className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact to donate box */}
      <div
        className="border-2 border-primary/25 bg-primary/5 rounded-xl p-6 space-y-4"
        data-ocid="donate.contact_box"
      >
        <div className="flex items-center gap-2">
          <Landmark className="w-5 h-5 text-primary shrink-0" />
          <h4 className="font-display font-semibold text-primary">
            Ready to donate? Contact us
          </h4>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          We currently accept donations by bank transfer or cheque. Reach out to
          us and we'll guide you through the process — every contribution is
          tax-deductible and comes with a receipt.
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Mail className="w-4 h-4 text-primary shrink-0" />
            <span>
              <span className="text-muted-foreground">Email: </span>
              <a
                href="mailto:donate@rescuetails.org"
                className="text-primary hover:underline font-medium"
                data-ocid="donate.email_link"
              >
                donate@rescuetails.org
              </a>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Phone className="w-4 h-4 text-primary shrink-0" />
            <span>
              <span className="text-muted-foreground">Phone: </span>
              <a
                href="tel:+15551234567"
                className="text-primary hover:underline font-medium"
                data-ocid="donate.phone_link"
              >
                (555) 123-4567
              </a>
            </span>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-sm space-y-1">
          <p className="font-semibold text-foreground">Bank Transfer Details</p>
          <p className="text-muted-foreground">
            Account Name: Rescue Tails Foundation
          </p>
          <p className="text-muted-foreground">
            Account No: •••• •••• 4287{" "}
            <span className="text-xs">(provided on request)</span>
          </p>
          <p className="text-muted-foreground">
            Routing: •••••1234{" "}
            <span className="text-xs">(provided on request)</span>
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            For security, full banking details are shared directly via email
            after you contact us.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const HOW_SECTIONS = [
  {
    icon: Users,
    title: "Volunteer",
    color: "text-primary",
    bg: "bg-primary/10",
    desc: "Walk dogs, photograph adoptable pets, run community events, help with transport, or support our social media team. Every hour counts.",
  },
  {
    icon: Home,
    title: "Foster a Pet",
    color: "text-secondary",
    bg: "bg-secondary/10",
    desc: "Open your home temporarily to a pet in need. Foster families are the single most important part of our rescue network — you save lives.",
    highlight: true,
  },
  {
    icon: DollarSign,
    title: "Donate",
    color: "text-primary",
    bg: "bg-primary/10",
    desc: "Your donation directly funds food, vet care, and shelter operations. 90% of every dollar goes straight to the animals.",
  },
];

export function GetInvolvedPage() {
  return (
    <div data-ocid="get_involved.page">
      {/* Hero */}
      <section className="bg-card border-b border-border py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
          <Badge className="bg-secondary/15 text-secondary border border-secondary/20 mb-4 px-3 py-1">
            Get Involved
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">
            Get Involved
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
            Together we can give every pet a forever home. Whether you
            volunteer, foster, or donate — your contribution changes lives.
          </p>
        </div>
      </section>

      {/* How You Can Help cards */}
      <section className="bg-muted/30 py-12 border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-display text-2xl font-semibold text-primary text-center mb-8">
            Three ways to make a difference
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {HOW_SECTIONS.map(({ icon: Icon, title, color, bg, desc }) => (
              <div
                key={title}
                className="bg-card border border-border rounded-2xl p-6 text-center shadow-pet-card hover:shadow-pet-hover transition-smooth"
              >
                <div
                  className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <Tabs defaultValue="volunteer">
            <TabsList
              className="grid grid-cols-3 mb-8 w-full"
              data-ocid="get_involved.form_tabs"
            >
              <TabsTrigger
                value="volunteer"
                data-ocid="get_involved.volunteer_tab"
              >
                Volunteer
              </TabsTrigger>
              <TabsTrigger value="foster" data-ocid="get_involved.foster_tab">
                Foster a Pet
              </TabsTrigger>
              <TabsTrigger value="donate" data-ocid="get_involved.donate_tab">
                Donate
              </TabsTrigger>
            </TabsList>

            {/* ── Volunteer ── */}
            <TabsContent value="volunteer">
              <Card className="border-border shadow-pet-card">
                <CardContent className="p-6 md:p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-5 h-5 text-primary" />
                      <h2 className="font-display text-xl font-semibold text-primary">
                        Volunteer Registration
                      </h2>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Our volunteers are the heartbeat of Rescue Tails. From
                      walking dogs every morning to running adoption day events,
                      there's a role for every schedule and skill set. Join our
                      crew of{" "}
                      <strong className="text-foreground">
                        340+ active volunteers
                      </strong>{" "}
                      making a difference every day.
                    </p>
                  </div>
                  <VolunteerForm />
                </CardContent>
              </Card>
            </TabsContent>

            {/* ── Foster ── */}
            <TabsContent value="foster">
              <Card className="border-border shadow-pet-card">
                <CardContent className="p-6 md:p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Home className="w-5 h-5 text-secondary" />
                      <h2 className="font-display text-xl font-semibold text-primary">
                        Foster Application
                      </h2>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Foster families provide a safe, loving home while we work
                      to find a permanent placement. You don't need prior
                      experience — just a warm heart and a stable home. We
                      supply food, supplies, and 24/7 support. Last year, our{" "}
                      <strong className="text-foreground">
                        180 foster families
                      </strong>{" "}
                      helped us place over 600 pets.
                    </p>
                  </div>
                  <FosterForm />
                </CardContent>
              </Card>
            </TabsContent>

            {/* ── Donate ── */}
            <TabsContent value="donate">
              <Card className="border-border shadow-pet-card">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-6">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <h2 className="font-display text-xl font-semibold text-primary">
                      Make a Donation
                    </h2>
                  </div>
                  <DonateSection />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
