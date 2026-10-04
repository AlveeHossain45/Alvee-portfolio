import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const RADIUS = 15;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setVisible(window.scrollY >= 400);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="enter-pop group fixed right-4 bottom-4 z-40 inline-flex size-11 items-center justify-center rounded-full border border-edge bg-background/85 text-foreground shadow-[0_12px_30px_-16px_rgba(0,0,0,0.7)] backdrop-blur-md transition-all duration-300 hover:border-brand/50 hover:text-brand active:scale-95"
    >
      <svg
        className="pointer-events-none absolute inset-0 -rotate-90"
        viewBox="0 0 36 36"
        aria-hidden="true"
      >
        <circle
          cx="18"
          cy="18"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-brand"
          strokeDasharray={`${progress * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
          style={{
            transition: "stroke-dasharray 150ms linear",
            opacity: 0.85,
          }}
        />
      </svg>
      <ArrowUp className="size-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5" />
    </button>
  );
}
