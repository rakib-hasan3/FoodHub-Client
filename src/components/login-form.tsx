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
import { authClient } from "../../auth-client";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await authClient.signIn.email(
      { email, password },
      {
        onRequest: () => setLoading(true),
        onSuccess: async (ctx) => {
          setLoading(false);
          const user = ctx.data.user;
          console.log("Current User Role:", user?.role);

          if (user?.role === "ADMIN" || user?.role === "admin") {
            window.location.replace("/admin/dashboard");
          } else if (user?.role === "PROVIDER" || user?.role === "provider") {
            window.location.replace("/provider/dashboard");
          } else {
            window.location.replace("/");
          }
        },
        onError: (ctx) => {
          setLoading(false);
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 items-center justify-center min-h-[80vh]",
        className
      )}
      {...props}
    >
      <Card className="w-full max-w-md rounded-3xl shadow-xl bg-white border border-orange-200">
        <CardHeader className="p-6 text-center">
          <CardTitle className="text-3xl font-extrabold text-gray-900">
            Login
          </CardTitle>
          <CardDescription className="text-gray-600 mt-1">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <FieldGroup>
              <Field>
                <FieldLabel className="py-1 text-base font-medium" htmlFor="email">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-orange-300 focus:ring-orange-400 focus:border-orange-400"
                />
              </Field>

              <Field className="pt-2">
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="text-sm text-orange-500 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-orange-300 focus:ring-orange-400 focus:border-orange-400"
                />
              </Field>

              <Field className="pt-4 flex flex-col gap-3">
                <Button
                  type="submit"
                  className="py-3 text-lg font-semibold bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600 text-white shadow-md transition-all"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="py-3 text-lg font-semibold text-orange-500 border-orange-400 hover:bg-orange-50 transition-all"
                  onClick={async () => {
                    await authClient.signIn.social({ provider: "google" });
                  }}
                >
                  Login with Google
                </Button>

                <FieldDescription className="text-center text-gray-600 mt-2">
                  Don&apos;t have an account?{" "}
                  <a href="/signup" className="underline text-orange-500">
                    Sign up
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}