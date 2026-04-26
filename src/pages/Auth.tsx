import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code2, User, Sparkles, AlertCircle, PlayCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";

const Auth = () => {
  const { login, register, loginDemo } = useAuth();
  const nav = useNavigate();
  const [params] = useSearchParams();
  const [mode, setMode] = useState<"login" | "register">(
    params.get("mode") === "register" ? "register" : "login"
  );
  const [role, setRole] = useState<"viewer" | "creator">("viewer");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result =
      mode === "login" ? login(email, pwd) : register(email, pwd, role, name);
    if (result.ok !== true) {
      setError(result.error);
      return;
    }
    const dest = mode === "register" && role === "creator" ? "/creator" : "/videos";
    nav(dest);
  };

  const demo = (r: "viewer" | "creator") => {
    loginDemo(r);
    nav(r === "creator" ? "/creator" : "/videos");
  };

  return (
    <Layout>
      <section className="container py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
            {mode === "login" ? "Sign in" : "Create account"}
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight">
            {mode === "login" ? "Welcome back to DevPath Hub" : "Join DevPath Hub"}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-md">
            {mode === "login"
              ? "Continue learning and growing your developer career."
              : "Pick a role to get started. You can switch later."}
          </p>

          {mode === "register" && (
            <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
              <button
                type="button"
                onClick={() => setRole("viewer")}
                className={cn(
                  "rounded-2xl border p-5 text-left transition-all",
                  role === "viewer"
                    ? "border-primary bg-primary/5 shadow-glow"
                    : "border-border hover:border-primary/40"
                )}
              >
                <User className="h-5 w-5 text-primary mb-3" />
                <p className="font-display font-semibold">Viewer</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Watch, save, and grow your skills.
                </p>
              </button>
              <button
                type="button"
                onClick={() => setRole("creator")}
                className={cn(
                  "rounded-2xl border p-5 text-left transition-all",
                  role === "creator"
                    ? "border-primary bg-primary/5 shadow-glow"
                    : "border-border hover:border-primary/40"
                )}
              >
                <Sparkles className="h-5 w-5 text-primary mb-3" />
                <p className="font-display font-semibold">Creator</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Publish videos and reach developers.
                </p>
              </button>
            </div>
          )}

          <div className="mt-8 max-w-md rounded-2xl border border-border/60 bg-secondary/30 p-5">
            <p className="text-xs font-mono uppercase text-muted-foreground mb-3">
              Try without registering
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => demo("viewer")}
              >
                <PlayCircle className="h-4 w-4" /> Demo viewer
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => demo("creator")}
              >
                <PlayCircle className="h-4 w-4" /> Demo creator
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-3 font-mono">
              Demo accounts are separate from real authentication.
            </p>
          </div>
        </div>

        <form
          onSubmit={submit}
          className="bg-gradient-card border border-border rounded-2xl p-8 max-w-md w-full justify-self-end"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary">
              <Code2 className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="font-display font-bold text-lg">
              DevPath <span className="text-primary">Hub</span>
            </span>
          </div>
          {mode === "register" && (
            <div className="mb-4">
              <label className="text-xs font-mono uppercase text-muted-foreground">
                Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Developer"
                className="mt-1"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="text-xs font-mono uppercase text-muted-foreground">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@dev.com"
              required
              className="mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="text-xs font-mono uppercase text-muted-foreground">
              Password
            </label>
            <Input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="mt-1"
            />
          </div>

          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" variant="hero" className="w-full">
            {mode === "login" ? "Sign in" : `Create ${role} account`}
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-4">
            {mode === "login" ? "New here? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError(null);
              }}
              className="text-primary hover:underline"
            >
              {mode === "login" ? "Create one" : "Sign in"}
            </button>
          </p>
          <p className="text-[10px] text-center text-muted-foreground mt-3 font-mono">
            Local prototype auth · credentials stored in your browser only
          </p>
        </form>
      </section>
    </Layout>
  );
};

export default Auth;
