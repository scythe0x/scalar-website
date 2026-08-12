import { notFound } from "next/navigation";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { WorkSection } from "@/components/sections/work-section";
import { PersonSchema } from "@/components/seo/person-schema";
import { getDictionary } from "@/content/dictionaries";
import { isLocale } from "@/lib/i18n";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);

  return (
    <>
      <PersonSchema />
      <main id="main-content">
        <HeroSection locale={locale} dictionary={dictionary} />
        <WorkSection locale={locale} dictionary={dictionary} />
        <ExperienceSection dictionary={dictionary} />
        <CapabilitiesSection dictionary={dictionary} />
        <ContactSection dictionary={dictionary} />
      </main>
    </>
  );
}
