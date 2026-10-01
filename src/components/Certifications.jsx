import { Panel, PanelHeader, PanelTitle } from "./Panel";
import { certifications } from "../data/portfolioData";

export default function Certifications() {
  return (
    <Panel id="certs">
      <PanelHeader>
        <PanelTitle>
          Certifications
          <sup className="ml-1 text-sm font-medium text-muted-foreground">
            ({certifications.length})
          </sup>
        </PanelTitle>
      </PanelHeader>
      <p className="px-4 py-8 text-center text-sm text-muted-foreground">
        No certifications listed yet.
      </p>
    </Panel>
  );
}
