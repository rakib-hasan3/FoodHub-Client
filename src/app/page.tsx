import Categories from "@/components/Categories";
import FeaturedMeals from "@/components/FeaturedMeals";
import Hero from "@/components/Hero";
import ProvidersPreview from "@/components/ProvidersPreview";
import { authClient } from "@/lib/auth";

import { headers } from "next/headers";
import SpecialOffers from "@/components/SpecialOffers";
import TrendingMeals from "@/components/TrendingMeals";
import { redirect } from "next/navigation";
export const revalidate = 60;

export default async function Home() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
      credentials: "include",
    },
  });

  if (session?.data) {
    const role = (session.data.user as any).role?.toUpperCase();
    if (role === "ADMIN") {
      redirect("/admin/dashboard");
    } else if (role === "PROVIDER") {
      redirect("/provider/dashboard");
    }
  }

  return (
    <div className="relative min-h-screen font-sans bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Premium Background Decorations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 space-y-0">
        <Hero />
        <Categories />
        <FeaturedMeals />
        <SpecialOffers />
        <TrendingMeals />
        <ProvidersPreview />
      </div>
    </div>
  );
}

