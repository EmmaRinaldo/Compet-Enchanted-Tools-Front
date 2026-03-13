import type { ButtonHTMLAttributes } from "react";

type MagicButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function MagicButton({
  variant = "primary",
  className,
  children,
  ...props
}: MagicButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgba(212,175,106,0.45)] focus-visible:ring-offset-0 active:translate-y-[1px]";

  const styles =
    variant === "primary"
      ? "bg-[linear-gradient(135deg,rgba(235,225,200,0.95)_0%,rgba(212,175,106,0.95)_45%,rgba(255,244,225,0.90)_100%)] text-black shadow-[0_10px_30px_rgba(212,175,106,0.18)]"
      : "border border-white/15 bg-white/5 text-[var(--ivory)] backdrop-blur hover:bg-white/8";

  return (
    <button
      {...props}
      className={[base, styles, "disabled:opacity-60", className ?? ""].join(
        " "
      )}
    >
      {children}
    </button>
  );
}

