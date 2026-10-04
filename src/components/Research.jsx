import { FlaskConical } from "lucide-react";
import { Panel, SectionHeading } from "./Panel";
import { research } from "../data/portfolioData";

export default function Research() {
  return (
    <Panel id="research">
      <SectionHeading
        icon={<FlaskConical className="size-[18px]" />}
        title="Research"
        count={`(${research.length})`}
        subtitle="Papers and explorations"
      />
      <p className="px-4 py-10 text-center text-sm text-muted-foreground">
        No research projects listed yet.
      </p>
    </Panel>
  );
}
