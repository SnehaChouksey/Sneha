import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";

export const Route = createFileRoute("/work")({
  component: WorkPage,
});

const serif = { fontFamily: "'Instrument Serif', serif" };

function WorkPage() {
  const skills = [
    { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "Java"] },
    { group: "Frontend", items: ["Next.js", "React", "Tailwind", "Shadcn/UI", "Framer Motion", "GSAP"] },
    { group: "Backend & Data", items: ["Node.js", "Express", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "BullMQ", "WebSockets"] },
    { group: "Generative AI", items: ["LangChain", "LangGraph", "RAG", "Ollama", "MCP", "Claude / GPT-4 / Gemini / Groq", "Qdrant", "Prompt + Context Eng."] },
    { group: "Cloud & DevOps", items: ["AWS", "Vercel", "Render", "Vultr", "Neon", "Firebase", "Docker", "OAuth 2.0"] },
    { group: "Product", items: ["OKRs / KPIs", "PRDs", "User Research", "Roadmapping", "Agile"] },
  ];
  return (
    <main className="surface-dusk magic-noise min-h-screen">
      <SiteNav />
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 pt-36 pb-24">
      <p className="animate-fade-rise text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Chapter one: the work</p>
      <h1 className="animate-fade-rise text-5xl sm:text-7xl leading-[0.95] tracking-tight text-white max-w-4xl" style={serif}>
        I sit with the problem <em className="not-italic text-sun">until it tells me what it wants to be.</em>
      </h1>
      <p className="animate-fade-rise-delay text-white/70 max-w-2xl mt-8 text-lg leading-relaxed">
        Most of my days look like this: a notebook, a quiet room, and a system that needs to think on its own. I build agentic AI pipelines, full-stack SaaS, and the small interfaces that make the heavy machinery feel human.
      </p>

      <div className="animate-fade-rise-delay-2 mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Agentic & Generative AI", body: "Multi-agent orchestration with LangGraph, tool-chaining with LangChain, MCP integrations, on-prem inference with Ollama, and RAG pipelines tuned for production traffic." },
          { title: "Full-Stack Engineering", body: "Next.js SSR, Node + Express, FastAPI services, PostgreSQL on Neon, Redis-backed BullMQ workers, shipped on AWS, Vercel, Render, and Vultr." },
          { title: "Product Ownership", body: "Defining OKRs, writing PRDs, scoping roadmaps, and turning fuzzy ideas into things people can actually use. Built two production tools end-to-end at Omysha." },
          { title: "UI & Design Sensibility", body: "I care how it feels. Tailwind + shadcn, Framer Motion micro-interactions, and a soft spot for typography that breathes." },
        ].map((c) => (
          <div key={c.title} className="card-3d liquid-glass rounded-3xl p-7">
            <h2 className="text-3xl text-white" style={serif}>{c.title}</h2>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-20">
        <h2 className="text-3xl text-white mb-8" style={serif}>The toolkit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((s) => (
            <div key={s.group} className="card-3d liquid-glass rounded-2xl p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--petal)]/80 mb-3">{s.group}</p>
              <div className="flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-full border border-white/15 text-white/90 bg-white/5">{i}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <p className="text-white/70 max-w-md">Next chapter: where I've actually done the work.</p>
        <Link to="/experience" className="liquid-glass rounded-full px-8 py-3 text-sm text-white hover:scale-[1.03] pulse-glow">
          Experience →
        </Link>
      </div>
      </div>
    </main>
  );
}