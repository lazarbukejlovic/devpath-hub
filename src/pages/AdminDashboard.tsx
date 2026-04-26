import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { adminMetrics, videos, creators } from "@/data/mock";
import { Video, Users, Crown, Eye, TrendingUp, Sparkles, Activity } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";

const AdminDashboard = () => {
  const promotedVideos = videos.filter((v) => v.promoted);
  const stats = [
    { icon: Video, label: "Total videos", value: adminMetrics.totalVideos.toLocaleString() },
    { icon: Users, label: "Active creators", value: adminMetrics.activeCreators.toString() },
    { icon: Crown, label: "Premium creators", value: adminMetrics.premiumCreators.toString() },
    { icon: Eye, label: "Total views", value: (adminMetrics.totalViews / 1_000_000).toFixed(2) + "M" },
    { icon: TrendingUp, label: "Monthly growth", value: "+" + adminMetrics.monthlyGrowth + "%" },
    { icon: Sparkles, label: "Free → Premium", value: adminMetrics.conversionRate + "%" },
  ];

  return (
    <Layout>
      <section className="bg-hero border-b border-border/60">
        <div className="container py-12">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Internal · admin</p>
          <h1 className="text-3xl md:text-4xl font-display font-bold">Platform metrics</h1>
          <p className="mt-2 text-muted-foreground">Real-time view of platform health, content, and creator economy.</p>
        </div>
      </section>

      <section className="container py-10 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-gradient-card border border-border/60 rounded-2xl p-5">
              <span className="h-8 w-8 rounded-lg bg-primary/10 text-primary grid place-items-center mb-3">
                <s.icon className="h-4 w-4" />
              </span>
              <p className="text-2xl font-display font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1 font-mono uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-gradient-card border border-border/60 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold">Engagement & views</h3>
                <p className="text-xs text-muted-foreground font-mono">Last 6 months</p>
              </div>
              <Badge variant="outline" className="border-success/40 text-success font-mono">+24% MoM</Badge>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={adminMetrics.engagement}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", fontSize: "12px" }}
                  cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1, strokeDasharray: "4 4" }}
                />
                <Line type="monotone" dataKey="views" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
                <Line type="monotone" dataKey="engagement" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: "hsl(var(--accent))", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gradient-card border border-border/60 rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-1">Top categories</h3>
            <p className="text-xs text-muted-foreground font-mono mb-4">Share of total views</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={adminMetrics.topCategories} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} width={140} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", fontSize: "12px" }} cursor={{ fill: "hsl(var(--secondary))" }} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-gradient-card border border-border/60 rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Most promoted videos</h3>
            <div className="space-y-3">
              {promotedVideos.map((v) => (
                <div key={v.id} className="flex items-center justify-between gap-3 py-2 border-b border-border/40 last:border-0">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{v.title}</p>
                    <p className="text-xs text-muted-foreground font-mono">{v.category}</p>
                  </div>
                  <span className="text-sm font-mono">{(v.views / 1000).toFixed(1)}k</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-card border border-border/60 rounded-2xl p-6">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Activity className="h-4 w-4 text-primary" /> Top creators</h3>
            <div className="space-y-3">
              {[...creators].sort((a, b) => b.followers - a.followers).slice(0, 5).map((c) => (
                <div key={c.id} className="flex items-center gap-3 py-2 border-b border-border/40 last:border-0">
                  <div className="h-8 w-8 rounded-full bg-secondary grid place-items-center font-mono text-[11px] font-semibold">{c.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{c.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{c.handle} · {c.plan}</p>
                  </div>
                  <span className="text-sm font-mono">{(c.followers / 1000).toFixed(1)}k</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
