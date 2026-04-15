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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Link, useSearch } from "@tanstack/react-router";
import {
  CheckCircle2,
  ClipboardList,
  Clock,
  Heart,
  Loader2,
  PawPrint,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";
import { submitAdoptionApplication } from "../lib/backend";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  experienceLevel: string;
  homeType: string;
  reasonForAdoption: string;
  petNameOrId: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  experienceLevel?: string;
  homeType?: string;
  reasonForAdoption?: string;
  agreeToTerms?: string;
}

// ─── Validation ──────────────────────────────────────────────────────────────

function validate(data: FormState): FormErrors {
  const errors: FormErrors = {};

  if (data.fullName.trim().length < 2)
    errors.fullName = "Full name is required";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email address";

  const digitsOnly = data.phone.replace(/\D/g, "");
  if (digitsOnly.length !== 10) errors.phone = "Phone number must be 10 digits";

  if (data.streetAddress.trim().length < 5)
    errors.streetAddress = "Street address is required";

  if (data.city.trim().length < 2) errors.city = "City is required";

  if (data.state.trim().length < 2) errors.state = "State is required";

  if (data.zipCode.trim().length < 5) errors.zipCode = "ZIP code is required";

  if (!data.experienceLevel)
    errors.experienceLevel = "Please select your experience level";

  if (!data.homeType) errors.homeType = "Please select your home type";

  if (data.reasonForAdoption.trim().length < 50)
    errors.reasonForAdoption = `Please write at least 50 characters (${data.reasonForAdoption.trim().length}/50)`;

  if (!data.agreeToTerms)
    errors.agreeToTerms = "You must agree to the terms to proceed";

  return errors;
}

// ─── Adoption Process Steps (side panel) ─────────────────────────────────────

const PROCESS_STEPS = [
  {
    icon: ClipboardList,
    title: "Submit Application",
    desc: "Fill out this form with your details.",
  },
  {
    icon: Shield,
    title: "Verification",
    desc: "Our team reviews your application.",
  },
  {
    icon: Users,
    title: "Meet & Greet",
    desc: "Schedule a visit with your chosen pet.",
  },
  {
    icon: PawPrint,
    title: "Home Check",
    desc: "A quick home suitability assessment.",
  },
  {
    icon: Heart,
    title: "Welcome Home",
    desc: "Sign paperwork and bring them home!",
  },
];

// ─── Field Error ─────────────────────────────────────────────────────────────

function FieldError({
  id,
  message,
}: {
  id: string;
  message?: string;
}) {
  if (!message) return null;
  return (
    <p className="text-xs text-destructive mt-1" data-ocid={id}>
      {message}
    </p>
  );
}

// ─── Section Heading ─────────────────────────────────────────────────────────

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <h2 className="font-display font-semibold text-foreground text-lg">
        {title}
      </h2>
      <Separator className="flex-1" />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const INITIAL_FORM = (petId: string): FormState => ({
  fullName: "",
  email: "",
  phone: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  experienceLevel: "",
  homeType: "",
  reasonForAdoption: "",
  petNameOrId: petId,
  agreeToTerms: false,
});

