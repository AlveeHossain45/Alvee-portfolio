import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

const RADIUS = 15;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef(null);

  function updateRing() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    if (ringRef.current) {
      ringRef.current.setAttribute(
        "stroke-dasharray",
        `${(p * CIRCUMFERENCE).toFixed(1)} ${CIRCUMFERENCE}`
      );
    }
  }

  useEffect(() => {
    let frame = 0;

    function measure() {
      frame = 0;
      updateRing();
      setVisible(window.scrollY >= 400);
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
    if (visible) updateRing();
  }, [visible]);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="enter-pop group fixed right-4 bottom-4 z-40 inline-flex size-11 items-center justify-center rounded-full border border-edge bg-background/85 text-foreground shadow-[0_12px_30px_-16px_rgba(0,0,0,0.7)] backdrop-blur-md transition-colors duration-300 hover:border-foreground/50 hover:text-foreground active:scale-95"
    >
      <svg
        className="pointer-events-none absolute inset-0 -rotate-90"
        viewBox="0 0 36 36"
        aria-hidden="true"
      >
        <circle
          ref={ringRef}
          cx="18"
          cy="18"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-foreground"
          strokeDasharray={`0 ${CIRCUMFERENCE}`}
          style={{ opacity: 0.85 }}
        />
      </svg>
      <ArrowUp className="size-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5" />
    </button>
  );
}
