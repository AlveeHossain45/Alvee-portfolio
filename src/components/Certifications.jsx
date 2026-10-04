import { ShieldCheck } from "lucide-react";
import { Panel, SectionHeading } from "./Panel";
import { certifications } from "../data/portfolioData";

export default function Certifications() {
  return (
    <Panel id="certs">
      <SectionHeading
        icon={<ShieldCheck className="size-[18px]" />}
        title="Certifications"
        count={`(${certifications.length})`}
        subtitle="Courses and credentials earned"
      />
      <p className="px-4 py-10 text-center text-sm text-muted-foreground">
        No certifications listed yet.
      </p>
    </Panel>
  );
}
