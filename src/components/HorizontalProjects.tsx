import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const serif = { fontFamily: "'Instrument Serif', serif" };

const projects = [
  {
    n: "01",
    name: "Acadlyst",
    tag: "AI-Powered Academic Copilot",
    role: "Full-Stack · GenAI · Product",
    body: "A production-grade RAG pipeline for semantic PDF ingestion: page-level citations, AI summaries, automated quiz generation, and a BullMQ async worker farm handling 1000+ concurrent submissions.",
    stack: ["Next.js", "LangChain", "Qdrant", "BullMQ", "Postgres", "Redis", "Clerk"],
    img: "/acadlyst_hero_dark.png",
    href: "https://acadlyst-opal.vercel.app/",
    github: "https://github.com/SnehaChouksey/Acadlyst",
    bg: "#060a14",
    glow: "rgba(232,155,26,0.06)",
  },
  {
    n: "02",
    name: "Serene.AI",
    tag: "LLM Mental Wellness Companion",
    role: "AI Product · Full-Stack · Design",
    body: "A conversational AI agent with session memory, careful context engineering, and an Ollama offline fallback. Mood tracking, weekly AI-generated insights, built with a soft hand.",
    stack: ["Next.js", "LangChain", "Groq", "Ollama", "Prisma", "Framer Motion", "GSAP"],
    img: "/project-serene.png",
    href: "https://serene-ai-fawn.vercel.app/",
    github: "https://github.com/SnehaChouksey/serene-ai",
    bg: "#060f10",
    glow: "rgba(80,180,160,0.05)",
  },
];

