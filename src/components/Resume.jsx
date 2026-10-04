import { Download, FileText } from "lucide-react";
import { Panel, PanelContent, SectionHeading } from "./Panel";
import { profile } from "../data/portfolioData";

export default function Resume() {
  return (
    <Panel id="resume">
      <SectionHeading
        icon={<FileText className="size-[18px]" />}
        title="Resume"
        subtitle="Experience, skills and education"
      />
      <PanelContent className="p-0">
        <div className="flex flex-col items-stretch justify-between gap-4 px-4 py-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="icon-tile size-11 shrink-0 rounded-xl">
              <FileText className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">My Resume</h3>
              <p className="text-sm text-muted-foreground">
                Download a copy of my latest experience and skills.
              </p>
            </div>
          </div>

          <a
            href={profile.resumeUrl}
            download
            className="shine press inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium text-white shadow-[0_12px_26px_-16px_rgba(99,102,241,0.95)] grad-brand transition-all duration-300 hover:shadow-[0_16px_32px_-16px_rgba(99,102,241,0.95)] hover:brightness-105"
          >
            <Download className="size-4" />
            Download Resume
          </a>
        </div>
      </PanelContent>
    </Panel>
  );
}
