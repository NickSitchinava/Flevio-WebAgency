import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Button } from "@/components/ui/Button/Button";
import { locales, defaultLocale, type Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import styles from "./service-detail.module.css";

const SITE_URL = "https://nicksitchinava.dev";

function resolveLocale(value: string): Locale {
  return locales.includes(value as Locale) ? (value as Locale) : defaultLocale;
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    dictionaries[locale].services.items.map((service) => ({
      locale,
      slug: service.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const service = dictionaries[locale].services.items.find((item) => item.slug === slug);

  if (!service) {
    return {};
  }

  const canonicalUrl = `${SITE_URL}/${locale}/services/${slug}`;

  return {
    title: `${service.title} | Flevio`,
    description: service.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}/services/${slug}`])
        ),
        "x-default": `${SITE_URL}/${defaultLocale}/services/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: `${service.title} | Flevio`,
      description: service.description,
      locale: locale === "ka" ? "ka_GE" : "en_US",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = resolveLocale(rawLocale);
  const t = dictionaries[locale];
  const service = t.services.items.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "ProfessionalService",
      name: "Flevio",
      url: `${SITE_URL}/${locale}`,
    },
    areaServed: ["Georgia", "Worldwide"],
    url: `${SITE_URL}/${locale}/services/${slug}`,
  };

  return (
    <>
      <Header locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className={styles.main}>
        <div className={styles.inner}>
          <Link href={`/${locale}#services`} className={styles.back}>
            <ArrowLeft size={16} strokeWidth={2} />
            {t.serviceDetail.backLabel}
          </Link>

          <span className={styles.eyebrow}>{t.services.heading}</span>
          <h1 className={styles.title}>{service.title}</h1>
          <p className={styles.lead}>{service.description}</p>
          <p className={styles.details}>{service.details}</p>

          <h2 className={styles.featuresHeading}>{t.serviceDetail.featuresHeading}</h2>
          <ul className={styles.features}>
            {service.features.map((feature) => (
              <li key={feature} className={styles.featureItem}>
                <Check size={18} strokeWidth={2} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className={styles.cta}>
            <h2 className={styles.ctaHeading}>{t.serviceDetail.ctaHeading}</h2>
            <p className={styles.ctaText}>{t.serviceDetail.ctaText}</p>
            <Button
              href={`/${locale}#contact`}
              style={
                {
                  "--btn-bg": "var(--color-accent)",
                  "--btn-fg": "#ffffff",
                  "--btn-fill": "#111111",
                  "--btn-fill-fg": "#ffffff",
                } as React.CSSProperties
              }
            >
              {t.serviceDetail.ctaButton}
            </Button>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}