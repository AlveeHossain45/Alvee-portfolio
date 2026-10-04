import { ArrowUp, Globe, Mail } from "lucide-react";
import GitHubIcon from "./GitHubIcon";
import LinkedInIcon from "./LinkedInIcon";
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
            className="inline-flex size-9 items-center justify-center rounded-xl border border-edge bg-background text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/50 hover:shadow-[0_8px_18px_-12px_rgba(0,0,0,0.8)]"
          >
            <GitHubIcon className="size-4" />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="inline-flex size-9 items-center justify-center rounded-xl border border-edge bg-background text-[#0A66C2] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0A66C2]/60 hover:shadow-[0_8px_18px_-12px_rgba(10,102,194,0.6)]"
          >
            <LinkedInIcon className="size-4" />
          </a>
          <a
            href={profile.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode"
            title="LeetCode"
            className="inline-flex size-9 items-center justify-center rounded-xl border border-edge bg-background text-[#FFA116] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FFA116]/60 hover:shadow-[0_8px_18px_-12px_rgba(255,161,22,0.6)]"
          >
            <LeetCodeIcon className="size-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            title="Email"
            className="inline-flex size-9 items-center justify-center rounded-xl border border-edge bg-background text-[#EA4335] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#EA4335]/60 hover:shadow-[0_8px_18px_-12px_rgba(234,67,53,0.6)]"
          >
            <Mail className="size-4" />
          </a>
          <a
            href={profile.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio"
            title="Portfolio"
            className="inline-flex size-9 items-center justify-center rounded-xl border border-edge bg-background text-[#0284C7] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0284C7]/60 hover:shadow-[0_8px_18px_-12px_rgba(2,132,199,0.6)]"
          >
            <Globe className="size-4" />
          </a>
          <button
            type="button"
            aria-label="Back to top"
            title="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="ml-1 inline-flex size-9 items-center justify-center rounded-xl border border-edge bg-background text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/50 hover:text-foreground"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
