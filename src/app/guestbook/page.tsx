import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { GuestbookLocalSection } from "@/components/sections/guestbook-local";

export const metadata = {
  title: "Guestbook | Oyebamiji Shinaayomi",
  description:
    "Leave a message in the digital guestbook of Oyebamiji Shinaayomi's cyberpunk developer portfolio. Sign in as your favourite hacker persona!",
};

export default function GuestbookPage() {
  return (
    <main className="pt-16">
      <Navbar />
      <GuestbookLocalSection />
      <Footer />
    </main>
  );
}
