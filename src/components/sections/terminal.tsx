"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Terminal, Shield, Cpu, Send, RefreshCw } from "lucide-react";
import { useTheme, ThemeColor } from "@/components/providers/theme-provider";
import confetti from "canvas-confetti";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "system" | "success";
  isHtml?: boolean;
}

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  avatar: string;
  date: string;
}

const COMMAND_LIST = [
  { name: "help", desc: "List all available cyber deck protocols" },
  { name: "about", desc: "Access biography & core specs of OS" },
  { name: "skills", desc: "Run graphical skill proficiency analysis" },
  { name: "projects", desc: "Display active production portal links" },
  { name: "contact", desc: "Establish direct communication link" },
  { name: "github", desc: "Query live profile statistics from GitHub API" },
  { name: "guestbook", desc: "Interact with browser-persisted guestbook logs" },
  { name: "stats", desc: "Query real-time deck system diagnostics & counts" },
  { name: "theme", desc: "Recalibrate interface theme [cyan/green/amber/violet]" },
  { name: "crt", desc: "Toggle retro CRT monitor scanline filter [on/off]" },
  { name: "sound", desc: "Toggle mechanical keyboard audio synthesis [on/off]" },
  { name: "hack", desc: "Initiate secure mainframe firewall bypass protocol" },
  { name: "diagnostic", desc: "Run full portfolio system integrity check" },
  { name: "matrix", desc: "Execute digital rain overrides" },
  { name: "clear", desc: "Wipe console buffers" },
];

