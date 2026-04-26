import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Code2, Github, Linkedin, Mail, Target, Sparkles, Globe, Users } from "lucide-react";
import { FOUNDER, TEAM } from "@/data/founder";

const About = () => (
  <Layout>
    <section className="bg-hero border-b border-border/60">
      <div className="container py-16">
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">About</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold max-w-3xl">Why DevPath Hub exists</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          A focused career platform for web developers — not generic advice, not infinite content, not another social feed.
        </p>
      </div>
    </section>

    <section className="container py-14 grid lg:grid-cols-2 gap-10">
      <div className="bg-gradient-card border border-border/60 rounded-2xl p-8">
        <Target className="h-8 w-8 text-destructive mb-4" />
        <h2 className="font-display font-semibold text-2xl mb-3">The problem</h2>
        <p className="text-muted-foreground leading-relaxed">
          Web developers face stronger competition than ever. Most struggle with the same things: a portfolio that doesn't convert, a GitHub recruiters won't open, a LinkedIn that doesn't get replies, an interview process they were never trained for. Generic career advice doesn't translate to dev hiring — and learning platforms focus on syntax, not jobs.
        </p>
      </div>
      <div className="bg-gradient-card border border-border/60 rounded-2xl p-8">
        <Sparkles className="h-8 w-8 text-primary mb-4" />
        <h2 className="font-display font-semibold text-2xl mb-3">The solution</h2>
        <p className="text-muted-foreground leading-relaxed">
          DevPath Hub combines focused video content, real creator expertise, and practical career tools — all targeted at web developer roles. Filter by your goal, learn from people who've actually been hired or done the hiring, and apply what you learn the same week.
        </p>
      </div>
    </section>

    {/* Founder */}
    <section id="founder" className="container pb-16">
      <div className="bg-gradient-card border border-border rounded-3xl overflow-hidden">
        <div className="grid md:grid-cols-[320px,1fr]">
          <div className="relative bg-gradient-primary p-6 flex items-center justify-center">
            <div className="relative w-full max-w-[260px] aspect-square rounded-2xl overflow-hidden border-4 border-background/30 shadow-elegant">
              <img
                src={FOUNDER.image}
                alt={`${FOUNDER.name} — founder of DevPath Hub`}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <Badge className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/90 text-foreground border-0">
              Founder
            </Badge>
          </div>
          <div className="p-8 md:p-10">
            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-2">Meet the founder</p>
            <h2 className="text-3xl font-display font-bold">{FOUNDER.name}</h2>
            <p className="text-muted-foreground font-mono text-sm mt-1">{FOUNDER.role}</p>
            <p className="mt-5 text-foreground/90 leading-relaxed">{FOUNDER.bio}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {FOUNDER.stack.map((t) => (
                <Badge key={t} variant="outline" className="border-border font-mono text-xs">{t}</Badge>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <a
                href={FOUNDER.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition-colors"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href={FOUNDER.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition-colors"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href={`mailto:${FOUNDER.email}`}
                className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition-colors"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
              <a
                href={FOUNDER.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition-colors"
              >
                <Globe className="h-4 w-4" /> Personal site
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="container pb-20">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Founding team</p>
          <h2 className="text-3xl font-display font-bold">A small team-built product prototype</h2>
          <p className="text-muted-foreground mt-2 max-w-xl">
            Started in December 2025. Lean by design — every contributor owns a real surface of the product.
          </p>
        </div>
        <Badge variant="outline" className="border-border font-mono text-xs">
          <Users className="h-3 w-3 mr-1.5" /> 4 contributors
        </Badge>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TEAM.map((m) => (
          <div key={m.name} className="bg-gradient-card border border-border/60 rounded-2xl p-5 hover:border-primary/40 transition-colors">
            <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${m.accent} grid place-items-center font-mono font-bold text-lg border border-border/60`}>
              {m.initials}
            </div>
            <p className="mt-4 font-display font-semibold">{m.name}</p>
            <p className="text-xs font-mono text-primary mt-0.5">{m.role}</p>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{m.blurb}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center text-sm text-muted-foreground font-mono">
        <Code2 className="h-4 w-4 inline mr-1" />
        Team-built product prototype · December 2025
      </div>
    </section>
  </Layout>
);

export default About;
