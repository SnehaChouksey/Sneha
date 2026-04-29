import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const serif = { fontFamily: "'Instrument Serif', serif" };

const projects = [
  {
    n: "01",
    name: "Acadlyst",
    tag: "AI-Powered Academic Copilot",
    body: "A production-grade RAG pipeline for semantic PDF ingestion and context-ranked retrieval. Features page-level citations, AI summaries, and automated quiz generation.",
    stack: ["Next.js", "LangChain", "Qdrant", "BullMQ", "Postgres"],
    img: "/acadlyst_hero_dark.png", // We'll assume the user will rename or we'll use the path
    href: "https://acadlyst-opal.vercel.app/",
  },
  {
    n: "02",
    name: "Serene.AI",
    tag: "LLM Mental Wellness Companion",
    body: "A conversational AI agent with session memory and mood tracking. Designed for soft, meaningful interactions with a focus on tranquility.",
    stack: ["Next.js", "LangChain", "Groq", "Prisma", "Framer Motion"],
    img: "/project-serene.png",
    href: "https://serene-ai-fawn.vercel.app/",
  },
  {
    n: "03",
    name: "AI Swaraj",
    tag: "LLM-Evaluated Essay Contest",
    body: "Scalable platform for high-throughput essay evaluation using multi-criteria LLM analysis and plagiarism detection.",
    stack: ["Next.js", "LangChain", "Qdrant", "BullMQ"],
    img: "/acadlyst_hero_dark.png",
    href: "",
  },
  {
    n: "04",
    name: "Zoom Automation",
    tag: "Autonomous Recording Lifecycle",
    body: "Intelligent agent managing enterprise recordings: from classification to archival and deletion.",
    stack: ["Python", "FastAPI", "Gemini API", "GCP"],
    img: "/project-serene.png",
    href: "",
  },
];

export function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const p = projects[active];

  function nextProject() {
    const next = (active + 1) % projects.length;
    animateChange(next);
  }

  function prevProject() {
    const next = (active - 1 + projects.length) % projects.length;
    animateChange(next);
  }

  function animateChange(next: number) {
    const tl = gsap.timeline({
      onComplete: () => setActive(next),
    });

    tl.to([imgRef.current, infoRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: "power2.in",
    });
  }

  useEffect(() => {
    gsap.fromTo(
      [imgRef.current, infoRef.current],
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }
    );
  }, [active]);

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto py-10">
      {/* Serene Project Display */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
        
        {/* Project Visual */}
        <div className="relative group">
          <div className="absolute inset-0 bg-[var(--sunflower)]/10 blur-[100px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0818]">
             <img
              ref={imgRef}
              src={p.img}
              alt={p.name}
              className="w-full aspect-[16/10] object-cover object-top opacity-0"
              onError={(e) => {
                // Fallback if image doesn't exist yet
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
              }}
            />
            {/* Elegant Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
          
          {/* Controls */}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-4">
            <button onClick={prevProject} className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all">
              ←
            </button>
            <button onClick={nextProject} className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all">
              →
            </button>
          </div>
        </div>

        {/* Project Details */}
        <div ref={infoRef} className="opacity-0">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--petal)]/60 mb-4">{p.n}</p>
          <h3 className="text-4xl sm:text-6xl text-white mb-6" style={serif}>{p.name}</h3>
          <p className="text-white/50 text-xs uppercase tracking-widest mb-8">{p.tag}</p>
          
          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-md">
            {p.body}
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            {p.stack.map(s => (
              <span key={s} className="text-[10px] px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 tracking-wider font-light">
                {s}
              </span>
            ))}
          </div>

          {p.href && (
            <a href={p.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-white group">
              <span className="text-sm uppercase tracking-widest group-hover:mr-2 transition-all">Launch Project</span>
              <span className="text-xl">↗</span>
            </a>
          )}
        </div>
      </div>

      {/* Background Project Titles (Serene Touch) */}
      <div className="absolute -bottom-20 left-0 w-full overflow-hidden whitespace-nowrap pointer-events-none opacity-[0.03] select-none">
        <h2 className="text-[15vw] font-bold uppercase tracking-tighter" style={serif}>
          {p.name} {p.name} {p.name}
        </h2>
      </div>
    </div>
  );
}
