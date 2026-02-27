"use client" // এটি অবশ্যই থাকতে হবে

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "../../auth-client" // আপনার পাথ অনুযায়ী চেক করুন
import { useState } from "react"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    await authClient.signIn.email({
      email,
      password,
      // callbackURL: "/", // এটি বন্ধ রাখাই ভালো যদি ম্যানুয়ালি হ্যান্ডেল করেন
    }, {
      onRequest: () => setLoading(true),
      onSuccess: async (ctx) => {
        setLoading(false);
        const user = ctx.data.user;

        // রোল চেক করার আগে কনসোলে দেখে নিন আসলে কী আসছে
        console.log("Current User Role:", user?.role);

        if (user?.role === "ADMIN" || user?.role === "admin") {
          // window.location.replace ব্যবহার করলে ব্রাউজার হিস্টোরি ক্লিন করে সরাসরি চলে যাবে
          window.location.replace("/admin/dashboard");
        } else if (user?.role === "PROVIDER" || user?.role === "provider") {
          window.location.replace("/provider/dashboard");
        }
        else {
          window.location.replace("/");
        }
      },
      onError: (ctx) => {
        setLoading(false);
        alert(ctx.error.message);
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-5 ", className)} {...props}>
      <Card className="">
        <CardHeader className="p-4">
          <CardTitle className="text-4xl font-bold text-center">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}> {/* ফাংশন কানেক্ট করা হয়েছে */}
            <FieldGroup>
              <Field>
                <FieldLabel className="py-2 text-2xl" htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>
              <Field className="py-2 text-2xl" >
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <a
                  href="#"
                  className="ml-auto py-2 inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </Field>
              <Field className="py-2 text-2xl gap-2" >
                <Button
                  type="submit"
                  className="py-2 text-2xl"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <Button
                  className="text-2xl"
                  variant="outline"
                  type="button"
                  onClick={async () => {
                    await authClient.signIn.social({ provider: "google" })
                  }}
                >
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup" className="underline">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}