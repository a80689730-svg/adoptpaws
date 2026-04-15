import List "mo:core/List";
import BlogTypes "../types/blog";
import Time "mo:core/Time";

module {
  public func listBlogArticles(articles : List.List<BlogTypes.BlogArticle>) : [BlogTypes.BlogArticle] {
    articles.toArray();
  };

  public func getBlogArticle(articles : List.List<BlogTypes.BlogArticle>, id : Nat) : ?BlogTypes.BlogArticle {
    articles.find(func(a : BlogTypes.BlogArticle) : Bool { a.id == id });
  };

  public func seedBlogArticles(articles : List.List<BlogTypes.BlogArticle>) {
    let now = Time.now();
    let samples : [BlogTypes.BlogArticle] = [
      {
        id = 1;
        title = "First-Time Pet Owner Guide";
        excerpt = "Bringing a new pet home is one of life's most rewarding experiences. This guide walks you through everything you need to know to give your new companion the best possible start.";
        content = "Bringing a new pet home is a joyful milestone, but it also comes with real responsibilities. Before your new companion arrives, prepare a dedicated space with a comfortable bed, food and water bowls, and appropriate toys. Keeping the first few days calm and low-key helps your pet adjust to the new environment without feeling overwhelmed.\n\nEstablishing a consistent feeding schedule is one of the most important things you can do. Puppies and kittens typically need three to four small meals a day, while adult pets generally thrive on two. Always use high-quality, age-appropriate food and follow the portion guidelines on the packaging, adjusting based on your pet's weight and activity level.\n\nYour first veterinary visit should happen within the first week of bringing your pet home. The vet will conduct a full health check, review vaccination history, discuss parasite prevention, and advise on spaying or neutering if not already done. Building a relationship with a trusted vet early on is invaluable for your pet's long-term wellbeing.\n\nSocialisation is critical during the early weeks. Gradually introduce your pet to different people, sounds, environments, and — if appropriate — other animals. Positive, low-stress exposures during this sensitive period help build a confident, well-adjusted companion who handles new situations calmly.\n\nPet-proofing your home protects both your belongings and your new family member. Secure electrical cords, remove toxic plants, store cleaning products out of reach, and block off any areas that could pose a hazard. A safe environment gives your pet the freedom to explore and play without risk.\n\nFinally, be patient. Every pet has a unique personality and adjusts at their own pace. With consistent routines, plenty of love, and a little guidance, your new companion will soon feel completely at home — and the bond you build will last a lifetime.";
        imageUrl = "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800";
        author = "Dr. Sarah Mitchell";
        publishDate = now;
        readTime = "6 min read";
        tags = ["new pet", "guide", "pet care", "tips"];
      },
      {
        id = 2;
        title = "Dog Training Basics";
        excerpt = "Positive reinforcement is the most effective and humane way to teach your dog. Learn the essential commands and socialisation techniques that will set your dog up for a happy, well-behaved life.";
        content = "Positive reinforcement is the gold standard of modern dog training. Rather than punishing unwanted behaviour, you reward the behaviours you want to see repeated — using treats, praise, or play. This approach not only teaches commands quickly but also strengthens the bond between you and your dog and keeps training sessions fun.\n\nThe five foundational commands every dog should know are sit, stay, come, down, and leave it. Start with 'sit': hold a treat close to your dog's nose, then slowly move your hand upward — the dog's bottom will naturally lower as the head follows the treat. The moment they sit, say 'sit', give the treat, and offer enthusiastic praise. Repeat several times in short five-minute sessions.\n\n'Stay' builds impulse control. Once your dog can sit reliably, ask them to sit, then open your palm toward them and say 'stay'. Take one step back, return, and reward immediately if they held position. Gradually increase distance and duration over multiple sessions. Never correct a failed 'stay' — simply reduce difficulty and rebuild success.\n\n'Come' is potentially a life-saving command. Practise in a safe, enclosed space: crouch down, open your arms, and call your dog's name followed by 'come' in an excited, welcoming tone. Always reward coming to you generously — never call your dog to you for something unpleasant like nail trimming, or the command will lose its power.\n\nSocialisation should happen alongside training. Between eight and sixteen weeks is the critical window, but older dogs can still learn to be comfortable in new situations with patient exposure. Introduce your dog to a variety of people, dogs, surfaces, sounds, and environments, always pairing new experiences with positive rewards.\n\nConsistency is the single most important factor in dog training. Use the same cue words, the same reward timing, and the same rules across everyone in the household. A dog who is allowed on the sofa by one family member but scolded by another will struggle to understand what is expected — and will feel anxious as a result. Clear, consistent guidance gives your dog confidence and makes training genuinely enjoyable for you both.";
        imageUrl = "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800";
        author = "James Harrington, CPDT-KA";
        publishDate = now;
        readTime = "7 min read";
        tags = ["dog training", "positive reinforcement", "commands", "socialisation"];
      },
      {
        id = 3;
        title = "Cat Care Essentials";
        excerpt = "Cats make wonderful, independent companions, but they have specific needs that must be met for a happy, healthy life. From litter box basics to enrichment ideas, this guide covers it all.";
        content = "One of the first decisions new cat owners face is whether to keep their cat indoors or allow outdoor access. Indoor cats live significantly longer on average — up to fifteen years or more — because they are protected from traffic, predators, disease, and parasites. With proper enrichment, an indoor life can be extremely fulfilling. If you do allow outdoor access, a secure 'catio' enclosure or supervised garden time is a safer compromise.\n\nThe litter box is at the heart of a happy cat home. The general rule is one litter box per cat, plus one extra. Place boxes in quiet, accessible locations — never next to food or in high-traffic areas. Scoop daily and do a full clean with mild unscented soap weekly. Cats are fastidious by nature; a dirty litter box is the most common cause of inappropriate elimination indoors.\n\nCats are obligate carnivores, meaning they require nutrients found only in animal tissue. Feed a high-quality diet with a named meat source as the first ingredient. Wet food is beneficial for hydration, as cats have a naturally low thirst drive. Avoid free-feeding dry kibble, which can lead to obesity — instead, offer measured meals twice daily.\n\nEnrichment is essential for a cat's mental and physical wellbeing. Cats need opportunities to climb, scratch, stalk, pounce, and hide. Provide a tall cat tree near a window, multiple scratching posts (both horizontal and vertical), and rotate interactive toys regularly to maintain interest. Just fifteen minutes of wand-toy play twice a day can dramatically reduce stress-related behaviours.\n\nRegular veterinary care keeps your cat thriving. Annual check-ups, vaccinations, flea and worm prevention, and dental care are all important. Many health issues in cats — including kidney disease and hyperthyroidism — are highly manageable when caught early. Pay attention to changes in appetite, thirst, litter box habits, or energy levels, as cats instinctively hide illness.\n\nFinally, remember that cats communicate in subtle ways. Slow blinks signal trust, a raised tail tip is a friendly greeting, and kneading is a sign of contentment. Learning your cat's unique language deepens your bond and helps you respond to their needs before minor issues become problems. Respect their boundaries, offer affection on their terms, and you will have a loyal, loving companion for many years.";
        imageUrl = "https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=800";
        author = "Dr. Sarah Mitchell";
        publishDate = now;
        readTime = "8 min read";
        tags = ["cat care", "indoor cats", "litter box", "enrichment", "nutrition"];
      },
    ];
    for (article in samples.values()) {
      articles.add(article);
    };
  };
};
