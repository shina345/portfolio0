"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Terminal, Send, Cpu, Wifi, MessageSquare, ShieldCheck, User } from "lucide-react";
import confetti from "canvas-confetti";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  avatar: string;
  date: string;
}

const AVATAR_OPTIONS = [
  { id: "netrunner", label: "NETRUNNER", color: "var(--accent-cyan)", desc: "[Cyber-deck Specialist]" },
  { id: "hacker", label: "HACKER", color: "var(--accent-green)", desc: "[Kernel Penetration]" },
  { id: "cypher", label: "CYPHER", color: "var(--accent-amber, #ffb300)", desc: "[Crypto Decoder]" },
  { id: "ghost", label: "GHOST", color: "var(--accent-violet)", desc: "[Stealth Operator]" },
  { id: "ai", label: "AI.CORE", color: "#ff4d4d", desc: "[Neural Core Node]" },
];

const INITIAL_MOCK_ENTRIES: GuestbookEntry[] = [
  {
    id: "mock-1",
    name: "Sarah Jenkins",
    message: "Your 3D custom shaders are incredible! The cyberdeck terminal is a work of art. Stunned by the performance and fluid animations.",
    avatar: "netrunner",
    date: "2026-06-20 14:24",
  },
  {
    id: "mock-2",
    name: "Koji Sato",
    message: "Very clean work. The WebGL particles run beautifully on mobile too. Impressive optimization and highly engaging design.",
    avatar: "hacker",
    date: "2026-06-22 09:12",
  },
  {
    id: "mock-3",
    name: "Elena Rostova",
    message: "Next-level portfolio! That interactive terminal CLI is so nostalgic and responsive. Absolutely love the dynamic theme switches.",
    avatar: "ghost",
    date: "2026-06-23 18:45",
  },
];

