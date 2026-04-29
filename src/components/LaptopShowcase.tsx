import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const serif = { fontFamily: "'Instrument Serif', serif" };

const projects = [
  {
    n: "01",
    name: "Acadlyst",
    tag: "AI-Powered Academic Copilot",
    body: "A production-grade RAG pipeline (LangChain + Qdrant) for PDF ingestion, semantic chunking, and context-ranked retrieval, with page-level citations, AI summaries, and quiz generation.",
    stack: ["Next.js", "LangChain", "Qdrant", "BullMQ", "Redis", "Postgres", "Clerk"],
    img: "/project-acadlyst.png",
    href: "https://acadlyst-opal.vercel.app/",
  },
  {
    n: "02",
    name: "Serene.AI",
    tag: "LLM Mental Wellness Companion",
    body: "A conversational AI agent with session memory, careful context engineering, and an Ollama offline fallback. Mood tracking, weekly AI insights, and Framer Motion + GSAP for the soft moments.",
    stack: ["Next.js", "LangChain", "Groq", "Ollama", "Prisma", "Framer Motion", "GSAP"],
    img: "/project-serene.png",
    href: "https://serene-ai-fawn.vercel.app/",
  },
  {
    n: "03",
    name: "AI Swaraj",
    tag: "LLM-Evaluated Essay Contest",
    body: "Scalable contest platform supporting 1000+ concurrent submissions, with an LLM-powered multi-criteria evaluation pipeline, plagiarism checks, and async BullMQ workers.",
    stack: ["Next.js", "LangChain", "Qdrant", "Postgres", "BullMQ", "Redis"],
    img: "/project-acadlyst.png",
    href: "",
  },
  {
    n: "04",
    name: "Zoom Automation",
    tag: "Autonomous Recording Lifecycle",
    body: "An end-to-end AI agent managing enterprise Zoom recordings: intelligent classification, YouTube pipeline, Drive archival, transcript storage, and failsafe deletion.",
    stack: ["Python", "FastAPI", "Node.js", "Gemini API", "Google Cloud", "AWS"],
    img: "/project-serene.png",
    href: "",
  },
];

export function LaptopShowcase() {
  const [active, setActive] = useState(0);
  const screenRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const p = projects[active];

  function go(dir: 1 | -1) {
    const next = (active + dir + projects.length) % projects.length;

    // Animate out
    const tl = gsap.timeline({
      onComplete: () => setActive(next),
    });

    tl.to(screenRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in",
    });

    tl.to(
      infoRef.current,
      { opacity: 0, x: dir * -30, duration: 0.25, ease: "power2.in" },
      0
    );
  }

  // Animate in on active change
  useEffect(() => {
    gsap.fromTo(
      screenRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
    );
    gsap.fromTo(
      infoRef.current,
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.5, delay: 0.1, ease: "power3.out" }
    );
  }, [active]);

  return (
    <div className="reveal flex flex-col items-center gap-12">
      {/* Laptop frame */}
      <div className="relative w-full max-w-3xl mx-auto">
        {/* Screen bezel */}
        <div
          className="relative rounded-t-2xl border-[3px] border-white/10 overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #1a1a2e 0%, #0d0d1a 100%)",
            aspectRatio: "16/10",
          }}
        >
          {/* Inner screen glow */}
          <div className="absolute inset-0 rounded-t-xl overflow-hidden">
            <img
              ref={screenRef}
              src={p.img}
              alt={p.name}
              className="w-full h-full object-cover object-top"
            />
            {/* Reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-all hover:scale-110"
            aria-label="Previous project"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-all hover:scale-110"
            aria-label="Next project"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Project counter */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === active ? "bg-[var(--sunflower)] w-6" : "bg-white/30 hover:bg-white/50"}`}
              />
            ))}
          </div>
        </div>

        {/* Laptop base */}
        <div className="relative h-4 bg-gradient-to-b from-white/10 to-white/5 rounded-b-lg mx-auto" style={{ width: "110%" }}>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/15 rounded-full" />
        </div>
        {/* Shadow */}
        <div className="absolute -bottom-4 left-[5%] right-[5%] h-8 bg-[var(--sunflower)]/10 blur-2xl rounded-full" />
      </div>

      {/* Project info card */}
      <div ref={infoRef} className="w-full max-w-3xl">
        <div className="card-3d liquid-glass rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "var(--gradient-sun)" }} />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--petal)]/30 to-transparent" />

          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--petal)]/80">{p.n}</p>
              <h3 className="mt-1 text-3xl text-white" style={serif}>{p.name}</h3>
              <p className="text-xs text-white/50 mt-1">{p.tag}</p>
            </div>
            {p.href && (
              <a href={p.href} target="_blank" rel="noreferrer"
                className="text-xs text-[var(--petal)] border border-[var(--petal)]/30 rounded-full px-4 py-2 hover:bg-[var(--petal)]/10 transition-colors">
                Visit Live ↗
              </a>
            )}
          </div>

          <p className="text-white/70 text-sm leading-relaxed mt-2">{p.body}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="text-[10px] px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
