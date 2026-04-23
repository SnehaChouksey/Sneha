import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Projects — Sneha Chouksey" },
      { name: "description", content: "Acadlyst, Serene.AI, AI Swaraj, and a Zoom automation agent. Things I've actually shipped." },
      { property: "og:title", content: "Projects — Sneha Chouksey" },
      { property: "og:description", content: "Acadlyst, Serene.AI, AI Swaraj, and more — built and shipped." },
    ],
  }),
});

const serif = { fontFamily: "'Instrument Serif', serif" };

const projects = [
  {
    n: "01",
    name: "Acadlyst",
    tag: "AI-Powered Academic Copilot",
    body: "A production-grade RAG pipeline (LangChain + Qdrant) for PDF ingestion, semantic chunking, and context-ranked retrieval — with page-level citations, AI summaries, and quiz generation. Async BullMQ + Redis workers keep the UI buttery while heavy AI tasks run in the background. Shipped as a full Next.js SSR SaaS on Vercel + Render with Neon Postgres and Clerk RBAC.",
    stack: ["Next.js", "React", "Node", "Postgres", "LangChain", "Qdrant", "BullMQ", "Redis", "Clerk"],
    href: "https://github.com/SnehaChouksey",
  },
  {
    n: "02",
    name: "Serene.AI",
    tag: "LLM Mental Wellness Companion",
    body: "A conversational AI agent (LangChain + Groq) with session memory, careful system-prompt and context engineering, and an Ollama offline fallback. Mood tracking on Postgres + Prisma, weekly AI insights, NextAuth-protected dashboards, and a Next.js SSR frontend with Framer Motion + GSAP for the small, soft moments.",
    stack: ["Next.js", "LangChain", "Groq", "Ollama", "Prisma", "Postgres", "Framer Motion", "GSAP"],
    href: "https://github.com/SnehaChouksey",
  },
  {
    n: "03",
    name: "AI Swaraj",
    tag: "LLM-Evaluated Essay Contest Platform",
    body: "Scalable contest platform supporting 1000+ concurrent submissions, with an LLM-powered multi-criteria evaluation pipeline that returns structured JSON scores, Turnitin-based plagiarism checks, and async BullMQ workers for non-blocking high-throughput processing.",
    stack: ["Next.js", "LangChain", "Qdrant", "Postgres", "BullMQ", "Redis"],
  },
  {
    n: "04",
    name: "Zoom Automation Agent",
    tag: "Autonomous Recording Lifecycle",
    body: "An end-to-end AI agent that manages enterprise Zoom recordings — intelligent classification, YouTube pipeline compression, Drive archival, transcript storage, and failsafe deletion. Replaced an entire manual video-ops workflow.",
    stack: ["Python", "FastAPI", "Node", "Next.js", "Gemini API", "Google Cloud", "Zoom OAuth", "AWS"],
  },
];

function ProjectsPage() {
  return (
    <main className="surface-cream magic-noise min-h-screen">
      <SiteNav />
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 pt-36 pb-24">
      <p className="animate-fade-rise text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Chapter three — the things I've made</p>
      <h1 className="animate-fade-rise text-5xl sm:text-7xl leading-[0.95] tracking-tight text-white max-w-4xl" style={serif}>
        Small worlds, <em className="not-italic text-sun">built one decision at a time.</em>
      </h1>
      <p className="animate-fade-rise-delay text-white/75 max-w-2xl mt-8 text-lg leading-relaxed">
        Each of these started as a question I couldn't stop thinking about.
      </p>

      <div className="animate-fade-rise-delay-2 mt-16 space-y-8">
        {projects.map((p) => (
          <article key={p.name} className="card-3d liquid-glass rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{ background: "var(--gradient-sun)" }} />
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8">
              <div className="md:w-32">
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--petal)]">{p.n}</p>
                <h2 className="mt-2 text-4xl text-white" style={serif}>{p.name}</h2>
                <p className="text-sm text-white/60 mt-1">{p.tag}</p>
              </div>
              <div>
                <p className="text-white/85 leading-relaxed">{p.body}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="text-xs px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/90">{s}</span>
                  ))}
                </div>
                {p.href && (
                  <a href={p.href} target="_blank" rel="noreferrer" className="inline-block mt-6 text-sm text-[var(--petal)] border-b border-[var(--petal)]/40 hover:border-[var(--petal)] transition-colors">
                    View on GitHub →
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-20 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <p className="text-white/70 max-w-md">Last chapter — saying hello.</p>
        <Link to="/contact" className="liquid-glass rounded-full px-8 py-3 text-sm text-white hover:scale-[1.03] pulse-glow">
          Contact →
        </Link>
      </div>
      </div>
    </main>
  );
}