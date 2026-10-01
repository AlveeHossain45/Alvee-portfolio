import { Panel, PanelHeader, PanelTitle } from "./Panel";
import { research } from "../data/portfolioData";

export default function Research() {
  return (
    <Panel id="research">
      <PanelHeader>
        <PanelTitle>
          Research
          <sup className="ml-1 text-sm font-medium text-muted-foreground">
            ({research.length})
          </sup>
        </PanelTitle>
      </PanelHeader>
      <p className="px-4 py-8 text-center text-sm text-muted-foreground">
        No research projects listed yet.
      </p>
    </Panel>
  );
}
