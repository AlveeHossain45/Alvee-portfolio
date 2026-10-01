import { useState } from "react";
import { ChevronDown, GraduationCap } from "lucide-react";
import { Panel, PanelHeader, PanelTitle } from "./Panel";
import { education } from "../data/portfolioData";

export default function Experience() {
  const [open, setOpen] = useState(false);

  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>Experience</PanelTitle>
      </PanelHeader>

      <div className="screen-line-after px-4 py-3">
        <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          Education
        </h3>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-7 shrink-0 items-center justify-center">
            <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          </div>
          <h3 className="text-lg leading-snug font-medium">{education.school}</h3>
          <span className="relative flex items-center justify-center">
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-info opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-info" />
          </span>
        </div>

        <div className="relative mt-4 before:absolute before:top-0 before:bottom-0 before:left-3 before:w-px before:bg-border">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-start gap-3 rounded-lg px-1 -mx-1 text-left transition-colors hover:bg-accent/40"
          >
            <div className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border border-edge bg-background">
              <GraduationCap className="size-3.5" />
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">{education.degree}</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {education.statusShort}
                  </p>
                </div>
                <ChevronDown
                  className={`mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          </button>

          <div className="expand-panel" data-open={open}>
            <div>
              <div className="mt-2 ml-9 space-y-2 pb-1 font-mono text-sm">
                <p>
                  <span className="text-muted-foreground">Degree:</span>{" "}
                  {education.degree}
                </p>
                <p>
                  <span className="text-muted-foreground">University:</span>{" "}
                  {education.school}
                </p>
                <p>
                  <span className="text-muted-foreground">Status:</span>{" "}
                  {education.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}
