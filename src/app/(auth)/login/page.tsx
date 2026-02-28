import { LoginForm } from "@/components/login-form"

export default function Page() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      {/* এখানে w-full এবং max-w-md দিন যাতে কার্ডটা খুব ছোট না হয়ে যায় */}
      <div className="w-full max-w-md flex flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  )
}
