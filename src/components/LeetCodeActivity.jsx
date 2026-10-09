import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, Flame, Trophy } from "lucide-react";
import { Panel, PanelContent, SectionHeading } from "./Panel";
import LeetCodeIcon from "./LeetCodeIcon";
import { profile } from "../data/portfolioData";

const API_BASE = "https://leetcode-api-faisalshohag.vercel.app";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function levelColor(level, dark) {
  if (dark) {
    return ["#161b22", "#4a3208", "#8c5a08", "#d48806", "#ffa116"][level] || "#161b22";
  }
  return ["#ebedf0", "#ffe2b8", "#ffb84d", "#ff922b", "#ff7a00"][level] || "#ebedf0";
}

function countLevel(count) {
  if (!count) return 0;
  if (count <= 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

function toISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function utcISO(epochSeconds) {
  const d = new Date(epochSeconds * 1000);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(
    d.getUTCDate()
  ).padStart(2, "0")}`;
}

function buildWindow() {
  const days = [];
  const end = new Date();
  end.setHours(0, 0, 0, 0);
  const start = new Date(end);
  start.setDate(start.getDate() - 364);
  while (start.getDay() !== 0) start.setDate(start.getDate() - 1);
  const cursor = new Date(start);
  while (cursor <= end) {
    days.push(toISO(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

function emptyWindow() {
  return buildWindow().map((date) => ({ date, count: 0, level: 0 }));
}

function mergeWindow(calendar) {
  const map = new Map();
  if (calendar && typeof calendar === "object") {
    for (const [key, value] of Object.entries(calendar)) {
      map.set(utcISO(Number(key)), Number(value) || 0);
    }
  }
  return buildWindow().map((date) => {
    const count = map.get(date) || 0;
    return { date, count, level: countLevel(count) };
  });
}

function statsOf(days) {
  let total = 0;
  let longest = 0;
  let run = 0;
  for (const day of days) {
    if (day.count > 0) {
      total += day.count;
      run += 1;
      if (run > longest) longest = run;
    } else {
      run = 0;
    }
  }
  let current = 0;
  for (let i = days.length - 1; i >= 0; i -= 1) {
    if (days[i].count > 0) current += 1;
    else break;
  }
  return { total, longest, current };
}

function longDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function relTime(epoch, now) {
  const diff = Math.max(0, now - epoch * 1000);
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(
    new Date(epoch * 1000)
  );
}

export default function LeetCodeActivity({ theme }) {
  const dark = theme === "dark";
  const [days, setDays] = useState(emptyWindow);
  const [status, setStatus] = useState("loading");
  const [stats, setStats] = useState({ total: 0, longest: 0, current: 0 });
  const [profileStats, setProfileStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [attempt, setAttempt] = useState(0);
  const [hover, setHover] = useState(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      try {
        const res = await fetch(`${API_BASE}/${encodeURIComponent(profile.leetcode)}`);
        if (!res.ok) throw new Error("leetcode stats failed");
        const data = await res.json();
        if (cancelled) return;
        const merged = mergeWindow(data.submissionCalendar);
        setDays(merged);
        setStats(statsOf(merged));
        setProfileStats({
          totalSolved: data.totalSolved || 0,
          easySolved: data.easySolved || 0,
          mediumSolved: data.mediumSolved || 0,
          hardSolved: data.hardSolved || 0,
          ranking: data.ranking || 0,
          totalSubmissions: data.totalSubmissions?.[0]?.submissions || 0,
        });
        setRecent(
          (data.recentSubmissions || [])
            .filter((s) => Number(s.timestamp))
            .slice(0, 4)
            .map((s) => ({
              key: `${s.titleSlug}-${s.timestamp}`,
              title: s.title,
              slug: s.titleSlug,
              status: s.statusDisplay,
              lang: s.lang,
              timestamp: Number(s.timestamp),
            }))
        );
        setStatus("ready");
      } catch {
        if (cancelled) return;
        setDays(emptyWindow());
        setStats({ total: 0, longest: 0, current: 0 });
        setProfileStats(null);
        setRecent([]);
        setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!hover) return undefined;
    function clear() {
      setHover(null);
    }
    window.addEventListener("scroll", clear, { passive: true });
    window.addEventListener("resize", clear);
    return () => {
      window.removeEventListener("scroll", clear);
      window.removeEventListener("resize", clear);
    };
  }, [hover]);

  const weeks = useMemo(() => {
    const result = [];
    for (let i = 0; i < days.length; i += 7) result.push(days.slice(i, i + 7));
    return result;
  }, [days]);

  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;
    weeks.forEach((week, i) => {
      const first = week.find(Boolean);
      if (!first) return;
      const month = new Date(`${first.date}T00:00:00`).getMonth();
      if (month !== lastMonth) {
        labels.push({ i, label: MONTHS[month] });
        lastMonth = month;
      }
    });
    return labels;
  }, [weeks]);

  const today = toISO(new Date());
  const loading = status === "loading";
  const failed = status === "error";

  const weeksGrid = useMemo(
    () =>
      weeks.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {Array.from({ length: 7 }).map((_, di) => {
            const day = week[di];
            const isToday = day?.date === today;
            return (
              <div
                key={day?.date || `${wi}-${di}`}
                onMouseEnter={(e) => {
                  if (!day) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  setHover({
                    date: day.date,
                    count: day.count,
                    x: rect.left + rect.width / 2,
                    y: rect.top - 8,
                  });
                }}
                onMouseLeave={() => setHover(null)}
                className={`size-[10px] rounded-[3px] transition-all duration-200 ease-out ${
                  loading
                    ? "animate-pulse bg-muted"
                    : "hover:scale-125 hover:ring-1 hover:ring-[#FFA116]/70"
                } ${isToday ? "ring-1 ring-[#FFA116]" : ""}`}
                style={
                  loading
                    ? undefined
                    : { backgroundColor: levelColor(day?.level || 0, dark) }
                }
              />
            );
          })}
        </div>
      )),
    [weeks, loading, dark, today]
  );

  return (
    <Panel id="leetcode">
      <SectionHeading
        icon={<LeetCodeIcon className="size-5 text-[#FFA116]" />}
        title="LeetCode Contributions"
        subtitle="A year of consistent problem solving"
        action={
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-edge bg-muted/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
            <span
              className={`size-1.5 rounded-full ${
                failed
                  ? "bg-muted-foreground"
                  : loading
                    ? "animate-pulse bg-amber-500"
                    : "animate-pulse bg-emerald-500"
              }`}
            />
            {failed ? "offline" : loading ? "syncing" : "live"}
          </span>
        }
      />

      <PanelContent className="overflow-x-auto">
        <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div
            className="stagger-item flex items-center gap-2.5 rounded-xl border border-edge bg-card/40 px-3 py-2.5"
            style={{ "--stagger-delay": "0ms" }}
          >
            <span className="icon-tile size-8 rounded-lg">
              <Trophy className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-base leading-tight font-semibold tabular-nums">
                {loading ? "—" : (profileStats?.totalSolved ?? 0).toLocaleString()}
              </p>
              <p className="truncate text-[11px] text-muted-foreground">
                Solved
              </p>
            </div>
          </div>

          <div
            className="stagger-item flex items-center gap-2.5 rounded-xl border border-edge bg-card/40 px-3 py-2.5"
            style={{ "--stagger-delay": "80ms" }}
          >
            <span className="icon-tile size-8 rounded-lg">
              <Flame className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-base leading-tight font-semibold tabular-nums">
                {loading ? "—" : `${stats.longest}d`}
              </p>
              <p className="truncate text-[11px] text-muted-foreground">
                Longest streak
              </p>
            </div>
          </div>

          <div
            className="stagger-item flex items-center gap-2.5 rounded-xl border border-edge bg-card/40 px-3 py-2.5"
            style={{ "--stagger-delay": "160ms" }}
          >
            <span className="icon-tile size-8 rounded-lg">
              <CalendarDays className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-base leading-tight font-semibold tabular-nums">
                {loading ? "—" : `${stats.current}d`}
              </p>
              <p className="truncate text-[11px] text-muted-foreground">
                Current streak
              </p>
            </div>
          </div>

          <div
            className="stagger-item flex items-center gap-2.5 rounded-xl border border-edge bg-card/40 px-3 py-2.5"
            style={{ "--stagger-delay": "240ms" }}
          >
            <span className="icon-tile size-8 rounded-lg">
              <svg viewBox="0 0 24 24" fill="none" className="size-4">
                <path
                  d="M12 2 15 9l7 .5-5.5 4.5L18 21l-6-3.8L6 21l1.5-7L2 9.5 9 9z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <div className="min-w-0">
              <p className="truncate text-base leading-tight font-semibold tabular-nums">
                {loading || !profileStats
                  ? "—"
                  : `#${profileStats.ranking.toLocaleString()}`}
              </p>
              <p className="truncate text-[11px] text-muted-foreground">
                Ranking
              </p>
            </div>
          </div>
        </div>

        {!loading && profileStats && (
          <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-xl border border-edge bg-card/40 px-3.5 py-2.5 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Difficulty</span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#00b8a3]" />
              Easy
              <span className="font-mono font-semibold text-foreground">
                {profileStats.easySolved}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#ffc01e]" />
              Medium
              <span className="font-mono font-semibold text-foreground">
                {profileStats.mediumSolved}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#ff375f]" />
              Hard
              <span className="font-mono font-semibold text-foreground">
                {profileStats.hardSolved}
              </span>
            </span>
            <span className="ml-auto font-mono">
              {profileStats.totalSubmissions} submissions all-time
            </span>
          </div>
        )}

        {failed ? (
          <div className="flex min-h-[112px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-edge text-center">
            <p className="text-sm text-muted-foreground">
              Could not load submissions from LeetCode.
            </p>
            <button
              type="button"
              onClick={() => setAttempt((v) => v + 1)}
              className="inline-flex h-8 items-center rounded-full border border-edge px-3 text-sm font-medium transition-colors hover:bg-accent"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="min-w-[680px]">
            <div className="relative mb-1 h-4">
              {monthLabels.map((m) => (
                <span
                  key={`${m.label}-${m.i}`}
                  className="absolute font-mono text-[10px] text-muted-foreground"
                  style={{ left: 27 + m.i * 13 }}
                >
                  {m.label}
                </span>
              ))}
            </div>

            <div className="flex gap-[3px]">
              <div
                className="relative w-6 shrink-0 font-mono text-[9px] text-muted-foreground"
                style={{ height: 88 }}
              >
                {["Mon", "Wed", "Fri"].map((label, i) => (
                  <span
                    key={label}
                    className="absolute leading-none"
                    style={{ top: (1 + i * 2) * 13 + 1 }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div
                role="img"
                aria-label={
                  loading
                    ? "Loading LeetCode submissions"
                    : `${stats.total} LeetCode submissions in the last year`
                }
                className="flex gap-[3px]"
              >
                {weeksGrid}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1 font-mono">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <span
                    key={lvl}
                    className="size-[10px] rounded-[3px]"
                    style={{ backgroundColor: levelColor(lvl, dark) }}
                  />
                ))}
                <span>More</span>
              </div>

              <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {loading ? (
                  <span className="animate-pulse">Loading submissions…</span>
                ) : (
                  <a
                    href={profile.leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-[#FFA116]"
                  >
                    @{profile.leetcode}
                    <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
              </p>
            </div>
          </div>
        )}
      </PanelContent>

      {recent.length > 0 && (
        <>
          <div className="screen-line-before flex items-center justify-between px-4 pt-3 pb-1">
            <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              Recent submissions
            </p>
            <a
              href={profile.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {profile.leetcode}
              <ArrowUpRight className="size-3" />
            </a>
          </div>
          <ul className="divide-y divide-edge pb-1">
            {recent.map((item) => {
              const accepted = item.status === "Accepted";
              return (
                <li
                  key={item.key}
                  className="flex items-center gap-3 px-4 py-2 transition-colors hover:bg-accent/40"
                >
                  <span
                    className={`size-1.5 shrink-0 rounded-full ${
                      accepted ? "bg-emerald-500" : "bg-[#ff375f]"
                    }`}
                  />
                  <a
                    href={`https://leetcode.com/problems/${item.slug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0 flex-1 truncate text-[13px] transition-colors hover:text-[#FFA116]"
                  >
                    {item.title}
                  </a>
                  <span className="shrink-0 rounded-full border border-edge bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    {item.lang}
                  </span>
                  <time
                    dateTime={new Date(item.timestamp * 1000).toISOString()}
                    className="shrink-0 font-mono text-[11px] text-muted-foreground"
                  >
                    {relTime(item.timestamp, now)}
                  </time>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {hover && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-md border border-edge bg-popover px-2.5 py-1.5 text-xs whitespace-nowrap text-popover-foreground shadow-md"
          style={{
            left: Math.min(
              Math.max(hover.x, 90),
              typeof window !== "undefined" ? window.innerWidth - 90 : hover.x
            ),
            top: hover.y,
          }}
        >
          <span className="font-medium">
            {hover.count} submission{hover.count === 1 ? "" : "s"}
          </span>
          <span className="text-muted-foreground"> on {longDate(hover.date)}</span>
        </div>
      )}
    </Panel>
  );
}
