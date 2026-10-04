import { useEffect, useState } from "react";
import { CodeXml, Globe, Mail, MapPin, Mars, Phone } from "lucide-react";
import { Panel, PanelContent, SectionHeading } from "./Panel";
import { profile } from "../data/portfolioData";

function InfoRow({ icon, children, delay = 0, href, external, className = "" }) {
  const body = (
    <>
      <span className="icon-tile size-7 shrink-0 rounded-lg">{icon}</span>
      <span className="min-w-0 truncate">{children}</span>
    </>
  );

  const classes = `stagger-item group flex items-center gap-2.5 py-1 font-mono text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground ${className}`;
  const style = { "--stagger-delay": `${delay}ms` };

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={`${classes} underline-offset-3 hover:underline`}
        style={style}
      >
        {body}
      </a>
    );
  }

  return (
    <div className={classes} style={style}>
      {body}
    </div>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
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
    <InfoRow icon={<ClockIcon />} delay={360} className="sm:col-span-2">
      <span className="tabular-nums">{time || "--:--:--"}</span>
      <span className="ml-2 text-xs">{profile.timezoneLabel}</span>
    </InfoRow>
  );
}

export default function PersonalInfo() {
  return (
    <Panel>
      <SectionHeading
        icon={<CodeXml className="size-4" />}
        title="Overview"
      />
      <PanelContent className="px-4 py-3">
        <div className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
          <InfoRow icon={<CodeXml className="size-4" />} delay={0}>
            {profile.title}
          </InfoRow>
          <InfoRow icon={<MapPin className="size-4" />} delay={60}>
            {profile.location}
          </InfoRow>

          <InfoRow icon={<Mars className="size-4" />} delay={120}>
            <span aria-label={`Pronouns: ${profile.pronouns}`}>
              {profile.pronouns}
            </span>
          </InfoRow>
          <InfoRow
            icon={<Mail className="size-4" />}
            delay={180}
            href={`mailto:${profile.email}`}
          >
            {profile.email}
          </InfoRow>

          <InfoRow
            icon={<Phone className="size-4" />}
            delay={240}
            href={profile.phoneHref}
          >
            <span className="tabular-nums">{profile.phone}</span>
          </InfoRow>
          <InfoRow
            icon={<Globe className="size-4" />}
            delay={300}
            href={profile.websiteUrl}
            external
          >
            {profile.website}
          </InfoRow>

          <DhakaTime />
        </div>
      </PanelContent>
    </Panel>
  );
}
