import List "mo:core/List";
import AdoptionTypes "../types/adoptions";
import AdoptionLib "../lib/adoptions";

mixin (applications : List.List<AdoptionTypes.AdoptionApplication>) {
  public shared func submitAdoptionApplication(
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
  ) : async Text {
    AdoptionLib.submitAdoptionApplication(
      applications,
      petId,
      applicantName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      experience,
      homeType,
      reason,
    );
  };
};
