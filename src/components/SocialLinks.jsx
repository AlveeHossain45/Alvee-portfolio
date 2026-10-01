import { ArrowUpRight, Globe, Mail } from "lucide-react";
import { Panel } from "./Panel";
import GitHubIcon from "./GitHubIcon";
import { socialLinks } from "../data/portfolioData";

function SocialIcon({ kind }) {
  if (kind === "github") return <GitHubIcon className="size-5" />;
  if (kind === "email") return <Mail className="size-5" />;
  return <Globe className="size-5" />;
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
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group screen-line-after flex items-center gap-4 p-4 transition-colors hover:bg-accent/50"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-edge bg-muted/40">
                <SocialIcon kind={link.kind} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium">{link.title}</h3>
                <p className="truncate font-mono text-xs text-muted-foreground">
                  {link.subtitle}
                </p>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
      </div>
    </Panel>
  );
}
