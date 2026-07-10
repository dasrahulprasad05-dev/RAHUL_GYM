import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ClassesSection } from "@/components/home/ClassesSection";
import { CTASection } from "@/components/home/CTASection";
import { FooterSection } from "@/components/home/FooterSection";
import { getClasses } from "@/app/actions/classes";

export default async function HomePage() {
  const classes = await getClasses();

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ClassesSection classes={classes} />
      <CTASection />
      <FooterSection />
    </div>
  );
}
