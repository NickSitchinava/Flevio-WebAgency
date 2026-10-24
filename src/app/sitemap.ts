import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const homeEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
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
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/services/${slug}`])
        ),
      },
    }))
  );

  const legalEntries: MetadataRoute.Sitemap = (["privacy", "terms"] as const).flatMap((document) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}/legal/${document}`,
      alternates: {
        languages: Object.fromEntries(
          locales.map((language) => [language, `${SITE_URL}/${language}/legal/${document}`])
        ),
      },
    }))
  );

  return [...homeEntries, ...serviceEntries, ...legalEntries];
}
