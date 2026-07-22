"use client";

import { usePathname } from "next/navigation";

const steps = [
  { path: "/", label: "Landing" },
  { path: "/orient", label: "Choose" },
  { path: "/wonder", label: "Wonder" },
  { path: "/object", label: "Object" },
] as const;

export function JourneyProgress() {
  const pathname = usePathname();
  const activeIndex = Math.max(
    0,
    steps.findIndex((step) => step.path === pathname),
  );

  return (
    <nav className="journey-progress" aria-label="Alpha journey progress">
      <ol>
        {steps.map((step, index) => (
          <li
            key={step.path}
            className={index === activeIndex ? "is-current" : undefined}
            aria-current={index === activeIndex ? "step" : undefined}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {step.label}
          </li>
        ))}
      </ol>
    </nav>
  );
}
