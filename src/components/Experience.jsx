import { useState } from "react";
import { Briefcase, ChevronDown, GraduationCap } from "lucide-react";
import { Panel, SectionHeading } from "./Panel";
import { education } from "../data/portfolioData";

export default function Experience() {
  const [open, setOpen] = useState(false);

  return (
    <Panel id="experience">
      <SectionHeading
        icon={<Briefcase className="size-[18px]" />}
        title="Experience"
        subtitle="Where I am learning and growing"
      />

      <div className="screen-line-after flex items-center justify-between px-4 py-3">
        <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-brand" />
          Education
        </h3>
        <span className="font-mono text-[11px] text-muted-foreground">
          {education.statusShort}
        </span>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-7 shrink-0 items-center justify-center">
            <span
              className="flex size-2 rounded-full bg-brand"
              style={{
                boxShadow: "0 0 0 4px color-mix(in oklab, var(--brand) 18%, transparent)",
              }}
            />
          </div>
          <h3 className="text-lg leading-snug font-semibold">
            {education.school}
          </h3>
          <span className="relative flex items-center justify-center">
            <span className="ring-pulse absolute inline-flex size-3 rounded-full bg-brand" />
            <span className="relative inline-flex size-2 rounded-full bg-brand" />
          </span>
        </div>

        <div className="relative mt-4 before:absolute before:top-0 before:bottom-0 before:left-3 before:w-px before:bg-gradient-to-b before:from-brand/50 before:to-transparent">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="-mx-1 flex w-full items-start gap-3 rounded-xl px-1 text-left transition-colors duration-300 hover:bg-accent/50"
          >
            <div className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border border-edge bg-background text-brand shadow-sm">
              <GraduationCap className="size-3.5" />
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{education.degree}</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {education.statusShort} · Click for details
                  </p>
                </div>
                <ChevronDown
                  className={`mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-400 ease-out ${
                    open ? "rotate-180 text-brand" : ""
                  }`}
                />
              </div>
            </div>
          </button>

          <div className="expand-panel" data-open={open}>
            <div>
              <div className="mt-2 ml-9 rounded-xl border border-edge bg-card/50 p-3.5 font-mono text-sm">
                <p className="mb-1.5">
                  <span className="text-muted-foreground">Degree:</span>{" "}
                  {education.degree}
                </p>
                <p className="mb-1.5">
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
