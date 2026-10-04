import { ArrowUp, Globe, Mail } from "lucide-react";
import GitHubIcon from "./GitHubIcon";
import LeetCodeIcon from "./LeetCodeIcon";
import { profile } from "../data/portfolioData";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-reveal="" className="screen-line-before border-x border-edge">
      <div
        aria-hidden="true"
        className="hairline-grad h-px w-full opacity-70"
      />
      <div className="flex flex-col gap-5 px-4 py-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-foreground text-background">
            <span className="font-mono text-xs font-bold tracking-tight">
              {profile.initials}
            </span>
          </span>
          <div>
            <p className="text-sm font-semibold">{profile.name}</p>
            <p className="font-mono text-xs text-muted-foreground">
              {profile.title}
            </p>
          </div>
        </div>

        <p className="font-mono text-xs text-muted-foreground sm:text-center">
          © {year} · Built with React &amp; Tailwind
        </p>

        <div className="flex items-center gap-1.5 text-muted-foreground">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="inline-flex size-9 items-center justify-center rounded-xl border border-edge bg-background transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:text-foreground"
          >
            <GitHubIcon className="size-4" />
          </a>
          <a
            href={profile.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode"
            title="LeetCode"
            className="inline-flex size-9 items-center justify-center rounded-xl border border-edge bg-background transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FFA116]/60 hover:text-[#FFA116]"
          >
            <LeetCodeIcon className="size-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            title="Email"
            className="inline-flex size-9 items-center justify-center rounded-xl border border-edge bg-background transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:text-foreground"
          >
            <Mail className="size-4" />
          </a>
          <a
            href={profile.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio"
            title="Portfolio"
            className="inline-flex size-9 items-center justify-center rounded-xl border border-edge bg-background transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:text-foreground"
          >
            <Globe className="size-4" />
          </a>
          <button
            type="button"
            aria-label="Back to top"
            title="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="ml-1 inline-flex size-9 items-center justify-center rounded-xl grad-brand text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
