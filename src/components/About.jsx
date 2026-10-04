import { User } from "lucide-react";
import { Panel, PanelContent, SectionHeading } from "./Panel";
import { about } from "../data/portfolioData";

export default function About() {
  return (
    <Panel id="about">
      <SectionHeading
        icon={<User className="size-[18px]" />}
        title="About"
        subtitle="A short story in three lines"
      />
      <PanelContent>
        <div className="space-y-4 text-[15px] leading-7 text-pretty">
          {about.map((paragraph, i) => (
            <p
              key={paragraph}
              className={`stagger-item ${
                i === 0
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ "--stagger-delay": `${i * 90}ms` }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}
