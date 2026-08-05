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
              <h2 className="text-3xl text-white" style={serif}>Freelance Full Stack Software Engineer</h2>
              <p className="text-[var(--petal)]/80 mt-1">Varenyam Education Centre · Remote</p>
            </div>
            <p className="text-sm text-white/60">May 2026 — Jul 2026</p>
          </div>
          <ul className="space-y-4 text-sm text-white/85 leading-relaxed">
            <li><span className="text-[var(--petal)]" style={serif}>Question Bank & Test Paper Generator · </span> Built end-to-end with Next.js, TypeScript, PostgreSQL, Prisma, Supabase, and the Gemini Vision API — 29 REST routes, 3-tier RBAC, and an AI-assisted bulk-import pipeline for scanned question papers.</li>
            <li><span className="text-[var(--petal)]" style={serif}>Security & Performance · </span> Identified and fixed a JWT algorithm-confusion vulnerability and an SSRF gap; cut median API latency from 3.5s to under 1s via database/compute co-location and request-scoped caching.</li>
            <li><span className="text-[var(--petal)]" style={serif}>Public Website · </span> Engineered the institute's public-facing site on Next.js with scalable backend APIs, serving 3,000+ concurrent users.</li>
          </ul>
        </article>

        <article className="card-3d liquid-glass rounded-3xl p-8 mb-10 md:ml-12 relative">
          <div className="absolute -left-[3.4rem] top-10 w-4 h-4 rounded-full bg-[var(--sunflower)]/70 hidden md:block" />
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-6">
            <div>
              <h2 className="text-3xl text-white" style={serif}>Full Stack & AI Engineer Intern</h2>
              <p className="text-[var(--petal)]/80 mt-1">Omysha Foundation · A4G Collab · Remote</p>
            </div>
            <p className="text-sm text-white/60">Jan 2026 — Jun 2026</p>
          </div>
          <ul className="space-y-4 text-sm text-white/85 leading-relaxed">
            <li><span className="text-[var(--petal)]" style={serif}>A4G Collab Hub · </span> Built a contest platform (Next.js 15, Turborepo, PostgreSQL, Docker, Nginx, Vultr VPS) handling 200–1000+ participants, with PayU payments, 5-track registration, and an AI quality pipeline (Copyleaks, Claude AI screening, LLM rubric scoring).</li>
            <li><span className="text-[var(--petal)]" style={serif}>Recruitment Automation · </span> Engineered a tool (Next.js, PostgreSQL, Drizzle ORM, Meta WhatsApp API, Gmail SMTP) with 2 Chrome extensions (MV3) for LinkedIn sourcing, cutting bulk outreach from ~3 hrs to under 3 mins across hundreds of candidates.</li>
            <li><span className="text-[var(--petal)]" style={serif}>YTZ Zoom Pipeline · </span> Architected a recording pipeline (Python, FastAPI, Gemini API, AWS): a 24/7 daemon eliminating ~4 hrs/week of manual video operations.</li>
            <li><span className="text-[var(--petal)]" style={serif}>Claude Skills HR Agent · </span> Built an HR Evaluation Agent scoring candidates on technical depth, communication, and org-fit, reducing evaluation time from ~1 day to under 5 mins per batch.</li>
          </ul>
        </article>

        <article className="card-3d liquid-glass rounded-3xl p-8 mb-10 md:ml-12 relative">
          <div className="absolute -left-[3.4rem] top-10 w-4 h-4 rounded-full bg-white/40 hidden md:block" />
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-6">
            <div>
              <h2 className="text-3xl text-white" style={serif}>B.Tech, Computer Science & Engineering</h2>
              <p className="text-[var(--petal)]/80 mt-1">Jabalpur Engineering College · CGPA 7.54 / 10</p>
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
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--petal)]/80">CodeHunt by GDG JEC</p>
              <p className="mt-2 text-white">2nd place among 200+ participants.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--petal)]/80">Smart India Hackathon</p>
              <p className="mt-2 text-white">Top 5 internally. Shipped a full-stack AI prototype under the buzzer.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--petal)]/80">GirlScript Summer of Code 2026</p>
              <p className="mt-2 text-white">Contributor on the AI Agents track.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--petal)]/80">Open Source</p>
              <p className="mt-2 text-white">Active contributor across community projects.</p>
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