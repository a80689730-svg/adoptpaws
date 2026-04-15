import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Globe,
  Heart,
  Home,
  Leaf,
  PawPrint,
  TrendingUp,
  Users,
} from "lucide-react";

const TEAM = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Veterinary Advisor",
    bio: "Leading animal health expert ensuring every pet in our network receives proper care before and after adoption.",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80",
  },
  {
    name: "Mark Johnson",
    role: "Executive Director",
    bio: "Passionate animal welfare advocate with 12+ years building nonprofit organizations that create lasting impact.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
  },
  {
    name: "Lisa Chen",
    role: "Adoption Coordinator",
    bio: "Specialist in matching families with their perfect companions — has facilitated over 800 successful adoptions.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
  },
  {
    name: "Tom Rivera",
    role: "Community Outreach",
    bio: "Builds relationships with local shelters, volunteers, and community groups to expand our adoption network.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
  },
];

const STATS = [
  { icon: TrendingUp, value: "7M+", label: "Pets enter US shelters annually" },
  { icon: Home, value: "1 in 5", label: "Shelter pets find a home each year" },
  {
    icon: Heart,
    value: "100%",
    label: "Adopted pets are just as loving and loyal",
  },
];

const PARTNERS = [
  {
    name: "ASPCA",
    icon: "🐾",
    description:
      "As part of the ASPCA Partner Network, we share best practices and resources to improve animal welfare standards nationwide.",
  },
  {
    name: "Humane Society",
    icon: "🤝",
    description:
      "Our partnership with the Humane Society amplifies our adoption reach and connects us with thousands of shelters across the country.",
  },
  {
    name: "Local Paws Rescue",
    icon: "🏠",
    description:
      "Local Paws Rescue is our boots-on-the-ground partner for community-level adoptions and foster placements in underserved areas.",
  },
  {
    name: "Furever Friends Foundation",
    icon: "🌟",
    description:
      "Furever Friends funds veterinary care and rehabilitation for animals in our network, giving every pet a fair chance at adoption.",
  },
];

