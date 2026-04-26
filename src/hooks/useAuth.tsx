import { createContext, ReactNode, useContext, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { StoredAccount, User } from "@/types";

interface AuthCtx {
  user: User | null;
  register: (
    email: string,
    password: string,
    role: "viewer" | "creator",
    name?: string
  ) => { ok: true } | { ok: false; error: string };
  login: (
    email: string,
    password: string
  ) => { ok: true } | { ok: false; error: string };
  loginDemo: (role: "viewer" | "creator") => void;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

// Lightweight non-cryptographic hash. This is a prototype — passwords stay
// in the browser. We never store the raw password.
function hash(input: string): string {
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = ((h << 5) + h) ^ input.charCodeAt(i);
  }
  return "h_" + (h >>> 0).toString(36) + "_" + input.length;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorage<User | null>("devpath.user", null);
  const [accounts, setAccounts] = useLocalStorage<StoredAccount[]>(
    "devpath.accounts",
    []
  );

  useEffect(() => {
    if (!user) return;
    if (user.demo) return;
    const account = accounts.find((a) => a.id === user.id && a.email === user.email);
    if (!account || account.passwordHash !== user.sessionHash) {
      setUser(null);
    }
  }, [accounts, setUser, user]);

  const register: AuthCtx["register"] = (email, password, role, name) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) return { ok: false, error: "Email and password are required." };
    if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
    if (accounts.some((a) => a.email === cleanEmail)) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const account: StoredAccount = {
      id: "u_" + Math.random().toString(36).slice(2, 10),
      email: cleanEmail,
      passwordHash: hash(password),
      name: name?.trim() || cleanEmail.split("@")[0],
      role,
    };
    setAccounts([...accounts, account]);
    setUser({ id: account.id, email: account.email, name: account.name, role: account.role, plan: "Free", sessionHash: account.passwordHash });
    return { ok: true };
  };

  const login: AuthCtx["login"] = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const account = accounts.find((a) => a.email === cleanEmail);
    if (!account) return { ok: false, error: "No account found with this email." };
    if (account.passwordHash !== hash(password)) {
      return { ok: false, error: "Incorrect password." };
    }
    setUser({ id: account.id, email: account.email, name: account.name, role: account.role, plan: "Free", sessionHash: account.passwordHash });
    return { ok: true };
  };

  const loginDemo: AuthCtx["loginDemo"] = (role) => {
    setUser({
      id: "demo_" + role,
      email: role === "creator" ? "demo.creator@devpath.local" : "demo.viewer@devpath.local",
      name: role === "creator" ? "Demo Creator" : "Demo Viewer",
      role,
      plan: "Free",
      demo: true,
    });
  };

  const logout = () => setUser(null);

  return (
    <Ctx.Provider value={{ user, register, login, loginDemo, logout }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
};