export function HorizontalProjects() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  // Mobile detection with resize listener
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // GSAP horizontal scroll — desktop only
  useEffect(() => {
    if (isMobile) return;

    const wrap = wrapRef.current;
    const strip = stripRef.current;
    if (!wrap || !strip) return;

    const ctx = gsap.context(() => {
      // ── Master horizontal tween ───────────────────────────────────────────
      const htween = gsap.to(strip, {
        x: () => -(strip.scrollWidth - document.documentElement.clientWidth),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${strip.scrollWidth - document.documentElement.clientWidth}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setActiveIdx(Math.round(self.progress * (projects.length - 1)));
          },
        },
      });

      // ── Per-panel animations using containerAnimation ─────────────────────
      gsap.utils.toArray<HTMLElement>(".h-panel").forEach((panel) => {
        const imgWrap = panel.querySelector<HTMLElement>(".clip-reveal");
        const info    = panel.querySelector<HTMLElement>(".panel-info");
        const num     = panel.querySelector<HTMLElement>(".panel-num");
        const imgEl   = panel.querySelector<HTMLElement>(".clip-reveal img");

        if (imgWrap) {
          gsap.fromTo(
            imgWrap,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              ease: "expo.inOut",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: htween,
                start: "left right",
                end: "center center",
                scrub: 0.8,
              },
            }
          );
        }

        if (imgEl) {
          gsap.fromTo(
            imgEl,
            { x: "8%" },
            {
              x: "-4%",
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: htween,
                start: "left right",
                end: "right left",
                scrub: 1.5,
              },
            }
          );
        }

        if (info) {
          gsap.fromTo(
            info,
            { opacity: 0, x: -60 },
            {
              opacity: 1,
              x: 0,
              ease: "power4.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: htween,
                start: "left 85%",
                end: "left 25%",
                scrub: 0.8,
              },
            }
          );
        }

        if (num) {
          gsap.fromTo(
            num,
            { opacity: 0, y: 100 },
            {
              opacity: 0.035,
              y: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: htween,
                start: "left 95%",
                end: "left 35%",
                scrub: 0.8,
              },
            }
          );
        }
      });
    }, wrap);

    return () => ctx.revert();
  }, [isMobile]);

  // ── Mobile: vertical card stack ──────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="px-5 pb-16 space-y-6">
        {projects.map((p) => (
          <div
            key={p.n}
            className="rounded-2xl overflow-hidden relative"
            style={{ background: p.bg, border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${p.glow} 0%, transparent 70%)` }}
            />

            {/* Project image */}
            {p.img && (
              <div className="relative w-full" style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 100%)" }}
                />
              </div>
            )}

            {/* Content */}
            <div className="relative z-10 p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-6 h-px" style={{ background: "var(--petal)", opacity: 0.5 }} />
                <p className="text-[9px] uppercase tracking-[0.5em]" style={{ color: "rgba(255,217,122,0.55)" }}>
                  {p.role}
                </p>
              </div>

              <h3 className="text-4xl text-white leading-tight mb-1" style={serif}>{p.name}</h3>
              <p className="text-xs uppercase tracking-wider mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>{p.tag}</p>
              <p className="text-sm leading-[1.85] mb-5" style={{ color: "rgba(255,255,255,0.58)" }}>{p.body}</p>

              {/* Stack pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[9px] px-3 py-1.5 rounded-full"
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.48)",
                      background: "rgba(255,255,255,0.04)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTA links */}
              <div className="flex items-center gap-6">
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs uppercase tracking-[0.3em] transition-colors hover:opacity-80"
                    style={{ color: "var(--petal)" }}
                  >
                    Live ↗
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] transition-colors hover:opacity-80"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ── Desktop: GSAP horizontal scroll ──────────────────────────────────────
  return (
    <div ref={wrapRef} className="relative h-screen overflow-hidden">
      {/* Horizontal strip */}
      <div
        ref={stripRef}
        className="flex h-full"
        style={{ width: `${projects.length * 100}vw` }}
      >
        {projects.map((p, i) => (
          <div
            key={p.n}
            className="h-panel relative flex-none w-screen h-full flex items-center overflow-hidden"
            style={{ background: p.bg }}
          >
            {/* Ambient radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 55% 70% at 75% 50%, ${p.glow} 0%, transparent 70%)`,
              }}
            />
            {/* Top hairline */}
            <div
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, transparent 0%, rgba(245,197,66,0.15) 50%, transparent 100%)",
              }}
            />

            {/* Giant background number */}
            <span
              className="panel-num absolute -bottom-6 left-0 leading-none select-none pointer-events-none text-white"
              style={{ ...serif, fontSize: "32vw", opacity: 0 }}
            >
              {p.n}
            </span>

            {/* ── Left: project info ─────────────────────────────────────── */}
            <div
              className="panel-info relative z-10 w-[44%] pl-12 pr-6 lg:pl-20 lg:pr-10 xl:pl-28 flex flex-col gap-5"
              style={{ opacity: 0 }}
            >
              {/* Role tag */}
              <div className="flex items-center gap-3">
                <span className="w-8 h-px" style={{ background: "var(--petal)", opacity: 0.5 }} />
                <p
                  className="text-[9px] uppercase tracking-[0.55em]"
                  style={{ color: "rgba(255,217,122,0.55)" }}
                >
                  {p.role}
                </p>
              </div>

              {/* Project name */}
              <h3
                className="text-white leading-[0.88] tracking-[-2px]"
                style={{
                  ...serif,
                  fontSize: "clamp(3rem, 6vw, 6.5rem)",
                }}
              >
                {p.name}
              </h3>

              {/* Tag */}
              <p
                className="text-xs uppercase tracking-[0.28em]"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {p.tag}
              </p>

              {/* Description */}
              <p
                className="text-sm leading-[1.9] max-w-[360px]"
                style={{ color: "rgba(255,255,255,0.58)" }}
              >
                {p.body}
              </p>

              {/* Stack */}
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[9px] px-3 py-1.5 rounded-full tracking-wider"
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.48)",
                      background: "rgba(255,255,255,0.04)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-4 mt-1 flex-wrap">
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 w-fit"
                  >
                    <span
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300 group-hover:scale-110"
                      style={{
                        border: "1px solid rgba(255,217,122,0.35)",
                        color: "var(--petal)",
                      }}
                    >
                      ↗
                    </span>
                    <span
                      className="text-[9px] uppercase tracking-[0.35em] transition-colors duration-300 group-hover:text-white"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      View live
                    </span>
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 w-fit"
                  >
                    <span
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    </span>
                    <span
                      className="text-[9px] uppercase tracking-[0.35em] transition-colors duration-300 group-hover:text-white"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      GitHub
                    </span>
                  </a>
                )}
              </div>
            </div>

            {/* ── Right: contained screenshot ───────────────────────────── */}
            <div
              className="clip-reveal absolute"
              style={{
                right: "5%",
                top: "50%",
                transform: "translateY(-50%)",
                width: "clamp(280px, 36vw, 520px)",
                clipPath: "inset(0 100% 0 0)",
              }}
            >
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-30 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at center, ${p.glow.replace("0.05", "0.4").replace("0.06", "0.4")} 0%, transparent 70%)` }}
              />
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(255,255,255,0.09)",
                  boxShadow: "0 24px 64px -12px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
                }}
              >
                <div
                  className="flex items-center gap-1.5 px-3 h-7"
                  style={{ background: "rgba(20,20,30,0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
                  <span
                    className="ml-auto text-[8px] pr-1 font-mono"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    {p.href?.replace("https://", "").split("/")[0] ?? "localhost"}
                  </span>
                </div>
                <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top pointer-events-none"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Project index label (top right) */}
            <div className="absolute top-8 right-8 z-20 text-right">
              <p
                className="text-[9px] uppercase tracking-[0.5em]"
                style={{ color: "rgba(255,217,122,0.4)" }}
              >
                {p.n} / 0{projects.length}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Progress indicator ─────────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {projects.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-500"
            style={{
              width: i === activeIdx ? "32px" : "6px",
              height: "2px",
              background:
                i === activeIdx
                  ? "var(--petal)"
                  : "rgba(255,255,255,0.18)",
            }}
          />
        ))}
        <span
          className="ml-3 text-[9px] uppercase tracking-[0.4em] transition-all duration-300"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {projects[activeIdx].name}
        </span>
      </div>
    </div>
  );
}
