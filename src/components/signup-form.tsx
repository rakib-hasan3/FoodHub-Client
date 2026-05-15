"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
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
      const res = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    <Card className="w-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-[2rem] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-pink-500/10 pointer-events-none" />
      
      <CardHeader className="p-8 text-center relative z-10">
        <CardTitle className="text-4xl font-black tracking-tight text-white">Join FoodHub</CardTitle>
        <p className="text-gray-300 mt-2 text-balance">
          Choose how you want to experience the platform
        </p>
      </CardHeader>

      <CardContent className="p-8 pt-0 relative z-10 space-y-6">
        {/* ROLE SELECT */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-gray-200 ml-1">I want to...</Label>

          <div className="grid grid-cols-2 gap-4">
            {/* USER */}
            <button
              type="button"
              onClick={() => setRole("USER")}
              className={clsx(
                "rounded-2xl border p-4 transition-all flex flex-col items-center gap-2 group relative overflow-hidden",
                role === "USER"
                  ? "border-orange-500 bg-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                  : "border-white/10 bg-white/5 hover:border-orange-500/50 hover:bg-white/10"
              )}
            >
              <div className={clsx(
                "p-3 rounded-xl transition-colors",
                role === "USER" ? "bg-orange-500 text-white" : "bg-white/5 text-gray-400 group-hover:text-orange-400"
              )}>
                <User className="h-6 w-6" />
              </div>
              <span className={clsx("font-bold text-sm", role === "USER" ? "text-white" : "text-gray-300")}>
                Order Food
              </span>
            </button>

            {/* PROVIDER */}
            <button
              type="button"
              onClick={() => setRole("PROVIDER")}
              className={clsx(
                "rounded-2xl border p-4 transition-all flex flex-col items-center gap-2 group relative overflow-hidden",
                role === "PROVIDER"
                  ? "border-orange-500 bg-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                  : "border-white/10 bg-white/5 hover:border-orange-500/50 hover:bg-white/10"
              )}
            >
              <div className={clsx(
                "p-3 rounded-xl transition-colors",
                role === "PROVIDER" ? "bg-orange-500 text-white" : "bg-white/5 text-gray-400 group-hover:text-orange-400"
              )}>
                <Store className="h-6 w-6" />
              </div>
              <span className={clsx("font-bold text-sm", role === "PROVIDER" ? "text-white" : "text-gray-300")}>
                Sell Food
              </span>
            </button>
          </div>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</Label>
            <Input
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email</Label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Confirm</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full h-12 text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] transition-all duration-300 active:scale-[0.98] mt-4"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" /> Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </Button>

        <p className="text-center text-gray-400 mt-4 text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-orange-400 font-bold cursor-pointer hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>

  )
}