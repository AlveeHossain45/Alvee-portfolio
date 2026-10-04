import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CodeXml,
  Globe,
  Mail,
  MapPin,
  Mars,
  Phone,
} from "lucide-react";
import { Panel, PanelContent, SectionHeading } from "./Panel";
import { profile } from "../data/portfolioData";

function InfoCard({ icon, children, delay = 0, href, external, className = "" }) {
  const content = (
    <>
      <span className="icon-tile size-9 shrink-0 rounded-[10px]">{icon}</span>
      <span className="min-w-0 flex-1 text-sm">{children}</span>
      {href && (
        <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand group-hover:opacity-100" />
      )}
    </>
  );

  const classes = `stagger-item group flex items-center gap-3 rounded-xl border border-edge bg-card/40 p-3 hover:border-brand/40 hover:bg-card ${className}`;
  const style = { "--stagger-delay": `${delay}ms` };

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={classes}
        style={style}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={classes} style={style}>
      {content}
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
      className="size-[18px]"
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
    <InfoCard
      icon={<ClockIcon />}
      delay={300}
      className="sm:col-span-2"
    >
      <span className="tabular-nums">{time || "--:--:--"}</span>
      <span className="ml-2 text-xs text-muted-foreground">
        {profile.timezoneLabel} · Live
      </span>
    </InfoCard>
  );
}

export default function PersonalInfo() {
  return (
    <Panel>
      <h2 className="sr-only">Overview</h2>
      <SectionHeading
        icon={<CodeXml className="size-[18px]" />}
        title="Overview"
        subtitle="The essentials, at a glance"
      />
      <PanelContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <InfoCard
            icon={<CodeXml className="size-[18px]" />}
            delay={0}
          >
            {profile.title}
          </InfoCard>
          <InfoCard
            icon={<MapPin className="size-[18px]" />}
            delay={60}
          >
            {profile.location}
          </InfoCard>

          <InfoCard
            icon={<Mars className="size-[18px]" />}
            delay={120}
          >
            <span aria-label={`Pronouns: ${profile.pronouns}`}>
              {profile.pronouns}
            </span>
          </InfoCard>
          <InfoCard
            icon={<Mail className="size-[18px]" />}
            delay={180}
            href={`mailto:${profile.email}`}
          >
            <span className="block truncate">{profile.email}</span>
          </InfoCard>

          <InfoCard
            icon={<Globe className="size-[18px]" />}
            delay={240}
            href={profile.websiteUrl}
            external
          >
            <span className="block truncate">{profile.website}</span>
          </InfoCard>
          <InfoCard
            icon={<Phone className="size-[18px]" />}
            delay={300}
          >
            {profile.countryCode}
          </InfoCard>

          <DhakaTime />
        </div>
      </PanelContent>
    </Panel>
  );
}
