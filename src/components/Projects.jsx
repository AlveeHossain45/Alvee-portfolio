import { useState } from "react";
import { ArrowUpRight, ChevronDown, Rocket } from "lucide-react";
import { Panel, SectionHeading } from "./Panel";
import GitHubIcon from "./GitHubIcon";
import { projects } from "../data/portfolioData";

function ProjectRow({ project }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="group/row screen-line-after">
      <div className="flex items-center gap-2 px-3 py-3 transition-colors duration-300 hover:bg-accent/40 sm:gap-3 sm:px-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-xl font-mono text-[11px] font-semibold text-white shadow-[0_10px_20px_-14px_rgba(0,0,0,0.9)] ring-1 ring-white/15 ring-inset transition-transform duration-500 ease-out group-hover/row:-translate-y-0.5 group-hover/row:scale-105"
            style={{
              background: `linear-gradient(135deg, ${project.iconBg} 0%, color-mix(in oklab, ${project.iconBg} 62%, #6366f1) 100%)`,
            }}
          >
            {project.icon}
          </span>

          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2">
              <span className="truncate text-sm font-semibold transition-colors duration-300 group-hover/row:text-brand">
                {project.name}
              </span>
              {project.date ? (
                <span className="shrink-0 rounded-full border border-edge bg-muted/60 px-1.5 py-px font-mono text-[10px] text-muted-foreground">
                  {project.date}
                </span>
              ) : null}
            </span>
            <span className="mt-0.5 block truncate text-xs text-muted-foreground">
              {project.description}
            </span>
          </span>

          <ChevronDown
            className={`size-4 shrink-0 text-muted-foreground transition-transform duration-400 ease-out ${
              open ? "rotate-180 text-brand" : ""
            }`}
          />
        </button>

        <div className="flex shrink-0 items-center gap-1.5">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-edge bg-background px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:text-brand"
            >
              Live
              <ArrowUpRight className="size-3" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub`}
              className="inline-flex items-center gap-1 rounded-full border border-edge bg-background px-2 py-1 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/50 hover:text-brand"
            >
              <GitHubIcon className="size-3.5" />
              <span className="hidden font-mono text-[11px] sm:inline">
                GitHub
              </span>
            </a>
          )}
        </div>
      </div>

      <div className="expand-panel" data-open={open}>
        <div>
          <div className="px-4 pb-4">
            <div className="rounded-xl border border-edge bg-card/50 p-3.5">
              <p className="text-sm leading-6 text-muted-foreground">
                {project.description}
              </p>
              {project.technologies?.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-edge bg-muted/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/45 hover:bg-muted hover:text-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <Panel id="projects">
      <SectionHeading
        icon={<Rocket className="size-[18px]" />}
        title="Projects"
        count={`(${projects.length})`}
        subtitle="Things I have designed and shipped"
        action={
          <span className="hidden font-mono text-[11px] text-muted-foreground sm:inline">
            click to expand
          </span>
        }
      />
      <div>
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </Panel>
  );
}