export function AdoptionFormPage() {
  const search = useSearch({ strict: false }) as { petId?: string };
  const petId = search.petId ?? "";

  const [form, setForm] = useState<FormState>(INITIAL_FORM(petId));
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const setField =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const setSelect = (field: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      await submitAdoptionApplication({
        petId: BigInt(0),
        applicantName: form.fullName,
        email: form.email,
        phone: form.phone,
        address: `${form.streetAddress}, ${form.city}, ${form.state} ${form.zipCode}`,
        homeType: form.homeType,
        hasYard: form.homeType === "house_yard" || form.homeType === "farm",
        hasOtherPets: false,
        hasChildren: false,
        petExperience: form.experienceLevel,
        reasonForAdoption: form.reasonForAdoption,
      });
      const id = `APP-${Date.now().toString(36).toUpperCase()}`;
      setApplicationId(id);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  // ─── Success Screen ───────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div
        className="min-h-[70vh] flex items-center justify-center bg-background px-4"
        data-ocid="adoption_form.success_state"
      >
        <div className="max-w-lg w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-secondary/15 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-secondary" />
              </div>
              <span
                className="absolute -top-1 -right-1 text-2xl"
                role="img"
                aria-label="confetti"
              >
                🎉
              </span>
            </div>
          </div>
          <div className="text-4xl mb-4" role="img" aria-label="celebration">
            🐾 ✨ 🎊
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
            Application Received!
          </h2>
          <p className="text-muted-foreground mb-2 leading-relaxed text-base">
            Your application has been received! We'll contact you within{" "}
            <strong className="text-foreground">3–5 business days</strong> to
            discuss the next steps.
          </p>
          <div className="bg-muted/40 border border-border rounded-xl px-6 py-4 my-6 inline-block w-full">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Application ID
            </p>
            <p
              className="font-mono text-lg font-bold text-primary"
              data-ocid="adoption_form.application_id"
            >
              {applicationId}
            </p>
          </div>
          <p className="text-sm text-muted-foreground mb-8">
            Keep this ID for your records. You can reference it in any
            communication with our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
            >
              <Link to="/pets" data-ocid="adoption_form.browse_pets_link">
                Browse More Pets
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/" data-ocid="adoption_form.home_link">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Form ─────────────────────────────────────────────────────────────────

  return (
    <div data-ocid="adoption_form.page">
      {/* Page Header */}
      <section className="bg-card border-b border-border py-10">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <Badge className="bg-secondary/15 text-secondary border-secondary/20 mb-3">
            Adoption Application
          </Badge>
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Apply to Adopt
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Complete the form below to begin your adoption journey. Fields
            marked with <span className="text-destructive font-medium">*</span>{" "}
            are required.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="bg-background py-10">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
            {/* ── Left: Form ── */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              data-ocid="adoption_form.form"
              noValidate
            >
              {/* Section 1: Personal Information */}
              <Card className="border-border">
                <CardContent className="p-6">
                  <SectionHeading title="Personal Information" />
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="sm:col-span-2 space-y-1.5">
                      <Label htmlFor="fullName">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        value={form.fullName}
                        onChange={setField("fullName")}
                        placeholder="Jane Smith"
                        data-ocid="adoption_form.name_input"
                        aria-required
                      />
                      <FieldError
                        id="adoption_form.name_field_error"
                        message={errors.fullName}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label htmlFor="email">
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={setField("email")}
                        placeholder="jane@example.com"
                        data-ocid="adoption_form.email_input"
                        aria-required
                      />
                      <FieldError
                        id="adoption_form.email_field_error"
                        message={errors.email}
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={setField("phone")}
                        placeholder="(555) 555-5555"
                        data-ocid="adoption_form.phone_input"
                        aria-required
                      />
                      <FieldError
                        id="adoption_form.phone_field_error"
                        message={errors.phone}
                      />
                    </div>

                    {/* Street Address */}
                    <div className="sm:col-span-2 space-y-1.5">
                      <Label htmlFor="streetAddress">
                        Street Address{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="streetAddress"
                        value={form.streetAddress}
                        onChange={setField("streetAddress")}
                        placeholder="123 Maple Street"
                        data-ocid="adoption_form.street_address_input"
                        aria-required
                      />
                      <FieldError
                        id="adoption_form.street_address_field_error"
                        message={errors.streetAddress}
                      />
                    </div>

                    {/* City */}
                    <div className="space-y-1.5">
                      <Label htmlFor="city">
                        City <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="city"
                        value={form.city}
                        onChange={setField("city")}
                        placeholder="San Francisco"
                        data-ocid="adoption_form.city_input"
                        aria-required
                      />
                      <FieldError
                        id="adoption_form.city_field_error"
                        message={errors.city}
                      />
                    </div>

                    {/* State + Zip */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="state">
                          State <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="state"
                          value={form.state}
                          onChange={setField("state")}
                          placeholder="CA"
                          maxLength={2}
                          className="uppercase"
                          data-ocid="adoption_form.state_input"
                          aria-required
                        />
                        <FieldError
                          id="adoption_form.state_field_error"
                          message={errors.state}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="zipCode">
                          ZIP Code <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="zipCode"
                          value={form.zipCode}
                          onChange={setField("zipCode")}
                          placeholder="94102"
                          maxLength={10}
                          data-ocid="adoption_form.zip_input"
                          aria-required
                        />
                        <FieldError
                          id="adoption_form.zip_field_error"
                          message={errors.zipCode}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2: Home & Experience */}
              <Card className="border-border">
                <CardContent className="p-6">
                  <SectionHeading title="Home & Experience" />
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Experience Level */}
                    <div className="space-y-1.5">
                      <Label>
                        Experience Level{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        onValueChange={setSelect("experienceLevel")}
                        value={form.experienceLevel}
                      >
                        <SelectTrigger data-ocid="adoption_form.experience_select">
                          <SelectValue placeholder="Select your experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="first_time">
                            First-time owner
                          </SelectItem>
                          <SelectItem value="some_experience">
                            Some experience
                          </SelectItem>
                          <SelectItem value="long_term">
                            Long-term owner
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldError
                        id="adoption_form.experience_field_error"
                        message={errors.experienceLevel}
                      />
                    </div>

                    {/* Home Type */}
                    <div className="space-y-1.5">
                      <Label>
                        Home Type <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        onValueChange={setSelect("homeType")}
                        value={form.homeType}
                      >
                        <SelectTrigger data-ocid="adoption_form.home_type_select">
                          <SelectValue placeholder="Select your home type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="house_yard">
                            House with yard
                          </SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="farm">Farm</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldError
                        id="adoption_form.home_type_field_error"
                        message={errors.homeType}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 3: About Your Adoption */}
              <Card className="border-border">
                <CardContent className="p-6">
                  <SectionHeading title="About Your Adoption" />
                  <div className="space-y-5">
                    {/* Pet Name or ID */}
                    <div className="space-y-1.5">
                      <Label htmlFor="petNameOrId">Pet Name or ID</Label>
                      <Input
                        id="petNameOrId"
                        value={form.petNameOrId}
                        onChange={setField("petNameOrId")}
                        placeholder="e.g. Buddy or pet-0042"
                        data-ocid="adoption_form.pet_id_input"
                      />
                      <p className="text-xs text-muted-foreground">
                        Leave blank if you're open to any pet.
                      </p>
                    </div>

                    {/* Reason for Adoption */}
                    <div className="space-y-1.5">
                      <Label htmlFor="reasonForAdoption">
                        Reason for Adoption{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="reasonForAdoption"
                        value={form.reasonForAdoption}
                        onChange={setField("reasonForAdoption")}
                        placeholder="Tell us why you'd like to adopt and what kind of companion you're looking for. Minimum 50 characters."
                        rows={5}
                        data-ocid="adoption_form.reason_textarea"
                        aria-required
                      />
                      <div className="flex justify-between items-center">
                        <FieldError
                          id="adoption_form.reason_field_error"
                          message={errors.reasonForAdoption}
                        />
                        <span
                          className={`text-xs ml-auto tabular-nums ${
                            form.reasonForAdoption.trim().length < 50
                              ? "text-muted-foreground"
                              : "text-secondary"
                          }`}
                        >
                          {form.reasonForAdoption.trim().length}/50
                        </span>
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="space-y-1">
                      <div className="flex items-start gap-3 bg-muted/30 rounded-lg p-4">
                        <Checkbox
                          id="agreeToTerms"
                          checked={form.agreeToTerms}
                          onCheckedChange={(checked) =>
                            setForm((prev) => ({
                              ...prev,
                              agreeToTerms: !!checked,
                            }))
                          }
                          className="mt-0.5"
                          data-ocid="adoption_form.terms_checkbox"
                        />
                        <Label
                          htmlFor="agreeToTerms"
                          className="font-normal cursor-pointer text-sm leading-relaxed"
                        >
                          I agree to the adoption terms and conditions. I
                          understand that submitting this application does not
                          guarantee adoption and that all placements are subject
                          to review. <span className="text-destructive">*</span>
                        </Label>
                      </div>
                      <FieldError
                        id="adoption_form.terms_field_error"
                        message={errors.agreeToTerms}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-base h-12"
                disabled={loading}
                data-ocid="adoption_form.submit_button"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting Application…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Submit Application
                  </span>
                )}
              </Button>
            </form>

            {/* ── Right: Side Panel ── */}
            <aside className="space-y-5 lg:sticky lg:top-6">
              {/* Adoption Process Summary */}
              <Card className="border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    Adoption Process
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Here's what to expect after you apply.
                  </p>
                  <ol
                    className="space-y-4"
                    data-ocid="adoption_form.process_steps"
                  >
                    {PROCESS_STEPS.map((step, i) => (
                      <li
                        key={step.title}
                        className="flex items-start gap-3"
                        data-ocid={`adoption_form.process_step.${i + 1}`}
                      >
                        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground leading-snug">
                            {step.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {step.desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {/* Timeline Estimate */}
              <Card className="border-border bg-primary/5">
                <CardContent className="p-5 flex gap-3 items-start">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-0.5">
                      Timeline Estimate
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Most adoptions complete in{" "}
                      <strong className="text-foreground">7–14 days</strong>{" "}
                      from application to homecoming, depending on the review
                      process and meet-and-greet scheduling.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Why Adopt Quote */}
              <Card className="border-border bg-secondary/8 overflow-hidden">
                <CardContent className="p-5">
                  <blockquote className="space-y-3">
                    <PawPrint className="w-6 h-6 text-secondary" />
                    <p className="text-sm italic text-foreground leading-relaxed">
                      "When you adopt, you don't just change a pet's world — you
                      change your own. Every rescue is a story of second
                      chances."
                    </p>
                    <footer className="text-xs text-muted-foreground font-medium">
                      — Forever Homes Team
                    </footer>
                  </blockquote>
                </CardContent>
              </Card>

              {/* Questions? */}
              <Card className="border-border">
                <CardContent className="p-5 text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Have questions about the process?
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Link to="/contact" data-ocid="adoption_form.contact_link">
                      Contact Our Team
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
