import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

const serif = { fontFamily: "'Instrument Serif', serif" };

function ContactPage() {
  const links = [
    { label: "Email", value: "snehachouksey2403@gmail.com", href: "mailto:snehachouksey2403@gmail.com" },
    { label: "LinkedIn", value: "/in/sneha-chouksey", href: "https://www.linkedin.com/in/sneha-chouksey/" },
    { label: "GitHub", value: "@SnehaChouksey", href: "https://github.com/SnehaChouksey" },
    { label: "Phone", value: "+91 93407 49064", href: "tel:+919340749064" },
  ];
  return (
    <main className="surface-dusk magic-noise min-h-screen relative">
      <SiteNav />
      {/* Big magical sun in background */}
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none" style={{ background: "var(--gradient-sun)" }} />
      <div className="absolute bottom-10 -left-20 sunflower scale-150 opacity-40 float" />
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 pt-36 pb-24 min-h-screen flex flex-col justify-center">
      <p className="animate-fade-rise text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Final chapter: say hello</p>
      <h1 className="animate-fade-rise text-5xl sm:text-7xl leading-[0.95] tracking-tight text-white max-w-4xl" style={serif}>
        If something here <em className="not-italic text-sun">felt familiar,</em> let's talk.
      </h1>
      <p className="animate-fade-rise-delay text-white/75 max-w-2xl mt-8 text-lg leading-relaxed">
        I'm open to software engineering and technical product roles, agentic AI work, and the occasional very-good idea over coffee.
      </p>

      <div className="animate-fade-rise-delay-2 mt-14 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="card-3d liquid-glass rounded-3xl p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--petal)]/80">{l.label}</p>
            <p className="mt-2 text-2xl text-white" style={serif}>{l.value}</p>
          </a>
        ))}
      </div>
      </div>
    </main>
  );
}