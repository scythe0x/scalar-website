"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";

export default function NotFound() {
  const locale = usePathname().startsWith("/ru") ? "ru" : "en";
  const dictionary = getDictionary(locale);

  return (
    <main className="not-found">
      <div>
        <span>{dictionary.notFound.label}</span>
        <h1>{dictionary.notFound.title}</h1>
        <Link href={`/${locale}`}>{dictionary.notFound.action}</Link>
      </div>
    </main>
  );
}
