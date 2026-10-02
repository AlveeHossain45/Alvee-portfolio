import { useEffect, useState } from "react";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { AHNavMark } from "./AHMark";
import GitHubIcon from "./GitHubIcon";
import LeetCodeIcon from "./LeetCodeIcon";
import { profile, navItems } from "../data/portfolioData";

export default function Navbar({ onOpenSearch, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("#top");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);

      let current = "#top";
      for (const item of navItems) {
        if (!item.href.startsWith("#") || item.href === "#top") continue;
        const el = document.getElementById(item.href.slice(1));
        if (el && el.getBoundingClientRect().top <= 120) current = item.href;
      }
      setActive((prev) => (prev === current ? prev : current));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
          className={`screen-line-before screen-line-after border-x border-edge ${
            scrolled
              ? "bg-background/80 backdrop-blur-md"
              : "bg-background/90 backdrop-blur-sm"
          }`}
        >
            <div className="flex h-12 items-center justify-between gap-2 px-3 sm:px-4">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-foreground/40 via-foreground/80 to-foreground/40 transition-[width] duration-150 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
              <a
              href="#top"
              aria-label="Alvee Hossain"
              className="flex size-8 items-center justify-center text-foreground"
            >
              <AHNavMark className="h-5 w-5" />
            </a>

            <nav className="hidden items-center gap-1 sm:flex">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active === item.href ? "true" : undefined}
                  className={`rounded-full px-2.5 py-1 text-[13px] font-medium transition-colors duration-200 ${
                    active === item.href
                      ? "bg-accent text-foreground"
                      : "text-foreground/70 hover:bg-accent/70 hover:text-foreground"
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
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-edge bg-background px-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                aria-label="Search"
              >
                <Search className="size-3.5" />
                <span className="hidden font-mono text-[11px] sm:inline">
                  Ctrl K
                </span>
              </button>

              <a
                href={profile.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LeetCode"
                className="inline-flex size-8 items-center justify-center rounded-full text-[#FFA116] transition-all duration-200 hover:bg-[#FFA116]/10 hover:scale-110"
              >
                <LeetCodeIcon className="size-4" />
              </a>

              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex size-8 items-center justify-center rounded-full text-foreground transition-all duration-200 hover:bg-accent hover:scale-110"
              >
                <GitHubIcon className="size-4" />
              </a>

              <button
                type="button"
                onClick={onToggleTheme}
                aria-label="Toggle theme"
                className="inline-flex size-8 items-center justify-center rounded-full text-foreground transition-all duration-200 hover:bg-accent hover:scale-110"
              >
                {theme === "dark" ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </button>

              <button
                type="button"
                className="inline-flex size-8 items-center justify-center rounded-full sm:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="sm:hidden">
          <div className="mx-auto w-full max-w-[840px]">
            <div className="border-x border-b border-edge bg-background">
              <nav className="flex flex-col p-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#github"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent"
                >
                  GitHub Activity
                </a>
                <a
                  href="#experience"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent"
                >
                  Experience
                </a>
                <a
                  href={profile.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent"
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