export function CyberTerminal() {
  const { theme, setTheme, crt, setCrt, sound, setSound } = useTheme();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "OS_CYBERDECK v5.1.0 Online", type: "system" },
    { text: "Initializing quantum security handshakes...", type: "system" },
    { text: "System integrity: 100%. Connection established.", type: "success" },
    { text: "Type 'help' or click the action chips below to query the system.", type: "output" },
  ]);
  const [matrixActive, setMatrixActive] = useState(false);
  const [diagnosticRunning, setDiagnosticRunning] = useState(false);
  const [hackingActive, setHackingActive] = useState(false);
  const [sessionStart] = useState(Date.now());
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    if (!matrixActive) return;
    const timer = setTimeout(() => {
      setMatrixActive(false);
      setHistory((prev) => [
        ...prev,
        { text: ">> Matrix override cycle complete. Mainframe restored.", type: "success" },
      ]);
    }, 6000);
    return () => clearTimeout(timer);
  }, [matrixActive]);

  useEffect(() => {
    const handleGuestbookUpdate = () => {
      setHistory((prev) => [
        ...prev,
        { text: ">> Mainframe alert: Guestbook signature database modified.", type: "system" }
      ]);
    };
    window.addEventListener("guestbook-updated", handleGuestbookUpdate);
    return () => window.removeEventListener("guestbook-updated", handleGuestbookUpdate);
  }, []);

  const playKeyClick = (pitch = 180, duration = 0.03) => {
    if (!sound) return;
    try {
      const audioCtx = new (window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = "sine";
      const pitchVariance = Math.random() * 40 - 20;
      osc.frequency.setValueAtTime(pitch + pitchVariance, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // AudioContext blocked by browser policy
    }
  };

  const executeCommand = (cmdText: string) => {
    const originalTrimmed = cmdText.trim();
    const trimmed = originalTrimmed.toLowerCase();
    if (!trimmed) return;

    const newHistory = [...history, { text: `> ${cmdText}`, type: "input" as const }];

    if (hackingActive) {
      const ans = trimmed;
      if (ans === "c") {
        setHackingActive(false);
        newHistory.push(
          { text: ">> Analyzing checksum 0F:F5:FF... BYPASS CONFIRMED!", type: "system" },
          { text: ">> Decrypting secure logs... 100% COMPLETE", type: "success" },
          { text: "====================================================", type: "system" },
          { text: "🔓 MAINFRAME FIREWALL BYPASSED SUCCESSFULLY!", type: "success" },
          { text: 'CORE SECURE TRANSMISSION: "Welcome, Operator. Oyebamiji Shinaayomi is a premier full-stack engineer & 3D Web Architect. Core decrypted. Stack unlocked. Code: EXCELLENCE_LOCKED_2026."', type: "output" },
          { text: "====================================================", type: "system" }
        );
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.8 }, colors: ["#00f5ff", "#39ff14"] });
      } else if (ans === "exit" || ans === "abort") {
        setHackingActive(false);
        newHistory.push({ text: ">> Hacking session aborted. Security shield restored.", type: "error" });
      } else {
        setHackingActive(false);
        newHistory.push(
          { text: ">> Analyzing checksum... CHECKSUM CODE INVALID!", type: "error" },
          { text: ">> TRACE COUNTERMEASURES ENGAGED! System Lockout Activated.", type: "error" },
          { text: ">> Type 'hack' to reboot security bypass protocols, or 'exit' to escape.", type: "system" }
        );
      }
      setHistory(newHistory);
      setInput("");
      return;
    }

    const parts = trimmed.split(" ");
    const primaryCmd = parts[0];

    switch (primaryCmd) {
      case "help":
        newHistory.push(
          { text: "--- AVAILABLE DECK COMMAND UTILITIES ---", type: "system" },
          ...COMMAND_LIST.map((c) => ({
            text: `${c.name.padEnd(12)} - ${c.desc}`,
            type: "output" as const,
          }))
        );
        break;

      case "about":
        newHistory.push(
          { text: "--- SYSTEM IDENTITY: OYEBAMIJI SHINAAYOMI ---", type: "system" },
          { text: "ROLE:       Full-Stack Software Engineer & 3D Web Developer", type: "output" },
          { text: "EXPERIENCE: 5+ Years of shipping production web platforms", type: "output" },
          { text: "LOCATION:   Nigeria (Available for remote contracts worldwide)", type: "output" },
          { text: "SPECIALTY:  High-performance React/Next.js architectures, sleek PHP backends, custom interactive Three.js scenes, and secure MySQL/Supabase databases.", type: "output" },
          { text: "BIO:        Known for combining flawless backend logic with bleeding-edge visual frontend aesthetics to build products that keep users hooked.", type: "success" }
        );
        break;

      case "skills":
        newHistory.push(
          { text: "--- SKILL PROFICIENCY SPECTROMETER ---", type: "system" },
          { text: "JavaScript   [■■■■■■■■■■■■■■■■■■■■] 100% (Expert)", type: "success" },
          { text: "React/Next.js[■■■■■■■■■■■■■■■■■■■■] 100% (Expert)", type: "success" },
          { text: "PHP / MySQL  [■■■■■■■■■■■■■■■■■■□□] 90%  (Advanced)", type: "success" },
          { text: "Supabase     [■■■■■■■■■■■■■■■■■■□□] 90%  (Advanced)", type: "success" },
          { text: "Three.js/3D  [■■■■■■■■■■■■■■■■□□□□] 80%  (Highly Proficient)", type: "success" },
          { text: "Python/Docker[■■■■■■■■■■■■■■□□□□□□] 70%  (Proficient)", type: "success" }
        );
        break;

      case "projects":
        newHistory.push(
          { text: "--- ACTIVE HIGH-IMPACT PORTALS ---", type: "system" },
          { text: "1. Swype           - Voucher & incentive platform (https://swype.ng/)", type: "output", isHtml: true },
          { text: "2. BlastPayy       - Secure fintech billing application (https://blastpayy.vercel.app/)", type: "output", isHtml: true },
          { text: "3. Jumpfrika       - Nigerian job & directory platform (https://jumpfrika.com.ng/)", type: "output", isHtml: true },
          { text: "4. Z-Next          - Experimental Next.js 15 template (https://z-next.vercel.app)", type: "output", isHtml: true },
          { text: "5. ArtFunFest      - Arts & entertainment event hub (https://artfunfest.com.ng)", type: "output", isHtml: true },
          { text: "6. TMYC            - Youth & cultural engagement forum (https://tmyc.com.ng)", type: "output", isHtml: true },
          { text: "7. Streams of Life - Sermon, calendar & giving platform (https://streamsoflifeinternational.org)", type: "output", isHtml: true },
          { text: "8. 1 Africa        - Pan-African NGO foundation website (https://1africafoundation.org)", type: "output", isHtml: true },
          { text: "💡 Click the links directly inside the console to launch!", type: "success" }
        );
        break;

      case "contact":
        newHistory.push(
          { text: "--- ESTABLISHING DIRECT COMMUNICATION LINE ---", type: "system" },
          { text: "📧 EMAIL:    oluwashinaayomi694@gmail.com (Click to Mail)", type: "output", isHtml: true },
          { text: "📱 WHATSAPP: +234 805 586 5414 (Click to Chat)", type: "output", isHtml: true },
          { text: "🌐 GITHUB:   github.com/oyebamiji-shinaayomi", type: "output" },
          { text: "🔗 LINKEDIN: linkedin.com/in/oyebamiji-shinaayomi", type: "output" },
          { text: "⚡ Quantum channel open. Ready for your message.", type: "success" }
        );
        break;

      case "github":
        newHistory.push({ text: "Establishing secure uplink to api.github.com...", type: "system" });
        setHistory(newHistory);
        setInput("");
        fetch("https://api.github.com/users/oyebamiji-shinaayomi")
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "Not Found") {
              setHistory((prev) => [...prev, { text: ">> Uplink Error: GitHub profile not found.", type: "error" }]);
              return;
            }
            setHistory((prev) => [
              ...prev,
              { text: "--- LIVE GITHUB LOG SYNC COMPLETE ---", type: "system" },
              { text: `IDENTITY:    ${data.name || data.login} (@${data.login})`, type: "success" },
              { text: `BIO:         ${data.bio || "No bio registered on database."}`, type: "output" },
              { text: `STATISTICS:  Public Repos: ${data.public_repos} | Followers: ${data.followers} | Gists: ${data.public_gists}`, type: "output" },
              { text: `LOCATION:    ${data.location || "Nigeria"}`, type: "output" },
              { text: `REPOSITORY:  github.com/${data.login} (Click to Visit)`, type: "success", isHtml: true }
            ]);
            confetti({ particleCount: 20, spread: 30, colors: ["#39ff14"] });
          })
          .catch(() => {
            setHistory((prev) => [...prev, { text: ">> Uplink Error: Connection timed out. Frame buffer aborted.", type: "error" }]);
          });
        return;

      case "guestbook":
        const subAction = parts[1];
        if (subAction === "view") {
          const stored = localStorage.getItem("cyberdeck-guestbook");
          let currentEntries: GuestbookEntry[] = [];
          if (stored) { try { currentEntries = JSON.parse(stored); } catch { } }
          newHistory.push({ text: "--- CYBERDECK TRANSMISSION LOGS ---", type: "system" });
          if (currentEntries.length === 0) {
            newHistory.push({ text: "Buffer empty. No signatures logged in system core.", type: "output" });
          } else {
            currentEntries.slice(0, 5).forEach((entry: GuestbookEntry) => {
              newHistory.push({ text: `[${entry.date}] [${entry.avatar.toUpperCase()}] ${entry.name}: ${entry.message}`, type: "output" });
            });
          }
        } else if (subAction === "sign") {
          const content = originalTrimmed.substring("guestbook sign".length).trim();
          const firstSpaceIdx = content.indexOf(" ");
          if (firstSpaceIdx === -1) {
            newHistory.push({ text: "Error: Signature body required. Format: guestbook sign [codename] [message]", type: "error" });
          } else {
            const signName = content.substring(0, firstSpaceIdx).trim();
            const signMsg = content.substring(firstSpaceIdx).trim();
            const stored = localStorage.getItem("cyberdeck-guestbook");
            let currentEntries: GuestbookEntry[] = [];
            if (stored) { try { currentEntries = JSON.parse(stored); } catch { } }
            const now = new Date();
            const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
            const newEntry: GuestbookEntry = { id: `entry-${Date.now()}`, name: signName, message: signMsg, avatar: "hacker", date: formattedDate };
            const updated = [newEntry, ...currentEntries];
            localStorage.setItem("cyberdeck-guestbook", JSON.stringify(updated));
            window.dispatchEvent(new Event("guestbook-updated"));
            newHistory.push({ text: ">> Opening encryption tunnel...", type: "system" }, { text: `>> Transmission successful! Signature logged for [${signName.toUpperCase()}].`, type: "success" });
            confetti({ particleCount: 35, spread: 50, colors: ["#a855f7"] });
          }
        } else {
          newHistory.push(
            { text: "--- GUESTBOOK COMMAND CLI INTERACTION ---", type: "system" },
            { text: "guestbook view                  - View latest digital signatures", type: "output" },
            { text: "guestbook sign [codename] [msg] - Sign guestbook directly from CLI", type: "output" }
          );
        }
        break;

      case "stats":
        const storedLogs = localStorage.getItem("cyberdeck-guestbook");
        let sigCount = 0;
        if (storedLogs) { try { sigCount = JSON.parse(storedLogs).length; } catch { } }
        const storedLikes = localStorage.getItem("cyberdeck-project-upvotes");
        let likeSum = 0;
        if (storedLikes) {
          try {
            const likesObj = JSON.parse(storedLikes) as Record<string, number>;
            likeSum = Object.values(likesObj).reduce((a, b) => a + b, 0);
          } catch { }
        }
        const uptimeSecs = Math.floor((Date.now() - sessionStart) / 1000);
        const formatUptime = (secs: number) => {
          const h = Math.floor(secs / 3600);
          const m = Math.floor((secs % 3600) / 60);
          const s = secs % 60;
          return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
        };
        newHistory.push(
          { text: "--- SYSTEM HARDWARE DIAGNOSTIC SPECTRA ---", type: "system" },
          { text: `DECK CORE COLOR:     ${theme.toUpperCase()}`, type: "output" },
          { text: `CRT MONITOR FILTER:   ${crt ? "ENABLED (GLOW_ON)" : "DISABLED"}`, type: "output" },
          { text: `MECHANICAL SOUND FX:  ${sound ? "SYNTH_ACTIVE" : "OFF"}`, type: "output" },
          { text: `GUESTBOOK SIGNATURES: ${sigCount} entries logged`, type: "output" },
          { text: `CUMULATIVE PROJECT LIKES: ${likeSum} upvotes registered`, type: "output" },
          { text: `SESSION UPTIME CLOCK: ${formatUptime(uptimeSecs)}`, type: "success" },
          { text: `MAINFRAME CORES:     100% INTEGRITY (SECURE)`, type: "success" }
        );
        break;

      case "theme":
        const targetTheme = parts[1] as ThemeColor;
        if (["cyan", "green", "amber", "violet"].includes(targetTheme)) {
          setTheme(targetTheme);
          newHistory.push({ text: ">> Swapping deck core crystal arrays...", type: "system" }, { text: `>> Mainframe theme recalibrated to: [${targetTheme.toUpperCase()}].`, type: "success" });
          confetti({ particleCount: 15, spread: 20 });
        } else {
          newHistory.push({ text: "Error: Theme color required. Options: cyan, green, amber, violet", type: "error" }, { text: "Example: theme green", type: "output" });
        }
        break;

      case "crt":
        const crtArg = parts[1];
        if (crtArg === "on") { setCrt(true); newHistory.push({ text: ">> CRT scanlines filter: ACTIVE. Beam deflection engaged.", type: "success" }); }
        else if (crtArg === "off") { setCrt(false); newHistory.push({ text: ">> CRT scanlines filter: INACTIVE. Digital flatscreen mode.", type: "output" }); }
        else { newHistory.push({ text: "Format: crt [on/off]. Toggle CRT monitor filter.", type: "error" }); }
        break;

      case "sound":
        const soundArg = parts[1];
        if (soundArg === "on") { setSound(true); newHistory.push({ text: ">> Mechanical keyclick synthesis: ENABLED (Audio Active).", type: "success" }); }
        else if (soundArg === "off") { setSound(false); newHistory.push({ text: ">> Mechanical keyclick synthesis: DISABLED (Quiet Mode).", type: "output" }); }
        else { newHistory.push({ text: "Format: sound [on/off]. Toggle keyboard click synthesis.", type: "error" }); }
        break;

      case "hack":
        setHackingActive(true);
        newHistory.push(
          { text: "====================================================", type: "system" },
          { text: "🧬 FIREWALL DECRYPTION PROTOCOL INITIATED 🧬", type: "system" },
          { text: "TARGET NODE: SECURE_CORE_MAINFRAME", type: "error" },
          { text: "SECURITY WALL: ACTIVE (HIGH LEVEL)", type: "error" },
          { text: "To bypass, enter the correct HEX code matching the active Cyan node:", type: "output" },
          { text: "  A) 4F:3D:8C (Neutral Core)", type: "output" },
          { text: "  B) 7A:9B:2C (Offline Sector)", type: "output" },
          { text: "  C) 0F:F5:FF (Active Cyan Core)", type: "output" },
          { text: "  D) A8:55:F7 (Perimeter Guard)", type: "output" },
          { text: "Type A, B, C, or D (or 'exit') to bypass firewall:", type: "system" },
          { text: "====================================================", type: "system" }
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "diagnostic":
        runSystemDiagnostic();
        return;

      case "matrix":
        setMatrixActive(true);
        newHistory.push({ text: "Initializing mainframe override...", type: "system" }, { text: "WARNING: High-energy digital rain sequence activated.", type: "error" });
        break;

      default:
        newHistory.push({ text: `Command not found: '${primaryCmd}'. Type 'help' to see valid protocols.`, type: "error" });
    }

    setHistory(newHistory);
    setInput("");
  };

  const runSystemDiagnostic = () => {
    setDiagnosticRunning(true);
    setHistory((prev) => [...prev, { text: "> diagnostic", type: "input" }, { text: "Running OS Portfolio Suite Diagnostic...", type: "system" }]);
    const steps: TerminalLine[] = [
      { text: "🧬 Parsing React components tree... OK", type: "output" },
      { text: "🌌 Testing WebGL / Three.js particle canvas... 60 FPS", type: "output" },
      { text: "💾 Synchronizing LocalStorage core database... CONNECTED", type: "output" },
      { text: "☕ Checking developer caffeine levels... 180% (CRITICAL_OPTIMAL)", type: "output" },
      { text: "🔥 Compiling passion and clean-code algorithms... COMPLETE", type: "success" },
      { text: "🚀 ALL PORTFOLIO SYSTEMS RUNNING AT MAXIMUM PERFORMANCE!", type: "success" },
    ];
    steps.forEach((step, index) => {
      setTimeout(() => {
        setHistory((prev) => [...prev, step]);
        if (index === steps.length - 1) setDiagnosticRunning(false);
      }, (index + 1) * 700);
    });
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      playKeyClick(220, 0.08);
      executeCommand(input);
    } else if (e.key === "Backspace") {
      playKeyClick(140, 0.03);
    } else if (e.key.length === 1) {
      playKeyClick(180, 0.03);
    }
  };

  const renderLineText = (line: TerminalLine) => {
    if (line.isHtml) {
      let text = line.text;
      const urlRegex = /(https?:\/\/[^\s\)]+)/g;
      const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
      const phoneRegex = /(\+234\s\d{3}\s\d{3}\s\d{4})/g;
      text = text.replace(emailRegex, '<a href="mailto:$1" class="underline text-cyan hover:text-white transition-colors">$1</a>');
      text = text.replace(phoneRegex, '<a href="https://wa.me/2348055865414" target="_blank" class="underline text-neon hover:text-white transition-colors">$1</a>');
      text = text.replace(urlRegex, '<a href="$1" target="_blank" class="underline text-cyan hover:text-white transition-colors">$1</a>');
      return <span dangerouslySetInnerHTML={{ __html: text }} />;
    }
    return <span>{line.text}</span>;
  };

  return (
    <section id="cyberdeck" ref={sectionRef} className="section-padding relative overflow-hidden bg-[#050507]">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(0,245,255,0.3), transparent)" }} />
      <AnimatePresence>
        {matrixActive && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-30 pointer-events-none overflow-hidden font-mono text-[11px] select-none" style={{ background: "rgba(3,3,5,0.92)", color: "var(--accent-green)", textShadow: "0 0 8px var(--accent-green)" }}>
            <div className="absolute inset-0 flex justify-between px-10 opacity-70">
              {Array.from({ length: 24 }).map((_, i) => <MatrixColumn key={i} delay={i * 0.15} />)}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass p-6 rounded-2xl border border-neon/30 text-center bg-black/80">
                <Shield className="w-12 h-12 mx-auto mb-3 animate-pulse text-neon" />
                <h3 className="text-lg font-bold text-white mb-1">MAINFRAME BYPASS ACTIVE</h3>
                <p className="text-white/60 text-xs">Simulating digital rain overrides...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} className="flex items-center gap-3 mb-10">
          <span className="text-xs font-mono tracking-widest uppercase" style={{ color: "var(--accent-cyan)" }}>03 — Cyber Deck Console</span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-4 flex flex-col justify-between">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
              <h2 className="text-4xl font-bold mb-4 leading-tight">The Interactive <br /><span className="gradient-text">Cyber Deck</span></h2>
              <p className="text-white/50 text-sm leading-relaxed mb-6">Step into the mainframe. This console interfaces directly with my developer profile. Type actual terminal commands or press the shortcut chips to recalibrate global interfaces, run system diagnostics, or play the firewall decryption game.</p>
              <div className="glass rounded-2xl p-4 border border-white/05 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-cyan"><Cpu size={18} className="animate-pulse" /></div>
                  <div>
                    <div className="text-xs font-mono text-white/30">QUANTUM CONNECTION</div>
                    <div className="text-xs font-bold font-mono text-white/70 flex items-center gap-1.5 mt-0.5"><span className="w-1.5 h-1.5 rounded-full bg-neon animate-ping" />SECURE_SHINAAYOMI_LINK</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="space-y-3">
              <div className="text-xs font-mono text-white/30 uppercase tracking-wider">Quick Protocols:</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "🔍 Diagnostics", cmd: "diagnostic", color: "var(--accent-cyan)" },
                  { name: "⚡ Tech Stack", cmd: "skills", color: "var(--accent-violet)" },
                  { name: "📁 Live Sync", cmd: "github", color: "#39ff14" },
                  { name: "💬 Guestbook CLI", cmd: "guestbook view", color: "var(--accent-violet)" },
                  { name: "🔐 Firewall Bypass", cmd: "hack", color: "#f59e0b" },
                ].map((chip) => (
                  <button key={chip.cmd} onClick={() => executeCommand(chip.cmd)} disabled={diagnosticRunning || matrixActive} className="text-xs font-mono px-3.5 py-2 rounded-xl transition-all border border-white/05 hover:bg-white/5 active:scale-95 text-white/80 hover:text-white" style={{ borderLeft: `3px solid ${chip.color}` }}>{chip.name}</button>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.2, duration: 0.6 }} className="lg:col-span-8 flex flex-col glass rounded-3xl overflow-hidden min-h-[460px] max-h-[500px]" style={{ border: "1px solid rgba(0, 245, 255, 0.12)" }}>
            <div className="px-6 py-4 flex items-center justify-between" style={{ background: "rgba(5, 5, 7, 0.9)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <div className="h-4 w-px bg-white/10 mx-2" />
                <div className="flex items-center gap-1.5 text-xs text-white/40 font-mono"><Terminal size={12} className="text-cyan" />shinaayomi@cyberdeck:~</div>
              </div>
              <button onClick={() => setHistory([])} className="text-white/30 hover:text-white/60 transition-colors"><RefreshCw size={12} /></button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto font-mono text-sm space-y-3 scrollbar-thin scrollbar-thumb-cyan" style={{ background: "rgba(3, 3, 5, 0.95)" }}>
              {history.map((line, idx) => (
                <div key={idx} className={`leading-relaxed whitespace-pre-wrap ${line.type === "input" ? "text-white" : line.type === "system" ? "text-violet font-bold" : line.type === "success" ? "text-neon" : line.type === "error" ? "text-red-500" : "text-white/60"}`}>
                  {renderLineText(line)}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
            <div className="px-6 py-4 flex items-center gap-3" style={{ background: "rgba(5, 5, 7, 0.9)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <span className="text-cyan font-mono font-bold select-none">&gt;</span>
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} disabled={diagnosticRunning || matrixActive} placeholder={diagnosticRunning ? "Running suite diagnostic..." : matrixActive ? "System override in progress..." : hackingActive ? "Type A, B, C, or D (or 'exit') to decrypt firewall..." : "Enter query protocol (e.g., help, stats, github, hack)..."} className="flex-grow bg-transparent border-none outline-none text-white font-mono text-sm placeholder-white/20" />
              <button onClick={() => executeCommand(input)} disabled={diagnosticRunning || matrixActive} className="w-8 h-8 rounded-lg glass flex items-center justify-center text-cyan hover:text-white transition-all active:scale-90"><Send size={12} /></button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MatrixColumn({ delay }: { delay: number }) {
  const [text, setText] = useState("");
  useEffect(() => {
    const chars = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const interval = setInterval(() => {
      let result = "";
      const length = Math.floor(Math.random() * 15) + 10;
      for (let i = 0; i < length; i++) result += chars[Math.floor(Math.random() * chars.length)] + "\n";
      setText(result);
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <motion.div initial={{ y: -300, opacity: 0 }} animate={{ y: [0, 500], opacity: [0, 1, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay, ease: "linear" }} className="w-3 text-center leading-none">
      {text}
    </motion.div>
  );
}
