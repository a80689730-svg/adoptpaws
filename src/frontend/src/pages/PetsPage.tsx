import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  Heart,
  MapPin,
  PawPrint,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { usePets } from "../hooks/useBackend";
import type { Pet, PetAge, PetType } from "../types";

// ── Types ──────────────────────────────────────────────────────────────────────
type AgeFilter = "any" | PetAge;
type SpeciesFilter = "all" | PetType;
type LocationFilter =
  | "all"
  | "New York"
  | "Los Angeles"
  | "Chicago"
  | "Austin"
  | "Seattle";

interface LocalFilters {
  species: SpeciesFilter;
  age: AgeFilter;
  location: LocationFilter;
  breed: string;
  search: string;
}

const DEFAULT_FILTERS: LocalFilters = {
  species: "all",
  age: "any",
  location: "all",
  breed: "",
  search: "",
};

// ── Constants ──────────────────────────────────────────────────────────────────
const SPECIES_OPTIONS: { value: SpeciesFilter; label: string }[] = [
  { value: "all", label: "All Species" },
  { value: "dog", label: "Dogs" },
  { value: "cat", label: "Cats" },
  { value: "rabbit", label: "Rabbits" },
  { value: "bird", label: "Birds" },
];

const AGE_OPTIONS: { value: AgeFilter; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "baby", label: "Puppy/Kitten (0–1)" },
  { value: "young", label: "Young (1–3)" },
  { value: "adult", label: "Adult (3–7)" },
  { value: "senior", label: "Senior (7+)" },
];

const LOCATION_OPTIONS: { value: LocationFilter; label: string }[] = [
  { value: "all", label: "All Locations" },
  { value: "New York", label: "New York" },
  { value: "Los Angeles", label: "Los Angeles" },
  { value: "Chicago", label: "Chicago" },
  { value: "Austin", label: "Austin" },
  { value: "Seattle", label: "Seattle" },
];

