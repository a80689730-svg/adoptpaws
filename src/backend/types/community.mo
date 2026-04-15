import Common "common";

module {
  public type VolunteerRegistration = {
    id : Text;
    name : Text;
    email : Text;
    phone : Text;
    availability : [Text];
    interest : Text;
    createdAt : Common.Timestamp;
  };

  public type FosterApplication = {
    id : Text;
    name : Text;
    email : Text;
    phone : Text;
    homeType : Text;
    experience : Text;
    petType : Text;
    duration : Text;
    createdAt : Common.Timestamp;
  };

  public type ContactMessage = {
    id : Text;
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
    createdAt : Common.Timestamp;
  };
};
