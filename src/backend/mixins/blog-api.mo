import List "mo:core/List";
import BlogTypes "../types/blog";
import BlogLib "../lib/blog";

mixin (articles : List.List<BlogTypes.BlogArticle>) {
  public query func listBlogArticles() : async [BlogTypes.BlogArticle] {
    BlogLib.listBlogArticles(articles);
  };

  public query func getBlogArticle(id : Nat) : async ?BlogTypes.BlogArticle {
    BlogLib.getBlogArticle(articles, id);
  };
};
