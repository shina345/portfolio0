"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Download,
  Briefcase,
  GraduationCap,
  Code2,
  Star,
  MapPin,
  Mail,
  Globe,
  Phone,
} from "lucide-react";

const RESUME_EXPERIENCE = [
  {
    company: "Cquestihub",
    role: "Full Stack Developer",
    period: "2022 — Present",
    location: "Remote",
    color: "var(--accent-cyan)",
    bullets: [
      "Architected and shipped full-stack web platforms for clients across fintech, NGO, and e-commerce verticals using Next.js, React, PHP, and MySQL",
      "Led frontend development delivering pixel-perfect, responsive UIs with Framer Motion animations and Tailwind CSS",
      "Designed RESTful APIs and relational database schemas in MySQL, improving query performance by up to 40%",
      "Integrated Supabase for real-time data features including live notifications and authentication",
      "Collaborated asynchronously with remote teams across multiple time zones, delivering projects on schedule",
    ],
  },
  {
    company: "Cquestihub",
    role: "Frontend Tutor",
    period: "2023 — Present",
    location: "Remote",
    color: "var(--accent-violet)",
    bullets: [
      "Mentored junior developers and bootcamp students in modern frontend development — HTML, CSS, JavaScript, React, and Next.js",
      "Designed and delivered structured curriculum covering responsive design, accessibility, component architecture, and real-world project workflows",
      "Conducted code reviews, 1-on-1 sessions, and live coding workshops to accelerate students' learning and career transitions",
      "Provided guidance on building professional portfolios and preparing students for remote frontend roles",
      "Maintained a 100% completion rate among mentored students, with multiple graduates securing developer positions",
    ],
  },
  {
    company: "Solarex IT World",
    role: "Web Developer",
    period: "2021 — 2022",
    location: "Remote",
    color: "var(--accent-green)",
    bullets: [
      "Built and maintained corporate websites and internal tools for tech-sector clients using React, JavaScript, and PHP",
      "Integrated Docker for containerized deployments, reducing environment inconsistencies across dev and production",
      "Implemented Supabase backends with row-level security and real-time subscriptions for interactive dashboards",
      "Optimized website load times by 35% through asset optimization, lazy loading, and code splitting",
      "Delivered 5+ client projects end-to-end from wireframe to deployment within tight deadlines",
    ],
  },
  {
    company: "Freelance / Consulting",
    role: "Independent Developer",
    period: "2019 — 2021",
    location: "Remote · Worldwide",
    color: "var(--accent-cyan)",
    bullets: [
      "Developed 8+ production web applications for startups, NGOs, and creative agencies in Nigeria and internationally",
      "Built Three.js 3D interactive experiences and WebGL-powered product visualizers for creative clients",
      "Delivered full-stack PHP + MySQL solutions including community platforms, business directories, and event sites",
      "Managed all phases of the development lifecycle: scoping, architecture, development, testing, and deployment",
    ],
  },
];

