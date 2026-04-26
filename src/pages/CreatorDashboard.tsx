import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Video, Category, Difficulty, ContentGoal } from "@/types";
import { categories } from "@/data/mock";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { Eye, Bookmark, TrendingUp, UserCircle2, Plus, Trash2, Sparkles } from "lucide-react";
import { toast } from "sonner";

const thumbs = [
  "from-emerald-500/30 to-blue-500/20",
  "from-purple-500/30 to-pink-500/20",
  "from-blue-500/30 to-cyan-500/20",
  "from-orange-500/30 to-red-500/20",
];

const CreatorDashboard = () => {
  const { user } = useAuth();
  const [list, setList] = useLocalStorage<Video[]>("devpath.creator.videos", []);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "Job Search" as Category,
    description: "",
    audience: "Junior developers",
    difficulty: "Beginner" as Difficulty,
    goal: "Find a Job" as ContentGoal,
    videoUrl: "",
    thumbnail: "",
    duration: "12:00",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description) return toast.error("Title and description are required.");
    const v: Video = {
      id: "uv_" + Date.now(),
      title: form.title,
      creatorId: "c1",
      category: form.category,
      description: form.description,
      outcomes: [`Tailored for ${form.audience}`, "Concrete, actionable steps", "Real-world examples"],
      difficulty: form.difficulty,
      goal: form.goal,
      views: 0,
      duration: form.duration,
      thumbnail: thumbs[list.length % thumbs.length],
      videoUrl: form.videoUrl,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setList([v, ...list]);
    setOpen(false);
    setForm({ ...form, title: "", description: "", videoUrl: "", thumbnail: "" });
    toast.success("Video published to your channel.");
  };

  const remove = (id: string) => setList(list.filter((v) => v.id !== id));

  const totalViews = list.reduce((sum, v) => sum + v.views, 0) + 12480;
  const stats = [
    { icon: Eye, label: "Views (30d)", value: totalViews.toLocaleString(), trend: "+18%" },
    { icon: Bookmark, label: "Saves", value: "1,204", trend: "+9%" },
    { icon: TrendingUp, label: "Engagement", value: "62%", trend: "+4%" },
    { icon: UserCircle2, label: "Profile visits", value: "3,840", trend: "+22%" },
    { icon: Sparkles, label: "Promoted conversion", value: "11.4%", trend: "+2.1%" },
  ];

  return (
    <Layout>
      <section className="border-b border-border/60 bg-hero">
        <div className="container py-12">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Creator studio</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                {user ? `Welcome back, ${user.name}` : "Creator dashboard"}
              </h1>
              <p className="mt-2 text-muted-foreground max-w-xl">Publish, track and grow your video presence on DevPath Hub.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild><Link to="/pricing">Upgrade plan</Link></Button>
              <Button variant="hero" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> New video</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-gradient-card border border-border/60 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="h-8 w-8 rounded-lg bg-primary/10 text-primary grid place-items-center"><s.icon className="h-4 w-4" /></span>
                <Badge variant="outline" className="border-success/40 text-success text-[10px] font-mono">{s.trend}</Badge>
              </div>
              <p className="text-2xl font-display font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1 font-mono uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="font-display font-semibold text-xl mb-4">Your videos</h2>
          {list.length === 0 ? (
            <div className="bg-gradient-card border border-dashed border-border rounded-2xl p-12 text-center">
              <p className="text-muted-foreground mb-4">You haven't published any videos yet.</p>
              <Button variant="hero" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Publish your first video</Button>
            </div>
          ) : (
            <div className="bg-gradient-card border border-border/60 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="text-left p-4">Title</th>
                    <th className="text-left p-4 hidden md:table-cell">Category</th>
                    <th className="text-left p-4 hidden md:table-cell">Difficulty</th>
                    <th className="text-left p-4">Views</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((v) => (
                    <tr key={v.id} className="border-t border-border/40">
                      <td className="p-4 font-medium">
                        <Link to={`/videos/${v.id}`} className="hover:text-primary">{v.title}</Link>
                      </td>
                      <td className="p-4 hidden md:table-cell text-muted-foreground">{v.category}</td>
                      <td className="p-4 hidden md:table-cell text-muted-foreground">{v.difficulty}</td>
                      <td className="p-4 font-mono">{v.views}</td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="icon" onClick={() => remove(v.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur grid place-items-center p-4" onClick={() => setOpen(false)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={submit} className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-elegant p-6 space-y-4 animate-fade-up">
            <div>
              <h3 className="font-display font-bold text-xl">Publish a new video</h3>
              <p className="text-sm text-muted-foreground">Fill the details below. You can edit later.</p>
            </div>
            <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <div className="grid md:grid-cols-2 gap-3">
              <select className="bg-secondary rounded-md px-3 h-10 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Category })}>
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
              <select className="bg-secondary rounded-md px-3 h-10 text-sm" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value as Difficulty })}>
                <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
              </select>
              <select className="bg-secondary rounded-md px-3 h-10 text-sm" value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value as ContentGoal })}>
                <option>Find a Job</option><option>Improve Portfolio</option><option>Prepare Interview</option><option>Learn Skill</option>
              </select>
              <Input placeholder="Target audience" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} />
              <Input placeholder="Video URL (https://…)" value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} />
              <Input placeholder="Duration (mm:ss)" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
            </div>
            <Textarea placeholder="Short description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" variant="hero">Publish</Button>
            </div>
          </form>
        </div>
      )}
    </Layout>
  );
};

export default CreatorDashboard;
