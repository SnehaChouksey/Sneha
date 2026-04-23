import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Sneha Chouksey — Software & GenAI Engineer" },
      { name: "description", content: "I build agentic AI systems, full-stack products, and quietly thoughtful interfaces. Sunflowers, mountains, and clean code." },
      { property: "og:title", content: "Sneha Chouksey — Software & GenAI Engineer" },
      { property: "og:description", content: "Agentic AI, full-stack, and product. Built in the quiet hours." },
    ],
  }),
});

function Index() {
  const serif = { fontFamily: "'Instrument Serif', serif" };
  return (
    <main className="relative">
      <SiteNav />

      {/* HERO — fullscreen video background, only on this page */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
          poster=""
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* subtle vignette so text reads */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="animate-fade-rise text-xs sm:text-sm uppercase tracking-[0.35em] text-white/80 mb-6">
            Sneha Chouksey · Software & GenAI Engineer
          </p>
          <h1
            className="animate-fade-rise text-5xl sm:text-7xl md:text-[8.5rem] leading-[0.92] tracking-[-2px] max-w-6xl font-normal text-white"
            style={{ ...serif, textShadow: "0 4px 30px rgba(0,0,0,0.4)" }}
          >
            I build <em className="not-italic text-[var(--petal)]">quiet systems</em> that{" "}
            <em className="not-italic text-[var(--petal)]">think out loud.</em>
          </h1>
          <p className="animate-fade-rise-delay text-white/85 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed">
            Full-stack engineer working at the intersection of agentic AI, generative AI, and human-centered design. I ship LLM pipelines, autonomous agents, and the small interfaces that make heavy machinery feel human.
          </p>
          <div className="animate-fade-rise-delay-2 mt-12 flex flex-col sm:flex-row gap-4 items-center">
            <Link to="/projects" className="liquid-glass rounded-full px-10 py-4 text-base text-white hover:scale-[1.03] cursor-pointer">
              See the work
            </Link>
            <Link to="/work" className="text-sm text-white/80 hover:text-white transition-colors px-4 py-2 border-b border-white/30">
              Read my story →
            </Link>
          </div>

          {/* scroll cue */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-[10px] uppercase tracking-[0.4em] flex flex-col items-center gap-2 float">
            <span>scroll</span>
            <span className="w-px h-10 bg-white/40" />
          </div>
        </div>
      </section>

      {/* CHAPTER STRIP — sunflower meadow vibe */}
      <section className="relative surface-dusk magic-noise overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 py-32">
          <div className="flex items-start justify-between flex-wrap gap-8 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--petal)]/80 mb-4">prologue</p>
              <h2 className="text-5xl sm:text-7xl text-white max-w-3xl leading-[0.95]" style={serif}>
                A small story <em className="not-italic text-sun">in three chapters.</em>
              </h2>
            </div>
            <div className="sunflower float pulse-glow rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { kicker: "01 — what I do", title: "Agentic & GenAI", body: "LangGraph orchestrations, RAG pipelines, MCP integrations, and prompt + context engineering tuned for production traffic.", to: "/work" },
              { kicker: "02 — how I build", title: "Full-stack, end to end", body: "Next.js, Node, FastAPI, Postgres, Redis, BullMQ — shipped on AWS, Vercel, Render, and Vultr.", to: "/experience" },
              { kicker: "03 — why it matters", title: "Product + design", body: "OKRs, PRDs, and roadmaps. I sweat the typography too. The human on the other side of the screen always wins.", to: "/projects" },
            ].map((c, i) => (
              <Link
                to={c.to}
                key={c.title}
                className="card-3d liquid-glass rounded-3xl p-7 block group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--petal)]/80">{c.kicker}</p>
                <h3 className="mt-3 text-3xl text-white" style={serif}>{c.title}</h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">{c.body}</p>
                <span className="inline-block mt-5 text-xs text-[var(--petal)] uppercase tracking-[0.25em] group-hover:translate-x-1 transition-transform">read →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MAGICAL CTA — closing hint */}
      <section className="relative bg-[var(--dusk-2)] magic-noise overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 py-32 text-center">
          <div className="inline-block sunflower scale-50 float mb-2" />
          <h2 className="text-4xl sm:text-6xl text-white leading-[1] mt-4" style={serif}>
            <span className="text-sun">Tea is warm.</span><br />The work is patient.
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mt-6">Step inside — the rest of the story is just a click away.</p>
          <Link to="/work" className="liquid-glass inline-block rounded-full px-10 py-4 text-base text-white hover:scale-[1.03] mt-10 pulse-glow">
            Begin the journey →
          </Link>
        </div>
      </section>
    </main>
  );
}
