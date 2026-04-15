import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Share2,
  Tag,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useBlogArticle, useBlogArticles } from "../hooks/useBackend";
import type { BlogArticle } from "../types";

const ARTICLE_CONTENT: Record<string, string> = {
  "first-week-home": `The first seven days with a rescue animal can be joyful, chaotic, and occasionally overwhelming — often all three at once. What many new adopters don't realise is that their pet is experiencing the same mix of emotions.

**Give them space to decompress**

Rescue pets often arrive having lived through shelters, transport, or previous homes. For many, your house is the fourth or fifth environment they've adjusted to. The best thing you can do in the first 48 hours is let them explore at their own pace. Resist the urge to introduce them to everyone you know.

**Establish a routine immediately**

Feeding, walks, and bedtime at consistent times each day create a sense of safety. Dogs especially rely on predictability. Cats appreciate knowing where their litter box, food, and hiding spots are before they're expected to socialise.

**Watch for stress signals**

Yawning, lip licking, hiding, or avoiding eye contact are normal stress signals — not signs that the adoption is failing. Most pets need 3–4 weeks to show their true personality. This is sometimes called the "3-3-3 rule": 3 days to decompress, 3 weeks to settle, 3 months to feel truly at home.

**What to prepare before they arrive**

Set up a quiet room as a "base camp" (especially for cats). Have food, bowls, a crate or bed, and familiar-smelling items ready. Book a vet appointment for the first week and make sure they have an ID tag with your contact information.

The first week sets the tone. Patience, routine, and presence are the only tools you need.`,

  "vaccination-schedule": `Vaccinations are one of the most important and most misunderstood aspects of pet ownership. They protect your pet from serious, preventable diseases — and they protect other animals in your community too.

**Core vaccines for dogs**

For dogs, the DA2PP vaccine (Distemper, Adenovirus, Parvovirus, Parainfluenza) is given at 6, 8, 12, and 16 weeks, then boosted at 1 year, then every 3 years. Rabies is required by law in most states — first dose at 12–16 weeks, booster at 1 year, then every 1–3 years. Bordetella (Kennel Cough) is recommended for social dogs and given annually.

**Core vaccines for cats**

For cats, FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia) starts at 6–8 weeks, then every 3–4 weeks until 16 weeks, booster at 1 year, then every 3 years. Rabies is required in many states — first dose at 12 weeks, then annual or triennial boosters.

**What about adopted pets?**

If your pet came from a shelter or rescue, ask for vaccination records. Most shelters vaccinate on intake, but you'll need to continue the schedule. If records are unavailable, your vet can do titre testing to assess immunity before revaccinating.

**Don't skip the annual wellness visit**

Vaccinations are just one part of the annual visit. Your vet will also screen for heartworm, check dental health, and catch early signs of disease that aren't visible at home. Prevention is always less costly — financially and emotionally — than treatment.`,

  "training-basics": `Training isn't about control — it's about communication. When you train a dog (or even a cat), you're establishing a shared language that makes daily life easier and the bond between you stronger.

**The golden rule: positive reinforcement**

Reward the behaviour you want to see more of. Treats, praise, play, and affection all work. The key is timing — the reward must come within 1–2 seconds of the behaviour, so your pet makes the connection. A clicker can help you mark the exact moment with precision.

**Start with the basics**

"Sit" is the foundation of everything and works for dogs of all ages. "Stay" teaches impulse control and trust. "Come" is the most important safety command — practise it daily in low-distraction environments first. "Leave it" is essential for preventing accidental ingestion of harmful items.

**Keep sessions short**

Dogs and cats both have short attention spans for structured learning. Five to ten minutes, two to three times per day, is more effective than a single 45-minute session. Always end on a win — even if that means stepping back to a command they already know well.

**Consistency beats intensity**

The whole household must use the same commands and rules. If one person allows the dog on the sofa and another doesn't, the dog isn't misbehaving — it's confused. A quick family meeting to align on expectations takes five minutes and saves weeks of frustration.

**Working with a rescue dog**

Rescue dogs may have learned behaviours from previous environments that take time to unlearn. Be patient. A dog who was never taught boundaries isn't "bad" — they were never taught. A few weeks of consistent, kind training can transform almost any dog. Progress may be slow some weeks — celebrate every small win.`,
};

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

function renderContent(raw: string) {
  const paragraphs = raw.split("\n\n").filter((p) => p.trim());
  return paragraphs.map((para) => {
    const trimmed = para.trim();
    const keyBase = trimmed.slice(0, 20).replace(/\W+/g, "-");
    const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part) =>
      part.startsWith("**") ? (
        <strong
          key={`strong-${part.slice(2, 14)}`}
          className="font-semibold text-foreground"
        >
          {part.replace(/\*\*/g, "")}
        </strong>
      ) : (
        part
      ),
    );
    const isHeading =
      trimmed.startsWith("**") && trimmed.endsWith("**") && parts.length === 1;
    if (isHeading) {
      return (
        <h3
          key={`h-${keyBase}`}
          className="font-display text-xl font-bold text-foreground mt-8 mb-3"
        >
          {trimmed.replace(/\*\*/g, "")}
        </h3>
      );
    }
    return (
      <p
        key={`p-${keyBase}`}
        className="text-foreground leading-relaxed mb-5 text-base"
      >
        {rendered}
      </p>
    );
  });
}

