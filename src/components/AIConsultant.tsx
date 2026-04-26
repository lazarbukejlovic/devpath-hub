import { useState } from "react";
import { Bot, Send, X, Sparkles, Github, Linkedin, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FOUNDER } from "@/data/founder";

interface Msg {
  role: "bot" | "user";
  text: string;
  card?: "founder";
}

const QA: { match: RegExp; answer: string; card?: "founder" }[] = [
  {
    match: /(found(er|ed)|who built|who made|lazar|owner|creator of)/i,
    answer:
      "DevPath Hub was founded by Lazar Bukejlovic, a Full-Stack Engineer focused on practical web platforms — React, TypeScript, Node.js, APIs, auth, dashboards, and clean product UX. The platform was born from a real observation: web developers need more focused career support, not generic job advice.",
    card: "founder",
  },
  {
    match: /(contact|reach.*founder|email.*founder|message.*lazar)/i,
    answer:
      "You can reach the founder directly via the links below — email, LinkedIn, GitHub, or his personal website.",
    card: "founder",
  },
  {
    match: /(subscription|plan|pricing|boost|premium|cost|price|billing|annual|monthly)/i,
    answer:
      "Creators publish for free. Paid plans add visibility: Boosted Video (€9/mo · 1 promoted slot), Featured Creator (€19/mo · homepage feature + advanced analytics), Growth Partner (€39/mo · unlimited promoted videos + dedicated review). Annual billing saves ~20%. Viewers always watch for free.",
  },
  {
    match: /(publish|upload|new video|how.*video|post.*video)/i,
    answer:
      "Open the Creator Studio from the navbar → click 'Add new video' → fill in title, category, difficulty, target audience, and a video URL. Your upload appears in the feed instantly.",
  },
  {
    match: /(privacy|safe|account|data|secure|gdpr)/i,
    answer:
      "We only store the data needed to run your account and your learning list. Sign out at any time. In this prototype, account credentials and saved videos are kept locally in your browser — nothing is sent to a third-party server.",
  },
  {
    match: /(visibility|grow|reach|recommend|seen|promote)/i,
    answer:
      "Creators get more visibility through quality categories, consistent uploads, and optional Boosted/Featured plans that increase placement in the feed and on the homepage. Growth Partner unlocks unlimited promoted videos and a monthly review.",
  },
  {
    match: /(viewer|benefit|why.*use|learn|why devpath)/i,
    answer:
      "Viewers get focused, practical content for one job: getting better web developer roles. Filter by goal — find a job, improve portfolio, prepare interview, learn skill — to go straight to what helps you.",
  },
];

const SUGGESTIONS = [
  "Who is the founder?",
  "How does pricing work?",
  "How do I publish a video?",
  "How do I contact the founder?",
];

export const AIConsultant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: "Hi — I'm the DevPath assistant. Ask me about the platform, pricing, publishing, privacy, or the founder.",
    },
  ]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const match = QA.find((q) => q.match.test(text));
    const reply: Msg = match
      ? { role: "bot", text: match.answer, card: match.card }
      : {
          role: "bot",
          text: "Great question. I can help with subscriptions, publishing videos, creator visibility, account safety, founder info, or how viewers benefit — try a suggestion below.",
        };
    setMessages((m) => [...m, { role: "user", text }, reply]);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-primary text-primary-foreground shadow-glow grid place-items-center hover:scale-105 transition-transform animate-pulse-glow",
          open && "hidden"
        )}
        aria-label="Open assistant"
      >
        <Bot className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[min(92vw,380px)] h-[600px] bg-card border border-border rounded-2xl shadow-elegant flex flex-col overflow-hidden animate-fade-up">
          <header className="px-4 py-3 border-b border-border flex items-center justify-between bg-gradient-card">
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </span>
              <div>
                <p className="text-sm font-display font-semibold leading-none">DevPath Assistant</p>
                <p className="text-[10px] font-mono text-muted-foreground mt-0.5">predefined Q&A · v1</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </header>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex flex-col", m.role === "user" ? "items-end" : "items-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-foreground rounded-bl-sm"
                  )}
                >
                  {m.text}
                </div>
                {m.card === "founder" && (
                  <div className="mt-2 max-w-[90%] w-full rounded-2xl border border-border bg-gradient-card overflow-hidden">
                    <div className="flex gap-3 p-3">
                      <img
                        src={FOUNDER.image}
                        alt={FOUNDER.name}
                        className="h-14 w-14 rounded-lg object-cover border border-border/60 shrink-0"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <p className="font-display font-semibold text-sm leading-tight">{FOUNDER.name}</p>
                        <p className="text-[11px] font-mono text-primary mt-0.5">{FOUNDER.role}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <a href={FOUNDER.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md border border-border hover:border-primary/50 hover:bg-secondary transition-colors">
                            <Github className="h-3 w-3" /> GitHub
                          </a>
                          <a href={FOUNDER.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md border border-border hover:border-primary/50 hover:bg-secondary transition-colors">
                            <Linkedin className="h-3 w-3" /> LinkedIn
                          </a>
                          <a href={`mailto:${FOUNDER.email}`} className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md border border-border hover:border-primary/50 hover:bg-secondary transition-colors">
                            <Mail className="h-3 w-3" /> Email
                          </a>
                          <a href={FOUNDER.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md border border-border hover:border-primary/50 hover:bg-secondary transition-colors">
                            <Globe className="h-3 w-3" /> Site
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {messages.length <= 1 && (
              <div className="pt-2 space-y-1.5">
                <p className="text-[10px] font-mono uppercase text-muted-foreground">Suggestions</p>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="block w-full text-left text-xs px-3 py-2 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-border p-3 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the platform…"
              className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button type="submit" size="icon" variant="hero" className="h-9 w-9">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};
