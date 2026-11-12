import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Playfair_Display, Poppins, Roboto } from "next/font/google";
import { locales, defaultLocale, type Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/site-url";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-hero-display",
  display: "swap",
});

function resolveLocale(value: string): Locale {
  return locales.includes(value as Locale) ? (value as Locale) : defaultLocale;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) {
    return {
      title: "404 — Page Not Found | Flevio",
      description: "The page you're looking for isn't available. Return to Flevio's homepage.",
      robots: { index: false },
    };
  }
  return {
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    },
    title: "404 — Page Not Found | Flevio",
    description: "The page you're looking for isn't available. Return to Flevio's homepage.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) notFound();
  const locale = resolveLocale(rawLocale);

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfair.variable} ${poppins.variable} ${roboto.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
