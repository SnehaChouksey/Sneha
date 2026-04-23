import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { SiteNav } from "@/components/SiteNav";
import { PetalCanvas } from "@/components/PetalCanvas";
import { SplashScreen } from "@/components/SplashScreen";
import { HorizontalProjects } from "@/components/HorizontalProjects";
import { GitHubStats } from "@/components/GitHubStats";

gsap.registerPlugin(ScrollTrigger);

const serif = { fontFamily: "'Instrument Serif', serif" };

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Sneha Chouksey — AI Engineer & Product Manager" },
      {
        name: "description",
        content:
          "I build agentic AI systems, automation pipelines, full-stack products — and own them end-to-end as a product manager.",
      },
    ],
  }),
});

// ─── Sections ─────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay loop muted playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <PetalCanvas className="absolute inset-0 w-full h-full z-10 opacity-30" />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/20 to-black/60 pointer-events-none" />

      <div className="relative z-20 h-full flex flex-col items-center justify-start pt-[18vh] text-center px-6">
        <p className="hero-text text-[10px] sm:text-xs uppercase tracking-[0.4em] text-white/70 mb-5 font-medium">
          Sneha Chouksey
        </p>

        <h1
          className="hero-text text-4xl sm:text-5xl md:text-7xl leading-[1.05] tracking-[-1px] max-w-4xl font-normal text-white"
          style={{ ...serif, textShadow: "0 4px 40px rgba(0,0,0,0.8)" }}
        >
          Building what matters.{" "}
          <em className="not-italic text-sun">Shipping what works.</em>
        </h1>

        {/* Identity — AI-first order */}
        <div className="hero-text mt-7 flex flex-wrap gap-2 justify-center">
          {[
            "AI Agent Developer",
            "Automation Systems",
            "Full-Stack Engineer",
            "Product Manager",
            "GenAI",
          ].map((role) => (
            <span
              key={role}
              className="text-[9px] px-4 py-1.5 rounded-full border border-white/20 text-white/50 tracking-[0.2em] uppercase backdrop-blur-sm bg-white/5"
            >
              {role}
            </span>
          ))}
        </div>

        <p
          className="hero-text text-white/70 text-sm sm:text-base max-w-xl mt-7 leading-[1.8] font-light"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
        >
          I engineer agentic AI systems, build automation pipelines, develop
          full-stack products — and own them end-to-end as a product manager.
        </p>

        <div className="hero-text mt-10 flex flex-col sm:flex-row gap-5 items-center">
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="liquid-glass rounded-full px-8 py-3 text-sm text-white/90 hover:text-white hover:scale-[1.02] cursor-none transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Explore the work
          </button>
          <button
            onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}
            className="text-xs text-white/70 hover:text-white uppercase tracking-[0.2em] transition-colors pb-1 border-b border-white/20 hover:border-white/60 cursor-none"
          >
            Read my story
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-[9px] uppercase tracking-[0.4em] flex flex-col items-center gap-2 float">
          <span>scroll</span>
          <span className="w-px h-8 bg-white/30" />
        </div>
      </div>

      <div className="sun-bloom-anchor pointer-events-none absolute bottom-[-40px] left-1/2 -translate-x-1/2 z-[8]">
        <div className="sun-core" />
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section
      id="story"
      className="relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      <PetalCanvas className="story-petals absolute inset-0 w-full h-full z-10 opacity-60" />
      <div className="relative z-20 max-w-5xl mx-auto px-6 sm:px-10 py-40">
        <p className="reveal text-[10px] uppercase tracking-[0.4em] text-[var(--petal)]/70 mb-8">
          Prologue — who I am
        </p>
        <h2 className="reveal text-5xl sm:text-7xl text-white leading-[0.95] max-w-3xl" style={serif}>
          One person.{" "}
          <em className="not-italic text-sun">Four disciplines.</em>
          <br />Infinite curiosity.
        </h2>
        <div className="reveal mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 text-white/70 text-base leading-[1.9]">
          <p>
            I'm Sneha — an AI engineer who builds agentic systems, a full-stack
            developer who ships production products, and a product manager who owns
            outcomes end-to-end. I don't hand off to engineering; I{" "}
            <em className="not-italic text-white">am</em> engineering.
          </p>
          <p>
            My work starts at the architecture level — LangGraph pipelines, FastAPI
            services, RAG systems — and ends at the product level: PRDs, OKRs,
            user feedback loops. The full stack of everything.
          </p>
        </div>
        <div className="reveal mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { icon: "◎", label: "AI Agent Dev",       sub: "LangGraph · MCP · RAG" },
            { icon: "⚡", label: "Automation Eng.",   sub: "Workflows · Integrations" },
            { icon: "⌨", label: "Full-Stack Dev",     sub: "Next.js · FastAPI · DB" },
            { icon: "◈", label: "Product Manager",    sub: "PRDs · OKRs · Roadmaps" },
            { icon: "◐", label: "Design Thinker",    sub: "UI · Motion · Typography" },
          ].map((item) => (
            <div
              key={item.label}
              className="story-card card-3d liquid-glass rounded-2xl p-4 flex flex-col items-start gap-2"
            >
              <span className="text-xl text-sun">{item.icon}</span>
              <p className="text-white text-xs font-medium leading-tight">{item.label}</p>
              <p className="text-white/40 text-[10px] leading-tight">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Bento Work Section ────────────────────────────────────────────────────────

const bentoDomains = [
  {
    size: "large" as const,
    icon: "◎",
    title: "AI Systems & GenAI",
    subtitle: "Agentic AI · RAG Pipelines · MCP · LangGraph",
    body: "Multi-agent orchestration, RAG pipelines tuned for production, on-prem inference with Ollama, MCP integrations. Systems that reason, retrieve, and act — without human loops.",
    items: ["LangGraph", "LangChain", "RAG", "Ollama", "MCP", "Claude · GPT-4 · Gemini", "Qdrant"],
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1200&auto=format&fit=crop",
    imgFallback: "from-[#0a0f1e] to-[#1a1040]",
  },
  {
    size: "small" as const,
    icon: "◈",
    title: "Product Manager",
    subtitle: "PRDs · OKRs · Roadmaps",
    body: "End-to-end ownership. Fuzzy idea to shipped feature — I define success, run research, measure outcomes, and lead delivery.",
    items: ["PRDs", "OKRs / KPIs", "User Research", "Roadmapping", "Agile"],
    img: null,
    imgFallback: "from-[#1a1030] to-[#2a1540]",
  },
  {
    size: "small" as const,
    icon: "⚡",
    title: "Automation Systems",
    subtitle: "Workflow Automation · Enterprise Integrations",
    body: "I build systems that run themselves. Intelligent classification, async pipelines, enterprise-grade automation that removes humans from repetitive loops.",
    items: ["Python", "FastAPI", "Google Cloud", "AWS", "Gemini API", "Node.js"],
    img: null,
    imgFallback: "from-[#0a0520] via-[#14083a] to-[#08051a]",
  },
  {
    size: "large" as const,
    icon: "⌨",
    title: "Full-Stack Engineer",
    subtitle: "Next.js · FastAPI · PostgreSQL · Redis",
    body: "SSR frontends, microservices, databases, async queues, cloud deployments. Every layer, production-ready.",
    items: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "BullMQ", "AWS · Vercel"],
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    imgFallback: "from-[#0a1420] to-[#0f2030]",
  },
];

// ── Marquee skill rows (complete skill set) ────────────────────────────────
type Skill = { name: string; icon: string | null };

const row1: Skill[] = [
  { name: "TypeScript",      icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "JavaScript",      icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "Python",          icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Java",            icon: "https://cdn.simpleicons.org/openjdk/ED8B00" },
  { name: "Next.js",         icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
  { name: "React",           icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Tailwind CSS",    icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Shadcn/UI",       icon: null },
  { name: "HTML5/CSS3",      icon: "https://cdn.simpleicons.org/html5/E34F26" },
  { name: "Framer Motion",   icon: "https://cdn.simpleicons.org/framer/0055FF" },
  { name: "GSAP",            icon: null },
  { name: "Locomotive Scroll", icon: null },
];

const row2: Skill[] = [
  { name: "Node.js",         icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Express",         icon: "https://cdn.simpleicons.org/express/ffffff" },
  { name: "FastAPI",         icon: "https://cdn.simpleicons.org/fastapi/009688" },
  { name: "REST APIs",       icon: null },
  { name: "WebSockets",      icon: null },
  { name: "BullMQ",          icon: null },
  { name: "Redis",           icon: "https://cdn.simpleicons.org/redis/DC382D" },
  { name: "MongoDB",         icon: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "PostgreSQL",      icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "MySQL",           icon: "https://cdn.simpleicons.org/mysql/4479A1" },
  { name: "SQLite",          icon: "https://cdn.simpleicons.org/sqlite/003B57" },
  { name: "Claude",          icon: "https://cdn.simpleicons.org/anthropic/ffffff" },
  { name: "GPT-4",           icon: "https://cdn.simpleicons.org/openai/ffffff" },
  { name: "Gemini",          icon: null },
  { name: "Groq",            icon: null },
  { name: "Ollama",          icon: "https://cdn.simpleicons.org/ollama/ffffff" },
  { name: "LangChain",       icon: null },
  { name: "LangGraph",       icon: null },
  { name: "RAG Pipelines",   icon: null },
  { name: "MCP",             icon: null },
  { name: "AI Agents",       icon: null },
  { name: "Claude Skills",   icon: null },
  { name: "Qdrant",          icon: null },
];

const row3: Skill[] = [
  { name: "AWS",                  icon: "https://cdn.simpleicons.org/amazonaws/FF9900" },
  { name: "Vultr VPS",            icon: "https://cdn.simpleicons.org/vultr/007BFC" },
  { name: "Vercel",               icon: "https://cdn.simpleicons.org/vercel/ffffff" },
  { name: "Render",               icon: "https://cdn.simpleicons.org/render/46E3B7" },
  { name: "Neon",                 icon: null },
  { name: "Google Cloud APIs",    icon: "https://cdn.simpleicons.org/googlecloud/4285F4" },
  { name: "Firebase",             icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
  { name: "Docker",               icon: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Linux/Ubuntu",         icon: "https://cdn.simpleicons.org/linux/FCC624" },
  { name: "OAuth 2.0",            icon: null },
  { name: "Zoom OAuth",           icon: "https://cdn.simpleicons.org/zoom/2D8CFF" },
  { name: "OKRs/KPIs",            icon: null },
  { name: "PRDs",                 icon: null },
  { name: "User Research",        icon: null },
  { name: "Feature Prioritization", icon: null },
];

function WorkSection() {

  return (
    <section
      id="work"
      className="relative"
      style={{ background: "transparent" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 py-36">
        <p className="reveal text-[10px] uppercase tracking-[0.4em] text-[var(--petal)]/70 mb-8">
          Chapter I — what I build
        </p>
        <h2 className="reveal text-5xl sm:text-7xl text-white leading-[0.95] max-w-3xl" style={serif}>
          I sit with the problem{" "}
          <em className="not-italic text-sun">until it tells me what it wants to be.</em>
        </h2>

        {/* ── Bento grid ── */}
        <div className="reveal mt-16 grid grid-cols-3 gap-4 auto-rows-auto">
          {bentoDomains.map((d, i) => {
            const isLarge = d.size === "large";
            return (
              <div
                key={d.title}
                className={`work-card bento-cell card-3d rounded-3xl overflow-hidden relative group ${
                  isLarge ? "col-span-2" : "col-span-1"
                }`}
                style={{ minHeight: isLarge ? "240px" : "180px" }}
              >
                {/* Background image or gradient */}
                {d.img ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${d.img})`,
                      filter: "blur(1.5px) brightness(0.55) saturate(0.8)",
                    }}
                  />
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${d.imgFallback}`}
                  />
                )}

                {/* Overlay — strong gradient so text always pops */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: d.img
                      ? "linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.82) 45%, rgba(0,0,0,0.45) 75%, rgba(0,0,0,0.15) 100%)"
                      : "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.3) 100%)",
                  }}
                />
                {/* Sunflower glow accent */}
                <div
                  className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                  style={{ background: "var(--gradient-sun)" }}
                />

                {/* Content */}
                <div className="relative z-10 p-7 h-full flex flex-col justify-end">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl text-sun">{d.icon}</span>
                    <span
                      className="text-[9px] uppercase tracking-[0.4em]"
                      style={{ color: "rgba(255,217,122,0.5)" }}
                    >
                      {d.subtitle}
                    </span>
                  </div>
                  <h3 className="text-2xl text-white mb-3" style={serif}>
                    {d.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4 max-w-md">
                    {d.body}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {d.items.slice(0, isLarge ? 6 : 4).map((item) => (
                      <span
                        key={item}
                        className="text-[9px] px-3 py-1 rounded-full tracking-wide"
                        style={{
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "rgba(255,255,255,0.55)",
                          background: "rgba(255,255,255,0.05)",
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Toolkit marquee ── */}
        <div className="reveal mt-20">
          <h3 className="text-2xl text-white mb-8" style={serif}>The toolkit</h3>

          {/* Row 1 — Languages + Frontend → */}
          <div className="overflow-hidden marquee-mask mb-3">
            <div className="marquee-fwd flex gap-2.5 w-max">
              {[...row1, ...row1].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 flex-none text-[11px] px-3 py-1.5 rounded-full"
                  style={{
                    border: "1px solid rgba(255,255,255,0.11)",
                    color: "rgba(255,255,255,0.72)",
                    background: "rgba(255,255,255,0.04)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.icon && (
                    <img src={item.icon} alt={item.name} width={12} height={12} className="flex-none opacity-85"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  )}
                  {item.name}
                </span>
              ))}
            </div>
          </div>

          {/* Row 2 — Backend + AI ← */}
          <div className="overflow-hidden marquee-mask mb-3">
            <div className="marquee-rev flex gap-2.5 w-max">
              {[...row2, ...row2].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 flex-none text-[11px] px-3 py-1.5 rounded-full"
                  style={{
                    border: "1px solid rgba(255,217,122,0.13)",
                    color: "rgba(255,217,122,0.72)",
                    background: "rgba(255,217,122,0.04)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.icon && (
                    <img src={item.icon} alt={item.name} width={12} height={12} className="flex-none opacity-85"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  )}
                  {item.name}
                </span>
              ))}
            </div>
          </div>

          {/* Row 3 — Cloud + Product → (slightly slower) */}
          <div className="overflow-hidden marquee-mask">
            <div className="flex gap-2.5 w-max" style={{ animation: "marquee 58s linear infinite" }}>
              {[...row3, ...row3].map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 flex-none text-[11px] px-3 py-1.5 rounded-full"
                  style={{
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.48)",
                    background: "rgba(255,255,255,0.025)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.icon && (
                    <img src={item.icon} alt={item.name} width={12} height={12} className="flex-none opacity-80"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  )}
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <div
      id="projects"
      style={{ background: "transparent" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-36 pb-20">
        <p className="reveal text-[10px] uppercase tracking-[0.4em] text-[var(--petal)]/70 mb-8">
          Chapter II — personal projects
        </p>
        <h2 className="reveal text-5xl sm:text-7xl text-white leading-[0.95] max-w-3xl" style={serif}>
          Small worlds,{" "}
          <em className="not-italic text-sun">built one decision at a time.</em>
        </h2>
        <p className="reveal text-white/40 text-sm mt-6 uppercase tracking-[0.25em]">
          Scroll to explore →
        </p>
      </div>
      <HorizontalProjects />
    </div>
  );
}

// ─── Internship projects nested inside Omysha card ────────────────────────────

const internshipProjects = [
  {
    name: "Zoom Recording Automation Agent",
    type: "Enterprise AI Automation",
    status: "Shipped",
    statusColor: "rgba(100,220,130,0.9)",
    summary:
      "End-to-end autonomous agent managing the full Zoom recording lifecycle for the organisation — intelligent content classification, YouTube upload pipeline, Google Drive archival with folder structure, Postgres transcript storage, and failsafe deletion logic. Runs autonomously without human intervention.",
    stack: ["Python", "FastAPI", "Node.js", "Gemini API", "Google Cloud", "AWS", "Postgres"],
  },
  {
    name: "HR Intelligence Agent",
    type: "Agentic AI System",
    status: "In Development",
    statusColor: "rgba(255,200,60,0.9)",
    summary:
      "Multi-step agentic system built on LangGraph for HR process automation — candidate screening workflows, interview scheduling orchestration, onboarding task management, and a RAG-powered HR knowledge base. Integrated with internal tools via MCP protocols.",
    stack: ["LangGraph", "LangChain", "MCP", "FastAPI", "PostgreSQL", "RAG", "Ollama"],
  },
];

function ExperienceSection() {
  return (
    <section
      id="experience"
      style={{ background: "transparent" }}
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 py-36">
        <p className="reveal text-[10px] uppercase tracking-[0.4em] text-[var(--petal)]/70 mb-8">
          Chapter III — rooms I've been in
        </p>
        <h2 className="reveal text-5xl sm:text-7xl text-white leading-[0.95] max-w-3xl" style={serif}>
          Quiet hours,{" "}
          <em className="not-italic text-sun">loud shipments.</em>
        </h2>

        <div className="mt-16 relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--sunflower)] via-white/20 to-transparent hidden md:block" />

          {/* ── Omysha Foundation card with nested projects ── */}
          <article className="omysha-card exp-card card-3d liquid-glass rounded-3xl p-8 mb-8 md:ml-12 relative overflow-hidden">
            <div
              className="absolute -left-[3.6rem] top-10 w-4 h-4 rounded-full hidden md:block pulse-glow"
              style={{ background: "var(--sunflower)" }}
            />
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-10 blur-3xl"
              style={{ background: "var(--gradient-sun)" }}
            />

            {/* Role header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-5">
              <div>
                <h3 className="text-2xl text-white" style={serif}>
                  AI Product Manager & Full-Stack Developer
                </h3>
                <p className="text-[var(--petal)]/80 text-sm mt-1">
                  Omysha Foundation · VONG ONG & A4G
                </p>
              </div>
              <p className="text-xs text-white/50">Jan 2026 — Present</p>
            </div>

            {/* Role bullets */}
            <ul className="space-y-3 text-sm text-white/75 leading-relaxed mb-8">
              {[
                { label: "Product Management", body: "Defined OKRs and KPIs, wrote PRDs, ran user research, owned the roadmap from architecture to deployment." },
                { label: "Agentic AI & GenAI",  body: "Designed autonomous workflows with LangGraph, LangChain, Ollama, and MCP — multi-step reasoning over RAG pipelines." },
                { label: "Full-Stack & Cloud",  body: "Built and deployed systems across AWS, Vultr, Vercel, Render, and Neon. Google Cloud APIs, Firebase Auth, OAuth 2.0." },
              ].map((b) => (
                <li key={b.label}>
                  <span className="text-[var(--petal)]" style={serif}>{b.label} · </span>
                  {b.body}
                </li>
              ))}
            </ul>

            {/* ── Nested internship projects — reveal on scroll ── */}
            <div
              className="border-t pt-6"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <p
                className="internship-heading text-[9px] uppercase tracking-[0.5em] mb-6"
                style={{ color: "rgba(255,217,122,0.5)" }}
              >
                Shipped during this tenure —
              </p>
              <div className="space-y-5">
                {internshipProjects.map((p, i) => (
                  <div
                    key={p.name}
                    className={`internship-proj internship-proj-${i} rounded-2xl p-5 relative overflow-hidden`}
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {/* Status + type */}
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span
                        className="w-2 h-2 rounded-full flex-none"
                        style={{
                          background: p.statusColor,
                          boxShadow: `0 0 6px ${p.statusColor}`,
                        }}
                      />
                      <span
                        className="text-[9px] uppercase tracking-[0.4em]"
                        style={{ color: p.statusColor }}
                      >
                        {p.status}
                      </span>
                      <span className="text-[9px] text-white/30 uppercase tracking-[0.3em]">
                        · {p.type}
                      </span>
                    </div>

                    <h4 className="text-lg text-white mb-2" style={serif}>
                      {p.name}
                    </h4>
                    <p className="text-sm text-white/60 leading-relaxed mb-4 max-w-2xl">
                      {p.summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="text-[9px] px-3 py-1 rounded-full"
                          style={{
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "rgba(255,255,255,0.5)",
                            background: "rgba(255,255,255,0.04)",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* ── Education ── */}
          <article className="exp-card reveal card-3d liquid-glass rounded-3xl p-8 mb-8 md:ml-12 relative overflow-hidden">
            <div
              className="absolute -left-[3.6rem] top-10 w-4 h-4 rounded-full hidden md:block"
              style={{ background: "rgba(255,255,255,0.4)" }}
            />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-5">
              <div>
                <h3 className="text-2xl text-white" style={serif}>
                  B.Tech, Computer Science & Engineering
                </h3>
                <p className="text-[var(--petal)]/80 text-sm mt-1">
                  Jabalpur Engineering College · CGPA 7.14 / 10
                </p>
              </div>
              <p className="text-xs text-white/50">2023 — 2027</p>
            </div>
            <p className="text-sm text-white/65 leading-relaxed">
              Where the curiosity got formal — and where most of the late-night experiments still happen.
            </p>
          </article>

          {/* ── Wins ── */}
          <div className="reveal card-3d liquid-glass rounded-3xl p-8 md:ml-12 mb-8">
            <h3 className="text-2xl text-white mb-6" style={serif}>Small wins worth mentioning</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--petal)]/70">CodeHunt Hackathon</p>
                <p className="mt-2 text-white">First runner-up among 100 teams.</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-[var(--petal)]/70">Smart India Hackathon</p>
                <p className="mt-2 text-white">Top 5 nationally — shipped a full-stack AI prototype under the buzzer.</p>
              </div>
            </div>
          </div>

          {/* GitHub contribution calendar */}
          <GitHubStats />
        </div>
      </div>
    </section>
  );
}

function ResumeSection() {
  return (
    <section
      id="resume"
      className="relative"
      style={{ background: "transparent" }}
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 py-24">
        <div className="reveal flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 p-8 rounded-3xl relative overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.025)" }}
        >
          {/* Glow */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none"
            style={{ background: "var(--gradient-sun)" }} />

          <div>
            <p className="text-[9px] uppercase tracking-[0.5em] text-[var(--petal)]/60 mb-3">
              Full résumé
            </p>
            <h3 className="text-3xl text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>
              See the full picture.
            </h3>
            <p className="text-white/45 text-sm mt-2 max-w-sm leading-relaxed">
              Projects, stack, experience — all in one document.
            </p>
          </div>

          <a
            href="https://drive.google.com/file/d/1y2Pm0xKcTJupfNkYyfYARbgE_7bVRdlN/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="group flex-none flex items-center gap-3 px-7 py-3.5 rounded-full transition-all duration-300 text-sm"
            style={{
              border: "1px solid rgba(255,217,122,0.35)",
              color: "var(--petal)",
              background: "rgba(255,217,122,0.05)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,217,122,0.12)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,217,122,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,217,122,0.05)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,217,122,0.35)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="12" y1="11" x2="12" y2="17"/>
              <polyline points="9 14 12 17 15 14"/>
            </svg>
            View Résumé ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const socials = [
    {
      label: "Email",
      href: "mailto:snehachouksey2403@gmail.com",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="m2 7 10 7 10-7"/>
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sneha-chouksey/",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
    {
      label: "GitHub",
      href: "https://github.com/SnehaChouksey",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      ),
    },
    {
      label: "Phone",
      href: "tel:+919340749064",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.09 6.09l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
    },
  ];
  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "transparent" }}
    >
      <PetalCanvas className="absolute inset-0 w-full h-full z-10 opacity-25" />
      <div
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full opacity-12 blur-3xl pointer-events-none"
        style={{ background: "var(--gradient-sun)" }}
      />
      <div className="relative z-20 max-w-4xl mx-auto px-6 sm:px-10 py-40 min-h-[90vh] flex flex-col justify-center">
        <div className="reveal mb-16 flex items-center gap-5">
          <div className="sunflower" style={{ width: "56px", height: "56px" }} />
          <span className="text-5xl text-white/90" style={serif}>sneha.</span>
        </div>
        <h2 className="reveal text-5xl sm:text-7xl text-white leading-[0.95] max-w-2xl" style={serif}>
          Let's build something{" "}
          <em className="not-italic text-sun">worth using.</em>
        </h2>
        <p className="reveal text-white/50 max-w-md mt-8 text-base leading-[1.9]">
          Open to AI engineering, agentic AI work, full-stack roles, and the occasional ambitious idea over coffee.
        </p>
        {/* Icon-only social links */}
        <div className="reveal mt-14 flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="group w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.03)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,217,122,0.4)";
                (e.currentTarget as HTMLElement).style.color = "var(--petal)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,217,122,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">Made with curiosity & TypeScript</p>
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">Sneha Chouksey © 2025</p>
        </div>
      </div>
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function HomePage() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    if (!splashDone) return;

    // ── Lenis smooth scroll ───────────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    lenis.on("scroll", () => ScrollTrigger.update());
    gsap.ticker.add((time: number) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // ── Progress bar ─────────────────────────────────────────────────────────
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0,
        },
      });
    }

    // ── Sun bloom ────────────────────────────────────────────────────────────
    gsap.fromTo(".sun-core",
      { scale: 1, opacity: 0.9 },
      {
        scale: 80, opacity: 0, ease: "none",
        scrollTrigger: { trigger: "#story", start: "top 100%", end: "top 0%", scrub: true },
      }
    );

    // ── Hero text parallax ───────────────────────────────────────────────────
    gsap.to(".hero-text", {
      y: -70, ease: "none",
      scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
    });

    // ── Story petals parallax ────────────────────────────────────────────────
    gsap.to(".story-petals", {
      y: -60, ease: "none",
      scrollTrigger: { trigger: "#story", start: "top bottom", end: "bottom top", scrub: true },
    });

    // ── Generic reveal — stagger siblings ────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el, i) => {
      const parent = el.parentElement;
      const siblings = parent ? Array.from(parent.querySelectorAll(".reveal")) : [el];
      const idx = siblings.indexOf(el);
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1.1,
          delay: idx * 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    });

    // ── Story discipline cards fan out ───────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".story-card").forEach((el, i) => {
      const total = 5;
      const cx = (total - 1) / 2;
      gsap.fromTo(el,
        { opacity: 0, x: (i - cx) * 25, y: Math.abs(i - cx) * 15 + 30, scale: 0.92 },
        {
          opacity: 1, x: 0, y: 0, scale: 1,
          duration: 1, delay: i * 0.07, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
        }
      );
    });

    // ── Bento work cards: alternating left / right entrance ──────────────────
    gsap.utils.toArray<HTMLElement>(".work-card").forEach((el, i) => {
      const xFrom = i % 2 === 0 ? -80 : 80;
      gsap.fromTo(el,
        { opacity: 0, x: xFrom, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1.1, ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    });

    // ── Bento cell image parallax on hover is CSS; no extra GSAP needed ──────

    // ── Experience: Omysha card zoom-in from compressed ───────────────────────
    const omyshaCard = document.querySelector<HTMLElement>(".omysha-card");
    if (omyshaCard) {
      gsap.fromTo(omyshaCard,
        { scale: 0.88, opacity: 0, borderRadius: "48px", y: 60 },
        {
          scale: 1, opacity: 1, borderRadius: "24px", y: 0,
          duration: 1.4, ease: "expo.out",
          scrollTrigger: { trigger: omyshaCard, start: "top 82%", toggleActions: "play none none none" },
        }
      );
    }

    // ── Other exp-cards ───────────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".exp-card:not(.omysha-card)").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, x: -60, skewX: 0.8 },
        {
          opacity: 1, x: 0, skewX: 0, duration: 1.1, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    });

    // ── Internship project items: stagger rise ───────────────────────────────
    gsap.utils.toArray<HTMLElement>(".internship-proj").forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1, delay: i * 0.18, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" },
        }
      );
    });

    // ── Internship heading slide ──────────────────────────────────────────────
    gsap.fromTo(".internship-heading",
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: {
          trigger: ".internship-heading",
          start: "top 92%",
          toggleActions: "play none none none",
        },
      }
    );

    // ── Contact logo sunflower spin-in ───────────────────────────────────────
    gsap.fromTo("#contact .sunflower",
      { scale: 0, rotation: -180, opacity: 0 },
      {
        scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.6)",
        scrollTrigger: { trigger: "#contact", start: "top 80%", toggleActions: "play none none none" },
      }
    );

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [splashDone]);

  return (
    <>
      <SplashScreen onComplete={() => setSplashDone(true)} />
      <div className="bg-background min-h-screen">
        <div ref={progressRef} className="scroll-progress-bar" />
        <SiteNav />
        <HeroSection />
        <StorySection />
        <WorkSection />
        <ProjectsSection />
        <ExperienceSection />
        <ResumeSection />
        <ContactSection />
      </div>
    </>
  );
}
