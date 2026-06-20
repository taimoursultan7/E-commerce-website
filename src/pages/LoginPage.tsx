import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../state/auth/AuthContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("taimoursultan07@gmail.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Sign in to access your dashboard and order history.
            </p>
          </div>

          <form className="mt-6 space-y-3" onSubmit={onSubmit}>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            No account?{" "}
            <Link to="/register" className="font-semibold text-sky-600 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
