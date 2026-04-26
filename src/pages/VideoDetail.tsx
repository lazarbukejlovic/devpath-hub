import { useParams, Link } from "react-router-dom";
import { Bookmark, Eye, Clock, Sparkles, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { VideoCard } from "@/components/VideoCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { videos, creators, comments as initialComments } from "@/data/mock";
import { useSavedVideos } from "@/hooks/useSavedVideos";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { formatViews } from "@/utils/format";
import { Video, Comment } from "@/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

const VideoDetail = () => {
  const { id } = useParams();
  const [userVideos] = useLocalStorage<Video[]>("devpath.creator.videos", []);
  const all = [...userVideos, ...videos];
  const video = all.find((v) => v.id === id);
  const { isSaved, toggle } = useSavedVideos();
  const [allComments, setAllComments] = useLocalStorage<Comment[]>("devpath.comments", initialComments);
  const [text, setText] = useState("");

  if (!video) {
    return (
      <Layout>
        <div className="container py-32 text-center">
          <h1 className="text-3xl font-display font-bold">Video not found</h1>
          <Button asChild variant="ghost" className="mt-4"><Link to="/videos"><ArrowLeft className="h-4 w-4" /> Back to videos</Link></Button>
        </div>
      </Layout>
    );
  }

  const creator = creators.find((c) => c.id === video.creatorId);
  const related = all.filter((v) => v.id !== video.id && v.category === video.category).slice(0, 3);
  const fallbackRelated = all.filter((v) => v.id !== video.id).slice(0, 3);
  const relatedToShow = related.length ? related : fallbackRelated;
  const videoComments = allComments.filter((c) => c.videoId === video.id);
  const saved = isSaved(video.id);

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setAllComments([
      { id: "k_" + Date.now(), videoId: video.id, author: "You", avatar: "YO", text, createdAt: "just now" },
      ...allComments,
    ]);
    setText("");
  };

  return (
    <Layout>
      <div className="container py-8">
        <Link to="/videos" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mb-6">
          <ArrowLeft className="h-3 w-3" /> All videos
        </Link>

        <div className="grid lg:grid-cols-[1fr,360px] gap-8">
          <div>
            {/* Player area */}
            {video.embedId ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-black shadow-elegant">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${video.embedId}?rel=0&modestbranding=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className={cn("relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br grid-bg border border-border", video.thumbnail)}>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="h-20 w-20 rounded-full bg-primary/90 grid place-items-center shadow-glow cursor-pointer hover:scale-105 transition-transform">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary-foreground ml-1">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded bg-background/80 backdrop-blur text-xs font-mono flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {video.duration}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{video.category}</Badge>
              <Badge variant="outline" className="border-border">{video.difficulty}</Badge>
              <Badge variant="outline" className="border-border">{video.goal}</Badge>
              {video.promoted && <Badge className="bg-primary/90 border-0 gap-1"><Sparkles className="h-3 w-3" />Promoted</Badge>}
              {video.premium && <Badge variant="outline" className="border-primary/50 text-primary">Premium</Badge>}
              <Badge variant="outline" className="border-border font-mono text-xs ml-auto">
                <Clock className="h-3 w-3 mr-1" /> {video.duration}
              </Badge>
            </div>

            <h1 className="mt-3 text-3xl md:text-4xl font-display font-bold">{video.title}</h1>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground font-mono font-bold">
                  {creator?.avatar}
                </div>
                <div>
                  <p className="font-display font-semibold">{creator?.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{creator?.handle} · {((creator?.followers || 0) / 1000).toFixed(1)}k followers</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-mono flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" /> {formatViews(video.views)} views
                </span>
                <Button variant={saved ? "default" : "outline"} size="sm" onClick={() => toggle(video.id)} className="gap-1.5">
                  <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
                  {saved ? "Saved" : "Save to list"}
                </Button>
              </div>
            </div>

            <div className="mt-6 bg-gradient-card border border-border/60 rounded-2xl p-6">
              <h3 className="font-display font-semibold mb-2">About this video</h3>
              <p className="text-muted-foreground leading-relaxed">{video.description}</p>

              <h3 className="font-display font-semibold mt-6 mb-3">What you'll learn</h3>
              <ul className="space-y-2">
                {video.outcomes.map((o) => (
                  <li key={o} className="flex gap-2 text-sm">
                    <span className="text-primary mt-0.5">→</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Comments */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-xl">Discussion</h3>
                <span className="text-xs font-mono text-muted-foreground">{videoComments.length} {videoComments.length === 1 ? "comment" : "comments"}</span>
              </div>
              <form onSubmit={submitComment} className="flex gap-2 mb-6">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share your take…"
                  className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button type="submit" variant="hero">Post</Button>
              </form>
              <div className="space-y-4">
                {videoComments.length === 0 && (
                  <p className="text-sm text-muted-foreground">Be the first to start the discussion.</p>
                )}
                {videoComments.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <div className="h-9 w-9 shrink-0 rounded-full bg-secondary grid place-items-center font-mono text-xs font-semibold">{c.avatar}</div>
                    <div className="flex-1 bg-gradient-card border border-border/60 rounded-xl p-3">
                      <p className="text-xs font-mono text-muted-foreground mb-1">{c.author} · {c.createdAt}</p>
                      <p className="text-sm">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related */}
          <aside>
            <h3 className="font-display font-semibold mb-4">Related videos</h3>
            <div className="space-y-4">
              {relatedToShow.map((v) => <VideoCard key={v.id} video={v} />)}
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default VideoDetail;
