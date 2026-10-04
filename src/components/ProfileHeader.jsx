import { AHMark } from "./AHMark";
import { profile } from "../data/portfolioData";
import profilePhoto from "../../public/Alveejob.png";

export default function ProfileHeader() {
  return (
    <div id="top" data-reveal="">
      <div
        className="dot-grid screen-line-before screen-line-after relative flex aspect-[2/1] select-none items-center justify-center overflow-hidden border-x border-edge text-foreground sm:aspect-[3/1]"
        style={{
          "--pattern-foreground":
            "color-mix(in oklab, var(--foreground) 5%, transparent)",
        }}
      >
        <div
          aria-hidden="true"
          className="orb-a pointer-events-none absolute -top-1/3 left-[8%] size-64 rounded-full blur-3xl sm:size-80"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, #38bdf8 45%, transparent) 0%, transparent 68%)",
          }}
        />
        <div
          aria-hidden="true"
          className="orb-b pointer-events-none absolute -right-10 -bottom-1/4 size-56 rounded-full blur-3xl sm:size-72"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, #818cf8 45%, transparent) 0%, transparent 68%)",
          }}
        />
        <div
          aria-hidden="true"
          className="hero-glow pointer-events-none absolute inset-0"
        />

        <div className="relative flex flex-col items-center gap-3">
          <div className="transition-transform duration-700 ease-out hover:scale-105">
            <AHMark className="h-[48%] max-h-28 w-auto drop-shadow-[0_10px_30px_rgba(99,102,241,0.28)] sm:max-h-32" />
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-background/70 px-2.5 py-1 font-mono text-[10px] tracking-wide text-muted-foreground uppercase backdrop-blur-sm">
            <span className="relative flex size-1.5">
              <span className="ring-pulse absolute inline-flex size-full rounded-full bg-emerald-500" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
            </span>
            Available for work
          </span>
        </div>

        <div
          aria-hidden="true"
          className="hairline-grad pointer-events-none absolute inset-x-0 bottom-0 h-px"
        />
      </div>

      <div className="screen-line-after flex border-x border-edge">
        <div className="shrink-0 border-r border-edge">
          <div className="mx-[2px] my-[3px]">
            <img
              src={profilePhoto}
              alt={`${profile.name}'s avatar`}
              width={160}
              height={160}
              className="size-32 rounded-full object-cover ring-1 ring-border ring-offset-2 ring-offset-background transition-transform duration-300 hover:scale-[1.03] sm:size-40"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div
            className="diagonal-stripes flex grow items-end pb-1.5 pl-4"
            style={{
              "--pattern-foreground":
                "color-mix(in oklab, var(--edge) 100%, transparent)",
            }}
          >
            <div className="line-clamp-1 hidden select-none font-mono text-xs text-zinc-300 sm:block dark:text-zinc-800">
              {"// Software Engineer · Dhaka, Bangladesh"}
            </div>
          </div>

          <div className="border-t border-edge">
            <h1 className="py-0.5 pl-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              <span className="block truncate">{profile.name}</span>
            </h1>
          </div>

          <p className="enter-left flex h-12 items-center gap-2 overflow-hidden border-t border-edge pl-4 font-mono text-sm text-muted-foreground">
            <span className="text-foreground">{"</>"}</span>
            <span className="truncate">{profile.title}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
