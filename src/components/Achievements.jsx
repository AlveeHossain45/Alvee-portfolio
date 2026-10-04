import { Award } from "lucide-react";
import { Panel, SectionHeading } from "./Panel";
import { achievements } from "../data/portfolioData";

export default function Achievements() {
  return (
    <Panel id="achievements">
      <SectionHeading
        icon={<Award className="size-[18px]" />}
        title="Achievements"
        count={`(${achievements.length})`}
        subtitle="Milestones worth remembering"
      />
      <p className="px-4 py-10 text-center text-sm text-muted-foreground">
        No achievements listed yet.
      </p>
    </Panel>
  );
}
