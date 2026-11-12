import { ArcRevealHero } from "@/components/ArcRevealHero/ArcRevealHero";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import { CookieConsent } from "@/components/CookieConsent/CookieConsent";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { ORGANIZATION_ID, SITE_URL } from "@/lib/site-url";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = locales.includes(rawLocale as Locale) ? (rawLocale as Locale) : defaultLocale;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Flevio",
    image: `${SITE_URL}/images/logo.webp`,
    logo: `${SITE_URL}/images/logo.webp`,
    url: `${SITE_URL}/${locale}`,
    email: dictionaries[locale].contact.channels.email.value,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tbilisi",
      addressCountry: "GE",
    },
    description: dictionaries[locale].meta.description,
  };

  return (
    <>
      <SmoothScroll />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ArcRevealHero locale={locale}>
        <CookieConsent locale={locale}>{children}</CookieConsent>
      </ArcRevealHero>
    </>
  );
}
