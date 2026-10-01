import { Globe, Mail } from "lucide-react";
import GitHubIcon from "./GitHubIcon";
import { profile } from "../data/portfolioData";

export default function Footer() {
  return (
    <footer className="screen-line-before border-x border-edge">
      <div className="flex flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">{profile.name}</p>
          <p className="font-mono text-xs text-muted-foreground">
            {profile.title}
          </p>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          Built with React.
        </p>
        <div className="flex items-center gap-3 text-muted-foreground">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-foreground"
          >
            <GitHubIcon className="size-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="hover:text-foreground"
          >
            <Mail className="size-4" />
          </a>
          <a
            href={profile.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio"
            className="hover:text-foreground"
          >
            <Globe className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
