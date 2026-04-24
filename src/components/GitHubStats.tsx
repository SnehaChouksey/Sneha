import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

// ── GitHub dark-mode palette (exact match) ───────────────────────────────────
const GH_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const ROW_LABELS = [null, "Mon", null, "Wed", null, "Fri", null] as const;

const serif = { fontFamily: "'Instrument Serif', serif" };

type Day  = { date: string; count: number; level: number; dow: number };
type Week = Day[];

function toISO(d: Date) { return d.toISOString().split("T")[0]; }

/** Sunday-aligned 52-week rolling calendar from a {date→count} map. */
function buildCalendar(countMap: Record<string, number>): Week[] {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(today.getDate() - 52 * 7);
  start.setDate(start.getDate() - start.getDay()); // rewind to Sunday

  const weeks: Week[] = [];
  let week: Week = [];
  const cur = new Date(start);
  while (cur <= today) {
    const dow = cur.getDay();
    if (dow === 0 && week.length > 0) { weeks.push(week); week = []; }
    const count = countMap[toISO(cur)] ?? 0;
    const level = count === 0 ? 0 : count <= 3 ? 1 : count <= 6 ? 2 : count <= 10 ? 3 : 4;
    week.push({ date: toISO(cur), count, level, dow });
    cur.setDate(cur.getDate() + 1);
  }
  if (week.length > 0) weeks.push(week);
  return weeks;
}

function monthLabels(weeks: Week[]) {
  const labels: { text: string; col: number }[] = [];
  let last = -1;
  weeks.forEach((w, wi) => {
    if (!w[0]) return;
    const m = new Date(w[0].date + "T00:00:00").getMonth();
    if (m !== last) {
      labels.push({
        text: new Date(w[0].date + "T00:00:00").toLocaleDateString("en-US", { month: "short" }),
        col: wi,
      });
      last = m;
    }
  });
  return labels;
}

function fmt(s: string) {
  return new Date(s + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

// ── Data fetchers (cascade: jogruber → skyline → events) ──────────────────────

async function fetchJogruber(user: string): Promise<Record<string, number>> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 7000);
  try {
    const r = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
      { signal: ctrl.signal }
    );
    if (!r.ok) throw new Error("jogruber " + r.status);
    const data = await r.json();
    const map: Record<string, number> = {};
    (data.contributions as { date: string; count: number }[]).forEach(c => {
      if (c.count > 0) map[c.date] = c.count;
    });
    return map;
  } finally { clearTimeout(t); }
}

async function fetchSkyline(user: string): Promise<Record<string, number>> {
  const map: Record<string, number> = {};
  const years = [new Date().getFullYear() - 1, new Date().getFullYear()];
  await Promise.allSettled(years.map(async yr => {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 6000);
    try {
      const r = await fetch(`https://skyline.github.com/${user}/${yr}.json`, { signal: ctrl.signal });
      if (!r.ok) return;
      const data = await r.json();
      (data.weeks as { days: { date: string; count: number }[] }[]).forEach(w =>
        w.days.forEach(d => { if (d.count > 0) map[d.date] = (map[d.date] ?? 0) + d.count; })
      );
    } finally { clearTimeout(t); }
  }));
  return map;
}

async function fetchEvents(user: string): Promise<Record<string, number>> {
  const map: Record<string, number> = {};
  for (let p = 1; p <= 3; p++) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 5000);
    try {
      const r = await fetch(
        `https://api.github.com/users/${user}/events?per_page=100&page=${p}`,
        { signal: ctrl.signal }
      );
      if (!r.ok) break;
      const evs: { type: string; created_at: string; payload?: { commits?: unknown[] } }[] = await r.json();
      if (!evs.length) break;
      evs.forEach(e => {
        if (e.type === "PushEvent") {
          const d = e.created_at.split("T")[0];
          map[d] = (map[d] ?? 0) + ((e.payload?.commits as unknown[])?.length ?? 1);
        }
      });
    } finally { clearTimeout(t); }
  }
  return map;
}

// ── Component ────────────────────────────────────────────────────────────────

