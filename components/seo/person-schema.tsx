import { siteConfig } from "@/config/site-config";
import { getRequestOrigin } from "@/lib/request-url";

export async function PersonSchema() {
  const origin = await getRequestOrigin();
  const sameAs = Object.values(siteConfig.socialLinks).filter(Boolean);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.person,
    alternateName: siteConfig.name,
    url: origin,
    email: `mailto:${siteConfig.email}`,
    jobTitle: "Product Engineer",
    knowsAbout: [
      "Product engineering",
      "Full-stack product development",
      "Frontend engineering",
      "User experience",
      "Interface design",
      "Product analytics",
      "Production delivery",
      "Team coordination",
    ],
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
