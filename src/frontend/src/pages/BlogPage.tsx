import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { BookOpen, Calendar, Clock, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useBlogArticles } from "../hooks/useBackend";
import type { BlogArticle } from "../types";

const TAG_COLORS: Record<string, string> = {
  "new pet": "bg-secondary/20 text-secondary-foreground border-secondary/30",
  tips: "bg-primary/15 text-primary border-primary/30",
  adjustment: "bg-accent/20 text-accent-foreground border-accent/30",
  health: "bg-secondary/20 text-secondary-foreground border-secondary/30",
  vaccinations: "bg-primary/15 text-primary border-primary/30",
  care: "bg-accent/20 text-accent-foreground border-accent/30",
  training: "bg-secondary/20 text-secondary-foreground border-secondary/30",
  behavior: "bg-primary/15 text-primary border-primary/30",
  dogs: "bg-accent/20 text-accent-foreground border-accent/30",
};

function getTagClass(tag: string) {
  return (
    TAG_COLORS[tag.toLowerCase()] ??
    "bg-muted text-muted-foreground border-border"
  );
}

function computeReadTime(content: string): number {
  const words = content ? content.trim().split(/\s+/).length : 300;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function ArticleSkeleton() {
  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-border bg-card">
      <Skeleton className="h-52 w-full rounded-none" />
      <div className="p-5 flex flex-col gap-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-2 mt-1">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function ArticleCard({
  article,
  index,
}: {
  article: BlogArticle;
  index: number;
}) {
  const readTime = computeReadTime(article.content);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      data-ocid={`blog.item.${index + 1}`}
      className="h-full"
    >
      <Card className="group overflow-hidden border border-border shadow-pet-card hover:shadow-pet-hover transition-smooth h-full flex flex-col">
        <div className="overflow-hidden h-52 flex-shrink-0 relative">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 bg-card/90 backdrop-blur-sm text-foreground text-xs font-medium px-2.5 py-1 rounded-full border border-border">
              <Clock className="w-3 h-3 text-primary" />
              {readTime} min read
            </span>
          </div>
        </div>

        <CardContent className="p-5 flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="text-border">•</span>
            <span className="font-medium text-foreground truncate">
              {article.author}
            </span>
          </div>

          <h3 className="font-display font-semibold text-foreground text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {article.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${getTagClass(tag)}`}
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>

          <Link
            to="/blog/$slug"
            params={{ slug: article.slug }}
            data-ocid={`blog.read_link.${index + 1}`}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200 group/link"
          >
            <BookOpen className="w-4 h-4" />
            Read Article
            <span className="group-hover/link:translate-x-1 transition-transform duration-200 inline-block">
              →
            </span>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function BlogPage() {
  const { data: articles, isLoading, isError } = useBlogArticles();

  return (
    <div data-ocid="blog.page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-20 md:py-28 border-b border-border">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 blur-3xl rounded-full" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <Badge
              variant="outline"
              className="mb-5 border-primary/40 text-primary bg-primary/8 px-4 py-1.5 text-sm font-medium"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
              Resources & Guides
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
              Pet Care Resources
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Expert tips and guides to help you give your pet the best life
              possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article Grid */}
      <section
        className="bg-background py-16 md:py-20"
        data-ocid="blog.section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {(["a", "b", "c", "d", "e", "f"] as const).map((k) => (
                <ArticleSkeleton key={`skel-${k}`} />
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center py-20" data-ocid="blog.error_state">
              <p className="text-muted-foreground text-lg">
                Unable to load articles. Please try again later.
              </p>
            </div>
          )}

          {!isLoading && !isError && articles && articles.length === 0 && (
            <div className="text-center py-20" data-ocid="blog.empty_state">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No articles yet
              </h3>
              <p className="text-muted-foreground">
                Check back soon for pet care tips and guides.
              </p>
            </div>
          )}

          {!isLoading && !isError && articles && articles.length > 0 && (
            <>
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold text-foreground">
                  All Articles
                </h2>
                <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  {articles.length} article{articles.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {articles.map((article, i) => (
                  <ArticleCard
                    key={String(article.id)}
                    article={article}
                    index={i}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Topics */}
      <section className="bg-muted/40 border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-5">
            Browse by Topic
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              "New Pet Tips",
              "Dog Care",
              "Cat Care",
              "Health & Vaccinations",
              "Training",
              "Nutrition",
              "Senior Pets",
              "Behavior",
            ].map((topic) => (
              <button
                key={topic}
                type="button"
                className="px-4 py-2 rounded-full border border-border bg-card hover:bg-primary/5 hover:border-primary/30 hover:text-primary text-sm text-foreground transition-smooth"
                data-ocid={`blog.topic_${topic.toLowerCase().replace(/[\s&]+/g, "_")}_button`}
              >
                <Tag className="w-3 h-3 inline mr-1.5 opacity-60" />
                {topic}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