export function GitHubStats() {
  const [weeks,  setWeeks]  = useState<Week[]>([]);
  const [total,  setTotal]  = useState(0);
  const [source, setSource] = useState<"full" | "partial" | "empty">("empty");
  const [loading, setLoading] = useState(true);
  const [tip, setTip] = useState<{ x: number; y: number; day: Day } | null>(null);

  useEffect(() => {
    let dead = false;
    (async () => {
      const run = async (fn: () => Promise<Record<string, number>>, label: "full" | "partial") => {
        const map = await fn();
        if (dead) return;
        const built = buildCalendar(map);
        const t = built.flat().reduce((s, d) => s + d.count, 0);
        setWeeks(built); setTotal(t);
        setSource(t > 0 ? label : "empty");
        setLoading(false);
      };

      try        { await run(()  => fetchJogruber("SnehaChouksey"), "full");    return; } catch {}
      try        { await run(()  => fetchSkyline("SnehaChouksey"),  "full");    return; } catch {}
      try        { await run(()  => fetchEvents("SnehaChouksey"),   "partial"); return; } catch {}

      if (!dead) { setWeeks(buildCalendar({})); setLoading(false); }
    })();
    return () => { dead = true; };
  }, []);

  // Cell geometry — tuned for full-width card (~850 px)
  const CELL = 11, GAP = 3, STEP = 14;
  const DAY_W = 28, MON_H = 20;
  const cols  = weeks.length;
  const svgW  = DAY_W + cols * STEP;
  const svgH  = MON_H + 7 * STEP;
  const mLabels = monthLabels(weeks);

  // ── Tooltip via portal (escapes all ancestor transforms) ──────────────────
  const Tooltip = tip
    ? createPortal(
        <div
          style={{
            position:    "fixed",
            left:        tip.x + 14,
            top:         tip.y - 56,
            zIndex:      99999,
            pointerEvents: "none",
            background:  "#1b1f23",
            border:      "1px solid rgba(240,246,252,0.12)",
            borderRadius: 6,
            padding:     "6px 12px",
            fontSize:    12,
            lineHeight:  1.6,
            whiteSpace:  "nowrap",
            boxShadow:   "0 8px 24px rgba(0,0,0,0.7)",
            color:       "#e6edf3",
          }}
        >
          <strong style={{ color: GH_COLORS[tip.day.level] === GH_COLORS[0] ? "#e6edf3" : GH_COLORS[tip.day.level] }}>
            {tip.day.count === 0
              ? "No contributions"
              : `${tip.day.count} contribution${tip.day.count !== 1 ? "s" : ""}`}
          </strong>
          <span style={{ color: "rgba(230,237,243,0.5)" }}> on </span>
          {fmt(tip.day.date)}
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <div
        className="liquid-glass rounded-3xl relative overflow-hidden"
        style={{ padding: "clamp(20px,3vw,36px)" }}
      >
        {/* Ambient glow */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-[0.08] blur-3xl pointer-events-none"
          style={{ background: "var(--gradient-sun)" }} />

        {/* Header */}
        <div className="flex items-start justify-between mb-6 flex-wrap gap-3 relative z-10">
          <div>
            <h3 className="text-xl text-white mb-1" style={serif}>
              {loading
                ? "Loading activity…"
                : source === "full"
                ? `${total.toLocaleString()} contributions in the last year`
                : source === "partial"
                ? `${total.toLocaleString()} contributions (recent)`
                : "GitHub Contribution Activity"}
            </h3>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.32)" }}>
              {source === "full"   ? "Full year · synced from GitHub"               :
               source === "partial"? "Recent activity via GitHub Events API"       :
                                     "Visit github.com/SnehaChouksey for full graph"}
            </p>
          </div>
          <a
            href="https://github.com/SnehaChouksey"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs rounded-full px-4 py-2 transition-colors shrink-0"
            style={{ color: "var(--petal)", border: "1px solid rgba(255,217,122,0.3)" }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = "rgba(255,217,122,0.08)")}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            @SnehaChouksey
          </a>
        </div>

        {/* Calendar */}
        <div
          className="relative z-10 rounded-xl overflow-x-auto"
          style={{ background: "rgba(13,17,23,0.8)", padding: "16px 18px 14px" }}
        >
          {loading ? (
            /* Skeleton */
            <svg width={DAY_W + 52 * STEP} height={svgH} style={{ display: "block", opacity: 0.3 }}>
              {Array.from({ length: 52 }, (_, wi) =>
                Array.from({ length: 7 }, (_, di) => (
                  <rect key={`${wi}-${di}`}
                    x={DAY_W + wi * STEP} y={MON_H + di * STEP}
                    width={CELL} height={CELL} rx={2} fill="#21262d" />
                ))
              )}
            </svg>
          ) : (
            <svg
              width={svgW}
              height={svgH}
              style={{ display: "block", overflow: "visible" }}
              onMouseLeave={() => setTip(null)}
            >
              {/* Month labels */}
              {mLabels.map(({ text, col }) => (
                <text key={text + col}
                  x={DAY_W + col * STEP} y={MON_H - 5}
                  fill="rgba(255,255,255,0.45)" fontSize={10}
                  fontFamily="Inter, sans-serif"
                >{text}</text>
              ))}

              {/* Day-of-week labels */}
              {ROW_LABELS.map((lbl, di) =>
                lbl ? (
                  <text key={di} x={0} y={MON_H + di * STEP + CELL - 1}
                    fill="rgba(255,255,255,0.3)" fontSize={9}
                    fontFamily="Inter, sans-serif"
                  >{lbl}</text>
                ) : null
              )}

              {/* Contribution cells */}
              {weeks.map((week, wi) =>
                week.map(day => (
                  <rect
                    key={day.date}
                    x={DAY_W + wi * STEP}
                    y={MON_H + day.dow * STEP}
                    width={CELL}
                    height={CELL}
                    rx={2}
                    fill={GH_COLORS[day.level]}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={e => setTip({ x: e.clientX, y: e.clientY, day })}
                    onMouseMove={e  => setTip(t => t ? { ...t, x: e.clientX, y: e.clientY } : null)}
                    onMouseLeave={()  => setTip(null)}
                  />
                ))
              )}
            </svg>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-end gap-1.5 relative z-10"
          style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>
          <span>Less</span>
          {GH_COLORS.map((c, i) => (
            <div key={i} style={{ width: CELL, height: CELL, borderRadius: 2, background: c, flexShrink: 0 }} />
          ))}
          <span>More</span>
        </div>
      </div>

      {/* Tooltip — portal to document.body, bypasses all ancestor transforms */}
      {Tooltip}
    </>
  );
}