export function AboutPage() {
  return (
    <div data-ocid="about.page">
      {/* Hero — subtle blue gradient */}
      <section
        className="relative py-20 overflow-hidden border-b border-border"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.96 0.025 235) 0%, oklch(0.98 0.012 200) 50%, oklch(0.97 0.018 155) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, oklch(0.55 0.07 260) 0%, transparent 60%), radial-gradient(circle at 70% 30%, oklch(0.65 0.08 150) 0%, transparent 60%)",
          }}
        />
        <div className="relative container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <Badge
            className="mb-5 text-sm font-medium"
            style={{
              background: "oklch(0.92 0.04 240 / 0.6)",
              color: "oklch(0.35 0.07 250)",
              border: "1px solid oklch(0.8 0.04 240 / 0.5)",
            }}
          >
            About AdoptPaws
          </Badge>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-tight">
            About{" "}
            <span style={{ color: "oklch(0.5 0.08 255)" }}>AdoptPaws</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            We believe every animal deserves a loving home. Since 2015,
            AdoptPaws has connected thousands of adoptable pets with caring
            families — making the journey from shelter to home joyful,
            transparent, and trusted.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { val: "2015", label: "Founded" },
              { val: "150+", label: "Partner Shelters" },
              { val: "2,400+", label: "Pets Placed" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div
                  className="font-display text-3xl font-bold"
                  style={{ color: "oklch(0.5 0.08 255)" }}
                >
                  {val}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className="bg-background py-16"
        data-ocid="about.mission_section"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Our Purpose
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Two commitments that guide everything we do.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Mission */}
            <Card
              className="border-border overflow-hidden"
              data-ocid="about.mission_card"
            >
              <CardContent className="p-0">
                <div
                  className="h-2 w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.55 0.07 260), oklch(0.65 0.08 235))",
                  }}
                />
                <div className="p-8">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "oklch(0.93 0.04 255)" }}
                  >
                    <PawPrint
                      className="w-6 h-6"
                      style={{ color: "oklch(0.5 0.08 255)" }}
                    />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    Our Mission
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To connect adoptable animals with loving families by
                    building transparent, trustworthy relationships between
                    shelters, rescues, and the communities they serve — making
                    every adoption a lasting success story.
                  </p>
                </div>
              </CardContent>
            </Card>
            {/* Vision */}
            <Card
              className="border-border overflow-hidden"
              data-ocid="about.vision_card"
            >
              <CardContent className="p-0">
                <div
                  className="h-2 w-full"
                  style={{
                    background:
                      "linear-gradient(90deg, oklch(0.58 0.09 150), oklch(0.68 0.08 130))",
                  }}
                />
                <div className="p-8">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "oklch(0.92 0.04 150)" }}
                  >
                    <Leaf
                      className="w-6 h-6"
                      style={{ color: "oklch(0.48 0.09 150)" }}
                    />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3">
                    Our Vision
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A world where no healthy, adoptable animal is without a home
                    — where every person who wants a companion finds their
                    perfect match, and every shelter has the community support
                    it needs to thrive.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Adoption Matters — stats + paragraphs */}
      <section
        className="bg-muted/30 py-16"
        data-ocid="about.why_adoption_section"
      >
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Why Adoption Matters
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The numbers are real. The impact is profound.
            </p>
          </div>

          {/* Impact stats */}
          <div
            className="grid sm:grid-cols-3 gap-6 mb-12"
            data-ocid="about.stats_list"
          >
            {STATS.map(({ icon: Icon, value, label }, i) => (
              <div
                key={label}
                className="bg-card rounded-2xl p-7 border border-border text-center shadow-pet-card transition-smooth hover:shadow-pet-hover"
                data-ocid={`about.stat.${i + 1}`}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "oklch(0.93 0.04 255)" }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: "oklch(0.5 0.08 255)" }}
                  />
                </div>
                <div
                  className="font-display text-3xl font-bold mb-2"
                  style={{ color: "oklch(0.5 0.08 255)" }}
                >
                  {value}
                </div>
                <p className="text-sm text-muted-foreground leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Paragraphs */}
          <div className="bg-card rounded-2xl border border-border p-8 md:p-10 space-y-5">
            <p className="text-foreground leading-relaxed">
              Each year, more than <strong>7 million companion animals</strong>{" "}
              enter U.S. shelters. Cats, dogs, rabbits, and other pets — many of
              them healthy, house-trained, and full of love — wait anxiously for
              someone to give them a second chance. Choosing to adopt directly
              reduces this number and gives overwhelmed shelters the breathing
              room to care for every animal who comes through their doors.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Adopting a pet is one of the most meaningful decisions a family
              can make. Studies consistently show that adopted animals bond just
              as deeply — often <em>more deeply</em> — as pets purchased from
              breeders. They adapt quickly, they're grateful, and they bring joy
              in ways that are difficult to put into words. When you adopt,
              you're not just gaining a companion; you're saving a life and
              making space for another.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Beyond the individual impact, widespread adoption culture shifts
              society. It reduces demand for puppy mills and unethical breeding
              operations, supports underfunded shelters, and builds communities
              rooted in compassion and responsibility. Every adoption ripples
              outward — encouraging neighbors, friends, and families to consider
              the shelter-first choice next time.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-background py-16" data-ocid="about.team_section">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Dedicated people who show up every day for animals and the
              families who love them.
            </p>
          </div>
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-ocid="about.team_list"
          >
            {TEAM.map((member, i) => (
              <Card
                key={member.name}
                className="border-border overflow-hidden transition-smooth hover:shadow-pet-hover group"
                data-ocid={`about.team_member.${i + 1}`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-52 object-cover object-top transition-smooth group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                </div>
                <CardContent className="p-5">
                  <h3 className="font-display font-bold text-foreground text-base">
                    {member.name}
                  </h3>
                  <p
                    className="text-sm font-medium mb-2"
                    style={{ color: "oklch(0.5 0.08 255)" }}
                  >
                    {member.role}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="bg-muted/30 py-16" data-ocid="about.partners_section">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">
              Our Partners
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We work alongside respected organizations to maximize our reach
              and impact.
            </p>
          </div>
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
            data-ocid="about.partners_list"
          >
            {PARTNERS.map((partner, i) => (
              <Card
                key={partner.name}
                className="border-border bg-card transition-smooth hover:shadow-pet-hover"
                data-ocid={`about.partner.${i + 1}`}
              >
                <CardContent className="p-6 flex flex-col gap-3">
                  <div className="text-3xl">{partner.icon}</div>
                  <h3 className="font-display font-bold text-foreground text-sm">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {partner.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.52 0.08 255) 0%, oklch(0.48 0.1 240) 50%, oklch(0.44 0.08 260) 100%)",
        }}
        data-ocid="about.cta_section"
      >
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "oklch(1 0 0 / 0.15)" }}
          >
            <Users className="w-7 h-7 text-white" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Mission
          </h2>
          <p className="text-white/80 text-lg leading-relaxed mb-8">
            Whether you're ready to adopt, willing to foster, or simply want to
            volunteer your time — there's a place for you in the AdoptPaws
            family. Together, we can end pet homelessness.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white font-semibold hover:bg-white/90 transition-smooth"
              style={{ color: "oklch(0.5 0.08 255)" }}
              data-ocid="about.adopt_cta_button"
            >
              <Link to="/pets">
                <PawPrint className="mr-2 w-4 h-4" /> Meet Available Pets
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 text-white hover:bg-white/10 hover:border-white/60 transition-smooth"
              data-ocid="about.volunteer_cta_button"
            >
              <Link to="/get-involved">
                Get Involved <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" /> Nationwide Network
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" /> 2,400+ Pets Placed
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" /> 800+ Volunteers
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
