import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero", label: "home" },
  { id: "story", label: "story" },
  { id: "work", label: "work" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "journey" },
  { id: "contact", label: "contact" },
];

const NAV_ITEMS = SECTIONS.slice(1);

export function SiteNav() {
  const [active, setActive] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    document.addEventListener("click", close, { once: true });
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[min(96vw,580px)]">
      {/* Main pill */}
      <div className="liquid-glass rounded-full px-3 py-2 flex items-center justify-center">
        {/* Desktop nav */}
        <ul className="hidden sm:flex items-center gap-0.5">
          {NAV_ITEMS.map((s) => {
            const isActive = active === s.id;
            const isHovered = hovered === s.id;
            return (
              <li key={s.id}>
                <button
                  onClick={() => scrollTo(s.id)}
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="px-3.5 py-1.5 text-xs uppercase tracking-[0.18em] rounded-full"
                  style={{
                    color: isActive
                      ? "rgba(255,255,255,0.95)"
                      : isHovered
                      ? "rgba(255,255,255,0.8)"
                      : "rgba(255,255,255,0.4)",
                    background: isActive
                      ? "rgba(255,255,255,0.12)"
                      : isHovered
                      ? "rgba(255,255,255,0.07)"
                      : "transparent",
                    transition: "color 0.2s ease, background 0.2s ease",
                  }}
                >
                  {s.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile: active section label + hamburger */}
        <div className="sm:hidden flex items-center justify-between w-full px-2">
          <span className="text-xs uppercase tracking-[0.25em] text-white/60">
            {NAV_ITEMS.find((s) => s.id === active)?.label ?? "menu"}
          </span>
          <button
            className="px-2 py-1.5 text-white/70 hover:text-white transition-colors text-lg leading-none"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((o) => !o);
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="sm:hidden mt-2 liquid-glass rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {NAV_ITEMS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="w-full text-left px-5 py-3.5 text-sm uppercase tracking-[0.2em] border-b border-white/5 last:border-0"
              style={{
                color: active === s.id ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
                background: active === s.id ? "rgba(255,255,255,0.06)" : "transparent",
                transition: "color 0.2s, background 0.2s",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
