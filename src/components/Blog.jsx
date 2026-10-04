import { ArrowRight, PenLine } from "lucide-react";
import { Panel, SectionHeading } from "./Panel";

export default function Blog() {
  return (
    <Panel id="blog">
      <SectionHeading
        icon={<PenLine className="size-[18px]" />}
        title="Blog"
        subtitle="Thoughts, notes and write-ups"
      />
      <div className="flex flex-col items-center gap-4 border-y border-edge px-4 py-12 text-center">
        <span className="icon-tile size-12 rounded-2xl">
          <PenLine className="size-5" />
        </span>
        <div className="space-y-1">
          <p className="text-sm font-semibold">Writing is in progress</p>
          <p className="mx-auto max-w-sm text-sm text-muted-foreground">
            Notes on code, learning, and building — coming soon.
          </p>
        </div>
        <button
          type="button"
          disabled
          className="inline-flex h-9 cursor-not-allowed items-center gap-1.5 rounded-full border border-edge bg-muted/50 px-4 text-sm font-medium text-muted-foreground"
        >
          All Posts
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </Panel>
  );
}
