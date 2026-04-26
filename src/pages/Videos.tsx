import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Layout } from "@/components/Layout";
import { VideoCard } from "@/components/VideoCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { categories, videos } from "@/data/mock";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Video, ContentGoal, Difficulty } from "@/types";
import { cn } from "@/lib/utils";

const difficulties: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];
const goals: ContentGoal[] = ["Find a Job", "Improve Portfolio", "Prepare Interview", "Learn Skill"];

const VideosPage = () => {
  const [userVideos] = useLocalStorage<Video[]>("devpath.creator.videos", []);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [diff, setDiff] = useState<string>("All");
  const [goal, setGoal] = useState<string>("All");

  const all = useMemo(() => [...userVideos, ...videos], [userVideos]);

  const filtered = useMemo(() => {
    return all.filter((v) => {
      if (q && !`${v.title} ${v.description} ${v.category}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (cat !== "All" && v.category !== cat) return false;
      if (diff !== "All" && v.difficulty !== diff) return false;
      if (goal !== "All" && v.goal !== goal) return false;
      return true;
    });
  }, [all, q, cat, diff, goal]);

  return (
    <Layout>
      <section className="border-b border-border/60 bg-hero">
        <div className="container py-16">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Video feed</p>
          <h1 className="text-4xl md:text-5xl font-display font-bold">Browse practical content for devs</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">Search, filter by category, difficulty, or your specific career goal.</p>

          <div className="mt-8 relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by topic, title, or category…"
              className="pl-9 h-12 bg-card border-border"
            />
          </div>
        </div>
      </section>

      <section className="container py-10 space-y-6">
        <FilterRow label="Category" value={cat} onChange={setCat} options={["All", ...categories]} />
        <FilterRow label="Difficulty" value={diff} onChange={setDiff} options={["All", ...difficulties]} />
        <FilterRow label="Goal" value={goal} onChange={setGoal} options={["All", ...goals]} />

        <div className="flex items-center justify-between pt-2">
          <p className="text-sm text-muted-foreground font-mono">{filtered.length} videos</p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No videos match those filters.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((v) => <VideoCard key={v.id} video={v} />)}
          </div>
        )}
      </section>
    </Layout>
  );
};

const FilterRow = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
  <div>
    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">{label}</p>
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs border transition-colors",
            value === o
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  </div>
);

export default VideosPage;
