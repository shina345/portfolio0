"use client";

import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Github, Linkedin, X as XIcon, Send, CheckCircle, Phone } from "lucide-react";

const ContactForm3D = dynamic(
  () => import("@/components/3d/contact-form-3d").then((m) => m.ContactForm3D),
  { ssr: false }
);

const SOCIALS = [
  { icon: Github, label: "GitHub", href: "https://github.com/oyebamiji-shinaayomi", handle: "@oyebamiji-shinaayomi" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/oyebamiji-shina-23a71b22b", handle: "Oyebamiji Shina" },
  { icon: XIcon, label: "X / Twitter", href: "https://x.com/yohann017", handle: "@yohann017" },
];

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate network request
    await new Promise((r) => setTimeout(r, 1500));
    setSent(true);
    setSending(false);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(0,245,255,0.3), transparent)" }}
      />
      {/* Background */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--glow-cyan)", opacity: 0.15 }}
      />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--accent-cyan)" }}>
            04 — Contact
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          Let&apos;s <span className="gradient-text">Build Together</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-white/40 mb-12 max-w-xl"
        >
          Have a project in mind? I&apos;d love to hear about it. Send me a message and I&apos;ll get back to you within 24 hours.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* 3D Orbs */}
            <div className="h-48 rounded-2xl overflow-hidden glass" style={{ border: "1px solid rgba(0,245,255,0.1)" }}>
              <ContactForm3D />
            </div>

            {/* Contact details */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <a href="mailto:oluwashinaayomi694@gmail.com" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center transition-all group-hover:scale-110" style={{ color: "var(--accent-cyan)" }}>
                  <Mail size={14} />
                </div>
                <div>
                  <div className="text-xs text-white/30 font-mono">Email</div>
                  <div className="text-sm text-white/70 group-hover:text-white transition-colors">oluwashinaayomi694@gmail.com</div>
                </div>
              </a>
              <a href="https://wa.me/2348055865414" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center transition-all group-hover:scale-110" style={{ color: "var(--accent-green)" }}>
                  <Phone size={14} />
                </div>
                <div>
                  <div className="text-xs text-white/30 font-mono">WhatsApp</div>
                  <div className="text-sm text-white/70 group-hover:text-white transition-colors">+234 805 586 5414</div>
                </div>
              </a>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg glass flex items-center justify-center" style={{ color: "var(--accent-violet)" }}>
                  <MapPin size={14} />
                </div>
                <div>
                  <div className="text-xs text-white/30 font-mono">Location</div>
                  <div className="text-sm text-white/70">Nigeria · Open to Remote Worldwide</div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="glass rounded-2xl p-6">
              <div className="text-xs font-mono text-white/30 mb-4">Connect</div>
              <div className="space-y-3">
                {SOCIALS.map(({ icon: Icon, label, href, handle }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg glass flex items-center justify-center transition-all group-hover:scale-110"
                      style={{ color: "var(--accent-cyan)" }}
                    >
                      <Icon size={14} />
                    </div>
                    <div>
                      <div className="text-xs text-white/30 font-mono">{label}</div>
                      <div className="text-sm text-white/60 group-hover:text-white transition-colors">{handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-10 h-full flex flex-col items-center justify-center text-center gap-6"
                style={{ border: "1px solid rgba(0,245,255,0.15)" }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(0,245,255,0.1)" }}>
                  <CheckCircle size={32} style={{ color: "var(--accent-cyan)" }} />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                <p className="text-white/40 max-w-sm">
                  Thanks for reaching out. I typically respond within 24 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setFormState({ name: "", email: "", message: "" }); }}
                  className="px-6 py-2.5 rounded-full glass text-sm text-white/60 hover:text-white transition-colors"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-8 space-y-6 h-full"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-white/40 mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white/80 placeholder-white/20 focus:outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(0,245,255,0.4)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,245,255,0.05)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-white/40 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl text-sm text-white/80 placeholder-white/20 focus:outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(0,245,255,0.4)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,245,255,0.05)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-white/40 mb-2">Message</label>
                  <textarea
                    required
                    rows={7}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl text-sm text-white/80 placeholder-white/20 focus:outline-none transition-all resize-none"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "rgba(0,245,255,0.4)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,245,255,0.05)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
                    color: "#000",
                  }}
                >
                  {sending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={14} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>


      </div>
    </section>
  );
}
