"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, ExternalLink, Layers, Zap, Globe, Github, Heart } from "lucide-react";
import confetti from "canvas-confetti";

const PROJECTS = [
  {
    id: 1,
    title: "Swype",
    category: "Voucher Infrastructure",
    description:
      "Nigeria's leading voucher & incentive platform. Launch, fund, and manage reward campaigns with ease.",
    longDescription:
      "Swype is a premier fintech voucher and incentive infrastructure for businesses in Nigeria. Built with Next.js and high-performance serverless architecture, it enables startups and enterprises to distribute digital rewards, gift cards, and bulk airtime via intuitive dashboards and robust APIs.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "API Integration"],
    color: "var(--accent-cyan)",
    icon: Zap,
    size: "large",
    github: "https://swype.ng/",
    live: "https://swype.ng/",
    year: "2024",
    baseUpvotes: 187,
  },
  {
    id: 2,
    title: "Z-Next",
    category: "Next.js App",
    description:
      "A cutting-edge Next.js web application showcasing advanced routing, server components, and modern UI patterns.",
    longDescription:
      "Z-Next demonstrates advanced Next.js 15 patterns including App Router, Server Components, and SSR optimizations. Features a clean, modern interface with dynamic data fetching and optimized performance.",
    tags: ["Next.js", "React", "TypeScript", "Vercel"],
    color: "var(--accent-violet)",
    icon: Layers,
    size: "medium",
    github: "https://z-next.vercel.app",
    live: "https://z-next.vercel.app",
    year: "2024",
    baseUpvotes: 98,
  },
  {
    id: 3,
    title: "BlastPayy",
    category: "Fintech Platform",
    description:
      "A fintech payment platform enabling fast, secure digital transactions and wallet management for users.",
    longDescription:
      "BlastPayy is a digital payment solution built with Next.js and Supabase, supporting real-time transaction tracking, wallet funding, and secure peer-to-peer transfers. Features mobile-first responsive design.",
    tags: ["Next.js", "Supabase", "JavaScript", "MySQL"],
    color: "var(--accent-green)",
    icon: Zap,
    size: "medium",
    github: "https://blastpayy.vercel.app/",
    live: "https://blastpayy.vercel.app/",
    year: "2024",
    baseUpvotes: 115,
  },
  {
    id: 4,
    title: "Jumpfrika",
    category: "Business Platform",
    description:
      "A Nigerian business directory and job platform connecting professionals and employers across Africa.",
    longDescription:
      "Jumpfrika.com.ng is a full-featured business and employment platform for the Nigerian market. Built with PHP, MySQL, and JavaScript, it supports job listings, company profiles, and professional networking features.",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    color: "var(--accent-cyan)",
    icon: Globe,
    size: "small",
    github: "https://jumpfrika.com.ng/",
    live: "https://jumpfrika.com.ng/",
    year: "2023",
    baseUpvotes: 74,
  },
  {
    id: 5,
    title: "Streams of Life",
    category: "Non-Profit / Church",
    description:
      "A church and non-profit organization website offering sermons, events, and online giving capabilities.",
    longDescription:
      "Streamsoflifeinternational.org is a full-featured ministry website featuring sermon archives, event calendars, blog posts, and donation integration. Built with PHP and MySQL, with a focus on accessibility and performance.",
    tags: ["PHP", "MySQL", "JavaScript", "CSS"],
    color: "var(--accent-violet)",
    icon: Layers,
    size: "small",
    github: "https://streamsoflifeinternational.org",
    live: "https://streamsoflifeinternational.org",
    year: "2023",
    baseUpvotes: 53,
  },
  {
    id: 6,
    title: "TMYC",
    category: "Community Platform",
    description:
      "A community-focused website for youth and cultural engagement in Nigeria, built with PHP and MySQL.",
    longDescription:
      "TMYC (Tmyc.com.ng) is a dynamic Nigerian community platform providing news, events, and resources for youth empowerment. Features an admin dashboard, content management, and membership features.",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    color: "var(--accent-green)",
    icon: Globe,
    size: "small",
    github: "https://tmyc.com.ng",
    live: "https://tmyc.com.ng",
    year: "2023",
    baseUpvotes: 48,
  },
  {
    id: 7,
    title: "1 Africa Foundation",
    category: "NGO / Non-Profit",
    description:
      "Website for a Pan-African non-profit organization promoting education, health, and community development.",
    longDescription:
      "1africafoundation.org is a mission-driven NGO website built with PHP and MySQL, featuring donation forms, program highlights, impact stories, and a blog. Optimized for performance and accessibility.",
    tags: ["PHP", "MySQL", "JavaScript", "CSS"],
    color: "var(--accent-cyan)",
    icon: Layers,
    size: "small",
    github: "https://1africafoundation.org",
    live: "https://1africafoundation.org",
    year: "2023",
    baseUpvotes: 62,
  },
  {
    id: 8,
    title: "ArtFunFest",
    category: "Events & Culture",
    description:
      "Interactive website for an arts and entertainment festival in Nigeria with event schedules, galleries, and ticketing.",
    longDescription:
      "ArtFunFest (artfunfest.com.ng) is an event management and cultural arts platform built with PHP and JavaScript. Features event scheduling, image galleries, sponsor showcases, and a dynamic registration flow.",
    tags: ["PHP", "JavaScript", "MySQL", "Bootstrap"],
    color: "var(--accent-violet)",
    icon: Zap,
    size: "small",
    github: "https://artfunfest.com.ng",
    live: "https://artfunfest.com.ng",
    year: "2024",
    baseUpvotes: 81,
  },
];