function RelatedCard({ article, idx }: { article: BlogArticle; idx: number }) {
  const readTime = computeReadTime(article.content);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.1 }}
      data-ocid={`blog-article.related_item.${idx + 1}`}
    >
      <Card className="group overflow-hidden border border-border shadow-pet-card hover:shadow-pet-hover transition-smooth">
        <div className="overflow-hidden h-40">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            loading="lazy"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Clock className="w-3 h-3" />
            {readTime} min read
            <span className="text-border">•</span>
            {formatDate(article.publishedAt)}
          </div>
          <h4 className="font-display font-semibold text-foreground text-sm leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {article.title}
          </h4>
          <Link
            to="/blog/$slug"
            params={{ slug: article.slug }}
            className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
          >
            Read Article →
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ArticlePageSkeleton() {
  return (
    <div data-ocid="blog-article.loading_state">
      <Skeleton className="w-full h-72 md:h-[420px] rounded-none" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Skeleton className="h-5 w-48 mb-8" />
        <Skeleton className="h-10 w-3/4 mb-3" />
        <Skeleton className="h-10 w-1/2 mb-6" />
        <div className="flex gap-4 mb-8">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
        {(["a", "b", "c", "d", "e"] as const).map((k) => (
          <Skeleton key={`skel-${k}`} className="h-5 w-full mb-3" />
        ))}
      </div>
    </div>
  );
}

export function BlogArticlePage() {
  const { slug } = useParams({ from: "/blog/$slug" });
  const { data: article, isLoading } = useBlogArticle(slug);
  const { data: allArticles } = useBlogArticles();
  const [copied, setCopied] = useState(false);

  const related = (allArticles ?? [])
    .filter((a) => a.slug !== slug)
    .slice(0, 2);

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.href}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  if (isLoading) return <ArticlePageSkeleton />;

  if (!article) {
    return (
      <div
        className="max-w-3xl mx-auto px-4 sm:px-6 py-24 text-center"
        data-ocid="blog-article.error_state"
      >
        <BookOpen className="w-14 h-14 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Article not found
        </h2>
        <p className="text-muted-foreground mb-6">
          This article may have been moved or removed.
        </p>
        <Button asChild variant="outline" data-ocid="blog-article.back_button">
          <Link to="/blog">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Link>
        </Button>
      </div>
    );
  }

  const content =
    ARTICLE_CONTENT[article.slug] ||
    article.content ||
    `${article.excerpt}\n\nMore content coming soon.`;
  const readTime = computeReadTime(content);

  return (
    <div data-ocid="blog-article.page">
      {/* Hero Image */}
      <div className="w-full h-72 md:h-[420px] overflow-hidden relative">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-1.5 text-sm text-muted-foreground py-5"
          data-ocid="blog-article.breadcrumb"
          aria-label="Breadcrumb"
        >
          <Link
            to="/"
            className="hover:text-primary transition-colors duration-200"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <Link
            to="/blog"
            className="hover:text-primary transition-colors duration-200"
          >
            Resources
          </Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-foreground font-medium truncate max-w-[200px]">
            {article.title}
          </span>
        </nav>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-foreground leading-tight mb-6">
            {article.title}
          </h1>

          {/* Meta bar */}
          <div
            className="flex flex-wrap items-center gap-4 pb-6 mb-8 border-b border-border"
            data-ocid="blog-article.meta_bar"
          >
            <div className="flex items-center gap-2 text-sm">
              <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-xs flex-shrink-0">
                {article.author[0]}
              </div>
              <span className="font-medium text-foreground">
                {article.author}
              </span>
            </div>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {formatDate(article.publishedAt)}
            </span>
            <Badge
              variant="secondary"
              className="flex items-center gap-1 text-xs"
            >
              <Clock className="w-3 h-3" />
              {readTime} min read
            </Badge>

            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="ml-auto flex items-center gap-1.5 text-sm"
              data-ocid="blog-article.share_button"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-secondary" />
                  Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Share
                </>
              )}
            </Button>
          </div>

          {/* Lead */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 italic border-l-4 border-primary/40 pl-4">
            {article.excerpt}
          </p>

          {/* Body */}
          <div className="mb-10" data-ocid="blog-article.content">
            {renderContent(content)}
          </div>

          {/* Tags */}
          <div
            className="flex flex-wrap gap-2 mb-8"
            data-ocid="blog-article.tags"
          >
            <span className="text-sm font-medium text-muted-foreground self-center mr-1">
              Topics:
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border font-medium ${getTagClass(tag)}`}
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>

          <Separator className="mb-8" />

          {/* Back link */}
          <div className="mb-12">
            <Link
              to="/blog"
              data-ocid="blog-article.back_button"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Resources
            </Link>
          </div>
        </motion.article>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <section
          className="bg-muted/40 py-14 border-t border-border"
          data-ocid="blog-article.related_section"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              You might also enjoy
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rel, i) => (
                <RelatedCard key={String(rel.id)} article={rel} idx={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
