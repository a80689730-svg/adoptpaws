export type PetType = "dog" | "cat" | "rabbit" | "bird" | "other";
export type PetGender = "male" | "female";
export type PetSize = "small" | "medium" | "large";
export type PetAge = "baby" | "young" | "adult" | "senior";
export type ApplicationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "withdrawn";

export interface Pet {
  id: bigint;
  name: string;
  type: PetType;
  breed: string;
  age: string;
  ageCategory: PetAge;
  gender: PetGender;
  size: PetSize;
  description: string;
  imageUrl: string;
  location: string;
  vaccinated: boolean;
  neutered: boolean;
  houseTrained: boolean;
  goodWithKids: boolean;
  goodWithPets: boolean;
  featured: boolean;
  createdAt: bigint;
}

export interface AdoptionApplication {
  id: bigint;
  petId: bigint;
  applicantName: string;
  email: string;
  phone: string;
  address: string;
  homeType: string;
  hasYard: boolean;
  hasOtherPets: boolean;
  hasChildren: boolean;
  petExperience: string;
  reasonForAdoption: string;
  status: ApplicationStatus;
  submittedAt: bigint;
}

export interface BlogArticle {
  id: bigint;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  tags: string[];
  publishedAt: bigint;
}

export interface VolunteerRegistration {
  id: bigint;
  name: string;
  email: string;
  phone: string;
  availability: string;
  skills: string;
  message: string;
  submittedAt: bigint;
}

export interface FosterApplication {
  id: bigint;
  name: string;
  email: string;
  phone: string;
  address: string;
  homeType: string;
  preferredPetType: string;
  experience: string;
  message: string;
  submittedAt: bigint;
}

export interface ContactMessage {
  id: bigint;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: bigint;
}

export interface PetFilters {
  type?: PetType;
  ageCategory?: PetAge;
  gender?: PetGender;
  size?: PetSize;
  location?: string;
}
