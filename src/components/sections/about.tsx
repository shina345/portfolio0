"use client";

import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const HologramCard = dynamic(
  () => import("@/components/3d/hologram-card").then((m) => m.HologramCard),
  { ssr: false }
);

const SKILLS = [
  "JavaScript", "PHP", "React", "Next.js", "MySQL", "Supabase", "Three.js", "Python", "Docker",
  "Tailwind CSS", "Framer Motion", "Git"
];

const STATS = [
  { value: "8+", label: "Projects Shipped" },
  { value: "5yr", label: "Experience" },
  { value: "10+", label: "Happy Clients" },
  { value: "∞", label: "Coffees Consumed" },
];

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 -translate-x-1/2 rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--glow-violet)", opacity: 0.3 }}
      />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--accent-cyan)" }}>
            01 — About
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Column */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold mb-6"
            >
              Crafting{" "}
              <span className="gradient-text">Digital Worlds</span>
              <br />
              with Precision
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/50 leading-relaxed mb-4"
            >
              I&apos;m a full-stack developer with 5 years of experience building
              scalable, performant web applications. I specialize in JavaScript,
              PHP, React, Next.js, and Three.js — crafting solutions that combine
              clean code with exceptional user experiences.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/40 leading-relaxed mb-8"
            >
              I&apos;ve worked remotely with companies like Cquestihub and Solarex IT World,
              delivering impactful products across fintech, NGOs, community platforms,
              and event management. Based in Nigeria, available for remote work worldwide.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-4 text-center">
                  <div
                    className="text-2xl font-black gradient-text mb-1"
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/40 font-mono">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {SKILLS.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.04 }}
                  className="skill-badge"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* 3D Hologram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-96 lg:h-[500px] relative"
          >
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden glass"
              style={{ border: "1px solid rgba(0,245,255,0.1)" }}
            >
              <HologramCard />
            </div>
            {/* Label overlay */}
            <div className="absolute bottom-4 left-4 right-4 glass rounded-xl px-4 py-3">
              <div className="text-xs font-mono" style={{ color: "var(--accent-cyan)" }}>
                sys.identity.load()
              </div>
              <div className="text-xs text-white/30 font-mono mt-1">
                &gt; Oyebamiji Shinaayomi — v5.0.0
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
