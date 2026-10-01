import { Panel, PanelContent, PanelHeader, PanelTitle } from "./Panel";
import { about } from "../data/portfolioData";

export default function About() {
  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <div className="space-y-4 text-[15px] leading-7 text-pretty">
          {about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}
