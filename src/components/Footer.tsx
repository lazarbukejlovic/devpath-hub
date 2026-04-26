import { Code2 } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="border-t border-border/60 mt-24">
    <div className="container py-12 grid gap-8 md:grid-cols-5">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
            <Code2 className="h-4 w-4" />
          </span>
          DevPath <span className="text-primary">Hub</span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground max-w-sm">
          Focused career growth for web developers. Practical video content for job search, portfolios, GitHub, LinkedIn, interviews, and real-world engineering.
        </p>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-3 text-sm">Platform</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/videos" className="hover:text-foreground">Videos</Link></li>
          <li><Link to="/creator" className="hover:text-foreground">Creator Studio</Link></li>
          <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
          <li><Link to="/admin" className="hover:text-foreground">Metrics</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-3 text-sm">Company</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/about" className="hover:text-foreground">About</Link></li>
          <li><Link to="/about#founder" className="hover:text-foreground">Founder</Link></li>
          <li><Link to="/auth" className="hover:text-foreground">Sign in</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-display font-semibold mb-3 text-sm">Legal</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
          <li><Link to="/terms" className="hover:text-foreground">Terms of Service</Link></li>
          <li><Link to="/creator-guidelines" className="hover:text-foreground">Creator Guidelines</Link></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border/60">
      <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} DevPath Hub. Built for developers, by developers.</span>
        <span className="font-mono">v1.0 · prototype build</span>
      </div>
    </div>
  </footer>
);
