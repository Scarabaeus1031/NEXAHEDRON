import Link from "next/link";
import type { ComponentProps } from "react";

interface ActionLinkProps extends ComponentProps<typeof Link> {
  readonly tone?: "primary" | "quiet";
}

export function ActionLink({
  tone = "primary",
  className = "",
  ...props
}: ActionLinkProps) {
  return (
    <Link
      className={`action action--${tone} ${className}`.trim()}
      {...props}
    />
  );
}
