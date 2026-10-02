import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Panel, PanelHeader, PanelTitle } from "./Panel";
import GitHubIcon from "./GitHubIcon";
import { projects } from "../data/portfolioData";

function ProjectRow({ project }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="group/row screen-line-after">
      <div className="flex items-center gap-2 px-3 py-3 transition-colors duration-200 hover:bg-accent/40 sm:gap-3 sm:px-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-lg font-mono text-[10px] font-semibold text-white ring-1 ring-black/10 transition-transform duration-200 group-hover/row:-translate-y-0.5"
            style={{ backgroundColor: project.iconBg }}
          >
            {project.icon}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium">
              {project.name}
            </span>
            {project.date ? (
              <span className="font-mono text-xs text-muted-foreground">
                {project.date}
              </span>
            ) : null}
          </span>
          <ChevronDown
            className={`size-4 shrink-0 text-muted-foreground transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        <div className="flex shrink-0 items-center gap-2">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-mono text-xs text-muted-foreground hover:text-foreground"
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
              className="inline-flex items-center gap-0.5 font-mono text-xs text-muted-foreground hover:text-foreground"
            >
              <GitHubIcon className="size-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          )}
        </div>
      </div>

      <div className="expand-panel" data-open={open}>
        <div>
          <div className="px-4 pb-4">
            <p className="text-sm leading-6 text-muted-foreground">
              {project.description}
            </p>
            {project.technologies?.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-edge bg-muted/50 px-2 py-0.5 font-mono text-[11px] transition-colors hover:border-foreground/25 hover:bg-muted"
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
  );
}

export default function Projects() {
  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          Projects
          <sup className="ml-1 text-sm font-medium text-muted-foreground">
            ({projects.length})
          </sup>
        </PanelTitle>
      </PanelHeader>
      <div>
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </Panel>
  );
}
