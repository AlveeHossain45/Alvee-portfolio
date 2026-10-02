import { ArrowRight, PenLine } from "lucide-react";
import { Panel, PanelHeader, PanelTitle } from "./Panel";

export default function Blog() {
  return (
    <Panel id="blog">
      <PanelHeader>
        <PanelTitle>Blog</PanelTitle>
      </PanelHeader>
      <div className="flex flex-col items-center gap-3 border-y border-edge px-4 py-10">
        <span className="flex size-10 items-center justify-center rounded-full border border-edge bg-muted/40 text-muted-foreground">
          <PenLine className="size-4" />
        </span>
        <p className="text-sm text-muted-foreground">
          Notes on code, learning, and building — coming soon.
        </p>
        <button
          type="button"
          disabled
          className="inline-flex h-8 cursor-not-allowed items-center gap-1.5 rounded-full border border-edge bg-muted/50 px-4 text-sm font-medium text-muted-foreground"
        >
          All Posts
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </Panel>
  );
}