const SKILLS_DATA = [
  {
    category: "Frontend",
    color: "var(--accent-cyan)",
    items: ["JavaScript (ES2023)", "React", "Next.js 15", "HTML5 / CSS3", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    color: "var(--accent-violet)",
    items: ["PHP", "Python", "Node.js", "REST APIs", "Supabase", "MySQL"],
  },
  {
    category: "3D & Creative",
    color: "var(--accent-green)",
    items: ["Three.js", "React Three Fiber", "WebGL", "GSAP", "Canvas API"],
  },
  {
    category: "DevOps & Tools",
    color: "var(--accent-cyan)",
    items: ["Docker", "Git / GitHub", "Vercel", "Linux CLI", "VS Code"],
  },
];

const PROJECTS_HIGHLIGHT = [
  { name: "Swype", url: "https://swype.ng/", tech: "Next.js, Tailwind CSS, API Integration" },
  { name: "BlastPayy", url: "https://blastpayy.vercel.app/", tech: "Next.js, Supabase, MySQL" },
  { name: "Jumpfrika", url: "https://jumpfrika.com.ng/", tech: "PHP, MySQL, JavaScript" },
  { name: "Streams of Life", url: "https://streamsoflifeinternational.org", tech: "PHP, MySQL, CSS" },
  { name: "TMYC", url: "https://tmyc.com.ng", tech: "PHP, MySQL, Bootstrap" },
  { name: "1 Africa Foundation", url: "https://1africafoundation.org", tech: "PHP, MySQL, JavaScript" },
  { name: "ArtFunFest", url: "https://artfunfest.com.ng", tech: "PHP, JavaScript, MySQL" },
  { name: "Z-Next", url: "https://z-next.vercel.app", tech: "Next.js 15, TypeScript, Vercel" },
];

function SectionBadge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-mono px-2 py-0.5 rounded-full"
      style={{
        background: `color-mix(in srgb, ${color} 9%, transparent)`,
        color,
        border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`
      }}
    >
      {children}
    </span>
  );
}

function TimelineCard({
  exp,
  index,
  inView,
}: {
  exp: (typeof RESUME_EXPERIENCE)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.15 * index, duration: 0.6 }}
      className="relative pl-8"
    >
      {/* Timeline line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: `linear-gradient(to bottom, color-mix(in srgb, ${exp.color} 38%, transparent), transparent)` }}
      />
      {/* Dot */}
      <div
        className="absolute left-[-5px] top-[18px] w-[10px] h-[10px] rounded-full"
        style={{ background: exp.color, boxShadow: `0 0 12px color-mix(in srgb, ${exp.color} 50%, transparent)` }}
      />

      <div
        className="glass rounded-2xl p-6 mb-6"
        style={{ border: `1px solid color-mix(in srgb, ${exp.color} 12%, transparent)` }}
      >
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-lg font-bold text-white">{exp.role}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-semibold text-sm" style={{ color: exp.color }}>
                {exp.company}
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1 text-xs text-white/40">
                <MapPin size={10} />
                {exp.location}
              </span>
            </div>
          </div>
          <SectionBadge color={exp.color}>{exp.period}</SectionBadge>
        </div>
        <ul className="space-y-2">
          {exp.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-sm text-white/50 leading-relaxed">
              <span style={{ color: exp.color, flexShrink: 0, marginTop: "2px" }}>›</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function ResumeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleDownload = () => {
    window.print();
  };

  return (
    <section id="resume" className="section-padding relative overflow-hidden">
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(168,85,247,0.4), transparent)" }}
      />
      {/* Background glows */}
      <div
        className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--glow-violet)", opacity: 0.2 }}
      />
      <div
        className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
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
            05 — Résumé
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </motion.div>

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold"
          >
            My <span className="gradient-text">Résumé</span>
          </motion.h2>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 self-start sm:self-auto"
            style={{
              background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
              color: "#000",
            }}
          >
            <Download size={16} />
            Download PDF
          </motion.button>
        </div>

        {/* === Resume Card === */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="glass rounded-3xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Resume Header */}
          <div
            className="p-8 sm:p-10 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,245,255,0.06) 0%, rgba(168,85,247,0.06) 100%)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Decorative corner glow */}
            <div
              className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl"
              style={{ background: "rgba(0,245,255,0.08)" }}
            />
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-1">
                  Oyebamiji Shinaayomi
                </h1>
                <p
                  className="text-lg font-medium mb-4"
                  style={{ color: "var(--accent-cyan)" }}
                >
                  Full Stack Developer · Frontend Tutor · 5 Years Experience
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-white/50">
                  <a href="mailto:oluwashinaayomi694@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Mail size={13} style={{ color: "var(--accent-cyan)" }} />
                    oluwashinaayomi694@gmail.com
                  </a>
                  <a href="https://wa.me/2348055865414" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Phone size={13} style={{ color: "var(--accent-green)" }} />
                    +234 805 586 5414 (WhatsApp)
                  </a>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} style={{ color: "var(--accent-violet)" }} />
                    Nigeria · Available Remote Worldwide
                  </span>
                  <a href="https://github.com/oyebamiji-shinaayomi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Globe size={13} style={{ color: "var(--accent-green)" }} />
                    github.com/oyebamiji-shinaayomi
                  </a>
                </div>
              </div>
              {/* Stats pills */}
              <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
                {[
                  { label: "5+ Years", sub: "Experience", color: "var(--accent-cyan)" },
                  { label: "8+ Projects", sub: "Shipped", color: "var(--accent-violet)" },
                  { label: "Remote", sub: "Available", color: "var(--accent-green)" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="glass rounded-xl px-4 py-2 text-center min-w-[100px]"
                    style={{ border: `1px solid color-mix(in srgb, ${s.color} 15%, transparent)` }}
                  >
                    <div className="text-base font-black" style={{ color: s.color }}>{s.label}</div>
                    <div className="text-[10px] text-white/40 font-mono">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resume Body */}
          <div className="p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* === LEFT COLUMN: Summary + Skills + Education === */}
            <div className="lg:col-span-1 space-y-8">

              {/* Professional Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Star size={14} style={{ color: "var(--accent-cyan)" }} />
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">Summary</h3>
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  Passionate full-stack developer and <strong className="text-white/70">frontend tutor</strong> with{" "}
                  <strong className="text-white/70">5 years of experience</strong> building scalable, production-ready web
                  applications and mentoring the next generation of developers. Expert in{" "}
                  <strong className="text-white/70">JavaScript, PHP, React, Next.js</strong>, and{" "}
                  <strong className="text-white/70">MySQL</strong>, with hands-on experience in{" "}
                  <strong className="text-white/70">Three.js</strong> for 3D web development.
                  Proven track record delivering remote projects for clients across fintech, NGOs, and community
                  platforms — while simultaneously coaching junior developers through structured curricula and live workshops.
                </p>
              </motion.div>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Code2 size={14} style={{ color: "var(--accent-violet)" }} />
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">Skills</h3>
                </div>
                <div className="space-y-4">
                  {SKILLS_DATA.map((group) => (
                    <div key={group.category}>
                      <div className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: group.color }}>
                        {group.category}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs px-2 py-0.5 rounded-md text-white/60"
                            style={{
                              background: `color-mix(in srgb, ${group.color} 6%, transparent)`,
                              border: `1px solid color-mix(in srgb, ${group.color} 15%, transparent)`,
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Education */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap size={14} style={{ color: "var(--accent-green)" }} />
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">Education</h3>
                </div>
                <div
                  className="rounded-xl p-4"
                  style={{ background: "rgba(57,255,20,0.05)", border: "1px solid rgba(57,255,20,0.12)" }}
                >
                  <div className="text-sm font-bold text-white">Computer Science</div>
                  <div className="text-xs text-white/50 mt-0.5">Nigeria · 2019</div>
                  <div className="text-xs mt-2" style={{ color: "#39ff14", opacity: 0.7 }}>
                    Self-directed & professional certifications in Web Development, PHP, React & Next.js
                  </div>
                </div>
              </motion.div>

              {/* Key Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Globe size={14} style={{ color: "#f59e0b" }} />
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">Live Projects</h3>
                </div>
                <div className="space-y-2">
                  {PROJECTS_HIGHLIGHT.map((p) => (
                    <a
                      key={p.name}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start justify-between gap-2 group rounded-lg p-2 transition-all hover:bg-white/5"
                    >
                      <div>
                        <div className="text-xs font-semibold text-white/70 group-hover:text-white transition-colors">
                          {p.name}
                        </div>
                        <div className="text-[10px] text-white/30 font-mono">{p.tech}</div>
                      </div>
                      <span className="text-white/20 group-hover:text-white/60 transition-colors text-xs shrink-0 mt-0.5">↗</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* === RIGHT COLUMN: Experience === */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 mb-6"
              >
                <Briefcase size={14} style={{ color: "var(--accent-cyan)" }} />
                <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">Work Experience</h3>
              </motion.div>

              <div>
                {RESUME_EXPERIENCE.map((exp, i) => (
                  <TimelineCard key={exp.role} exp={exp} index={i} inView={inView} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Download CTA at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <p className="text-white/30 text-sm font-mono">
            Want a copy? Download the full résumé in PDF format.
          </p>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold glass transition-all hover:scale-105"
            style={{ color: "var(--accent-cyan)", border: "1px solid rgba(0,245,255,0.2)" }}
          >
            <Download size={14} />
            Download PDF ↗
          </button>
        </motion.div>
      </div>
    </section>
  );
}
