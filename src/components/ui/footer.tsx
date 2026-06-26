"use client";

import Link from "next/link";
import { Github, Linkedin, X as XIcon, Mail, Phone } from "lucide-react";

const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com/oyebamiji-shinaayomi", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/oyebamiji-shina-23a71b22b", label: "LinkedIn" },
  { icon: XIcon, href: "https://x.com/yohann017", label: "Twitter" },
  { icon: Mail, href: "mailto:oluwashinaayomi694@gmail.com", label: "Email" },
  { icon: Phone, href: "https://wa.me/2348055865414", label: "WhatsApp" },
];

const NAV_COLS = [
  {
    title: "Navigate",
    links: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Résumé", href: "/resume" },
      { label: "Guestbook", href: "/guestbook" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="relative border-t"
      style={{ borderColor: "var(--border)", background: "rgba(3,3,5,0.8)" }}
    >
      {/* Glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(0,245,255,0.25), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
                  color: "#000",
                }}
              >
                OS
              </div>
              <span className="font-bold text-white/80">Oyebamiji Shinaayomi</span>
            </div>
            <p className="text-xs text-white/30 leading-relaxed max-w-[220px]">
              Full-Stack Developer · Remote Freelancer · 5 Years of Crafting Seamless
              Digital Experiences.
            </p>
          </div>

          {/* Nav Links */}
          {NAV_COLS.map((col) => (
            <div key={col.title}>
              <div className="text-[10px] font-mono tracking-widest text-white/20 uppercase mb-4">
                {col.title}
              </div>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Socials */}
          <div>
            <div className="text-[10px] font-mono tracking-widest text-white/20 uppercase mb-4">
              Connect
            </div>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white transition-all hover:scale-110"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="text-xs font-mono text-white/20">
            © 2025 Oyebamiji Shinaayomi · Built with Next.js &amp; Three.js
          </div>
          <div
            className="text-xs font-mono"
            style={{ color: "var(--accent-cyan)", opacity: 0.5 }}
          >
            Designed &amp; Developed with ♥
          </div>
        </div>
      </div>
    </footer>
  );
}
