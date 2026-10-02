import { useEffect, useMemo, useRef, useState } from "react";
import { Search, ArrowRight, ArrowUpRight } from "lucide-react";
import { searchItems } from "../data/portfolioData";

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
        className="enter-fade absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="enter-pop relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-edge bg-popover text-popover-foreground shadow-[0_8px_40px_rgba(0,0,0,0.18)]"
      >
        <div className="flex items-center gap-3 border-b border-edge px-3">
          <Search className="size-4 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections, projects..."
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded border border-edge bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">
            ESC
          </kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results.
            </p>
          )}
          {Object.entries(groups).map(([group, items]) => (
            <div key={group} className="mb-1">
              <p className="px-2 py-1.5 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
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
                    className={`flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm ${
                      isActive ? "bg-accent" : "hover:bg-accent/60"
                    }`}
                  >
                    <span>{item.title}</span>
                    {item.href.startsWith("http") ? (
                      <ArrowUpRight className="size-3.5 text-muted-foreground" />
                    ) : (
                      <ArrowRight className="size-3.5 text-muted-foreground" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-edge px-3 py-2 font-mono text-[10px] text-muted-foreground">
          <span>↑↓ Navigate</span>
          <span>↵ Open</span>
        </div>
      </div>
    </div>
  );
}
