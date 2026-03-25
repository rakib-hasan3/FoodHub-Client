import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-6 md:px-10 bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
      {/* Card container */}
      <div className="w-full max-w-md flex flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}