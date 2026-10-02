import { FileText } from "lucide-react";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./Panel";
import { profile } from "../data/portfolioData";

export default function Resume() {
  return (
    <Panel id="resume">
      <PanelHeader>
        <PanelTitle>Resume</PanelTitle>
      </PanelHeader>
      <PanelContent className="p-0">
        <div className="flex flex-col items-stretch justify-between gap-4 px-4 py-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-edge bg-muted/50">
              <FileText className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium">My Resume</h3>
              <p className="text-sm text-muted-foreground">
                Download a copy of my latest experience and skills.
              </p>
            </div>
          </div>
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 hover:scale-[1.03] active:scale-95"
          >
            Download Resume
          </a>
        </div>
      </PanelContent>
    </Panel>
  );
}
