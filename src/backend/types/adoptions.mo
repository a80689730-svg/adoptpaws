import Common "common";

module {
  public type AdminState = {
    var principal : ?Principal;
  };

  public type AdoptionApplication = {
    id : Text;
    petId : Nat;
    applicantName : Text;
    email : Text;
    phone : Text;
    address : Text;
    city : Text;
    state : Text;
    zip : Text;
    experience : Text;
    homeType : Text;
    reason : Text;
    createdAt : Common.Timestamp;
  };
};
