import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Hero />
      <Categories />
    </div>
  );
}
