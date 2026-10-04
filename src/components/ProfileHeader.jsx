import { AHMark } from "./AHMark";
import { profile } from "../data/portfolioData";
import profilePhoto from "../../public/Alveejob.png";

function VerifiedIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="size-5 shrink-0 text-[#1d9bf0] transition-transform duration-500 ease-out hover:rotate-[20deg] hover:scale-110"
      aria-label="Verified"
    >
      <path
        fill="currentColor"
        d="M24 12a4.454 4.454 0 0 0-2.564-3.91 4.437 4.437 0 0 0-.948-4.578 4.436 4.436 0 0 0-4.577-.948A4.44 4.44 0 0 0 12 0a4.423 4.423 0 0 0-3.9 2.564 4.434 4.434 0 0 0-2.43-.178 4.425 4.425 0 0 0-2.158 1.126 4.42 4.42 0 0 0-1.12 2.156 4.42 4.42 0 0 0 .183 2.421A4.456 4.456 0 0 0 0 12a4.465 4.465 0 0 0 2.576 3.91 4.433 4.433 0 0 0 .936 4.577 4.459 4.459 0 0 0 4.577.95A4.454 4.454 0 0 0 12 24a4.439 4.439 0 0 0 3.91-2.563 4.26 4.26 0 0 0 5.526-5.526A4.453 4.453 0 0 0 24 12Zm-13.709 4.917-4.38-4.378 1.652-1.663 2.646 2.646L15.83 7.4l1.72 1.591-7.258 7.926Z"
      />
    </svg>
  );
}

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
          <div className="mx-[3px] my-[4px]">
            <div className="rounded-full bg-gradient-to-br from-sky-400 via-indigo-500 to-violet-500 p-[3px] shadow-[0_10px_30px_-16px_rgba(99,102,241,0.85)]">
              <img
                src={profilePhoto}
                alt={`${profile.name}'s avatar`}
                width={160}
                height={160}
                className="size-32 rounded-full bg-background object-cover ring-2 ring-background transition-transform duration-500 ease-out hover:scale-[1.04] sm:size-40"
              />
            </div>
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
            <h1 className="flex items-center gap-1.5 py-0.5 pl-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              <span className="truncate transition-colors duration-300 hover:text-brand">
                {profile.name}
              </span>
              <VerifiedIcon />
            </h1>
          </div>

          <p className="flex h-12 items-center gap-2 border-t border-edge pl-4 font-mono text-sm text-muted-foreground">
            <span className="text-brand">{"</>"}</span>
            <span className="truncate">{profile.title}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
