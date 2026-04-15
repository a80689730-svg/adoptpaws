import List "mo:core/List";
import CommunityTypes "../types/community";
import Time "mo:core/Time";
import Int "mo:core/Int";

module {
  public func registerVolunteer(
    registrations : List.List<CommunityTypes.VolunteerRegistration>,
    name : Text,
    email : Text,
    phone : Text,
    availability : [Text],
    interest : Text,
  ) : Text {
    let now = Time.now();
    let id = "vol-" # now.toText();
    let registration : CommunityTypes.VolunteerRegistration = {
      id;
      name;
      email;
      phone;
      availability;
      interest;
      createdAt = now;
    };
    registrations.add(registration);
    id;
  };

  public func applyToFoster(
    applications : List.List<CommunityTypes.FosterApplication>,
    name : Text,
    email : Text,
    phone : Text,
    homeType : Text,
    experience : Text,
    petType : Text,
    duration : Text,
  ) : Text {
    let now = Time.now();
    let id = "fos-" # now.toText();
    let application : CommunityTypes.FosterApplication = {
      id;
      name;
      email;
      phone;
      homeType;
      experience;
      petType;
      duration;
      createdAt = now;
    };
    applications.add(application);
    id;
  };

  public func sendContactMessage(
    messages : List.List<CommunityTypes.ContactMessage>,
    name : Text,
    email : Text,
    subject : Text,
    message : Text,
  ) : Text {
    let now = Time.now();
    let id = "msg-" # now.toText();
    let contactMessage : CommunityTypes.ContactMessage = {
      id;
      name;
      email;
      subject;
      message;
      createdAt = now;
    };
    messages.add(contactMessage);
    id;
  };
};
