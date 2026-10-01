import { Panel, PanelHeader, PanelTitle } from "./Panel";
import { achievements } from "../data/portfolioData";

export default function Achievements() {
  return (
    <Panel id="achievements">
      <PanelHeader>
        <PanelTitle>
          Achievements
          <sup className="ml-1 text-sm font-medium text-muted-foreground">
            ({achievements.length})
          </sup>
        </PanelTitle>
      </PanelHeader>
      <p className="px-4 py-8 text-center text-sm text-muted-foreground">
        No achievements listed yet.
      </p>
    </Panel>
  );
}
