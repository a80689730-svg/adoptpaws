import List "mo:core/List";
import PetTypes "../types/pets";
import PetLib "../lib/pets";

mixin (pets : List.List<PetTypes.Pet>) {
  public query func listPets(
    species : ?Text,
    ageMin : ?Nat,
    ageMax : ?Nat,
    breed : ?Text,
    location : ?Text,
  ) : async [PetTypes.Pet] {
    PetLib.listPets(pets, species, ageMin, ageMax, breed, location);
  };

  public query func getPet(id : Nat) : async ?PetTypes.Pet {
    PetLib.getPet(pets, id);
  };

  public query func getFeaturedPets() : async [PetTypes.Pet] {
    PetLib.getFeaturedPets(pets);
  };
};
