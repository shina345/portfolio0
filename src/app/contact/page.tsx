import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ContactSection } from "@/components/sections/contact";

export const metadata = {
  title: "Contact | Oyebamiji Shinaayomi",
  description:
    "Get in touch with Oyebamiji Shinaayomi — Full-Stack Developer available for remote freelance projects worldwide. Email, WhatsApp, or fill in the contact form.",
};

export default function ContactPage() {
  return (
    <main className="pt-16">
      <Navbar />
      <ContactSection />
      <Footer />
    </main>
  );
}
