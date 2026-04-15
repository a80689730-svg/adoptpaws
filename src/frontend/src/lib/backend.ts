import { useActor as _useActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { backendInterface } from "../backend.d";

// Typed useActor hook bound to the backend's createActor
export function useActor() {
  return _useActor<backendInterface>(createActor as Parameters<typeof _useActor<backendInterface>>[0]);
}

// Static sample data to power the UI until backend is wired
import type {
  Pet,
  BlogArticle,
  AdoptionApplication,
  VolunteerRegistration,
  FosterApplication,
  ContactMessage,
} from "../types";
import type { AdoptionApplication as BackendAdoptionApplication } from "../backend.d";

export const samplePets: Pet[] = [
  {
    id: BigInt(1),
    name: "Buddy",
    type: "dog",
    breed: "Golden Retriever",
    age: "3 years",
    ageCategory: "adult",
    gender: "male",
    size: "large",
    description:
      "Buddy is a gentle giant who loves long walks, fetch, and cuddles. He's great with children and other dogs, fully house-trained, and ready for his forever home.",
    imageUrl:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&auto=format&fit=crop&q=80",
    location: "San Francisco, CA",
    vaccinated: true,
    neutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: true,
    featured: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(2),
    name: "Luna",
    type: "cat",
    breed: "Domestic Shorthair",
    age: "2 years",
    ageCategory: "young",
    gender: "female",
    size: "small",
    description:
      "Luna is a graceful and affectionate tabby who enjoys sunbathing, playtime with feather toys, and evening lap sessions. She's calm and easy-going.",
    imageUrl:
      "https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=600&auto=format&fit=crop&q=80",
    location: "Austin, TX",
    vaccinated: true,
    neutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: false,
    featured: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(3),
    name: "Mochi",
    type: "rabbit",
    breed: "Holland Lop",
    age: "1 year",
    ageCategory: "young",
    gender: "female",
    size: "small",
    description:
      "Mochi is a curious, floppy-eared Holland Lop who loves exploring and binkying around her playpen. She's gentle, well-socialized, and fantastic with older children.",
    imageUrl:
      "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&auto=format&fit=crop&q=80",
    location: "Portland, OR",
    vaccinated: true,
    neutered: false,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: false,
    featured: true,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(4),
    name: "Rex",
    type: "dog",
    breed: "Labrador Mix",
    age: "5 years",
    ageCategory: "adult",
    gender: "male",
    size: "large",
    description:
      "Rex is a loyal, energetic Labrador mix who thrives on outdoor adventures and loves swimming. He bonds quickly and would do best with an active family.",
    imageUrl:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&auto=format&fit=crop&q=80",
    location: "Denver, CO",
    vaccinated: true,
    neutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: true,
    featured: false,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(5),
    name: "Whiskers",
    type: "cat",
    breed: "Persian",
    age: "4 years",
    ageCategory: "adult",
    gender: "male",
    size: "medium",
    description:
      "Whiskers is a regal Persian with a mellow temperament. He prefers a quiet, calm home where he can lounge in comfort. Ideal for apartment living.",
    imageUrl:
      "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=600&auto=format&fit=crop&q=80",
    location: "Seattle, WA",
    vaccinated: true,
    neutered: true,
    houseTrained: true,
    goodWithKids: false,
    goodWithPets: false,
    featured: false,
    createdAt: BigInt(Date.now()),
  },
  {
    id: BigInt(6),
    name: "Daisy",
    type: "dog",
    breed: "Beagle",
    age: "8 months",
    ageCategory: "baby",
    gender: "female",
    size: "medium",
    description:
      "Daisy is a playful Beagle puppy brimming with curiosity and energy. She loves sniffing everything and playing tug-of-war. She'll grow into a wonderful companion.",
    imageUrl:
      "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&auto=format&fit=crop&q=80",
    location: "Chicago, IL",
    vaccinated: true,
    neutered: false,
    houseTrained: false,
    goodWithKids: true,
    goodWithPets: true,
    featured: true,
    createdAt: BigInt(Date.now()),
  },
];

export const sampleArticles: BlogArticle[] = [
  {
    id: BigInt(1),
    title: "First Week Home: Helping Your New Pet Settle In",
    slug: "first-week-home",
    excerpt:
      "The first seven days with a rescue pet can feel overwhelming. Here's what to expect, how to create a calm environment, and when to give space.",
    content: "",
    imageUrl:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&auto=format&fit=crop&q=80",
    author: "Dr. Sarah Chen",
    tags: ["new pet", "tips", "adjustment"],
    publishedAt: BigInt(Date.now() - 7 * 86400000),
  },
  {
    id: BigInt(2),
    title: "Vaccination Schedule Every Pet Owner Should Know",
    slug: "vaccination-schedule",
    excerpt:
      "Keeping your pet up to date on vaccinations protects them — and other animals too. We break down exactly what's needed at every life stage.",
    content: "",
    imageUrl:
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&auto=format&fit=crop&q=80",
    author: "Dr. Marcus Reed",
    tags: ["health", "vaccinations", "care"],
    publishedAt: BigInt(Date.now() - 14 * 86400000),
  },
  {
    id: BigInt(3),
    title: "Training Basics: Building Trust on Day One",
    slug: "training-basics",
    excerpt:
      "Positive reinforcement isn't just about treats — it's about communication. Learn how to set clear, kind expectations from the moment they arrive.",
    content: "",
    imageUrl:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&auto=format&fit=crop&q=80",
    author: "Jamie Torres",
    tags: ["training", "behavior", "dogs"],
    publishedAt: BigInt(Date.now() - 21 * 86400000),
  },
];

// Submission helpers — these will call backend actor once wired
export async function submitAdoptionApplication(
  data: Omit<AdoptionApplication, "id" | "status" | "submittedAt">
): Promise<boolean> {
  // Placeholder — will call actor.submitAdoptionApplication(data)
  console.log("submitAdoptionApplication", data);
  return true;
}

export async function registerVolunteer(
  data: Omit<VolunteerRegistration, "id" | "submittedAt">
): Promise<boolean> {
  console.log("registerVolunteer", data);
  return true;
}

export async function applyForFoster(
  data: Omit<FosterApplication, "id" | "submittedAt">
): Promise<boolean> {
  console.log("applyForFoster", data);
  return true;
}

export async function submitContactMessage(
  data: Omit<ContactMessage, "id" | "submittedAt">
): Promise<boolean> {
  console.log("submitContactMessage", data);
  return true;
}

// --- Admin helpers ---

export async function setAdmin(
  actor: { setAdmin(): Promise<string> }
): Promise<string> {
  return actor.setAdmin();
}

export async function listAdoptionApplications(
  actor: { listAdoptionApplications(): Promise<BackendAdoptionApplication[]> }
): Promise<BackendAdoptionApplication[]> {
  return actor.listAdoptionApplications();
}
