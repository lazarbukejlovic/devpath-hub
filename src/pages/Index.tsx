import { Link } from "react-router-dom";
import { ArrowRight, Code2, Github, Linkedin, Briefcase, Target, Sparkles, Rocket, BarChart3, Users } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VideoCard } from "@/components/VideoCard";
import { videos, creators } from "@/data/mock";

const features = [
  { icon: Briefcase, title: "Job-search content", text: "Practical strategies for landing web developer roles in a competitive market." },
  { icon: Github, title: "GitHub & portfolio", text: "Real reviews of profiles and projects from developers who've been hired." },
  { icon: Linkedin, title: "LinkedIn optimization", text: "Headline, About, and outreach formulas that get recruiters to message you." },
  { icon: Target, title: "Interview preparation", text: "Behavioral, technical, and system design walkthroughs for frontend roles." },
  { icon: Sparkles, title: "Creator visibility", text: "Quality creators get featured. Boost your reach with Promoted plans." },
  { icon: Rocket, title: "Premium boosting", text: "Push your best content higher in the feed and onto the homepage." },
];

const Index = () => {
  const promoted = videos.filter((v) => v.promoted).slice(0, 3);
  const featuredCreators = creators.filter((c) => c.plan !== "Free").slice(0, 4);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl animate-fade-up">
            <Badge variant="outline" className="border-primary/40 text-primary mb-6 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2 animate-pulse" />
              Built for web developers · v1.0
            </Badge>
            <h1 className="font-display font-bold text-5xl md:text-7xl tracking-tight leading-[1.05]">
              Focused career growth for{" "}
              <span className="text-gradient">Web Developers</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              DevPath Hub helps developers improve their job search, portfolio, GitHub, LinkedIn, interview prep, and real-world web skills — through practical video content from people who've actually done it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/videos">Explore videos <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/creator">Become a creator</Link>
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap gap-8 text-sm font-mono text-muted-foreground">
              <div><span className="text-foreground font-semibold text-2xl block">1,284</span>videos</div>
              <div><span className="text-foreground font-semibold text-2xl block">312</span>active creators</div>
              <div><span className="text-foreground font-semibold text-2xl block">4.8M</span>views</div>
              <div><span className="text-foreground font-semibold text-2xl block">8</span>focused categories</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container py-20">
        <div className="max-w-2xl mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">What you get</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold">A platform built for one job: helping you get a better dev role.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={f.title} className="relative bg-gradient-card border border-border/60 rounded-2xl p-6 hover:border-primary/40 transition-colors animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center mb-4">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROMOTED */}
      <section className="container py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Promoted this week</p>
            <h2 className="text-3xl font-display font-bold">Top videos for developers</h2>
          </div>
          <Button asChild variant="ghost"><Link to="/videos">Browse all <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {promoted.map((v) => <VideoCard key={v.id} video={v} />)}
        </div>
      </section>

      {/* CREATORS */}
      <section className="container py-20">
        <div className="max-w-2xl mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Trusted creators</p>
          <h2 className="text-3xl font-display font-bold">Learn from people who actually shipped, hired, or got hired.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCreators.map((c) => (
            <div key={c.id} className="bg-gradient-card border border-border/60 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-mono font-bold">
                  {c.avatar}
                </div>
                <div>
                  <p className="font-display font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{c.handle}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">{c.bio}</p>
              <div className="mt-4 flex items-center justify-between text-xs font-mono">
                <Badge variant="outline" className="border-primary/40 text-primary">{c.plan}</Badge>
                <span className="text-muted-foreground"><Users className="h-3 w-3 inline mr-1" />{(c.followers/1000).toFixed(1)}k</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-card border border-border p-10 md:p-16">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="relative max-w-2xl">
            <Code2 className="h-10 w-10 text-primary mb-6" />
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              Stop watching generic career advice. Start watching what works for developers.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Join the platform built for one outcome: helping you get a better web developer job.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg"><Link to="/auth?mode=register">Create free account</Link></Button>
              <Button asChild variant="outline" size="lg"><Link to="/pricing">See creator plans <BarChart3 className="h-4 w-4" /></Link></Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
