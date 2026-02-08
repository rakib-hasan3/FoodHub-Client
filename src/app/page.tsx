import Categories from "@/components/Categories";
import FeaturedMeals from "@/components/FeaturedMeals";
import Hero from "@/components/Hero";
import ProvidersPreview from "@/components/ProvidersPreview";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <Categories />
      <FeaturedMeals />
      <ProvidersPreview />
    </div>
  );
}
