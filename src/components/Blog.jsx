import { ArrowRight } from "lucide-react";
import { Panel, PanelHeader, PanelTitle } from "./Panel";

export default function Blog() {
  return (
    <Panel id="blog">
      <PanelHeader>
        <PanelTitle>Blog</PanelTitle>
      </PanelHeader>
      <p className="border-y border-edge px-4 py-8 text-center text-sm text-muted-foreground">
        Coming Soon
      </p>
      <div className="screen-line-before flex justify-center py-2">
        <button
          type="button"
          disabled
          className="inline-flex h-8 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground opacity-80"
        >
          All Posts
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </Panel>
  );
}
