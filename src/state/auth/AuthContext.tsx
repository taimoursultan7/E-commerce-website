import { createContext, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";

export type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

const LS_KEY = "shopsphere_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  });

  const login = async (email: string, _password: string) => {
    await sleep(650);
    const fakeUser: User = {
      id: "u_" + Math.random().toString(16).slice(2),
      name: email.split("@")[0].replace(/\W+/g, " ").trim() || "Customer",
      email,
    };
    setUser(fakeUser);
    localStorage.setItem(LS_KEY, JSON.stringify(fakeUser));
    toast.success("Welcome back! You're signed in.");
  };

  const register = async (name: string, email: string, _password: string) => {
    await sleep(800);
    const newUser: User = { id: "u_" + Date.now(), name, email };
    setUser(newUser);
    localStorage.setItem(LS_KEY, JSON.stringify(newUser));
    toast.success("Account created successfully.");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LS_KEY);
    toast("Signed out.");
  };

  const value = useMemo(() => ({ user, login, register, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
