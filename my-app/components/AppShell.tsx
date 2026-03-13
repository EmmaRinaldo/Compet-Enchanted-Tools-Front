import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
  background?: ReactNode;
  className?: string;
};

export function AppShell({ children, background, className }: AppShellProps) {
  return (
    <div
      className={[
        "min-h-[100svh] bg-[var(--bg)] text-[var(--ivory)]",
        "supports-[padding:env(safe-area-inset-top)]:pt-[env(safe-area-inset-top)]",
        "supports-[padding:env(safe-area-inset-bottom)]:pb-[env(safe-area-inset-bottom)]",
        className ?? "",
      ].join(" ")}
    >
      <div className="relative min-h-[100svh]">
        {background ? (
          <div className="pointer-events-none absolute inset-0">{background}</div>
        ) : null}
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

