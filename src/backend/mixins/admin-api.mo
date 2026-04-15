import List "mo:core/List";
import Principal "mo:core/Principal";
import AdoptionTypes "../types/adoptions";

mixin (adminState : AdoptionTypes.AdminState, applications : List.List<AdoptionTypes.AdoptionApplication>) {
  public shared (msg) func listAdoptionApplications() : async [AdoptionTypes.AdoptionApplication] {
    assert msg.caller == adminState.principal.get(Principal.fromText("aaaaa-aa"));
    applications.toArray();
  };
};
