const serif = { fontFamily: "'Instrument Serif', serif" };

export function GitHubStats() {
  return (
    <div className="reveal mt-8 md:ml-12">
      <div className="card-3d liquid-glass rounded-3xl p-8 relative overflow-hidden">
        {/* Glow */}
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "var(--gradient-sun)" }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h3 className="text-2xl text-white" style={serif}>
              Activity
            </h3>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
              Every commit · last 52 weeks · up to today
            </p>
          </div>
          <a
            href="https://github.com/SnehaChouksey"
            target="_blank"
            rel="noreferrer"
            className="text-xs rounded-full px-4 py-2 transition-colors"
            style={{
              color: "var(--petal)",
              border: "1px solid rgba(255,217,122,0.28)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "rgba(255,217,122,0.08)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "transparent")
            }
          >
            @SnehaChouksey ↗
          </a>
        </div>

        {/* Contribution calendar — the green dots, current year rolling */}
        <div
          className="overflow-x-auto rounded-xl p-4"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <img
            src="https://ghchart.rshah.org/006d32/SnehaChouksey"
            alt="GitHub contribution calendar — last 52 weeks to today"
            className="w-full min-w-[600px] block"
            style={{
              filter: "saturate(1.4) brightness(1.1)",
              opacity: 0.9,
              imageRendering: "crisp-edges",
            }}
          />
        </div>

        {/* Commit count link */}
        <div className="mt-4 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#006d32", boxShadow: "0 0 6px #006d32" }} />
            Total public commits visible at
            <a
              href="https://github.com/SnehaChouksey"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              github.com/SnehaChouksey
            </a>
          </span>
        </div>

        <p
          className="mt-3 text-[9px] uppercase tracking-[0.3em]"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          github.com/SnehaChouksey · contribution activity
        </p>
      </div>
    </div>
  );
}