interface ProjectModalProps {
  project: (typeof PROJECTS)[0];
  onClose: () => void;
  upvotes: Record<number, number>;
  userUpvotes: Record<number, boolean>;
  onUpvote: (id: number) => void;
}

function ProjectModal({ project, onClose, upvotes, userUpvotes, onUpvote }: ProjectModalProps) {
  const Icon = project.icon;
  const hasUpvoted = !!userUpvotes[project.id];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="glass rounded-2xl max-w-2xl w-full p-8 relative"
        style={{ border: `1px solid ${project.color}30`, maxHeight: "90vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-white/40 hover:text-white transition-colors"
        >
          <X size={14} />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
          >
            <Icon size={22} style={{ color: project.color }} />
          </div>
          
          {/* Upvote Button in Modal */}
          <button
            onClick={() => onUpvote(project.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 glass hover:scale-105 active:scale-95 mt-1"
            style={{
              border: `1px solid ${hasUpvoted ? project.color : 'rgba(255,255,255,0.08)'}`,
              color: hasUpvoted ? project.color : 'rgba(255,255,255,0.4)',
              background: hasUpvoted ? `color-mix(in srgb, ${project.color} 10%, transparent)` : 'rgba(255,255,255,0.01)',
            }}
          >
            <Heart size={12} className={hasUpvoted ? "fill-current animate-pulse text-red-500" : ""} />
            <span>UPVOTE: {upvotes[project.id] || 0}</span>
          </button>
        </div>

        <div className="text-xs font-mono mb-2" style={{ color: project.color }}>
          {project.category} · {project.year}
        </div>
        <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
        <p className="text-white/50 leading-relaxed mb-6">{project.longDescription}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="skill-badge"
              style={{
                borderColor: `color-mix(in srgb, ${project.color} 25%, transparent)`,
                color: project.color,
                background: `color-mix(in srgb, ${project.color} 3%, transparent)`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 glass px-5 py-2.5 rounded-full text-sm font-medium text-white/70 hover:text-white transition-all hover:scale-105"
          >
            <Github size={14} /> GitHub
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${project.color}, #a855f7)`,
              color: "#000",
              fontWeight: 600,
            }}
          >
            <ExternalLink size={14} /> Live Demo
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface BentoCardProps {
  project: (typeof PROJECTS)[0];
  onClick: () => void;
  upvotes: Record<number, number>;
  userUpvotes: Record<number, boolean>;
  onUpvote: (id: number) => void;
}

function BentoCard({ project, onClick, upvotes, userUpvotes, onUpvote }: BentoCardProps) {
  const Icon = project.icon;
  const isLarge = project.size === "large";
  const hasUpvoted = !!userUpvotes[project.id];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className={`glass rounded-2xl p-6 cursor-pointer group relative overflow-hidden ${
        isLarge ? "md:col-span-2" : ""
      }`}
      style={{
        border: `1px solid rgba(255,255,255,0.06)`,
        minHeight: isLarge ? 240 : 180,
      }}
      onClick={onClick}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${project.color}08, transparent 70%)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(to right, transparent, ${project.color}60, transparent)` }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${project.color}12`, border: `1px solid ${project.color}25` }}
        >
          <Icon size={18} style={{ color: project.color }} />
        </div>
        
        {/* Heart/Upvote card action */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpvote(project.id);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all duration-300 glass hover:scale-105 active:scale-95 z-10"
            style={{
              border: `1px solid ${hasUpvoted ? project.color : 'rgba(255,255,255,0.08)'}`,
              color: hasUpvoted ? project.color : 'rgba(255,255,255,0.4)',
              background: hasUpvoted ? `color-mix(in srgb, ${project.color} 10%, transparent)` : 'rgba(0,0,0,0.2)',
            }}
          >
            <Heart size={10} className={hasUpvoted ? "fill-current animate-pulse text-red-500" : ""} />
            <span>{upvotes[project.id] || 0}</span>
          </button>
          
          <ExternalLink
            size={14}
            className="opacity-0 group-hover:opacity-60 transition-opacity"
            style={{ color: project.color }}
          />
        </div>
      </div>

      {/* Category */}
      <div className="text-xs font-mono mb-2" style={{ color: project.color, opacity: 0.7 }}>
        {project.category}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-white/40 leading-relaxed mb-4">{project.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-2 py-0.5 rounded"
            style={{
              background: `color-mix(in srgb, ${project.color} 6%, transparent)`,
              color: `color-mix(in srgb, ${project.color} 80%, transparent)`,
              border: `1px solid color-mix(in srgb, ${project.color} 12%, transparent)`,
            }}
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="text-xs font-mono px-2 py-0.5 rounded text-white/30">
            +{project.tags.length - 3}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<(typeof PROJECTS)[0] | null>(null);

  const [upvotes, setUpvotes] = useState<Record<number, number>>({});
  const [userUpvotes, setUserUpvotes] = useState<Record<number, boolean>>({});

  // Sync upvotes with LocalStorage on mount
  useEffect(() => {
    // Load upvotes mapping
    const storedUpvotes = localStorage.getItem("cyberdeck-project-upvotes");
    let currentUpvotes: Record<number, number> = {};
    if (storedUpvotes) {
      try {
        currentUpvotes = JSON.parse(storedUpvotes);
      } catch {
        currentUpvotes = {};
      }
    }

    // Seed base upvotes if missing
    PROJECTS.forEach((proj) => {
      if (currentUpvotes[proj.id] === undefined) {
        currentUpvotes[proj.id] = proj.baseUpvotes;
      }
    });
    setUpvotes(currentUpvotes);
    localStorage.setItem("cyberdeck-project-upvotes", JSON.stringify(currentUpvotes));

    // Load user upvotes
    const storedUserUpvotes = localStorage.getItem("cyberdeck-user-upvotes");
    if (storedUserUpvotes) {
      try {
        setUserUpvotes(JSON.parse(storedUserUpvotes));
      } catch {
        setUserUpvotes({});
      }
    }
  }, []);

  const handleUpvote = (id: number) => {
    const project = PROJECTS.find((p) => p.id === id);
    if (!project) return;

    const hasUpvoted = !!userUpvotes[id];
    
    // Toggle upvote count
    const nextUpvotes = {
      ...upvotes,
      [id]: (upvotes[id] || 0) + (hasUpvoted ? -1 : 1),
    };
    setUpvotes(nextUpvotes);
    localStorage.setItem("cyberdeck-project-upvotes", JSON.stringify(nextUpvotes));

    // Toggle user upvoted state
    const nextUserUpvotes = {
      ...userUpvotes,
      [id]: !hasUpvoted,
    };
    setUserUpvotes(nextUserUpvotes);
    localStorage.setItem("cyberdeck-user-upvotes", JSON.stringify(nextUserUpvotes));

    // Trigger colorful themed confetti if liking
    if (!hasUpvoted) {
      let confettiColor = project.color;
      if (confettiColor.startsWith("var(")) {
        const varName = confettiColor.substring(4, confettiColor.length - 1);
        confettiColor = typeof window !== 'undefined' 
          ? getComputedStyle(document.documentElement).getPropertyValue(varName).trim() 
          : "#00f5ff";
      }
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: [confettiColor || "#00f5ff", "#ffffff"],
      });
    }
  };

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 right-0 w-96 h-96 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--glow-cyan)", opacity: 0.2 }}
      />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--accent-cyan)" }}>
            02 — Projects
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          Selected <span className="gradient-text">Work</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-white/40 mb-12 max-w-xl"
        >
          A curated selection of production portals and dynamic platforms. Click any card to load full project details.
        </motion.p>

        {/* Bento Grid */}
        <div className="bento-grid">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08 }}
              className={project.size === "large" ? "md:col-span-2" : ""}
            >
              <BentoCard
                project={project}
                onClick={() => setSelected(project)}
                upvotes={upvotes}
                userUpvotes={userUpvotes}
                onUpvote={handleUpvote}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            onClose={() => setSelected(null)}
            upvotes={upvotes}
            userUpvotes={userUpvotes}
            onUpvote={handleUpvote}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

