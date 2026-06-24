import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { HeroSection } from "@/components/sections/hero";
import { CyberTerminal } from "@/components/sections/terminal";
import { AboutSection } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CyberTerminal />
      <AboutSection />
      <ExperienceSection />
      <Footer />
    </main>
  );
}
