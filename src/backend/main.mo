import List "mo:core/List";
import PetTypes "types/pets";
import AdoptionTypes "types/adoptions";
import BlogTypes "types/blog";
import CommunityTypes "types/community";
import PetLib "lib/pets";
import BlogLib "lib/blog";
import PetsMixin "mixins/pets-api";
import AdoptionsMixin "mixins/adoptions-api";
import BlogMixin "mixins/blog-api";
import CommunityMixin "mixins/community-api";
import AdminMixin "mixins/admin-api";

actor {
  let adminState : AdoptionTypes.AdminState = { var principal = null };

  let pets = List.empty<PetTypes.Pet>();
  let adoptionApplications = List.empty<AdoptionTypes.AdoptionApplication>();
  let blogArticles = List.empty<BlogTypes.BlogArticle>();
  let volunteerRegistrations = List.empty<CommunityTypes.VolunteerRegistration>();
  let fosterApplications = List.empty<CommunityTypes.FosterApplication>();
  let contactMessages = List.empty<CommunityTypes.ContactMessage>();

  // Seed sample data on init if empty
  if (pets.isEmpty()) {
    PetLib.seedPets(pets);
  };
  if (blogArticles.isEmpty()) {
    BlogLib.seedBlogArticles(blogArticles);
  };

  public shared (msg) func setAdmin() : async Text {
    switch (adminState.principal) {
      case (null) {
        adminState.principal := ?msg.caller;
        "Admin set";
      };
      case (?_) { "Admin already set" };
    };
  };

  public shared query func getAdminPrincipal() : async ?Principal {
    adminState.principal;
  };

  include PetsMixin(pets);
  include AdoptionsMixin(adoptionApplications);
  include BlogMixin(blogArticles);
  include CommunityMixin(volunteerRegistrations, fosterApplications, contactMessages);
  include AdminMixin(adminState, adoptionApplications);
};
