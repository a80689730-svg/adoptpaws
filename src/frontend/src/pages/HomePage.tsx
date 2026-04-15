import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Gift,
  HandHeart,
  Heart,
  PawPrint,
  Quote,
  Search,
  Shield,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useFeaturedPets } from "../hooks/useBackend";
import type { Pet } from "../types";

// ─── Static data ──────────────────────────────────────────────────────────────
const MISSION_ITEMS = [
  {
    icon: Search,
    title: "Find Your Match",
    desc: "Browse hundreds of loving pets waiting for a forever home. Filter by breed, age, size, and location to find your perfect companion.",
    colorText: "text-primary",
    colorBg: "bg-primary/10",
  },
  {
    icon: Shield,
    title: "Safe & Transparent",
    desc: "Every pet comes with full health records, vaccination status, and verified shelter information so you can adopt with complete confidence.",
    colorText: "text-secondary",
    colorBg: "bg-secondary/10",
  },
  {
    icon: Heart,
    title: "Happy Endings",
    desc: "Over 2,400 successful adoptions and counting. We stay with you every step of the way — from first browse to forever home.",
    colorText: "text-accent",
    colorBg: "bg-accent/10",
  },
];

const SUCCESS_STORIES = [
  {
    adopter: "Emily",
    petName: "Max",
    petBreed: "Golden Retriever",
    badge: "Dog Adoption",
    date: "October 2025",
    photo:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=120&h=120&fit=crop&crop=faces",
    quote:
      "We never imagined a dog could change our lives so completely. Max joined our family six months ago and every single day has been brighter. He's not just a pet — he's our best friend.",
  },
  {
    adopter: "Sarah",
    petName: "Luna",
    petBreed: "Domestic Shorthair",
    badge: "Cat Adoption",
    date: "January 2026",
    photo:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=120&h=120&fit=crop&crop=faces",
    quote:
      "I adopted Luna on a whim and she turned out to be exactly what I needed. Her quiet, gentle presence is the perfect comfort after a long day. I can't imagine coming home to an empty apartment anymore.",
  },
];

