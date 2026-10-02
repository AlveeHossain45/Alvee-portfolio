import { Globe, Mail } from "lucide-react";
import GitHubIcon from "./GitHubIcon";
import LeetCodeIcon from "./LeetCodeIcon";
import { profile } from "../data/portfolioData";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="screen-line-before border-x border-edge">
      <div className="flex flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">{profile.name}</p>
          <p className="font-mono text-xs text-muted-foreground">
            {profile.title}
          </p>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          © {year} · Built with React & Tailwind
        </p>
        <div className="flex items-center gap-2 text-muted-foreground">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex size-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-accent hover:text-foreground hover:scale-110"
          >
            <GitHubIcon className="size-4" />
          </a>
          <a
            href={profile.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode"
            className="inline-flex size-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-[#FFA116]/10 hover:text-[#FFA116] hover:scale-110"
          >
            <LeetCodeIcon className="size-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="inline-flex size-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-accent hover:text-foreground hover:scale-110"
          >
            <Mail className="size-4" />
          </a>
          <a
            href={profile.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio"
            className="inline-flex size-8 items-center justify-center rounded-full transition-all duration-200 hover:bg-accent hover:text-foreground hover:scale-110"
          >
            <Globe className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