export function GuestbookLocalSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState("netrunner");
  const [transmitting, setTransmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  // Load entries from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cyberdeck-guestbook");
    if (stored) {
      try {
        setEntries(JSON.parse(stored));
      } catch {
        setEntries(INITIAL_MOCK_ENTRIES);
      }
    } else {
      setEntries(INITIAL_MOCK_ENTRIES);
      localStorage.setItem("cyberdeck-guestbook", JSON.stringify(INITIAL_MOCK_ENTRIES));
    }
  }, []);

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setTransmitting(true);
    setProgress(0);

    // Simulate cyberdeck network packet transmission progress bar
    const duration = 1200; // 1.2s
    const step = 100 / (duration / 30);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + step;
      });
    }, 30);

    setTimeout(() => {
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      
      const newEntry: GuestbookEntry = {
        id: `entry-${Date.now()}`,
        name: name.trim(),
        message: message.trim(),
        avatar,
        date: formattedDate,
      };

      const updatedEntries = [newEntry, ...entries];
      setEntries(updatedEntries);
      localStorage.setItem("cyberdeck-guestbook", JSON.stringify(updatedEntries));

      // Trigger confetti on success
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#00f5ff", "#a855f7", "#39ff14"],
      });

      // Clear form
      setName("");
      setMessage("");
      setTransmitting(false);
      setProgress(0);
    }, duration);
  };

  const getAvatarColor = (avatarId: string) => {
    return AVATAR_OPTIONS.find((a) => a.id === avatarId)?.color || "var(--accent-cyan)";
  };

  const getAvatarLabel = (avatarId: string) => {
    return AVATAR_OPTIONS.find((a) => a.id === avatarId)?.label || "GUEST";
  };

  return (
    <section id="guestbook" className="section-padding relative overflow-hidden bg-[#030303]" ref={ref}>
      {/* Decorative top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(168,85,247,0.2), transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--accent-violet)" }}>
            05 — DYNAMIC GUESTBOOK
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          Leave Your <span className="gradient-text">Signature</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-white/40 mb-12 max-w-xl"
        >
          Sign the digital guestbook to log your visit. Select an avatar class and transmit your message to the terminal mainframe!
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sign Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 h-full"
          >
            <form
              onSubmit={handleTransmit}
              className="glass rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between h-full relative overflow-hidden"
              style={{ border: "1px solid rgba(168, 85, 247, 0.1)" }}
            >
              {/* Decorative nodes */}
              <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-20 border-r border-t border-violet-500 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none opacity-20 border-l border-b border-violet-500 rounded-bl-2xl" />

              <div className="space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-white/5">
                  <Terminal size={16} style={{ color: "var(--accent-violet)" }} />
                  <span className="font-mono text-xs tracking-wider text-white/50">ESTABLISH_SIGNATURE_PROTOCOL</span>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-mono text-white/40 mb-2 flex items-center gap-1.5">
                    <User size={12} /> CODENAME
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={25}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Neo / Guest"
                    disabled={transmitting}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white/80 placeholder-white/20 focus:outline-none transition-all font-mono"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--accent-violet)"; e.target.style.boxShadow = "0 0 0 3px rgba(168, 85, 247, 0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>

                {/* Persona Selector */}
                <div>
                  <label className="block text-xs font-mono text-white/40 mb-2 flex items-center gap-1.5">
                    <Cpu size={12} /> DIGITAL PERSONA CLASS
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {AVATAR_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setAvatar(opt.id)}
                        disabled={transmitting}
                        className="p-2.5 rounded-lg border text-left font-mono transition-all duration-200 group relative overflow-hidden flex flex-col"
                        style={{
                          background: avatar === opt.id ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.2)",
                          borderColor: avatar === opt.id ? opt.color : "rgba(255, 255, 255, 0.05)",
                        }}
                      >
                        <span className="text-[10px] font-bold tracking-wider" style={{ color: opt.color }}>
                          {opt.label}
                        </span>
                        <span className="text-[9px] text-white/30 font-sans mt-0.5 whitespace-nowrap">
                          {opt.desc}
                        </span>
                        {avatar === opt.id && (
                          <div
                            className="absolute top-1 right-1 w-1 h-1 rounded-full animate-ping"
                            style={{ background: opt.color }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-white/40 mb-2 flex items-center gap-1.5">
                    <MessageSquare size={12} /> TRANSMISSION
                  </label>
                  <textarea
                    required
                    maxLength={160}
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Leave your log message here (max 160 chars)..."
                    disabled={transmitting}
                    className="w-full px-4 py-3 rounded-xl text-sm text-white/80 placeholder-white/20 focus:outline-none transition-all resize-none font-mono"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--accent-violet)"; e.target.style.boxShadow = "0 0 0 3px rgba(168, 85, 247, 0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.06)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
              </div>

              {/* Submit / Progress */}
              <div className="pt-6">
                {transmitting ? (
                  <div className="space-y-2">
                    <div className="flex justify-between font-mono text-[10px] text-white/40">
                      <span>TRANSMITTING PACKET DATA...</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, var(--accent-violet), ${getAvatarColor(avatar)})`,
                          width: `${progress}%`,
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    style={{
                      background: "linear-gradient(135deg, var(--accent-violet), rgba(168, 85, 247, 0.6))",
                      color: "#fff",
                      boxShadow: "0 4px 20px rgba(168, 85, 247, 0.2)",
                    }}
                  >
                    <Send size={12} /> TRANSMIT SIGNATURE
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Messages Feed Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div
              className="glass rounded-2xl p-6 sm:p-8 flex flex-col max-h-[500px] overflow-y-auto custom-scrollbar space-y-4"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.05)",
                background: "rgba(3, 3, 5, 0.6)",
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/5 font-mono text-[11px] text-white/30">
                <div className="flex items-center gap-2">
                  <Wifi size={12} className="text-green-400 animate-pulse" />
                  <span>TRANSMISSION_FEED_BUFFER</span>
                </div>
                <span>TOTAL_LOGS: {entries.length}</span>
              </div>

              {entries.length === 0 ? (
                <div className="text-center py-12 font-mono text-xs text-white/20">
                  Buffer empty. Be the first to sign!
                </div>
              ) : (
                <div className="space-y-3.5">
                  {entries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-xl relative group overflow-hidden border transition-all duration-300 hover:bg-white/[0.01]"
                      style={{
                        background: "rgba(255,255,255,0.01)",
                        borderColor: "rgba(255,255,255,0.04)",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `color-mix(in srgb, ${getAvatarColor(entry.avatar)} 30%, rgba(255,255,255,0.04))`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)"; }}
                    >
                      {/* Header line */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2 font-mono text-[10px]">
                        <div className="flex items-center gap-2">
                          <span
                            className="px-2 py-0.5 rounded text-[9px] font-bold"
                            style={{
                              background: `color-mix(in srgb, ${getAvatarColor(entry.avatar)} 15%, transparent)`,
                              color: getAvatarColor(entry.avatar),
                              border: `1px solid color-mix(in srgb, ${getAvatarColor(entry.avatar)} 30%, transparent)`,
                            }}
                          >
                            {getAvatarLabel(entry.avatar)}
                          </span>
                          <span className="font-semibold text-white/70">{entry.name}</span>
                        </div>
                        <span className="text-white/20">{entry.date}</span>
                      </div>

                      {/* Content */}
                      <p className="text-xs text-white/50 leading-relaxed font-mono">
                        {entry.message}
                      </p>

                      {/* Decryption status corner decorative */}
                      <div className="absolute bottom-1 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                        <ShieldCheck size={10} className="text-emerald-500" />
                        <span className="text-[8px] font-mono text-emerald-500 tracking-wider">SECURE_LOG</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
