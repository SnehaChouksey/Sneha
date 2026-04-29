import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";

export const Route = createFileRoute("/experience")({
  component: ExperiencePage,
});

const serif = { fontFamily: "'Instrument Serif', serif" };

function ExperiencePage() {
  return (
    <main className="surface-meadow magic-noise min-h-screen">
      <SiteNav />
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 pt-36 pb-24">
      <p className="animate-fade-rise text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Chapter two: the rooms I've been in</p>
      <h1 className="animate-fade-rise text-5xl sm:text-7xl leading-[0.95] tracking-tight text-white max-w-4xl" style={serif}>
        Quiet hours, <em className="not-italic text-sun">loud shipments.</em>
      </h1>
      <p className="animate-fade-rise-delay text-white/75 max-w-2xl mt-8 text-lg leading-relaxed">
        I learn fastest when I'm building something real, with real users, against a real deadline.
      </p>

      <div className="animate-fade-rise-delay-2 mt-16 relative">
        {/* Vertical timeline line */}
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--sunflower)] via-white/20 to-transparent hidden md:block" />

        <article className="card-3d liquid-glass rounded-3xl p-8 mb-10 md:ml-12 relative">
          <div className="absolute -left-[3.4rem] top-10 w-4 h-4 rounded-full bg-[var(--sunflower)] pulse-glow hidden md:block" />
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-6">
            <div>
              <h2 className="text-3xl text-white" style={serif}>AI Product Manager & Full-Stack Developer</h2>
              <p className="text-[var(--petal)]/80 mt-1">Omysha Foundation · VONG ONG & A4G</p>
            </div>
            <p className="text-sm text-white/60">Jan 2026 — Present</p>
          </div>
          <ul className="space-y-4 text-sm text-white/85 leading-relaxed">
            <li><span className="text-[var(--petal)]" style={serif}>Agentic AI & GenAI · </span> Designed autonomous agentic workflows with LangGraph, LangChain, Ollama, and MCP. Multi-step reasoning over RAG pipelines tuned with Claude Skills.</li>
            <li><span className="text-[var(--petal)]" style={serif}>Full-Stack & Cloud · </span> Built and deployed systems across AWS, Vultr, Vercel, Render, and Neon. Integrated Google Cloud APIs, Firebase Auth, and OAuth 2.0.</li>
            <li><span className="text-[var(--petal)]" style={serif}>Product Ownership · </span> Defined OKRs and success metrics, iterated on user feedback, led delivery from architecture to deployment across two production tools.</li>
            <li><span className="text-[var(--petal)]" style={serif}>Zoom Automation Agent · </span> End-to-end AI agent managing the full enterprise recording lifecycle: classification, compression, archival, transcripts, deletion.</li>
            <li><span className="text-[var(--petal)]" style={serif}>AI Swaraj contest platform · </span> Scalable essay platform supporting 1000+ concurrent submissions with LLM evaluation, plagiarism detection, and async workers.</li>
          </ul>
        </article>

        <article className="card-3d liquid-glass rounded-3xl p-8 mb-10 md:ml-12 relative">
          <div className="absolute -left-[3.4rem] top-10 w-4 h-4 rounded-full bg-white/40 hidden md:block" />
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-6">
            <div>
              <h2 className="text-3xl text-white" style={serif}>B.Tech, Computer Science & Engineering</h2>
              <p className="text-[var(--petal)]/80 mt-1">Jabalpur Engineering College · CGPA 7.14 / 10</p>
            </div>
            <p className="text-sm text-white/60">2023 — 2027</p>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Where the curiosity got formal, and where most of the late-night experiments still happen.
          </p>
        </article>

        <article className="card-3d liquid-glass rounded-3xl p-8 md:ml-12 relative">
          <div className="absolute -left-[3.4rem] top-10 w-4 h-4 rounded-full bg-white/40 hidden md:block" />
          <h2 className="text-3xl text-white mb-5" style={serif}>Small wins worth mentioning</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--petal)]/80">CodeHunt Hackathon</p>
              <p className="mt-2 text-white">First runner-up among 100 teams.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--petal)]/80">Smart India Hackathon</p>
              <p className="mt-2 text-white">Top 5 nationally. Shipped a full-stack AI prototype under the buzzer.</p>
            </div>
          </div>
        </article>
      </div>

      <div className="mt-20 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <p className="text-white/70 max-w-md">Next chapter: the things I've made.</p>
        <Link to="/projects" className="liquid-glass rounded-full px-8 py-3 text-sm text-white hover:scale-[1.03] pulse-glow">
          Projects →
        </Link>
      </div>
      </div>
    </main>
  );
}