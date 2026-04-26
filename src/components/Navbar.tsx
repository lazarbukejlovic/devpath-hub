import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Code2, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/videos", label: "Videos" },
  { to: "/creator", label: "Creator Studio" },
  { to: "/pricing", label: "Pricing" },
  { to: "/admin", label: "Metrics" },
  { to: "/about", label: "About" },
];

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
            <Code2 className="h-4 w-4" />
          </span>
          DevPath <span className="text-primary">Hub</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive ? "text-foreground bg-secondary" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              <span className="text-xs font-mono text-muted-foreground">{user.role} · {user.name}</span>
              <Button variant="ghost" size="sm" onClick={logout}>Sign out</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild><Link to="/auth">Sign in</Link></Button>
              <Button variant="hero" size="sm" asChild><Link to="/auth?mode=register">Get started</Link></Button>
            </>
          )}
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="container py-3 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2 text-sm text-muted-foreground">
                {l.label}
              </NavLink>
            ))}
            {!user && <Link to="/auth" onClick={() => setOpen(false)} className="py-2 text-sm text-primary">Sign in</Link>}
          </div>
        </div>
      )}
    </header>
  );
};
