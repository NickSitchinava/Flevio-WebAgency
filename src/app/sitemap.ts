import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

const SITE_URL = "https://nicksitchinava.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const homeEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "en" ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}`])
      ),
    },
  }));

  const serviceSlugs = dictionaries.en.services.items.map((item) => item.slug);

  const serviceEntries: MetadataRoute.Sitemap = serviceSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/services/${slug}`])
        ),
      },
    }))
  );

  return [...homeEntries, ...serviceEntries];
}