const QUICK_ACTIONS = [
  {
    icon: PawPrint,
    title: "Adopt a Pet",
    desc: "Browse pets available for adoption and give a deserving animal a loving forever home.",
    cta: "Browse Pets",
    href: "/pets",
    colorText: "text-primary",
    colorBg: "bg-primary/10",
    btnClass: "bg-primary hover:bg-primary/90 text-primary-foreground",
  },
  {
    icon: HandHeart,
    title: "Give a Pet for Adoption",
    desc: "Need to rehome your pet? We'll help find a safe, loving family through our trusted network.",
    cta: "List Your Pet",
    href: "/adopt",
    colorText: "text-secondary",
    colorBg: "bg-secondary/10",
    btnClass: "bg-secondary hover:bg-secondary/90 text-secondary-foreground",
  },
  {
    icon: Gift,
    title: "Donate",
    desc: "Your donation directly funds medical care, shelter, and food for pets awaiting adoption.",
    cta: "Make a Donation",
    href: "/get-involved",
    colorText: "text-accent",
    colorBg: "bg-accent/10",
    btnClass: "border border-accent text-accent hover:bg-accent/5",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────
function PetCard({ pet, index }: { pet: Pet; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      data-ocid={`featured_pets.item.${index + 1}`}
    >
      <Card className="overflow-hidden group cursor-pointer shadow-pet-card hover:shadow-pet-hover transition-smooth border-border h-full flex flex-col">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={pet.imageUrl}
            alt={pet.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground border-0 text-xs capitalize">
            {pet.type}
          </Badge>
          {pet.vaccinated && (
            <Badge className="absolute top-3 right-3 bg-primary/90 text-primary-foreground border-0 text-xs">
              Vaccinated
            </Badge>
          )}
        </div>
        <CardContent className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-lg font-display font-semibold text-foreground">
              {pet.name}
            </h3>
            <span className="text-sm text-muted-foreground capitalize">
              {pet.gender}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">{pet.breed}</p>
          <p className="text-sm text-muted-foreground mb-4 flex-1">
            {pet.age} · {pet.location}
          </p>
          <Link to="/pets/$id" params={{ id: String(pet.id) }}>
            <Button
              size="sm"
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-smooth"
              data-ocid={`featured_pets.adopt_button.${index + 1}`}
            >
              Adopt Me <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function PetCardSkeleton({ index }: { index: number }) {
  return (
    <Card
      className="overflow-hidden border-border"
      data-ocid={`featured_pets.loading_state.${index + 1}`}
    >
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-9 w-full mt-2" />
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function HomePage() {
  const { data: featuredPets, isLoading } = useFeaturedPets();

  return (
    <div data-ocid="home.page" className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        data-ocid="home.hero.section"
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1600"
          alt="Dogs running happily on a beach"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 text-center px-4 max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Badge className="mb-6 bg-secondary/20 text-white border border-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium">
              <PawPrint className="mr-1.5 h-3.5 w-3.5 inline" />
              2,400+ Successful Adoptions
            </Badge>
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6 tracking-tight drop-shadow-lg">
            Adopt, <span className="text-secondary">Don&apos;t</span> Shop
          </h1>

          <p className="text-xl md:text-2xl text-white/85 mb-10 leading-relaxed font-body max-w-xl mx-auto">
            Give a loving home to a pet in need. Every adoption changes two
            lives — yours and theirs.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/pets">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-6 text-base shadow-lg transition-smooth"
                data-ocid="home.hero.find_pet_button"
              >
                <Search className="mr-2 h-4 w-4" />
                Find Your Pet
              </Button>
            </Link>
            <Link to="/process">
              <Button
                size="lg"
                variant="outline"
                className="border-white/50 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm font-semibold px-8 py-6 text-base transition-smooth"
                data-ocid="home.hero.process_button"
              >
                Learn Our Process
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="text-white/50 text-xs uppercase tracking-widest font-body">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.6,
              ease: "easeInOut",
            }}
            className="w-0.5 h-6 bg-white/30 rounded-full"
          />
        </motion.div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────────────── */}
      <section
        data-ocid="home.mission.section"
        className="py-20 bg-primary/5 border-b border-border"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Adopt With Us?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              We make the adoption journey simple, safe, and deeply rewarding.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-ocid="home.mission.list"
          >
            {MISSION_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.12 }}
                  data-ocid={`home.mission.item.${i + 1}`}
                >
                  <Card className="h-full text-center p-6 border-border hover:shadow-pet-card transition-smooth bg-card">
                    <CardContent className="pt-2 pb-0 px-0">
                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${item.colorBg} mb-5`}
                      >
                        <Icon className={`h-6 w-6 ${item.colorText}`} />
                      </div>
                      <h3
                        className={`font-display text-xl font-semibold mb-3 ${item.colorText}`}
                      >
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Pets ─────────────────────────────────────────────────── */}
      <section
        data-ocid="home.featured_pets.section"
        className="py-20 bg-background"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4"
          >
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
                Meet Our Featured Pets
              </h2>
              <p className="text-muted-foreground text-lg">
                These wonderful animals are ready to find their forever home.
              </p>
            </div>
            <Link to="/pets">
              <Button
                variant="outline"
                className="shrink-0 border-primary text-primary hover:bg-primary/5 transition-smooth"
                data-ocid="home.featured_pets.view_all_button"
              >
                View All Pets <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="home.featured_pets.list"
          >
            {isLoading
              ? [0, 1, 2].map((i) => <PetCardSkeleton key={i} index={i} />)
              : (featuredPets ?? [])
                  .slice(0, 6)
                  .map((pet, i) => (
                    <PetCard key={String(pet.id)} pet={pet} index={i} />
                  ))}
          </div>

          {!isLoading && (featuredPets ?? []).length === 0 && (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="home.featured_pets.empty_state"
            >
              <PawPrint className="h-12 w-12 mx-auto mb-3 opacity-40" />
              <p className="text-lg font-medium mb-1">
                No featured pets right now
              </p>
              <p className="text-sm mb-4">
                Check back soon — new arrivals are added regularly.
              </p>
              <Link to="/pets">
                <Button
                  variant="outline"
                  data-ocid="home.featured_pets.browse_button"
                >
                  Browse All Pets
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Success Stories ───────────────────────────────────────────────── */}
      <section
        data-ocid="home.success_stories.section"
        className="py-20 bg-secondary/5 border-y border-border"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
              Happy Families
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Real stories from real families. Every adoption is a new chapter.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            data-ocid="home.stories.list"
          >
            {SUCCESS_STORIES.map((story, i) => (
              <motion.div
                key={story.adopter}
                initial={{ opacity: 0, x: i === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                data-ocid={`home.stories.item.${i + 1}`}
              >
                <Card className="p-6 border-border bg-card shadow-pet-card hover:shadow-pet-hover transition-smooth h-full flex flex-col">
                  <CardContent className="p-0 flex flex-col h-full">
                    <Quote className="h-8 w-8 text-secondary/60 mb-4 shrink-0" />
                    <blockquote className="text-foreground leading-relaxed text-base italic mb-6 flex-1">
                      &ldquo;{story.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                      <img
                        src={story.photo}
                        alt={`${story.petName} the ${story.petBreed}`}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-secondary/30 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-display font-semibold text-foreground">
                          {story.adopter} &amp; {story.petName}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {story.petBreed}
                        </p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge
                            variant="secondary"
                            className="text-xs px-2 py-0"
                          >
                            {story.badge}
                          </Badge>
                          <span className="flex items-center text-xs text-muted-foreground gap-1">
                            <Calendar className="h-3 w-3" />
                            {story.date}
                          </span>
                        </div>
                      </div>
                      <div className="ml-auto flex gap-0.5 shrink-0">
                        {(["s1", "s2", "s3", "s4", "s5"] as const).map((k) => (
                          <Star
                            key={k}
                            className="h-3.5 w-3.5 fill-accent text-accent"
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="text-center mt-10"
          >
            <Link to="/stories">
              <Button
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/5 transition-smooth"
                data-ocid="home.stories.view_all_button"
              >
                Read All Stories <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Quick Actions ─────────────────────────────────────────────────── */}
      <section
        data-ocid="home.quick_actions.section"
        className="py-20 bg-background"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
              Get Involved Today
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Whether you're looking to adopt, rehome, or support — there's a
              place for you here.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-ocid="home.quick_actions.list"
          >
            {QUICK_ACTIONS.map((action, i) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.12 }}
                  data-ocid={`home.quick_actions.item.${i + 1}`}
                >
                  <Card className="h-full text-center p-6 border-border hover:shadow-pet-card transition-smooth bg-card flex flex-col">
                    <CardContent className="pt-2 pb-0 px-0 flex flex-col items-center h-full">
                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${action.colorBg} mb-5`}
                      >
                        <Icon className={`h-6 w-6 ${action.colorText}`} />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                        {action.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                        {action.desc}
                      </p>
                      <Link to={action.href} className="w-full">
                        <Button
                          size="sm"
                          className={`w-full transition-smooth ${action.btnClass}`}
                          data-ocid={`home.quick_actions.cta_button.${i + 1}`}
                        >
                          {action.cta}{" "}
                          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Closing CTA Banner ────────────────────────────────────────────── */}
      <section
        data-ocid="home.cta_banner.section"
        className="py-20 bg-primary text-primary-foreground"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl mx-auto px-4 text-center"
        >
          <PawPrint className="h-10 w-10 mx-auto mb-5 opacity-60" />
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Your Perfect Pet Is Waiting
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Thousands of loving animals are looking for a home just like yours.
            Start your adoption journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pets">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-6 text-base shadow-lg transition-smooth"
                data-ocid="home.cta_banner.find_pet_button"
              >
                Find Your Pet <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="ghost"
                className="border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold px-8 py-6 text-base transition-smooth"
                data-ocid="home.cta_banner.about_button"
              >
                About Our Mission
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
