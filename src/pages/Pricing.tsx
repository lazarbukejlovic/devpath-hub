import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { plans } from "@/data/mock";
import { Check, Sparkles, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Plan } from "@/types";

const Pricing = () => {
  const [selected, setSelected] = useState<Plan | null>(null);
  const [done, setDone] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const priceFor = (p: Plan) => (billing === "monthly" ? p.monthly : p.annual);

  const comparison: { label: string; key: keyof Pick<Plan, "visibility" | "promotedSlots" | "analytics" | "creatorTools"> }[] = [
    { label: "Visibility", key: "visibility" },
    { label: "Promoted slots", key: "promotedSlots" },
    { label: "Analytics", key: "analytics" },
    { label: "Creator tools", key: "creatorTools" },
  ];

  return (
    <Layout>
      <section className="bg-hero border-b border-border/60">
        <div className="container py-16 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Creator plans</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold max-w-3xl mx-auto">
            Boost your video, your channel, or your whole presence
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Free for everyone. Optional paid plans for creators who want more visibility, priority placement, and advanced analytics.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-card p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-colors",
                billing === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2",
                billing === "annual" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Annual
              <span className={cn("text-[10px] font-mono px-1.5 py-0.5 rounded-full",
                billing === "annual" ? "bg-primary-foreground/20" : "bg-primary/15 text-primary"
              )}>−20%</span>
            </button>
          </div>
        </div>
      </section>

      <section className="container py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((p) => {
            const price = priceFor(p);
            return (
              <div
                key={p.id}
                className={cn(
                  "relative rounded-2xl border p-6 flex flex-col bg-gradient-card transition-all",
                  p.highlighted ? "border-primary shadow-glow" : "border-border/60 hover:border-primary/40"
                )}
              >
                {p.highlighted && (
                  <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-primary border-0 gap-1">
                    <Sparkles className="h-3 w-3" /> Most popular
                  </Badge>
                )}
                <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{p.tagline}</p>
                <h3 className="mt-1 text-xl font-display font-bold">{p.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-display font-bold">€{price}</span>
                  <span className="text-muted-foreground text-sm">{price ? "/mo" : ""}</span>
                  {billing === "annual" && p.monthly > 0 && (
                    <p className="text-[11px] font-mono text-muted-foreground mt-1">
                      billed €{price * 12}/year
                    </p>
                  )}
                </div>
                <ul className="mt-6 space-y-2.5 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={p.highlighted ? "hero" : "outline"}
                  className="mt-6 w-full"
                  onClick={() => setSelected(p)}
                >
                  {p.monthly === 0 ? "Start free" : "Choose plan"}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Comparison table */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Compare plans</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold">Every difference, side by side</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-border/60 bg-gradient-card">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="text-left p-4 font-mono text-xs uppercase text-muted-foreground w-1/4">Feature</th>
                  {plans.map((p) => (
                    <th key={p.id} className={cn("text-left p-4 font-display font-semibold", p.highlighted && "text-primary")}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/40">
                  <td className="p-4 font-mono text-xs uppercase text-muted-foreground">Price</td>
                  {plans.map((p) => (
                    <td key={p.id} className="p-4 font-display font-semibold">
                      €{priceFor(p)}<span className="text-muted-foreground font-normal text-xs">{priceFor(p) ? "/mo" : ""}</span>
                    </td>
                  ))}
                </tr>
                {comparison.map((row) => (
                  <tr key={row.key} className="border-b border-border/40 last:border-0">
                    <td className="p-4 font-mono text-xs uppercase text-muted-foreground">{row.label}</td>
                    {plans.map((p) => (
                      <td key={p.id} className="p-4 text-foreground/90">{p[row.key]}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="p-4 font-mono text-xs uppercase text-muted-foreground">Promoted badge</td>
                  {plans.map((p) => (
                    <td key={p.id} className="p-4">
                      {p.id === "free" ? <Minus className="h-4 w-4 text-muted-foreground" /> : <Check className="h-4 w-4 text-primary" />}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-8 text-center text-xs font-mono text-muted-foreground">
          Mock checkout · no real payment is processed
        </p>
      </section>

      {/* Checkout modal */}
      {selected && !done && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur grid place-items-center p-4" onClick={() => setSelected(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-elegant animate-fade-up">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-mono uppercase text-muted-foreground">Confirm plan</p>
                <h3 className="font-display font-bold text-2xl mt-1">{selected.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  {billing === "annual" ? "Annual billing" : "Monthly billing"}
                </p>
              </div>
              <button onClick={() => setSelected(null)}><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-6 bg-secondary/50 rounded-xl p-4 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {billing === "annual" && selected.monthly > 0 ? "Total today" : "Total today"}
              </span>
              <span className="text-2xl font-display font-bold">
                €{billing === "annual" ? priceFor(selected) * 12 : priceFor(selected)}
                {priceFor(selected) ? (billing === "annual" ? "/yr" : "/mo") : ""}
              </span>
            </div>
            <ul className="mt-4 space-y-2">
              {selected.features.slice(0, 4).map((f) => (
                <li key={f} className="text-sm flex gap-2"><Check className="h-4 w-4 text-primary mt-0.5" />{f}</li>
              ))}
            </ul>
            <Button variant="hero" className="mt-6 w-full" onClick={() => setDone(true)}>
              Confirm — simulated checkout
            </Button>
          </div>
        </div>
      )}

      {done && selected && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur grid place-items-center p-4">
          <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-elegant text-center animate-fade-up">
            <div className="h-14 w-14 rounded-full bg-primary mx-auto grid place-items-center shadow-glow">
              <Check className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3 className="mt-5 font-display font-bold text-2xl">You're on {selected.name}</h3>
            <p className="mt-2 text-muted-foreground">Simulated success. In production this would activate your subscription and unlock the plan benefits.</p>
            <Button variant="hero" className="mt-6 w-full" onClick={() => { setDone(false); setSelected(null); }}>
              Back to platform
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Pricing;
