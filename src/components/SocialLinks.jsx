import { ArrowUpRight, Globe, Mail } from "lucide-react";
import { Panel } from "./Panel";
import GitHubIcon from "./GitHubIcon";
import LeetCodeIcon from "./LeetCodeIcon";
import { socialLinks } from "../data/portfolioData";

function SocialIcon({ kind }) {
  if (kind === "github") return <GitHubIcon className="size-5" />;
  if (kind === "leetcode") return <LeetCodeIcon className="size-5" />;
  if (kind === "email") return <Mail className="size-5" />;
  return <Globe className="size-5" />;
}

function IconTile({ link }) {
  const accent = link.accent;
  return (
    <span
      className="relative flex size-12 shrink-0 items-center justify-center rounded-xl border border-edge bg-muted/40 text-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-sm"
      style={
        accent
          ? {
              color: accent,
              backgroundColor: `color-mix(in oklab, ${accent} 10%, transparent)`,
              borderColor: `color-mix(in oklab, ${accent} 28%, transparent)`,
            }
          : undefined
      }
    >
      <SocialIcon kind={link.kind} />
      <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset dark:ring-white/10" />
    </span>
  );
}

export default function SocialLinks() {
  return (
    <Panel>
      <h2 className="sr-only">Social Links</h2>
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 hidden grid-cols-2 sm:grid">
          <div className="border-r border-edge" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {socialLinks.map((link) => {
            const external = link.href.startsWith("http");
            return (
              <a
                key={link.id}
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group screen-line-after relative flex items-center gap-4 p-4 transition-colors duration-200 hover:bg-accent/50"
              >
                <IconTile link={link} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1 text-sm font-medium underline-offset-4 group-hover:underline">
                    {link.title}
                  </span>
                  <span className="block truncate font-mono text-xs text-muted-foreground">
                    {link.subtitle}
                  </span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </a>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
