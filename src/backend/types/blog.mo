import Common "common";

module {
  public type BlogArticle = {
    id : Nat;
    title : Text;
    excerpt : Text;
    content : Text;
    imageUrl : Text;
    author : Text;
    publishDate : Common.Timestamp;
    readTime : Text;
    tags : [Text];
  };
};
