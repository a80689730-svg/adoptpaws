module {
  public type Pet = {
    id : Nat;
    name : Text;
    species : Text;
    breed : Text;
    age : Nat;
    gender : Text;
    description : Text;
    healthStatus : Text;
    vaccinationStatus : Text;
    location : Text;
    photos : [Text];
    shelterId : Text;
    shelterName : Text;
    shelterEmail : Text;
    shelterPhone : Text;
    available : Bool;
  };
};
