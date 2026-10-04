import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Layers,
  Link2,
  Search,
} from "lucide-react";
import { searchItems } from "../data/portfolioData";

const GROUP_ICONS = {
  Sections: <Layers className="size-3.5" />,
  Projects: <Box className="size-3.5" />,
  Links: <Link2 className="size-3.5" />,
};

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return searchItems;
    return searchItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return undefined;
    function onKey(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && results[active]) {
        e.preventDefault();
        go(results[active].href);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, onClose]);

  function go(href) {
    onClose();
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (!open) return null;

  const groups = results.reduce((acc, item) => {
    acc[item.group] = acc[item.group] || [];
    acc[item.group].push(item);
    return acc;
  }, {});

  let runningIndex = -1;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]">
      <button
        type="button"
        aria-label="Close search"
        className="enter-fade absolute inset-0 bg-black/45 backdrop-blur-[3px]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="enter-pop relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-edge bg-popover text-popover-foreground shadow-[0_24px_70px_-24px_rgba(0,0,0,0.55)]"
      >
        <div
          aria-hidden="true"
          className="hairline-grad absolute inset-x-0 top-0 h-px"
        />
        <div className="flex items-center gap-3 border-b border-edge px-3.5">
          <span className="icon-tile size-7 rounded-lg">
            <Search className="size-3.5" />
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections, projects..."
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="kbd hidden sm:inline">ESC</kbd>
        </div>

        <div className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results for “{query}”.
            </p>
          )}
          {Object.entries(groups).map(([group, items]) => (
            <div key={group} className="mb-1.5">
              <p className="flex items-center gap-1.5 px-2 py-1.5 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                {GROUP_ICONS[group]}
                {group}
              </p>
              {items.map((item) => {
                runningIndex += 1;
                const index = runningIndex;
                const isActive = index === active;
                return (
                  <button
                    key={`${group}-${item.title}`}
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onClick={() => go(item.href)}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl px-2.5 py-2.5 text-left text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-accent text-foreground shadow-[inset_0_0_0_1px_var(--edge)]"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                    }`}
                  >
                    <span className="truncate">{item.title}</span>
                    {item.href.startsWith("http") ? (
                      <ArrowUpRight
                        className={`size-3.5 shrink-0 transition-all duration-300 ${
                          isActive
                            ? "text-brand opacity-100"
                            : "opacity-40"
                        }`}
                      />
                    ) : (
                      <ArrowRight
                        className={`size-3.5 shrink-0 transition-all duration-300 ${
                          isActive
                            ? "text-brand opacity-100"
                            : "opacity-40"
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-edge px-3.5 py-2.5 font-mono text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <kbd className="kbd">↑</kbd>
            <kbd className="kbd">↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="kbd">↵</kbd>
            Open
          </span>
        </div>
      </div>
    </div>
  );
}
