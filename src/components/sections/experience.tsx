"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EXPERIENCE = [
  {
    company: "Cquestihub",
    role: "Full Stack Developer",
    period: "2022 — Present",
    location: "Remote",
    description:
      "Building and maintaining scalable web platforms for clients across multiple industries. Architecting full-stack applications using Next.js, React, PHP, and MySQL, delivering high-quality solutions from concept to deployment.",
    highlights: ["Next.js + PHP full-stack", "MySQL database design", "Remote team collaboration"],
    color: "var(--accent-cyan)",
  },
  {
    company: "Cquestihub",
    role: "Frontend Tutor",
    period: "2023 — Present",
    location: "Remote",
    description:
      "Mentoring junior developers and bootcamp students in modern frontend development. Designing and delivering structured curriculum covering HTML, CSS, JavaScript, React, and Next.js — running live workshops, code reviews, and 1-on-1 coaching sessions.",
    highlights: ["React & Next.js curriculum", "Live coding workshops", "1-on-1 mentoring"],
    color: "var(--accent-violet)",
  },
  {
    company: "Solarex IT World",
    role: "Web Developer",
    period: "2021 — 2022",
    location: "Remote",
    description:
      "Developed and maintained corporate websites and internal tools for technology clients. Built interactive UIs with React and JavaScript, integrated Supabase backends, and deployed containerized apps with Docker.",
    highlights: ["React + Supabase apps", "Docker deployments", "JavaScript & PHP"],
    color: "var(--accent-green)",
  },
  {
    company: "Freelance / Consulting",
    role: "Independent Developer",
    period: "2019 — 2021",
    location: "Remote · Worldwide",
    description:
      "Built custom web applications, landing pages, and interactive 3D experiences for startups, NGOs, and creative agencies. Delivered 8+ live projects across Nigeria and internationally.",
    highlights: ["Three.js visualizations", "PHP + MySQL backends", "8+ shipped products"],
    color: "var(--accent-cyan)",
  },
];

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(168,85,247,0.3), transparent)" }}
      />

      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--accent-cyan)" }}>
            03 — Experience
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold mb-12"
        >
          Where I&apos;ve <span className="gradient-text">Worked</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 timeline-line hidden sm:block" />

          <div className="space-y-10">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.12 }}
                className="relative sm:pl-16"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-2 w-8 h-8 rounded-full border-2 items-center justify-center hidden sm:flex"
                  style={{
                    borderColor: exp.color,
                    background: "var(--background)",
                    boxShadow: `0 0 12px color-mix(in srgb, ${exp.color} 25%, transparent)`,
                  }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: exp.color }}
                  />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 4 }}
                  className="glass rounded-2xl p-6 group cursor-default"
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {/* Hover underline */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                    style={{ background: `linear-gradient(to right, ${exp.color}, transparent)` }}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="text-xs font-mono mb-1" style={{ color: exp.color, opacity: 0.8 }}>
                        {exp.location}
                      </div>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <div className="text-base font-semibold" style={{ color: exp.color }}>
                        @ {exp.company}
                      </div>
                    </div>
                    <div
                      className="text-xs font-mono text-white/30 whitespace-nowrap glass px-3 py-1.5 rounded-full self-start"
                    >
                      {exp.period}
                    </div>
                  </div>

                  <p className="text-white/40 text-sm leading-relaxed mb-4">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs font-mono px-2.5 py-1 rounded-full"
                        style={{
                          background: `color-mix(in srgb, ${exp.color} 5%, transparent)`,
                          color: `color-mix(in srgb, ${exp.color} 80%, transparent)`,
                          border: `1px solid color-mix(in srgb, ${exp.color} 15%, transparent)`,
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