const SPECIES_BADGE: Record<PetType, { label: string; className: string }> = {
  dog: {
    label: "Dog",
    className: "bg-blue-100 text-blue-700 border border-blue-200",
  },
  cat: {
    label: "Cat",
    className: "bg-purple-100 text-purple-700 border border-purple-200",
  },
  rabbit: {
    label: "Rabbit",
    className: "bg-green-100 text-green-700 border border-green-200",
  },
  bird: {
    label: "Bird",
    className: "bg-amber-100 text-amber-700 border border-amber-200",
  },
  other: {
    label: "Other",
    className: "bg-muted text-muted-foreground border border-border",
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function applyLocalFilters(pets: Pet[], f: LocalFilters): Pet[] {
  return pets.filter((p) => {
    if (f.species !== "all" && p.type !== f.species) return false;
    if (f.age !== "any" && p.ageCategory !== f.age) return false;
    if (f.location !== "all" && !p.location.includes(f.location)) return false;
    if (f.breed && !p.breed.toLowerCase().includes(f.breed.toLowerCase()))
      return false;
    if (f.search) {
      const q = f.search.toLowerCase();
      if (
        !p.name.toLowerCase().includes(q) &&
        !p.breed.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });
}

function hasActiveFilters(f: LocalFilters): boolean {
  return (
    f.species !== "all" ||
    f.age !== "any" ||
    f.location !== "all" ||
    f.breed !== "" ||
    f.search !== ""
  );
}

// ── Skeleton card ──────────────────────────────────────────────────────────────
function PetCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-pet-card">
      <Skeleton className="w-full aspect-[4/3]" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/5" />
        <Skeleton className="h-4 w-2/5" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <Skeleton className="h-9 w-full rounded-xl mt-1" />
      </div>
    </div>
  );
}

// ── Pet card ───────────────────────────────────────────────────────────────────
function PetCard({ pet, index }: { pet: Pet; index: number }) {
  const badge = SPECIES_BADGE[pet.type] ?? SPECIES_BADGE.other;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: Math.min(index * 0.07, 0.5) }}
      className="group rounded-2xl border border-border bg-card overflow-hidden shadow-pet-card hover:shadow-pet-hover transition-smooth flex flex-col"
      data-ocid={`pets.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3] shrink-0">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          loading="lazy"
        />
        <button
          type="button"
          className="absolute top-3 right-3 p-1.5 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-smooth"
          aria-label={`Favorite ${pet.name}`}
          data-ocid={`pets.favorite.${index + 1}`}
        >
          <Heart className="w-4 h-4 text-muted-foreground" />
        </button>
        <span
          className={`absolute top-3 left-3 px-2.5 py-0.5 text-xs font-semibold rounded-full ${badge.className}`}
        >
          {badge.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-semibold text-foreground text-lg leading-tight truncate">
            {pet.name}
          </h3>
          <span className="text-xs text-muted-foreground shrink-0 pt-0.5">
            {pet.gender === "male" ? "♂" : "♀"} · {pet.age}
          </span>
        </div>
        <p className="text-sm font-medium text-muted-foreground">{pet.breed}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{pet.location}</span>
        </div>
        <p className="text-sm text-foreground/80 line-clamp-2 leading-relaxed flex-1">
          {pet.description}
        </p>
        <Link
          to="/pets/$id"
          params={{ id: String(pet.id) }}
          className="block mt-auto pt-1"
        >
          <Button
            className="w-full rounded-xl font-semibold"
            data-ocid={`pets.adopt_button.${index + 1}`}
          >
            Adopt Me
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

// ── Empty state ────────────────────────────────────────────────────────────────
function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="col-span-full flex flex-col items-center justify-center py-20 text-center"
      data-ocid="pets.empty_state"
    >
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5">
        <PawPrint className="w-9 h-9 text-muted-foreground" />
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
        No pets found
      </h3>
      <p className="text-muted-foreground max-w-xs leading-relaxed mb-6">
        Try adjusting your filters — there are plenty of wonderful pets waiting
        for a forever home.
      </p>
      <Button
        variant="outline"
        onClick={onClear}
        className="rounded-xl"
        data-ocid="pets.empty_clear_button"
      >
        Clear all filters
      </Button>
    </motion.div>
  );
}

// ── Filter panel (shared desktop + mobile) ─────────────────────────────────────
function FilterPanel({
  filters,
  onChange,
  onClear,
}: {
  filters: LocalFilters;
  onChange: (patch: Partial<LocalFilters>) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Species */}
      <div>
        <label
          htmlFor="filter-species"
          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
        >
          Species
        </label>
        <div className="relative">
          <select
            id="filter-species"
            value={filters.species}
            onChange={(e) =>
              onChange({ species: e.target.value as SpeciesFilter })
            }
            className="w-full appearance-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring pr-8"
            data-ocid="pets.species_select"
          >
            {SPECIES_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Age */}
      <div>
        <p className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Age Range
        </p>
        <div className="flex flex-wrap gap-2">
          {AGE_OPTIONS.map((o) => (
            <button
              type="button"
              key={o.value}
              onClick={() => onChange({ age: o.value as AgeFilter })}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-smooth ${
                filters.age === o.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              }`}
              data-ocid={`pets.age_filter.${o.value}`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <label
          htmlFor="filter-location"
          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
        >
          Location
        </label>
        <div className="relative">
          <select
            id="filter-location"
            value={filters.location}
            onChange={(e) =>
              onChange({ location: e.target.value as LocationFilter })
            }
            className="w-full appearance-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring pr-8"
            data-ocid="pets.location_select"
          >
            {LOCATION_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Breed */}
      <div>
        <label
          htmlFor="filter-breed"
          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
        >
          Breed
        </label>
        <input
          id="filter-breed"
          type="text"
          placeholder="e.g. Labrador, Siamese…"
          value={filters.breed}
          onChange={(e) => onChange({ breed: e.target.value })}
          className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          data-ocid="pets.breed_input"
        />
      </div>

      {hasActiveFilters(filters) && (
        <button
          type="button"
          onClick={onClear}
          className="text-sm text-primary font-medium hover:underline underline-offset-2"
          data-ocid="pets.clear_filters"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export function PetsPage() {
  const [filters, setFilters] = useState<LocalFilters>(DEFAULT_FILTERS);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: allPets, isLoading } = usePets();

  const pets = useMemo(
    () => applyLocalFilters(allPets ?? [], filters),
    [allPets, filters],
  );

  function patchFilters(patch: Partial<LocalFilters>) {
    setFilters((prev) => ({ ...prev, ...patch }));
  }

  function clearFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  // Build active badge list
  const activeBadges: {
    label: string;
    key: keyof LocalFilters;
    reset: string;
  }[] = [];
  if (filters.species !== "all")
    activeBadges.push({
      label: SPECIES_OPTIONS.find((o) => o.value === filters.species)!.label,
      key: "species",
      reset: "all",
    });
  if (filters.age !== "any")
    activeBadges.push({
      label: AGE_OPTIONS.find((o) => o.value === filters.age)!.label,
      key: "age",
      reset: "any",
    });
  if (filters.location !== "all")
    activeBadges.push({
      label: filters.location,
      key: "location",
      reset: "all",
    });
  if (filters.breed)
    activeBadges.push({
      label: `Breed: ${filters.breed}`,
      key: "breed",
      reset: "",
    });
  if (filters.search)
    activeBadges.push({
      label: `"${filters.search}"`,
      key: "search",
      reset: "",
    });

  return (
    <div className="min-h-screen bg-background" data-ocid="pets.page">
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <section className="bg-card border-b border-border py-10 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-4xl md:text-5xl font-bold text-foreground"
          >
            Find Your Perfect Pet
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed"
          >
            Every pet here is waiting for a loving home. Browse, filter, and
            find the companion who's meant to be yours.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative max-w-lg mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or breed…"
              value={filters.search}
              onChange={(e) => patchFilters({ search: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-input bg-background text-foreground placeholder:text-muted-foreground text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="pets.search_input"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Mobile filter toggle ────────────────────────────────────────────── */}
      <div className="lg:hidden px-4 pt-4">
        <Button
          variant="outline"
          className="w-full rounded-xl flex items-center gap-2 justify-between"
          onClick={() => setMobileOpen((v) => !v)}
          data-ocid="pets.mobile_filters_toggle"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </span>
          <span className="flex items-center gap-1.5">
            {activeBadges.length > 0 && (
              <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5">
                {activeBadges.length}
              </span>
            )}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${mobileOpen ? "rotate-180" : ""}`}
            />
          </span>
        </Button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-filters"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-3 p-5 rounded-2xl border border-border bg-card shadow-pet-card">
                <FilterPanel
                  filters={filters}
                  onChange={patchFilters}
                  onClear={clearFilters}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 p-5 rounded-2xl border border-border bg-card shadow-pet-card">
            <h2 className="font-display font-semibold text-foreground mb-5 flex items-center gap-2 text-base">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </h2>
            <FilterPanel
              filters={filters}
              onChange={patchFilters}
              onClear={clearFilters}
            />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Active badges + count */}
          <div className="flex flex-wrap items-center gap-2 mb-5 min-h-[32px]">
            <span
              className="text-sm font-medium text-muted-foreground"
              data-ocid="pets.count_label"
            >
              {isLoading
                ? "Loading…"
                : `Showing ${pets.length} pet${pets.length !== 1 ? "s" : ""}`}
            </span>

            {activeBadges.map((b) => (
              <Badge
                key={b.key}
                variant="secondary"
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl cursor-pointer hover:bg-destructive/10 transition-smooth select-none"
                onClick={() =>
                  patchFilters({ [b.key]: b.reset } as Partial<LocalFilters>)
                }
                data-ocid={`pets.active_filter.${b.key}`}
              >
                {b.label}
                <X className="w-3 h-3 ml-0.5" />
              </Badge>
            ))}

            {activeBadges.length > 1 && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-primary font-medium hover:underline underline-offset-2 ml-1"
                data-ocid="pets.clear_all_inline"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {isLoading ? (
              ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((k) => (
                <PetCardSkeleton key={k} />
              ))
            ) : pets.length === 0 ? (
              <EmptyState onClear={clearFilters} />
            ) : (
              pets.map((pet, i) => (
                <PetCard key={String(pet.id)} pet={pet} index={i} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
