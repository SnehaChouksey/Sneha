import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "home" },
  { id: "story", label: "story" },
  { id: "work", label: "work" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "journey" },
  { id: "contact", label: "contact" },
];

export function SiteNav() {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<string>("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  // Highlight active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeRef.current = entry.target.id;
            document.querySelectorAll("[data-nav-item]").forEach((el) => {
              const pill = el as HTMLElement;
              if (pill.dataset.navItem === entry.target.id) {
                pill.classList.add("bg-white/15", "text-white");
                pill.classList.remove("text-white/60");
              } else {
                pill.classList.remove("bg-white/15", "text-white");
                pill.classList.add("text-white/60");
              }
            });
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    document.addEventListener("click", close, { once: true });
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[min(96vw,740px)]">
      {/* Main pill */}
      <div className="liquid-glass rounded-full px-3 py-2 flex items-center justify-between">
        <button
          onClick={() => scrollTo("hero")}
          className="px-4 py-1.5 text-white tracking-wide"
          style={{ fontFamily: "'Instrument Serif', serif", fontSize: "20px" }}
        >
          sneha
        </button>

        {/* Desktop nav — hidden on small screens */}
        <ul className="hidden sm:flex items-center gap-1">
          {SECTIONS.slice(1).map((s) => (
            <li key={s.id}>
              <button
                data-nav-item={s.id}
                onClick={() => scrollTo(s.id)}
                className="px-3 py-1.5 text-xs uppercase tracking-[0.18em] rounded-full transition text-white/60 hover:text-white"
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger — visible only on small screens */}
        <button
          className="sm:hidden px-3 py-1.5 text-white/70 hover:text-white transition-colors text-lg leading-none"
          onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <div ref={indicatorRef} />
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="sm:hidden mt-2 liquid-glass rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {SECTIONS.slice(1).map((s) => (
            <button
              key={s.id}
              data-nav-item={s.id}
              onClick={() => scrollTo(s.id)}
              className="w-full text-left px-5 py-3.5 text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
