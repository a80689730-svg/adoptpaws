import List "mo:core/List";
import CommunityTypes "../types/community";
import CommunityLib "../lib/community";

mixin (
  volunteerRegistrations : List.List<CommunityTypes.VolunteerRegistration>,
  fosterApplications : List.List<CommunityTypes.FosterApplication>,
  contactMessages : List.List<CommunityTypes.ContactMessage>,
) {
  public shared func registerVolunteer(
    name : Text,
    email : Text,
    phone : Text,
    availability : [Text],
    interest : Text,
  ) : async Text {
    CommunityLib.registerVolunteer(volunteerRegistrations, name, email, phone, availability, interest);
  };

  public shared func applyToFoster(
    name : Text,
    email : Text,
    phone : Text,
    homeType : Text,
    experience : Text,
    petType : Text,
    duration : Text,
  ) : async Text {
    CommunityLib.applyToFoster(fosterApplications, name, email, phone, homeType, experience, petType, duration);
  };

  public shared func sendContactMessage(
    name : Text,
    email : Text,
    subject : Text,
    message : Text,
  ) : async Text {
    CommunityLib.sendContactMessage(contactMessages, name, email, subject, message);
  };
};
