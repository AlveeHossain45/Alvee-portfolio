import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY >= 400);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="enter-pop fixed right-4 bottom-4 z-40 inline-flex size-9 items-center justify-center rounded-full border border-edge bg-background/80 text-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-accent"
    >
      <ArrowUp className="size-4" />
    </button>
  );
}
