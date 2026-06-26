"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Code2, Briefcase, Mail, X as XIcon } from "lucide-react";

const ParticleField = dynamic(
  () => import("@/components/3d/particles").then((m) => m.ParticleField),
  { ssr: false }
);

const ROLES = [
  "Full Stack Developer",
  "JavaScript & PHP Engineer",
  "Next.js & React Specialist",
  "3D Web Developer",
];

function Typewriter({ words }: { words: string[] }) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
        if (charIdx === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        }
      }, 80);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
        if (charIdx === 0) {
          setDeleting(false);
          setWordIdx((w) => (w + 1) % words.length);
        }
      }, 40);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words]);

  return (
    <span>
      <span style={{ color: "var(--accent-cyan)" }}>{displayed}</span>
      <span className="typewriter-cursor" />
    </span>
  );
}

export function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <ParticleField count={2500} />
      </div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,245,255,0.04) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-10"
        style={{
          background:
            "linear-gradient(to top, var(--background), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <div
            className="px-4 py-1.5 rounded-full text-xs font-mono glass"
            style={{ color: "var(--accent-cyan)", borderColor: "rgba(0,245,255,0.2)" }}
          >
            <span
              className="inline-block w-2 h-2 rounded-full mr-2"
              style={{
                background: "var(--accent-green)",
                boxShadow: "0 0 6px var(--accent-green)",
                animation: "pulse-glow 2s infinite",
              }}
            />
            Available for Work
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight mb-4"
          style={{ lineHeight: 1.05 }}
        >
          <span className="block text-white/90">Oyebamiji</span>
          <span className="block gradient-text glow-cyan">Shinaayomi</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-xl sm:text-2xl font-light text-white/50 mb-6 font-mono h-8"
        >
          {">"} <Typewriter words={ROLES} />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-base sm:text-lg text-white/40 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          I craft immersive digital experiences at the intersection of{" "}
          <span style={{ color: "var(--accent-cyan)" }}>elegant code</span> and{" "}
          <span style={{ color: "var(--accent-violet)" }}>stunning visuals</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center items-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
              color: "#000",
            }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full font-semibold text-sm glass transition-all duration-300 hover:scale-105"
            style={{ color: "var(--accent-cyan)" }}
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex gap-5 justify-center mt-10"
        >
          {[
            { icon: Code2, href: "https://github.com/shina345", label: "GitHub" },
            { icon: XIcon, href: "https://x.com/yohann017", label: "X / Twitter" },
            { icon: Briefcase, href: "https://www.linkedin.com/in/oyebamiji-shina-23a71b22b", label: "LinkedIn" },
            { icon: Mail, href: "mailto:oluwashinaayomi694@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full glass flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ color: "var(--accent-cyan)" }}
            >
              <Icon size={16} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono text-white/30 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: "var(--accent-cyan)" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
