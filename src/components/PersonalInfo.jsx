import { useEffect, useState } from "react";
import {
  CodeXml,
  Globe,
  Mail,
  MapPin,
  Mars,
  Phone,
} from "lucide-react";
import { Panel, PanelContent } from "./Panel";
import { profile } from "../data/portfolioData";

function IntroItem({ children }) {
  return (
    <div className="flex items-center gap-4 font-mono text-sm">{children}</div>
  );
}

function IntroIcon({ children }) {
  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-4">
      {children}
    </div>
  );
}

function DhakaTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: profile.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
      setTime(formatted);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <IntroItem>
      <IntroIcon>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      </IntroIcon>
      <p className="text-sm">
        <span className="tabular-nums">{time || "--:--:--"}</span>
        <span className="ml-2 text-muted-foreground">{profile.timezoneLabel}</span>
      </p>
    </IntroItem>
  );
}

export default function PersonalInfo() {
  return (
    <Panel>
      <h2 className="sr-only">Overview</h2>
      <PanelContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6">
          <div className="space-y-4">
            <IntroItem>
              <IntroIcon>
                <CodeXml />
              </IntroIcon>
              <p>{profile.title}</p>
            </IntroItem>

            <IntroItem>
              <IntroIcon>
                <Mars />
              </IntroIcon>
              <p aria-label={`Pronouns: ${profile.pronouns}`}>
                {profile.pronouns}
              </p>
            </IntroItem>

            <DhakaTime />

            <IntroItem>
              <IntroIcon>
                <Phone />
              </IntroIcon>
              <p>{profile.countryCode}</p>
            </IntroItem>

            <IntroItem>
              <IntroIcon>
                <Globe />
              </IntroIcon>
              <a
                href={profile.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-3 hover:underline"
              >
                {profile.website}
              </a>
            </IntroItem>
          </div>

          <div className="space-y-4">
            <IntroItem>
              <IntroIcon>
                <MapPin />
              </IntroIcon>
              <p>{profile.location}</p>
            </IntroItem>

            <IntroItem>
              <IntroIcon>
                <Mail />
              </IntroIcon>
              <a
                href={`mailto:${profile.email}`}
                className="break-all underline-offset-3 hover:underline"
              >
                {profile.email}
              </a>
            </IntroItem>
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
