
import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="bg-muted  flex   flex-col items-center justify-center gap-2 p-6 md:p-10">
      <div className="flex py-20  flex-col gap-2">

        <SignupForm />
      </div>
    </div>
  )
}
