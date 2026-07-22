import type { ReactNode } from "react";

export function PageIntro({
  index,
  eyebrow,
  title,
  titleId,
  children,
}: {
  readonly index: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly titleId?: string;
  readonly children: ReactNode;
}) {
  return (
    <header className="page-intro">
      <div className="page-intro__index" aria-hidden="true">
        {index}
      </div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 id={titleId}>{title}</h1>
        <div className="page-intro__copy">{children}</div>
      </div>
    </header>
  );
}
