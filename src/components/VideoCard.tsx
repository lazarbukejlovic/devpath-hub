import { Link } from "react-router-dom";
import { Bookmark, Play, Sparkles, Eye, Clock } from "lucide-react";
import { Video } from "@/types";
import { creators } from "@/data/mock";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSavedVideos } from "@/hooks/useSavedVideos";
import { formatViews } from "@/utils/format";
import { cn } from "@/lib/utils";

export const VideoCard = ({ video }: { video: Video }) => {
  const creator = creators.find((c) => c.id === video.creatorId);
  const { isSaved, toggle } = useSavedVideos();
  const saved = isSaved(video.id);

  return (
    <article className="group relative bg-gradient-card border border-border/60 rounded-2xl overflow-hidden shadow-card hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
      <Link to={`/videos/${video.id}`} className="block">
        <div className={cn("relative aspect-video bg-gradient-to-br grid-bg", video.thumbnail)}>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            {video.promoted && (
              <Badge className="bg-primary/90 text-primary-foreground hover:bg-primary border-0 gap-1">
                <Sparkles className="h-3 w-3" /> Promoted
              </Badge>
            )}
            {video.premium && (
              <Badge variant="outline" className="border-primary/50 text-primary bg-background/60 backdrop-blur">
                Premium
              </Badge>
            )}
          </div>
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-background/80 backdrop-blur text-xs font-mono flex items-center gap-1">
            <Clock className="h-3 w-3" /> {video.duration}
          </div>
          <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="h-14 w-14 rounded-full bg-primary/90 grid place-items-center shadow-glow">
              <Play className="h-6 w-6 text-primary-foreground fill-current" />
            </div>
          </div>
        </div>
      </Link>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/videos/${video.id}`} className="font-display font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {video.title}
          </Link>
          <button
            onClick={() => toggle(video.id)}
            className={cn(
              "shrink-0 p-1.5 rounded-md transition-colors",
              saved ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
            aria-label="Save video"
          >
            <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
          </button>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-secondary grid place-items-center font-mono text-[10px] font-semibold">
              {creator?.avatar}
            </span>
            <span className="text-muted-foreground">{creator?.name}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground font-mono">
            <Eye className="h-3 w-3" /> {formatViews(video.views)}
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border/60">
          <Badge variant="secondary" className="font-normal text-[10px]">{video.category}</Badge>
          <Button asChild size="sm" variant="ghost" className="h-7 text-xs gap-1">
            <Link to={`/videos/${video.id}`}>Watch <Play className="h-3 w-3" /></Link>
          </Button>
        </div>
      </div>
    </article>
  );
};
