import type { ComponentType } from "react";
import type { Locale } from "@/lib/i18n";

type ContentModule = { default: ComponentType };
type ContentLoader = () => Promise<ContentModule>;

export const caseContentLoaders: Record<
  Locale,
  Record<string, ContentLoader>
> = {
  en: {
    "begemot-ai": () => import("./cases/en/begemot-ai.mdx"),
    "bobr-ai": () => import("./cases/en/bobr-ai.mdx"),
    inhelp: () => import("./cases/en/inhelp.mdx"),
    "pepper-cat": () => import("./cases/en/pepper-cat.mdx"),
    burmistrov: () => import("./cases/en/burmistrov.mdx"),
  },
  ru: {
    "begemot-ai": () => import("./cases/ru/begemot-ai.mdx"),
    "bobr-ai": () => import("./cases/ru/bobr-ai.mdx"),
    inhelp: () => import("./cases/ru/inhelp.mdx"),
    "pepper-cat": () => import("./cases/ru/pepper-cat.mdx"),
    burmistrov: () => import("./cases/ru/burmistrov.mdx"),
  },
};
