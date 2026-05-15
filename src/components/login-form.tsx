"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { User, ShieldCheck, Mail, Lock, LogIn, Chrome, Store } from "lucide-react";
import toast from "react-hot-toast";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e?: React.FormEvent, customEmail?: string, customPassword?: string) => {
    if (e) e.preventDefault();

    const loginEmail = customEmail || email;
    const loginPassword = customPassword || password;

    setLoading(true);
    try {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        credentials: "include",
      });

      const text = await res.text();
      if (!text) {
        toast.error("Server returned empty response. Is the backend running?");
        return;
      }
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        toast.error("Server returned invalid response. Check if backend is running on the correct port.");
        return;
      }

      if (result.success) {
        toast.success(`Welcome back, ${result.data.user.name}!`);
        login(result.data.accessToken, result.data.user);
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role: 'user' | 'admin' | 'provider') => {
    let demoEmail = 'user@gmail.com';
    let demoPassword = 'user@gmail.com';

    if (role === 'admin') {
      demoEmail = 'admin@gmail.com';
      demoPassword = 'admin@gmail.com';
    } else if (role === 'provider') {
      demoEmail = 'provider@gmail.com';
      demoPassword = 'provider@gmail.com';
    }

    setEmail(demoEmail);
    setPassword(demoPassword);
    handleLogin(undefined, demoEmail, demoPassword);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-8 items-center justify-center min-h-[80vh] w-full",
        className
      )}
      {...props}
    >
      <Card className="w-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[2rem] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-pink-500/10 pointer-events-none" />

        <CardHeader className="p-6 text-center relative z-10">
          <div className="mx-auto w-12 h-12 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-orange-500/20 rotate-3 hover:rotate-0 transition-transform duration-300">
            <LogIn className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-3xl font-black tracking-tight text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-400 mt-1.5 text-xs text-balance">
            Access the most premium food experience in town.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 pt-0 relative z-10">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-200 ml-1 flex items-center gap-2" htmlFor="email">
                  <Mail className="w-4 h-4 text-orange-400" /> Email Address
                </label>
                <div className="relative group">
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all pl-4"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-semibold text-gray-200 flex items-center gap-2" htmlFor="password">
                    <Lock className="w-4 h-4 text-orange-400" /> Password
                  </label>
                  <a href="#" className="text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors">
                    Forgot Password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all pl-4"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <Button
                type="submit"
                className="h-11 text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-all active:scale-[0.98]"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="relative my-1">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                  <span className="bg-transparent px-2 text-gray-500 font-medium tracking-widest">Or</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="h-11 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all rounded-xl flex items-center gap-2 text-sm"
                onClick={() => {
                  toast("Google Login is coming soon with our new system!");
                }}
              >
                <Chrome className="w-4 h-4" /> Google
              </Button>
            </div>
          </form>

          {/* Demo Login Section */}
          <div className="mt-6 p-4 rounded-2xl bg-orange-500/5 border border-orange-500/10">
            <p className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em] text-center mb-3 opacity-80">Quick Access Demo</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleDemoLogin('user')}
                className="flex flex-col items-center justify-center gap-1.5 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <User className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-[10px] font-bold text-white">User</span>
              </button>

              <button
                onClick={() => handleDemoLogin('provider')}
                className="flex flex-col items-center justify-center gap-1.5 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Store className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-[10px] font-bold text-white">Provider</span>
              </button>

              <button
                onClick={() => handleDemoLogin('admin')}
                className="flex flex-col items-center justify-center gap-1.5 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-[10px] font-bold text-white">Admin</span>
              </button>
            </div>
          </div>

          <p className="text-center text-gray-500 mt-6 text-xs">
            New to FoodHub?{" "}
            <Link href="/signup" className="text-orange-400 font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}