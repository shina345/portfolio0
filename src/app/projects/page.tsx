import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ProjectsSection } from "@/components/sections/projects";

export const metadata = {
  title: "Projects | Oyebamiji Shinaayomi",
  description:
    "Explore production web apps, fintech platforms, and community portals built by Oyebamiji Shinaayomi — Full-Stack Developer with 5 years of remote experience.",
};

export default function ProjectsPage() {
  return (
    <main className="pt-16">
      <Navbar />
      <ProjectsSection />
      <Footer />
    </main>
  );
}
