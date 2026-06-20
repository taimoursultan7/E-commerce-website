import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../state/auth/AuthContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("Demo User");
  const [email, setEmail] = useState("demo@shopsphere.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
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
            <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Register to track orders, wishlist, and checkout faster.
            </p>
          </div>

          <form className="mt-6 space-y-3" onSubmit={onSubmit}>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Creating…" : "Create account"}
            </Button>
          </form>

          <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-sky-600 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
