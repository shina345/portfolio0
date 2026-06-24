"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Résumé", href: "/resume" },
  { label: "Guestbook", href: "/guestbook" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 60], [0, 1]);
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (v) => setScrolled(v > 60));
    return unsubscribe;
  }, [scrollY]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{ background: scrolled ? undefined : "transparent" }}
      >
        <motion.div
          className="absolute inset-0 nav-blur"
          style={{ opacity }}
        />
        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
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
            <span className="font-bold text-white/80 group-hover:text-white transition-colors">
              Oyebamiji Shinaayomi
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/5"
                    style={{
                      color: isActive ? "var(--accent-cyan)" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: "var(--accent-cyan)" }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              className="px-4 py-2 text-xs font-mono glass rounded-full transition-all hover:scale-105"
              style={{ color: "var(--accent-cyan)" }}
            >
              Resume.pdf ↗
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-lg glass flex items-center justify-center text-white/60"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        className={`fixed inset-x-0 top-16 z-30 md:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        style={{ backdropFilter: "blur(20px)", background: "rgba(3,3,3,0.9)" }}
      >
        <ul className="p-4 space-y-1 border-b border-white/05">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium rounded-xl hover:bg-white/5 transition-all"
                  style={{
                    color: isActive ? "var(--accent-cyan)" : "rgba(255,255,255,0.6)",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </>
  );
}
