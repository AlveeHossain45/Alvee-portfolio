import { ArrowUpRight, Globe, Mail } from "lucide-react";
import { Panel } from "./Panel";
import GitHubIcon from "./GitHubIcon";
import LinkedInIcon from "./LinkedInIcon";
import LeetCodeIcon from "./LeetCodeIcon";
import { socialLinks } from "../data/portfolioData";

const TILES = {
  github: {
    icon: <GitHubIcon className="size-5" />,
    style: { background: "#181717", color: "#ffffff" },
  },
  linkedin: {
    icon: <LinkedInIcon className="size-5" />,
    style: { background: "#0A66C2", color: "#ffffff" },
  },
  leetcode: {
    icon: <LeetCodeIcon className="size-5" />,
    style: { background: "#FFA116", color: "#ffffff" },
  },
  email: {
    icon: <Mail className="size-5" />,
    style: { background: "linear-gradient(135deg, #EA4335, #C5221F)" },
  },
  globe: {
    icon: <Globe className="size-5" />,
    style: { background: "linear-gradient(135deg, #38bdf8, #6366f1)" },
  },
};

function IconTile({ link }) {
  const tile = TILES[link.kind] || TILES.globe;
  return (
    <span
      className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-[0_12px_24px_-16px_rgba(0,0,0,0.9)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-[-4deg] group-hover:scale-105 group-hover:shadow-[0_18px_30px_-16px_rgba(0,0,0,0.75)]"
      style={tile.style}
    >
      {tile.icon}
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/25 ring-inset" />
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
          {socialLinks.map((link, i) => {
            const external = link.href.startsWith("http");
            return (
              <a
                key={link.id}
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="stagger-item group screen-line-after relative flex items-center gap-4 p-4 hover:bg-accent/60"
                style={{ "--stagger-delay": `${i * 70}ms` }}
              >
                <IconTile link={link} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1 text-sm font-medium">
                    {link.title}
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-xs text-muted-foreground">
                    {link.subtitle}
                  </span>
                </span>
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-edge bg-background text-muted-foreground opacity-0 transition-all duration-400 group-hover:text-foreground group-hover:opacity-100">
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}
