import { useQuery } from "@tanstack/react-query";
import { sampleArticles, samplePets } from "../lib/backend";
import type { BlogArticle, Pet, PetFilters } from "../types";

export function useFeaturedPets() {
  return useQuery<Pet[]>({
    queryKey: ["pets", "featured"],
    queryFn: async () => {
      // Will call actor.getFeaturedPets() once backend is wired
      return samplePets.filter((p) => p.featured);
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function usePets(filters?: PetFilters) {
  return useQuery<Pet[]>({
    queryKey: ["pets", filters],
    queryFn: async () => {
      // Will call actor.listPets() once backend is wired
      let pets = samplePets;
      if (filters?.type) pets = pets.filter((p) => p.type === filters.type);
      if (filters?.ageCategory)
        pets = pets.filter((p) => p.ageCategory === filters.ageCategory);
      if (filters?.gender)
        pets = pets.filter((p) => p.gender === filters.gender);
      if (filters?.size) pets = pets.filter((p) => p.size === filters.size);
      if (filters?.location) {
        const loc = filters.location.toLowerCase();
        pets = pets.filter((p) => p.location.toLowerCase().includes(loc));
      }
      return pets;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function usePet(id: string | undefined) {
  return useQuery<Pet | null>({
    queryKey: ["pet", id],
    queryFn: async () => {
      if (!id) return null;
      // Will call actor.getPet(BigInt(id)) once backend is wired
      return samplePets.find((p) => p.id === BigInt(id)) ?? null;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useBlogArticles() {
  return useQuery<BlogArticle[]>({
    queryKey: ["articles"],
    queryFn: async () => {
      // Will call actor.listArticles() once backend is wired
      return sampleArticles;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useBlogArticle(slug: string | undefined) {
  return useQuery<BlogArticle | null>({
    queryKey: ["article", slug],
    queryFn: async () => {
      if (!slug) return null;
      // Will call actor.getArticle(slug) once backend is wired
      return sampleArticles.find((a) => a.slug === slug) ?? null;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
