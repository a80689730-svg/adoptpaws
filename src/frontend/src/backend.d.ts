import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface Pet {
    id: bigint;
    age: bigint;
    name: string;
    description: string;
    shelterName: string;
    healthStatus: string;
    available: boolean;
    gender: string;
    shelterId: string;
    shelterEmail: string;
    breed: string;
    species: string;
    location: string;
    photos: Array<string>;
    vaccinationStatus: string;
    shelterPhone: string;
}
export interface AdoptionApplication {
    id: string;
    zip: string;
    applicantName: string;
    homeType: string;
    city: string;
    createdAt: Timestamp;
    email: string;
    experience: string;
    state: string;
    address: string;
    petId: bigint;
    phone: string;
    reason: string;
}
export interface BlogArticle {
    id: bigint;
    title: string;
    content: string;
    publishDate: Timestamp;
    tags: Array<string>;
    author: string;
    readTime: string;
    imageUrl: string;
    excerpt: string;
}
export interface backendInterface {
    applyToFoster(name: string, email: string, phone: string, homeType: string, experience: string, petType: string, duration: string): Promise<string>;
    getAdminPrincipal(): Promise<Principal | null>;
    getBlogArticle(id: bigint): Promise<BlogArticle | null>;
    getFeaturedPets(): Promise<Array<Pet>>;
    getPet(id: bigint): Promise<Pet | null>;
    listAdoptionApplications(): Promise<Array<AdoptionApplication>>;
    listBlogArticles(): Promise<Array<BlogArticle>>;
    listPets(species: string | null, ageMin: bigint | null, ageMax: bigint | null, breed: string | null, location: string | null): Promise<Array<Pet>>;
    registerVolunteer(name: string, email: string, phone: string, availability: Array<string>, interest: string): Promise<string>;
    sendContactMessage(name: string, email: string, subject: string, message: string): Promise<string>;
    setAdmin(): Promise<string>;
    submitAdoptionApplication(petId: bigint, applicantName: string, email: string, phone: string, address: string, city: string, state: string, zip: string, experience: string, homeType: string, reason: string): Promise<string>;
}
