import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";

interface Story {
  id: number;
  adopterName: string;
  petName: string;
  breed: string;
  species: string;
  adoptionDate: string;
  quote: string;
  photo: string;
}

interface Testimonial {
  id: number;
  name: string;
  petName: string;
  quote: string;
  photo: string;
  rating: number;
}

const stories: Story[] = [
  {
    id: 1,
    adopterName: "Emily",
    petName: "Max",
    breed: "Golden Retriever",
    species: "Dog",
    adoptionDate: "June 2024",
    quote:
      "Max changed my life completely. He helped me through a tough year and brought joy back into my home.",
    photo: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600",
  },
  {
    id: 2,
    adopterName: "James",
    petName: "Luna",
    breed: "Persian Cat",
    species: "Cat",
    adoptionDate: "March 2024",
    quote:
      "Luna is the most affectionate cat I've ever had. She purrs all day and follows me everywhere. Best decision ever.",
    photo: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600",
  },
  {
    id: 3,
    adopterName: "The Kim Family",
    petName: "Buddy",
    breed: "Beagle",
    species: "Dog",
    adoptionDate: "January 2024",
    quote:
      "Buddy loves our kids and they love him. He has so much energy and makes every day an adventure. Our family feels complete.",
    photo: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600",
  },
  {
    id: 4,
    adopterName: "Maria",
    petName: "Whiskers",
    breed: "Tabby Cat",
    species: "Cat",
    adoptionDate: "April 2020",
    quote:
      "Adopting Whiskers was the best thing I did during lockdown. She kept me company through the hardest months.",
    photo: "https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=600",
  },
  {
    id: 5,
    adopterName: "David & Sarah",
    petName: "Milo",
    breed: "Labrador Mix",
    species: "Dog",
    adoptionDate: "September 2023",
    quote:
      "Milo went from a scared shelter pup to the most loving, confident dog. Watching him blossom has been incredible.",
    photo: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600",
  },
  {
    id: 6,
    adopterName: "Sophie",
    petName: "Cleo",
    breed: "Siamese Cat",
    species: "Cat",
    adoptionDate: "February 2024",
    quote:
      "Cleo is sassy, smart, and utterly lovable. She has such a big personality for a small cat. I can't imagine life without her.",
    photo: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600",
  },
  {
    id: 7,
    adopterName: "The Patel Family",
    petName: "Rocky",
    breed: "Boxer",
    species: "Dog",
    adoptionDate: "November 2023",
    quote:
      "Rocky is gentle, playful, and protective. Our children adore him and he watches over them like a guardian angel.",
    photo: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=600",
  },
  {
    id: 8,
    adopterName: "Natalie",
    petName: "Oliver",
    breed: "Domestic Shorthair",
    species: "Cat",
    adoptionDate: "July 2023",
    quote:
      "Oliver was shy at first, but once he trusted me there was no going back. He sleeps on my pillow every night.",
    photo: "https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600",
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emily Johnson",
    petName: "Max",
    quote:
      "The adoption team was so warm and thorough. They matched me with Max perfectly — a dog who fits my lifestyle, my pace, and my heart. I couldn't have asked for a better experience from start to finish.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    rating: 5,
  },
  {
    id: 2,
    name: "James Thornton",
    petName: "Luna",
    quote:
      "What stood out was how much the staff genuinely cared. They knew each animal's personality, quirks, and needs. Luna was described to me exactly as she turned out to be — a dream companion.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    rating: 5,
  },
  {
    id: 3,
    name: "Maria Espinoza",
    petName: "Whiskers",
    quote:
      "I was nervous about adopting alone, but the team guided me every step of the way. Six years later, Whiskers is still my best friend and biggest comfort. Adoption truly saves lives — mine included.",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200",
    rating: 5,
  },
];

const stats = [
  { value: "2,400+", label: "Pets Adopted" },
  { value: "98%", label: "Happy Adopters" },
  { value: "50+", label: "Shelter Partners" },
  { value: "10 Years", label: "Of Service" },
];

export function SuccessStoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section
        className="relative py-20 px-4 text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.96 0.03 220) 0%, oklch(0.94 0.04 160) 50%, oklch(0.97 0.02 200) 100%)",
        }}
        data-ocid="success-stories.hero.section"
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center text-[16rem] leading-none">
          🐾
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30 text-sm px-4 py-1.5">
            Real Families. Real Love.
          </Badge>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-5 leading-tight">
            Success Stories
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every adoption is a new beginning — read how these families found
            their perfect match and gave a pet the forever home they deserved.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        className="bg-primary text-primary-foreground py-10 px-4"
        data-ocid="success-stories.stats.section"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl md:text-4xl font-display font-bold">
                {stat.value}
              </span>
              <span className="text-sm md:text-base opacity-80 font-body">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Story Cards Grid */}
      <section
        className="py-16 px-4 bg-background"
        data-ocid="success-stories.cards.section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Meet Our Happy Families
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              These heartwarming stories show how adoption changes lives — for
              pets and their people.
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-ocid="success-stories.cards.list"
          >
            {stories.map((story, index) => (
              <Card
                key={story.id}
                className="group overflow-hidden border border-border shadow-pet-card hover:shadow-pet-hover transition-smooth hover:-translate-y-1"
                data-ocid={`success-stories.cards.item.${index + 1}`}
              >
                {/* Square photo */}
                <div className="relative aspect-square overflow-hidden rounded-t-xl">
                  <img
                    src={story.photo}
                    alt={`${story.petName} with ${story.adopterName}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-card/90 shadow-sm">
                      <Heart
                        size={15}
                        className="text-destructive fill-destructive"
                      />
                    </span>
                  </div>
                </div>

                <CardContent className="p-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-display font-semibold text-foreground truncate">
                        {story.adopterName} &amp; {story.petName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Adopted {story.adoptionDate}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="shrink-0 text-xs border-secondary/40 text-secondary bg-secondary/10"
                    >
                      {story.species}
                    </Badge>
                  </div>

                  <Badge
                    variant="secondary"
                    className="w-fit text-xs bg-muted text-muted-foreground"
                  >
                    {story.breed}
                  </Badge>

                  <p className="text-sm text-muted-foreground italic leading-relaxed line-clamp-3">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section
        className="py-16 px-4 bg-muted/30"
        data-ocid="success-stories.testimonials.section"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              In Their Own Words
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              These adopters wanted to share more about their experience. Their
              words speak for themselves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div
                key={t.id}
                className="bg-card rounded-2xl p-6 shadow-pet-card border border-border flex flex-col gap-5"
                data-ocid={`success-stories.testimonials.item.${index + 1}`}
              >
                {/* Stars */}
                <div
                  className="flex gap-1"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: t.rating }, (_, i) => (
                    <Star
                      key={`star-${t.id}-${i}`}
                      size={16}
                      className="text-accent fill-accent"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-foreground leading-relaxed text-sm flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover shrink-0 border-2 border-secondary/30"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-foreground text-sm truncate">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Adopted {t.petName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-4 text-center bg-background"
        data-ocid="success-stories.cta.section"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-5" aria-hidden="true">
            🐾
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Your Story Could Be Next
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Thousands of pets are waiting for their forever home. Take the first
            step today — your perfect match might be just one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-display font-semibold px-8 shadow-pet-card transition-smooth"
              data-ocid="success-stories.cta.find-pet-button"
            >
              <Link to="/pets">Find Your Pet</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary/40 text-primary hover:bg-primary/5 font-display font-semibold px-8 transition-smooth"
              data-ocid="success-stories.cta.how-it-works-button"
            >
              <Link to="/process">How It Works</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
