import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ResumeSection } from "@/components/sections/resume";

export const metadata = {
  title: "Résumé | Oyebamiji Shinaayomi",
  description:
    "View the interactive résumé of Oyebamiji Shinaayomi — Full-Stack Developer with 5 years of remote freelance experience across CQuestihub, Solarex iT World, and more.",
};

export default function ResumePage() {
  return (
    <main className="pt-16">
      <Navbar />
      <ResumeSection />
      <Footer />
    </main>
  );
}
