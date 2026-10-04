export function Panel({ id, className = "", children, ...props }) {
  return (
    <section
      id={id}
      data-slot="panel"
      data-reveal=""
      className={`screen-line-before screen-line-after border-x border-edge ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  icon,
  title,
  count,
  subtitle,
  action,
  className = "",
}) {
  return (
    <header
      data-slot="panel-header"
      className={`screen-line-after group ${className}`}
    >
      <div className="flex items-center gap-3 px-4 py-4">
        <span className="icon-tile size-9 shrink-0 rounded-xl">{icon}</span>
        <div className="min-w-0 flex-1">
          <h2 className="flex items-baseline gap-1.5 text-lg font-semibold tracking-tight sm:text-xl">
            <span className="truncate">{title}</span>
            {count != null && (
              <sup className="font-mono text-[11px] font-medium text-muted-foreground">
                {count}
              </sup>
            )}
          </h2>
          {subtitle && (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </div>
    </header>
  );
}

export function PanelContent({ className = "", children, ...props }) {
  return (
    <div data-slot="panel-body" className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function StripeDivider() {
  return (
    <div className="relative z-0 h-7">
      <div
        className="diagonal-stripes pointer-events-none absolute inset-y-0 -left-[100vw] -z-10 w-[200vw]"
        style={{
          "--pattern-foreground":
            "color-mix(in oklab, var(--edge) 100%, transparent)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      />
    </div>
  );
}
