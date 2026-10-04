import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, Flame, Trophy } from "lucide-react";
import { Panel, PanelContent, SectionHeading } from "./Panel";
import GitHubIcon from "./GitHubIcon";
import { profile } from "../data/portfolioData";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CELL = 10;
const GAP = 3;
const PITCH = CELL + GAP;
const GRID_HEIGHT = CELL * 7 + GAP * 6;

const EVENT_TYPES = new Set([
  "PushEvent",
  "CreateEvent",
  "DeleteEvent",
  "ReleaseEvent",
  "ForkEvent",
  "WatchEvent",
  "PullRequestEvent",
  "IssuesEvent",
  "PublicEvent",
]);

function levelColor(level, dark) {
  if (dark) {
    return ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"][level] || "#161b22";
  }
  return ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"][level] || "#ebedf0";
}

function toISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
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

function mergeWindow(payload) {
  const map = new Map((payload.contributions || []).map((d) => [d.date, d]));
  return buildWindow().map((date) => {
    const found = map.get(date);
    return found
      ? { date: found.date, count: found.count || 0, level: found.level || 0 }
      : { date, count: 0, level: 0 };
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

function relTime(iso, now) {
  const diff = Math.max(0, now - Date.parse(iso));
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(iso));
}

function describeEvent(event, repeats = 1) {
  const repo = (event.repo?.name || "").split("/").pop();
  const payload = event.payload || {};
  switch (event.type) {
    case "PushEvent": {
      const size = payload.size || payload.commits?.length;
      if (size) return `Pushed ${size} commit${size === 1 ? "" : "s"} to ${repo}`;
      if (repeats > 1) return `Pushed ${repeats} times to ${repo}`;
      return `Pushed to ${repo}`;
    }
    case "CreateEvent":
      if (payload.ref_type === "repository") return `Created the repository ${repo}`;
      return `Created ${payload.ref_type} ${payload.ref} in ${repo}`;
    case "DeleteEvent":
      return `Deleted ${payload.ref_type} ${payload.ref} in ${repo}`;
    case "ReleaseEvent":
      return `Released ${payload.release?.tag_name || "a new version"} of ${repo}`;
    case "ForkEvent":
      return `Forked ${repo}`;
    case "WatchEvent":
      return `Starred ${repo}`;
    case "PullRequestEvent":
      return `${payload.action === "closed" ? "Closed" : "Opened"} a pull request in ${repo}`;
    case "IssuesEvent":
      return `${payload.action === "closed" ? "Closed" : "Opened"} an issue in ${repo}`;
    case "PublicEvent":
      return `Made ${repo} public`;
    default:
      return `Activity in ${repo}`;
  }
}

function groupEvents(list) {
  const groups = new Map();
  for (const event of list) {
    if (!EVENT_TYPES.has(event.type)) continue;
    const key = `${event.type}:${event.repo?.name || ""}`;
    const found = groups.get(key);
    if (found) {
      found.count += 1;
      if (Date.parse(event.created_at) > Date.parse(found.event.created_at)) {
        found.event = event;
      }
    } else {
      groups.set(key, { key, event, count: 1 });
    }
  }
  return [...groups.values()]
    .sort((a, b) => Date.parse(b.event.created_at) - Date.parse(a.event.created_at))
    .slice(0, 4);
}

export default function GithubActivity({ theme }) {
  const dark = theme === "dark";
  const [days, setDays] = useState(emptyWindow);
  const [status, setStatus] = useState("loading");
  const [stats, setStats] = useState({ total: 0, longest: 0, current: 0 });
  const [events, setEvents] = useState([]);
  const [attempt, setAttempt] = useState(0);
  const [hover, setHover] = useState(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let cancelled = false;

    async function loadGraph() {
      setStatus("loading");
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${profile.github}`
        );
        if (!res.ok) throw new Error("contributions failed");
        const data = await res.json();
        if (cancelled) return;
        const merged = mergeWindow(data);
        setDays(merged);
        setStats(statsOf(merged));
        setStatus("ready");
      } catch {
        if (cancelled) return;
        setDays(emptyWindow());
        setStats({ total: 0, longest: 0, current: 0 });
        setStatus("error");
      }
    }

    async function loadEvents() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${profile.github}/events/public?per_page=60`,
          { headers: { Accept: "application/vnd.github+json" } }
        );
        if (!res.ok) throw new Error("events failed");
        const data = await res.json();
        if (cancelled || !Array.isArray(data)) return;
        setEvents(groupEvents(data));
      } catch {
        if (!cancelled) setEvents([]);
      }
    }

    loadGraph();
    loadEvents();
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
                    : "hover:scale-125 hover:ring-1 hover:ring-foreground/40"
                } ${isToday ? "ring-1 ring-foreground/40" : ""}`}
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
    <Panel id="github">
      <SectionHeading
        icon={<GitHubIcon className="size-5" />}
        title="GitHub Contributions"
        subtitle="A year of consistent building"
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
        <div className="mb-4 grid grid-cols-3 gap-2">
          <div
            className="stagger-item flex items-center gap-2.5 rounded-xl border border-edge bg-card/40 px-3 py-2.5"
            style={{ "--stagger-delay": "0ms" }}
          >
            <span className="icon-tile size-8 rounded-lg">
              <Trophy className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-base leading-tight font-semibold tabular-nums">
                {loading ? "—" : stats.total.toLocaleString()}
              </p>
              <p className="truncate text-[11px] text-muted-foreground">
                Contributions
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
        </div>

        {failed ? (
          <div className="flex min-h-[112px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-edge text-center">
            <p className="text-sm text-muted-foreground">
              Could not load contributions from GitHub.
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
                  style={{ left: 27 + m.i * PITCH }}
                >
                  {m.label}
                </span>
              ))}
            </div>

            <div className="flex gap-[3px]">
              <div
                className="relative w-6 shrink-0 font-mono text-[9px] text-muted-foreground"
                style={{ height: GRID_HEIGHT }}
              >
                {["Mon", "Wed", "Fri"].map((label, i) => (
                  <span
                    key={label}
                    className="absolute leading-none"
                    style={{ top: (1 + i * 2) * PITCH + 1 }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div
                role="img"
                aria-label={
                  loading
                    ? "Loading GitHub contributions"
                    : `${stats.total} GitHub contributions in the last year`
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
                  <span className="animate-pulse">Loading contributions…</span>
                ) : (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-foreground"
                  >
                    @{profile.github}
                    <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
              </p>
            </div>
          </div>
        )}
      </PanelContent>

      {events.length > 0 && (
        <>
          <div className="screen-line-before flex items-center justify-between px-4 pt-3 pb-1">
            <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              Recent activity
            </p>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {profile.github}
              <ArrowUpRight className="size-3" />
            </a>
          </div>
          <ul className="divide-y divide-edge pb-1">
            {events.map((item) => (
              <li
                key={item.key}
                className="flex items-center gap-3 px-4 py-2 transition-colors hover:bg-accent/40"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-info" />
                <span className="min-w-0 flex-1 truncate text-[13px]">
                  {describeEvent(item.event, item.count)}
                </span>
                <time
                  dateTime={item.event.created_at}
                  className="shrink-0 font-mono text-[11px] text-muted-foreground"
                >
                  {relTime(item.event.created_at, now)}
                </time>
              </li>
            ))}
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
            {hover.count} contribution{hover.count === 1 ? "" : "s"}
          </span>
          <span className="text-muted-foreground"> on {longDate(hover.date)}</span>
        </div>
      )}
    </Panel>
  );
}
