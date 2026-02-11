import Categories from "@/components/Categories";
import FeaturedMeals from "@/components/FeaturedMeals";
import Hero from "@/components/Hero";
import ProvidersPreview from "@/components/ProvidersPreview";
import { authClient } from "@/lib/auth-client";


export default async function Home() {
  const session = await authClient.getSession();
  console.log(session);
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <Categories />
      <FeaturedMeals />
      <ProvidersPreview />
    </div>
  );
}
