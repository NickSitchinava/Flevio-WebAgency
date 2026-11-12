import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import TechStack from "@/components/TechStack/TechStack";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";
import Projects from "@/components/Projects/Projects";
import PricingCalculator from "@/components/PricingCalculator/PricingCalculator";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import { locales, defaultLocale, type Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { SITE_URL, SOCIAL_IMAGE_URL } from "@/lib/site-url";

function resolveLocale(value: string): Locale {
  return locales.includes(value as Locale) ? (value as Locale) : defaultLocale;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  const t = dictionaries[locale].meta;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        ka: `${SITE_URL}/ka`,
        "x-default": `${SITE_URL}/en`,
      },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${locale}`,
      title: t.title,
      description: t.ogDescription,
      locale: locale === "ka" ? "ka_GE" : "en_US",
      images: [{ url: SOCIAL_IMAGE_URL, width: 1672, height: 941, alt: locale === "ka" ? "Flevio-ს ლოგო და ვებდიზაინისა და დეველოპმენტის წარწერა ლეპტოპის გვერდით" : "Flevio web design and development brand beside a laptop showing a website" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.ogDescription,
      images: [SOCIAL_IMAGE_URL],
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);

  return (
    <>
      <Header locale={locale} />
      <main>
        <Hero locale={locale} />
        <TechStack />
        <About locale={locale} />
        <Projects locale={locale} />
        <Services locale={locale} />
        <PricingCalculator locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
