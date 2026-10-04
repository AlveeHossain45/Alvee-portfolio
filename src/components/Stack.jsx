import { Blocks } from "lucide-react";
import { Panel, PanelContent, SectionHeading } from "./Panel";
import { stack } from "../data/portfolioData";

function TechIcon({ item }) {
  const common = "h-8 w-8";
  const slug = item.slug;

  if (slug === "html5") {
    return (
      <svg viewBox="0 0 32 32" className={common}>
        <path fill="#E44D26" d="M6 28L4 2h24l-2 26-10 3z" />
        <path fill="#F16529" d="M16 29.2L24.2 27 26 3.6H16z" />
        <path fill="#EBEBEB" d="M16 13.2H11.6l-.3-3.2H16V6.8H8.1l.1 1.2.8 9.2H16zm0 8.2l-3.7-1 .2-2.4H9.2l-.4 4.4L16 24.4z" />
        <path fill="#fff" d="M16 13.2v3.2h4.1l-.4 4.2L16 21.4v3l6.8-1.9.1-.8.9-9.7H16zm0-6.4v3.2h7.5l.2-2 .3-3.2H16z" />
      </svg>
    );
  }
  if (slug === "css3") {
    return (
      <svg viewBox="0 0 32 32" className={common}>
        <path fill="#1572B6" d="M6 28L4 2h24l-2 26-10 3z" />
        <path fill="#33A9DC" d="M16 29.2L24.2 27 26 3.6H16z" />
        <path fill="#fff" d="M16 6.8v3.2h7.2l-.3 2.4H16v3.2h6.6l-.7 7.2L16 24.4v3l6.9-1.9.5-5.6.1-1.1.9-9.9H16z" />
        <path fill="#EBEBEB" d="M16 13.2H11.7l-.3-3.2H16V6.8H8.2l.8 9.2H16zm-3.5 5.8.2 2.2 3.3.9v-3.1h-3.5z" />
      </svg>
    );
  }
  if (slug === "javascript") {
    return (
      <svg viewBox="0 0 32 32" className={common}>
        <rect width="32" height="32" rx="2" fill="#F7DF1E" />
        <path d="M19.5 23.3c.5.9 1.2 1.6 2.6 1.6 1.1 0 1.8-.6 1.8-1.3 0-.9-.7-1.2-1.9-1.8l-.7-.3c-1.9-.8-3.2-1.8-3.2-4 0-2 1.5-3.5 3.9-3.5 1.7 0 2.9.6 3.8 2.1l-2.1 1.3c-.5-.8-.9-1.1-1.7-1.1-.8 0-1.3.5-1.3 1.1 0 .8.5 1.1 1.6 1.6l.7.3c2.3 1 3.6 2 3.6 4.2 0 2.4-1.9 3.7-4.4 3.7-2.5 0-4.1-1.2-4.9-2.8zm-8.2.2c.4.7.8 1.3 1.7 1.3.9 0 1.4-.3 1.4-1.7V14.7h2.6v8.5c0 2.7-1.6 3.9-3.9 3.9-2.1 0-3.3-1.1-3.9-2.4z" />
      </svg>
    );
  }
  if (slug === "python") {
    return (
      <svg viewBox="0 0 32 32" className={common}>
        <path fill="#3776AB" d="M15.9 3c-6.5 0-6.1 2.8-6.1 2.8l.01 2.9h6.2v.9H7.3S3 9.2 3 16.1s3.6 6.8 3.6 6.8h2.2v-3.3s-.1-3.6 3.5-3.6h6.1s3.4.1 3.4-3.3V6.6S22.7 3 15.9 3zm-3.4 2.1a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
        <path fill="#FFD43B" d="M16.1 29c6.5 0 6.1-2.8 6.1-2.8l-.01-2.9h-6.2v-.9h8.7S29 22.8 29 15.9s-3.6-6.8-3.6-6.8h-2.2v3.3s.1 3.6-3.5 3.6h-6.1s-3.4-.1-3.4 3.3v6.5S9.3 29 16.1 29zm3.4-2.1a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4z" />
      </svg>
    );
  }
  if (slug === "c") {
    return (
      <svg viewBox="0 0 32 32" className={common}>
        <circle cx="16" cy="16" r="14" fill="#A8B9CC" />
        <path fill="#fff" d="M16.2 8.2c4.3 0 6.6 2.6 7.4 5.1l-3.6 1.5c-.4-1.5-1.6-3-3.8-3-2.8 0-4.8 2.3-4.8 5.2s2 5.2 4.8 5.2c2.2 0 3.4-1.5 3.9-3l3.6 1.5c-.9 2.6-3.2 5.1-7.5 5.1-5.1 0-8.6-3.6-8.6-8.8s3.5-8.8 8.6-8.8z" />
      </svg>
    );
  }
  if (slug === "cplusplus") {
    return (
      <svg viewBox="0 0 32 32" className={common}>
        <circle cx="16" cy="16" r="14" fill="#00599C" />
        <path fill="#fff" d="M13.8 8.2c4.3 0 6.6 2.6 7.4 5.1l-3.6 1.5c-.4-1.5-1.6-3-3.8-3-2.8 0-4.8 2.3-4.8 5.2s2 5.2 4.8 5.2c2.2 0 3.4-1.5 3.9-3l3.6 1.5c-.9 2.6-3.2 5.1-7.5 5.1-5.1 0-8.6-3.6-8.6-8.8s3.5-8.8 8.6-8.8z" />
        <path fill="#fff" d="M22 14.6h1.6v1.6H22v1.6h-1.6v-1.6h-1.6v-1.6h1.6v-1.6H22zm5.2 0H28.8v1.6h-1.6v1.6H25.6v-1.6h-1.6v-1.6h1.6v-1.6h1.6z" />
      </svg>
    );
  }
  if (slug === "react") {
    return (
      <svg viewBox="0 0 32 32" className={common}>
        <circle cx="16" cy="16" r="2.5" fill="#61DAFB" />
        <g fill="none" stroke="#61DAFB" strokeWidth="1.6">
          <ellipse cx="16" cy="16" rx="11" ry="4.5" />
          <ellipse cx="16" cy="16" rx="11" ry="4.5" transform="rotate(60 16 16)" />
          <ellipse cx="16" cy="16" rx="11" ry="4.5" transform="rotate(120 16 16)" />
        </g>
      </svg>
    );
  }
  if (slug === "tailwindcss") {
    return (
      <svg viewBox="0 0 32 32" className={common}>
        <path
          fill="#38BDF8"
          d="M16 8c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25.1.03 2.14.45 3.12 1.5C18.3 15 19.5 16 22 16c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-.1-.03-2.14-.45-3.12-1.5C19.7 9 18.5 8 16 8zM8.5 16c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25.1.03 2.14.45 3.12 1.5C10.8 23 12 24 14.5 24c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-.1-.03-2.14-.45-3.12-1.5C12.2 17 11 16 8.5 16z"
        />
      </svg>
    );
  }
  if (slug === "git") {
    return (
      <svg viewBox="0 0 32 32" className={common}>
        <path fill="#F05032" d="M29.5 14.6 17.4 2.5a1.7 1.7 0 0 0-2.4 0L12.4 5.1l3.2 3.2a2.1 2.1 0 0 1 2.7 2.7l3.1 3.1a2.1 2.1 0 1 1-1.2.9l-2.9-2.9v7.6a2.1 2.1 0 1 1-1.7 0V12a2.1 2.1 0 0 1-1.1-1.5L9.9 6.8 2.5 14.2a1.7 1.7 0 0 0 0 2.4l12.1 12.1a1.7 1.7 0 0 0 2.4 0l12.5-12.5a1.7 1.7 0 0 0 0-2.4z" />
      </svg>
    );
  }
  if (slug === "github") {
    return (
      <svg viewBox="0 0 32 32" className={`${common} text-foreground`} fill="currentColor">
        <path d="M16 2C8.3 2 2 8.4 2 16.2c0 6.3 4 11.6 9.6 13.5.7.1.9-.3.9-.7v-2.4c-3.9.9-4.7-1.9-4.7-1.9-.6-1.6-1.6-2-1.6-2-1.3-.9.1-.9.1-.9 1.4.1 2.2 1.5 2.2 1.5 1.3 2.2 3.3 1.6 4.1 1.2.1-.9.5-1.6.9-1.9-3.1-.4-6.4-1.6-6.4-7 0-1.6.5-2.8 1.5-3.8-.2-.4-.7-1.9.1-3.9 0 0 1.2-.4 4 1.5a13.7 13.7 0 0 1 7.2 0c2.8-1.9 4-1.5 4-1.5.8 2 .3 3.5.1 3.9 1 1 1.5 2.3 1.5 3.8 0 5.5-3.3 6.6-6.4 7 .5.4 1 1.3 1 2.6v3.8c0 .4.2.8.9.7C26 27.8 30 22.5 30 16.2 30 8.4 23.7 2 16 2z" />
      </svg>
    );
  }
  if (slug === "vscode") {
    return (
      <svg viewBox="0 0 32 32" className={common}>
        <path fill="#007ACC" d="M29.6 8.4 24 6.1a1.5 1.5 0 0 0-1.7.3L7.5 19.2 3.7 16.3a1 1 0 0 0-1.3.1l-1.3 1.2a1 1 0 0 0 0 1.5l3.7 3.4-3.7 3.4a1 1 0 0 0 0 1.5l1.3 1.2a1 1 0 0 0 1.3.1l3.8-2.9 14.8 12.8a1.5 1.5 0 0 0 1.7.3l5.6-2.3a1.6 1.6 0 0 0 1-1.5V9.9a1.6 1.6 0 0 0-1-1.5zM23 23.7 12.4 16 23 8.3z" />
      </svg>
    );
  }
  if (slug === "linux") {
    return (
      <svg viewBox="0 0 32 32" className={common}>
        <path fill="#333" d="M16 3c-2.3 2-4 5.8-4 9.3 0 1.5.3 2.6.3 2.6s-.8.5-1.3 1.5c-.6 1.1-.6 2.6-.3 4.1.4 2 1.4 3.3 1.4 3.3s-.7 1.1-.9 2.3c-.3 1.5.2 3.2 1.4 4.1 1.6 1.2 4.1.8 6.1.7 2.3-.1 4.3.6 5.5-.6 1-.9 1.2-2.5.9-3.8-.3-1.2-1-2.2-1-2.2s1.3-1.4 1.8-3.6c.4-1.7.2-3.3-.5-4.3-.6-.9-1.4-1.2-1.4-1.2s.2-1.1.2-2.6C19.9 8.6 18.2 5 16 3z" />
        <circle cx="13.2" cy="14.2" r="1.1" fill="#FCC624" />
        <circle cx="18.6" cy="14.4" r="1.1" fill="#FCC624" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" className={common}>
      <rect x="3" y="8" width="26" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M10 16h2l2-4 2 8 2-4h4" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function Stack() {
  return (
    <Panel id="stack">
      <SectionHeading
        icon={<Blocks className="size-[18px]" />}
        title="Stack"
        count={`(${stack.length})`}
        subtitle="Tools and languages I build with"
      />
      <PanelContent
        className="dot-grid"
        style={{
          "--pattern-foreground":
            "color-mix(in oklab, var(--foreground) 5%, transparent)",
        }}
      >
        <ul className="grid grid-cols-3 gap-2.5 select-none sm:grid-cols-4 md:grid-cols-6">
          {stack.map((item, i) => (
            <li
              key={item.name}
              className="stagger-item"
              style={{ "--stagger-delay": `${Math.min(i, 12) * 45}ms` }}
            >
              <div
                title={item.name}
                aria-label={item.name}
                className="tech-glow group flex h-full w-full cursor-default flex-col items-center gap-2 rounded-2xl border border-edge bg-card/50 px-2 py-3.5"
                style={{ "--tech": item.color }}
              >
                <span className="transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:scale-115">
                  <TechIcon item={item} />
                  <span className="sr-only">{item.name}</span>
                </span>
                <span className="w-full truncate text-center font-mono text-[10px] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {item.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </PanelContent>
    </Panel>
  );
}
