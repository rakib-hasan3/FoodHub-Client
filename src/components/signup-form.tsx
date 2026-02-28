"use client"

import { useState } from "react"
import { useRouter } from "next/navigation" // রিডাইরেক্টের জন্য
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Store, Loader2 } from "lucide-react" // Loader আইকন
import { toast } from "sonner" // টোস্টের জন্য
import clsx from "clsx"

export function SignupForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<"USER" | "PROVIDER">("USER")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async () => {
    // ১. পাসওয়ার্ড ম্যাচিং চেক (অ্যালার্টের বদলে টোস্ট)
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!")
      return
    }

    // ২. খালি ফিল্ড চেক
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields")
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/sign-up/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        // ৩. সফল হলে টোস্ট দেখাবে এবং লগইন পেজে নিয়ে যাবে
        toast.success("Registration successful! Please login.")
        router.push("/login") // আপনার লগইন পেজের পাথ অনুযায়ী চেক করুন
      } else {
        toast.error(data.message || "Something went wrong")
      }
    } catch (error) {
      console.error("Signup error:", error)
      toast.error("Failed to connect to server")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md p-4 shadow-xl">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose how you want to use the platform
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* ROLE SELECT */}
        <div className="space-y-2">
          <Label>I want to</Label>

          <div className="grid grid-cols-2 gap-2">
            {/* USER */}
            <button
              type="button"
              onClick={() => setRole("USER")}
              className={clsx(
                "rounded-xl border p-4 transition-all flex flex-col items-center gap-2",
                role === "USER"
                  ? "border-orange-500 bg-orange-50 ring-2 ring-orange-500"
                  : "border-muted hover:border-orange-400 hover:bg-orange-50/50"
              )}
            >
              <User
                className={clsx(
                  "h-7 w-7",
                  role === "USER" ? "text-orange-500" : "text-muted-foreground"
                )}
              />
              <span className={clsx("font-semibold", role === "USER" ? "text-orange-600" : "text-foreground")}>
                Order Food
              </span>
              <span className="text-xs text-muted-foreground">I am a USER</span>
            </button>

            {/* PROVIDER */}
            <button
              type="button"
              onClick={() => setRole("PROVIDER")}
              className={clsx(
                "rounded-xl border p-4 transition-all flex flex-col items-center gap-2",
                role === "PROVIDER"
                  ? "border-orange-500 bg-orange-50 ring-2 ring-orange-500"
                  : "border-muted hover:border-orange-400 hover:bg-orange-50/50"
              )}
            >
              <Store
                className={clsx(
                  "h-7 w-7",
                  role === "PROVIDER" ? "text-orange-500" : "text-muted-foreground"
                )}
              />
              <span className={clsx("font-semibold", role === "PROVIDER" ? "text-orange-600" : "text-foreground")}>
                Sell Food
              </span>
              <span className="text-xs text-muted-foreground">I am a provider</span>
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>
        </div>

        {/* SUBMIT - লোডিং স্টেট যোগ করা হয়েছে */}
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-2 h-11 text-white mb-2  hover:bg-orange-600"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 font-bold animate-spin" /> Creating...
            </span>
          ) : (
            "Create Account →"
          )}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-black font-medium cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  )
}