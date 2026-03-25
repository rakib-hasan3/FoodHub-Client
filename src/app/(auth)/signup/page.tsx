import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 p-6 md:p-10">
      <div className="w-full max-w-md flex flex-col gap-6 py-20">
        <SignupForm />
      </div>
    </div>
  )
}