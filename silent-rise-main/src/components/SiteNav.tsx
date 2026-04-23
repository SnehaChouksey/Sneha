import { Link, useLocation } from "@tanstack/react-router";

const links = [
  { to: "/", label: "home" },
  { to: "/work", label: "work" },
  { to: "/experience", label: "experience" },
  { to: "/projects", label: "projects" },
  { to: "/contact", label: "contact" },
] as const;

export function SiteNav({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const { pathname } = useLocation();
  const text = variant === "dark" ? "text-white/90" : "text-foreground";
  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[min(94vw,720px)]">
      <div className="liquid-glass rounded-full px-3 py-2 flex items-center justify-between">
        <Link to="/" className="px-4 py-1.5 text-sm tracking-wide text-white" style={{ fontFamily: "'Instrument Serif', serif", fontSize: "20px" }}>
          sneha
        </Link>
        <ul className="flex items-center gap-1">
          {links.slice(1).map((l) => {
            const active = pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={`px-3 py-1.5 text-xs uppercase tracking-[0.18em] rounded-full transition ${active ? "bg-white/15 text-white" : `${text} hover:text-white`}`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}