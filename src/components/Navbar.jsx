import { useEffect, useRef, useState } from "react";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { AHNavMark } from "./AHMark";
import GitHubIcon from "./GitHubIcon";
import LeetCodeIcon from "./LeetCodeIcon";
import { profile, navItems } from "../data/portfolioData";

function IconButton({ label, children, className = "", ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`inline-flex size-8 items-center justify-center rounded-full text-foreground transition-all duration-300 hover:bg-accent hover:scale-105 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default function Navbar({ onOpenSearch, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#top");
  const [open, setOpen] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    let frame = 0;

    function measure() {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      let current = "#top";
      for (const item of navItems) {
        if (!item.href.startsWith("#") || item.href === "#top") continue;
        const el = document.getElementById(item.href.slice(1));
        if (el && el.getBoundingClientRect().top <= 120) current = item.href;
      }

      const p = max > 0 ? Math.min(1, y / max) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p})`;
      }

      setScrolled(y > 8);
      setActive((prev) => (prev === current ? prev : current));
    }

    function schedule() {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto w-full max-w-[840px]">
        <div
          className={`screen-line-before screen-line-after border-x border-edge transition-[background-color,box-shadow] duration-300 ${
            scrolled
              ? "bg-background/80 shadow-[0_10px_30px_-24px_rgba(0,0,0,0.6)] backdrop-blur-md"
              : "bg-background"
          }`}
        >
          <div className="flex h-12 items-center justify-between gap-2 px-3 sm:px-4">
            <a
              href="#top"
              aria-label="Alvee Hossain"
              className="press group flex size-8 items-center justify-center rounded-lg transition-colors duration-300 hover:bg-accent"
            >
              <AHNavMark className="h-5 w-5 transition-transform duration-500 ease-out group-hover:scale-110" />
            </a>

            <nav className="hidden items-center gap-0.5 sm:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active === item.href ? "true" : undefined}
                  className={`relative rounded-full px-3 py-1.5 text-[13px] font-medium transition-all duration-300 ${
                    active === item.href
                      ? "bg-accent text-foreground shadow-[inset_0_0_0_1px_var(--edge)]"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={onOpenSearch}
                className="press group inline-flex h-8 items-center gap-1.5 rounded-full border border-edge bg-background px-2.5 text-muted-foreground transition-all duration-300 hover:border-foreground/45 hover:text-foreground"
                aria-label="Search"
              >
                <Search className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
                <span className="hidden font-mono text-[11px] sm:inline">
                  Ctrl K
                </span>
              </button>

              <a
                href={profile.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                className="inline-flex size-8 items-center justify-center rounded-full text-[#FFA116] transition-all duration-300 hover:scale-110 hover:bg-[#FFA116]/12"
              >
                <LeetCodeIcon className="size-4" />
              </a>

              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex size-8 items-center justify-center rounded-full text-foreground transition-all duration-300 hover:scale-110 hover:bg-accent"
              >
                <GitHubIcon className="size-4" />
              </a>

              <IconButton
                label="Toggle theme"
                onClick={onToggleTheme}
                className="overflow-hidden"
              >
                <span key={theme} className="icon-swap">
                  {theme === "dark" ? (
                    <Sun className="size-4" />
                  ) : (
                    <Moon className="size-4" />
                  )}
                </span>
              </IconButton>

              <IconButton
                label={open ? "Close menu" : "Open menu"}
                className="sm:hidden"
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </IconButton>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5"
            >
              <span
                ref={progressRef}
                className="block h-full origin-left grad-brand shadow-[0_0_10px_0_rgba(99,102,241,0.55)]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="sm:hidden">
          <div className="mx-auto w-full max-w-[840px]">
            <div className="enter-rise border-x border-b border-edge bg-background/95 backdrop-blur-xl">
              <nav className="flex flex-col gap-0.5 p-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-accent"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#github"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-accent"
                >
                  GitHub Activity
                </a>
                <a
                  href="#experience"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-accent"
                >
                  Experience
                </a>
                <a
                  href="#leetcode"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-accent"
                >
                  <LeetCodeIcon className="size-4 text-[#FFA116]" />
                  LeetCode Activity
                </a>
                <a
                  href={profile.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 hover:bg-accent"
                >
                  <LeetCodeIcon className="size-4 text-[#FFA116]" />
                  LeetCode Profile
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
