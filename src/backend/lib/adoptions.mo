import List "mo:core/List";
import AdoptionTypes "../types/adoptions";
import Time "mo:core/Time";
import Int "mo:core/Int";

module {
  public func submitAdoptionApplication(
    applications : List.List<AdoptionTypes.AdoptionApplication>,
    petId : Nat,
    applicantName : Text,
    email : Text,
    phone : Text,
    address : Text,
    city : Text,
    state : Text,
    zip : Text,
    experience : Text,
    homeType : Text,
    reason : Text,
  ) : Text {
    let now = Time.now();
    let id = "app-" # now.toText();
    let application : AdoptionTypes.AdoptionApplication = {
      id;
      petId;
      applicantName;
      email;
      phone;
      address;
      city;
      state;
      zip;
      experience;
      homeType;
      reason;
      createdAt = now;
    };
    applications.add(application);
    id;
  };
};
