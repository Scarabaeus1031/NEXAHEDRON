"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export type PublicLanguage = "en" | "de";

export function LanguageSwitch({ language }: { readonly language: PublicLanguage }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  useEffect(() => {
    const params = new URLSearchParams(query);
    const explicit = params.get("lang");
    if (explicit === "de" || explicit === "en") {
      window.localStorage.setItem("nexahedron-language", explicit);
      document.documentElement.lang = explicit;
      return;
    }

    const stored = window.localStorage.getItem("nexahedron-language");
    const detected: PublicLanguage = stored === "de" || stored === "en"
      ? stored
      : "de";
    params.set("lang", detected);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, query, router]);

  function hrefFor(nextLanguage: PublicLanguage) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", nextLanguage);
    const query = params.toString();
    return `${pathname}${query ? `?${query}` : ""}`;
  }

  return (
    <span className="language-switch" aria-label={language === "de" ? "Sprache wählen" : "Choose language"}>
      <Link href={hrefFor("de")} hrefLang="de" aria-current={language === "de" ? "true" : undefined} onClick={() => window.localStorage.setItem("nexahedron-language", "de")}>DE</Link>
      <span aria-hidden="true">/</span>
      <Link href={hrefFor("en")} hrefLang="en" aria-current={language === "en" ? "true" : undefined} onClick={() => window.localStorage.setItem("nexahedron-language", "en")}>EN</Link>
    </span>
  );
}
