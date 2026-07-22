import type { ReactNode } from "react";

export function PublicPageIntro({
  eyebrow,
  title,
  children,
}: {
  readonly eyebrow: string;
  readonly title: string;
  readonly children: ReactNode;
}) {
  return (
    <header className="public-page-intro">
      <p className="public-kicker">{eyebrow}</p>
      <h1>{title}</h1>
      <div>{children}</div>
    </header>
  );
}
