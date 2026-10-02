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

export function PanelHeader({ className = "", children }) {
  return (
    <header
      data-slot="panel-header"
      className={`screen-line-after px-4 ${className}`}
    >
      {children}
    </header>
  );
}

export function PanelTitle({ className = "", children }) {
  return (
    <h2
      data-slot="panel-title"
      className={`text-2xl font-semibold tracking-tight sm:text-3xl ${className}`}
    >
      {children}
    </h2>
  );
}

export function PanelContent({ className = "", children }) {
  return (
    <div data-slot="panel-body" className={`p-4 ${className}`}>
      {children}
    </div>
  );
}

export function StripeDivider() {
  return (
    <div className="relative z-0 h-8">
      <div
        className="diagonal-stripes pointer-events-none absolute inset-y-0 -left-[100vw] -z-10 w-[200vw]"
        style={{
          "--pattern-foreground":
            "color-mix(in oklab, var(--edge) 100%, transparent)",
        }}
      />
    </div>
  );
}
