import List "mo:core/List";
import Types "../types/pets";
import Time "mo:core/Time";

module {
  public func listPets(
    pets : List.List<Types.Pet>,
    species : ?Text,
    ageMin : ?Nat,
    ageMax : ?Nat,
    breed : ?Text,
    location : ?Text,
  ) : [Types.Pet] {
    let filtered = pets.filter(func(p : Types.Pet) : Bool {
      if (not p.available) return false;
      switch (species) {
        case (?s) { if (p.species != s) return false };
        case null {};
      };
      switch (ageMin) {
        case (?mn) { if (p.age < mn) return false };
        case null {};
      };
      switch (ageMax) {
        case (?mx) { if (p.age > mx) return false };
        case null {};
      };
      switch (breed) {
        case (?b) { if (p.breed != b) return false };
        case null {};
      };
      switch (location) {
        case (?l) { if (p.location != l) return false };
        case null {};
      };
      true;
    });
    filtered.toArray();
  };

  public func getPet(pets : List.List<Types.Pet>, id : Nat) : ?Types.Pet {
    pets.find(func(p : Types.Pet) : Bool { p.id == id });
  };

  public func getFeaturedPets(pets : List.List<Types.Pet>) : [Types.Pet] {
    let available = pets.filter(func(p : Types.Pet) : Bool { p.available });
    available.toArray()
      |> _take(_, 6);
  };

  func _take(arr : [Types.Pet], n : Nat) : [Types.Pet] {
    if (arr.size() <= n) return arr;
    arr.sliceToArray(0, n);
  };

  public func seedPets(pets : List.List<Types.Pet>) {
    let now = Time.now();
    let samples : [Types.Pet] = [
      // --- Dogs ---
      {
        id = 1;
        name = "Buddy";
        species = "Dog";
        breed = "Labrador Retriever";
        age = 3;
        gender = "Male";
        description = "Buddy is a friendly, energetic Labrador who loves fetch and swimming. He is great with kids and other dogs, fully house-trained, and always ready for an adventure.";
        healthStatus = "Excellent";
        vaccinationStatus = "Up to date";
        location = "New York";
        photos = ["https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800"];
        shelterId = "shelter-1";
        shelterName = "NYC Animal Care";
        shelterEmail = "info@nycac.org";
        shelterPhone = "(212) 555-0101";
        available = true;
      },
      {
        id = 2;
        name = "Sunny";
        species = "Dog";
        breed = "Golden Retriever";
        age = 2;
        gender = "Female";
        description = "Sunny is a gentle, affectionate Golden Retriever who thrives on human companionship. She loves morning runs, cuddles on the couch, and is wonderful with children.";
        healthStatus = "Excellent";
        vaccinationStatus = "Up to date";
        location = "Los Angeles";
        photos = ["https://images.unsplash.com/photo-1552053831-71594a27632d?w=800"];
        shelterId = "shelter-2";
        shelterName = "LA Animal Services";
        shelterEmail = "adopt@laas.org";
        shelterPhone = "(310) 555-0102";
        available = true;
      },
      {
        id = 3;
        name = "Coco";
        species = "Dog";
        breed = "Poodle";
        age = 4;
        gender = "Female";
        description = "Coco is an intelligent and playful Poodle who learns tricks quickly. She is hypoallergenic, low-shedding, and loves agility training and interactive puzzle toys.";
        healthStatus = "Good";
        vaccinationStatus = "Up to date";
        location = "Chicago";
        photos = ["https://images.unsplash.com/photo-1598133893773-de3574464ef0?w=800"];
        shelterId = "shelter-3";
        shelterName = "Chicago Humane Society";
        shelterEmail = "info@chicagohumane.org";
        shelterPhone = "(312) 555-0103";
        available = true;
      },
      {
        id = 4;
        name = "Max";
        species = "Dog";
        breed = "Beagle";
        age = 5;
        gender = "Male";
        description = "Max is a curious and lovable Beagle with an incredible nose for adventure. He enjoys long walks, nose-work games, and snuggling with his favourite humans after a busy day.";
        healthStatus = "Good";
        vaccinationStatus = "Up to date";
        location = "Austin";
        photos = ["https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800"];
        shelterId = "shelter-4";
        shelterName = "Austin Pets Alive";
        shelterEmail = "adopt@austinpetsalive.org";
        shelterPhone = "(512) 555-0104";
        available = true;
      },
      {
        id = 5;
        name = "Storm";
        species = "Dog";
        breed = "Border Collie";
        age = 2;
        gender = "Male";
        description = "Storm is a highly intelligent Border Collie who excels at agility and frisbee. He needs an active family who can challenge his brilliant mind and boundless energy every day.";
        healthStatus = "Excellent";
        vaccinationStatus = "Up to date";
        location = "Seattle";
        photos = ["https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=800"];
        shelterId = "shelter-5";
        shelterName = "Seattle Animal Shelter";
        shelterEmail = "adopt@seattle.gov";
        shelterPhone = "(206) 555-0105";
        available = true;
      },
      // --- Cats ---
      {
        id = 6;
        name = "Luna";
        species = "Cat";
        breed = "Persian";
        age = 3;
        gender = "Female";
        description = "Luna is a regal Persian cat who loves being groomed and adored. She is calm, gentle, and perfect for a quiet home where she can lounge in sunbeams and receive all the attention.";
        healthStatus = "Good";
        vaccinationStatus = "Up to date";
        location = "New York";
        photos = ["https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=800"];
        shelterId = "shelter-1";
        shelterName = "NYC Animal Care";
        shelterEmail = "info@nycac.org";
        shelterPhone = "(212) 555-0101";
        available = true;
      },
      {
        id = 7;
        name = "Jasper";
        species = "Cat";
        breed = "Siamese";
        age = 4;
        gender = "Male";
        description = "Jasper is a talkative and social Siamese who will follow you from room to room. He craves companionship, loves interactive wand toys, and will serenade you with his melodic voice.";
        healthStatus = "Excellent";
        vaccinationStatus = "Up to date";
        location = "Los Angeles";
        photos = ["https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800"];
        shelterId = "shelter-2";
        shelterName = "LA Animal Services";
        shelterEmail = "adopt@laas.org";
        shelterPhone = "(310) 555-0102";
        available = true;
      },
      {
        id = 8;
        name = "Oliver";
        species = "Cat";
        breed = "Maine Coon";
        age = 6;
        gender = "Male";
        description = "Oliver is a magnificent Maine Coon with a lush, flowing coat and a gentle giant personality. He loves playing fetch, supervised outdoor walks on a leash, and cuddling with his family.";
        healthStatus = "Good";
        vaccinationStatus = "Up to date";
        location = "Chicago";
        photos = ["https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800"];
        shelterId = "shelter-3";
        shelterName = "Chicago Humane Society";
        shelterEmail = "info@chicagohumane.org";
        shelterPhone = "(312) 555-0103";
        available = true;
      },
      {
        id = 9;
        name = "Mochi";
        species = "Cat";
        breed = "Tabby";
        age = 1;
        gender = "Female";
        description = "Mochi is a playful young tabby with striking markings and an adventurous spirit. She loves chasing feather wands, exploring cardboard boxes, and napping in cosy sunny spots.";
        healthStatus = "Excellent";
        vaccinationStatus = "Up to date";
        location = "Austin";
        photos = ["https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800"];
        shelterId = "shelter-4";
        shelterName = "Austin Pets Alive";
        shelterEmail = "adopt@austinpetsalive.org";
        shelterPhone = "(512) 555-0104";
        available = true;
      },
      {
        id = 10;
        name = "Nala";
        species = "Cat";
        breed = "Bengal";
        age = 2;
        gender = "Female";
        description = "Nala is a stunning Bengal cat with a wild leopard-like coat and a playful, curious personality. She loves water, climbing cat trees, and interactive play sessions with puzzle feeders.";
        healthStatus = "Excellent";
        vaccinationStatus = "Up to date";
        location = "Seattle";
        photos = ["https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=800"];
        shelterId = "shelter-5";
        shelterName = "Seattle Animal Shelter";
        shelterEmail = "adopt@seattle.gov";
        shelterPhone = "(206) 555-0105";
        available = true;
      },
      // --- Rabbits ---
      {
        id = 11;
        name = "Pepper";
        species = "Rabbit";
        breed = "Holland Lop";
        age = 2;
        gender = "Male";
        description = "Pepper is an adorable Holland Lop with floppy ears and a laid-back personality. He enjoys gentle handling, fresh leafy greens, and hopping around a bunny-proofed living room.";
        healthStatus = "Good";
        vaccinationStatus = "Up to date";
        location = "New York";
        photos = ["https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800"];
        shelterId = "shelter-1";
        shelterName = "NYC Animal Care";
        shelterEmail = "info@nycac.org";
        shelterPhone = "(212) 555-0101";
        available = true;
      },
      {
        id = 12;
        name = "Daisy";
        species = "Rabbit";
        breed = "Lionhead";
        age = 1;
        gender = "Female";
        description = "Daisy is a fluffy Lionhead rabbit with a fabulous mane and a sweet, inquisitive nature. She loves foraging for hay, grooming sessions, and binkying around a safe indoor space.";
        healthStatus = "Excellent";
        vaccinationStatus = "Up to date";
        location = "Chicago";
        photos = ["https://images.unsplash.com/photo-1559214369-a6b1d7919865?w=800"];
        shelterId = "shelter-3";
        shelterName = "Chicago Humane Society";
        shelterEmail = "info@chicagohumane.org";
        shelterPhone = "(312) 555-0103";
        available = true;
      },
    ];
    let _ = now; // suppress unused warning
    for (pet in samples.values()) {
      pets.add(pet);
    };
  };
};
