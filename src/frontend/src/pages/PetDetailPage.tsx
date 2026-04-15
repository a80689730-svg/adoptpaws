import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Heart,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { usePet, usePets } from "../hooks/useBackend";
import type { Pet } from "../types";

// ── Shelter data per location ─────────────────────────────────────────────────
const SHELTER_INFO: Record<
  string,
  { name: string; email: string; phone: string }
> = {
  "San Francisco, CA": {
    name: "Golden Gate Animal Rescue",
    email: "adopt@ggrescue.org",
    phone: "(415) 555-0190",
  },
  "Austin, TX": {
    name: "Austin Paws Shelter",
    email: "contact@austinpaws.org",
    phone: "(512) 555-0172",
  },
  "Portland, OR": {
    name: "Pacific Paws Rescue",
    email: "hello@pacificpaws.org",
    phone: "(503) 555-0148",
  },
  "Denver, CO": {
    name: "Mile High Animal Rescue",
    email: "info@milehighrescue.org",
    phone: "(720) 555-0163",
  },
  "Seattle, WA": {
    name: "Cascade Humane Society",
    email: "adopt@cascadehumane.org",
    phone: "(206) 555-0137",
  },
  "Chicago, IL": {
    name: "Lakeside Animal Shelter",
    email: "adopt@lakesideanimals.org",
    phone: "(312) 555-0181",
  },
};

const DEFAULT_SHELTER = {
  name: "AdoptPaws Rescue Network",
  email: "adopt@adoptpaws.org",
  phone: "(415) 555-0123",
};

// ── Build 3 photo variants from one URL ───────────────────────────────────────
function makePhotos(url: string): string[] {
  return [url, `${url}&crop=entropy`, `${url}&crop=faces`];
}

// ── Loading skeleton ──────────────────────────────────────────────────────────
function PetDetailSkeleton() {
  return (
    <div
      className="container mx-auto px-4 md:px-6 py-8 max-w-5xl"
      data-ocid="pet_detail.loading_state"
    >
      <Skeleton className="h-4 w-56 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-3">
          <Skeleton className="w-full aspect-[4/3] rounded-2xl" />
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="w-24 h-24 rounded-xl" />
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <Skeleton className="h-10 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-24 w-full" />
          <div className="flex gap-3">
            <Skeleton className="h-11 flex-1 rounded-lg" />
            <Skeleton className="h-11 flex-1 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 404 not-found state ───────────────────────────────────────────────────────
function PetNotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 px-4 text-center"
      data-ocid="pet_detail.not_found_state"
    >
      <AlertCircle className="w-16 h-16 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
        Pet Not Found
      </h2>
      <p className="text-muted-foreground mb-6 max-w-sm">
        We couldn't find the pet you're looking for. They may have already found
        their forever home!
      </p>
      <Button asChild variant="outline" data-ocid="pet_detail.back_button">
        <Link to="/pets">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Browse All Pets
        </Link>
      </Button>
    </div>
  );
}

// ── Details tile ──────────────────────────────────────────────────────────────
interface DetailTileProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

function DetailTile({ label, value, icon }: DetailTileProps) {
  return (
    <div className="bg-muted/40 rounded-xl p-4 flex flex-col gap-1 border border-border">
      <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
        {label}
      </span>
      <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground min-w-0">
        {icon}
        <span className="truncate">{value}</span>
      </div>
    </div>
  );
}

// ── Trait badge ───────────────────────────────────────────────────────────────
interface TraitBadgeProps {
  checked: boolean;
  label: string;
}

function TraitBadge({ checked, label }: TraitBadgeProps) {
  return (
    <div
      className={`flex items-center gap-1.5 text-sm py-1.5 px-3 rounded-full border ${
        checked
          ? "bg-secondary/10 border-secondary/30 text-secondary"
          : "bg-muted/30 border-border text-muted-foreground"
      }`}
    >
      {checked ? (
        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
      ) : (
        <XCircle className="w-3.5 h-3.5 shrink-0" />
      )}
      {label}
    </div>
  );
}

// ── Related pet card ──────────────────────────────────────────────────────────
interface RelatedCardProps {
  pet: Pet;
  index: number;
}

function RelatedCard({ pet, index }: RelatedCardProps) {
  return (
    <Link to="/pets/$id" params={{ id: String(pet.id) }}>
      <Card
        className="group overflow-hidden hover:shadow-pet-hover transition-smooth border-border cursor-pointer"
        data-ocid={`pet_detail.related_item.${index}`}
      >
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={pet.imageUrl}
            alt={pet.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            loading="lazy"
          />
        </div>
        <CardContent className="p-3">
          <p className="font-display font-semibold text-sm text-foreground truncate">
            {pet.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {pet.breed} · {pet.age}
          </p>
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{pet.location}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// ── Species & size labels ─────────────────────────────────────────────────────
const SPECIES_LABEL: Record<string, string> = {
  dog: "Dog",
  cat: "Cat",
  rabbit: "Rabbit",
  bird: "Bird",
  other: "Other",
};

const SIZE_LABEL: Record<string, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
};

// ── Main page ─────────────────────────────────────────────────────────────────
export function PetDetailPage() {
  const { id } = useParams({ from: "/pets/$id" });
  const { data: pet, isLoading } = usePet(id);
  const { data: allPets = [] } = usePets();

  const [activePhoto, setActivePhoto] = useState(0);

  if (isLoading) return <PetDetailSkeleton />;
  if (!pet) return <PetNotFound />;

  const photos = makePhotos(pet.imageUrl);
  const shelter = SHELTER_INFO[pet.location] ?? DEFAULT_SHELTER;
  const isAvailable = true;

  const relatedPets = allPets
    .filter((p) => p.type === pet.type && p.id !== pet.id)
    .slice(0, 3);

  return (
    <div className="bg-background min-h-screen" data-ocid="pet_detail.page">
      {/* ── Breadcrumb bar ──────────────────────────────────────────────── */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-3 flex items-center gap-1.5 text-sm text-muted-foreground max-w-5xl">
          <Link
            to="/"
            className="hover:text-primary transition-smooth shrink-0"
            data-ocid="pet_detail.breadcrumb_home_link"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link
            to="/pets"
            className="hover:text-primary transition-smooth shrink-0"
            data-ocid="pet_detail.breadcrumb_pets_link"
          >
            Pets
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-foreground font-medium truncate">
            {pet.name}
          </span>
        </div>
      </div>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 md:px-6 py-10 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* LEFT — Photo gallery */}
          <div className="space-y-3" data-ocid="pet_detail.gallery_section">
            {/* Main photo */}
            <div className="relative overflow-hidden rounded-2xl bg-muted aspect-[4/3] shadow-pet-card">
              <img
                src={photos[activePhoto]}
                alt={`${pet.name} view ${activePhoto + 1}`}
                className="w-full h-full object-cover transition-smooth"
                data-ocid="pet_detail.main_photo"
              />
              {!isAvailable && (
                <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                  <span className="bg-card/90 text-foreground font-semibold text-sm px-4 py-2 rounded-full">
                    Adopted
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {photos.map((src, i) => {
                const cropLabel = ["main", "alt1", "alt2"][i] ?? String(i);
                return (
                  <button
                    key={cropLabel}
                    type="button"
                    aria-label={`View angle ${i + 1}`}
                    onClick={() => setActivePhoto(i)}
                    data-ocid={`pet_detail.thumbnail.${i + 1}`}
                    className={`relative overflow-hidden rounded-xl w-24 h-24 shrink-0 border-2 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      activePhoto === i
                        ? "border-secondary shadow-pet-hover"
                        : "border-transparent hover:border-border opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${pet.name} angle ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Pet info */}
          <div className="space-y-6">
            {/* Name + badges header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge
                  className="bg-primary/10 text-primary border-primary/20 capitalize"
                  data-ocid="pet_detail.species_badge"
                >
                  {SPECIES_LABEL[pet.type] ?? pet.type}
                </Badge>
                <Badge
                  className={
                    isAvailable
                      ? "bg-secondary text-secondary-foreground"
                      : "border-muted-foreground text-muted-foreground bg-transparent"
                  }
                  data-ocid="pet_detail.availability_badge"
                >
                  {isAvailable ? "Available" : "Unavailable"}
                </Badge>
              </div>
              <h1
                className="text-3xl md:text-4xl font-display font-bold text-foreground"
                data-ocid="pet_detail.pet_name"
              >
                {pet.name}
              </h1>
            </div>

            {/* Details grid */}
            <div
              className="grid grid-cols-2 gap-3"
              data-ocid="pet_detail.details_grid"
            >
              <DetailTile label="Age" value={pet.age} />
              <DetailTile
                label="Gender"
                value={pet.gender === "male" ? "Male" : "Female"}
              />
              <DetailTile label="Breed" value={pet.breed} />
              <DetailTile
                label="Size"
                value={SIZE_LABEL[pet.size] ?? pet.size}
              />
              <DetailTile
                label="Vaccination"
                value={pet.vaccinated ? "Up to date" : "Not vaccinated"}
                icon={
                  pet.vaccinated ? (
                    <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
                  ) : undefined
                }
              />
              <DetailTile
                label="Location"
                value={pet.location}
                icon={
                  <MapPin className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                }
              />
            </div>

            {/* Trait tags */}
            <div
              className="flex flex-wrap gap-2"
              data-ocid="pet_detail.traits_section"
            >
              <TraitBadge checked={pet.houseTrained} label="House Trained" />
              <TraitBadge checked={pet.neutered} label="Neutered / Spayed" />
              <TraitBadge checked={pet.goodWithKids} label="Good with Kids" />
              <TraitBadge checked={pet.goodWithPets} label="Good with Pets" />
            </div>

            {/* Description */}
            <div data-ocid="pet_detail.description_section">
              <h2 className="text-base font-display font-semibold text-foreground mb-2">
                About {pet.name}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {pet.description}
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <Button
                asChild
                className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold h-11"
                data-ocid="pet_detail.adopt_cta_button"
              >
                <Link to="/adopt" search={{ petId: String(pet.id) }}>
                  <Heart className="w-4 h-4 mr-2" />
                  Apply for Adoption
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 h-11 border-border hover:bg-muted"
                data-ocid="pet_detail.back_to_pets_button"
              >
                <Link to="/pets">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to All Pets
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ── Shelter info card ────────────────────────────────────────────── */}
        <section className="mt-12" data-ocid="pet_detail.shelter_section">
          <h2 className="text-xl font-display font-semibold text-foreground mb-4">
            Contact the Shelter
          </h2>
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-foreground truncate">
                      {shelter.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Verified rescue partner
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`mailto:${shelter.email}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth"
                    data-ocid="pet_detail.shelter_email_link"
                  >
                    <Mail className="w-4 h-4 text-secondary shrink-0" />
                    <span>{shelter.email}</span>
                  </a>
                  <a
                    href={`tel:${shelter.phone.replace(/\D/g, "")}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth"
                    data-ocid="pet_detail.shelter_phone_link"
                  >
                    <Phone className="w-4 h-4 text-secondary shrink-0" />
                    <span>{shelter.phone}</span>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ── Related pets ─────────────────────────────────────────────────── */}
        {relatedPets.length > 0 && (
          <section className="mt-14" data-ocid="pet_detail.related_section">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-semibold text-foreground">
                More {SPECIES_LABEL[pet.type] ?? "Pets"} Looking for a Home
              </h2>
              <Link
                to="/pets"
                className="text-sm text-primary hover:underline font-medium transition-smooth shrink-0"
                data-ocid="pet_detail.view_all_link"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedPets.map((p, i) => (
                <RelatedCard key={String(p.id)} pet={p} index={i + 1} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
