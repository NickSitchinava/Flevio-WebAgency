import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Roboto } from "next/font/google";
import styles from "./global-not-found.module.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-404-body",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-404-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "404 — Page Not Found | Flevio",
  description: "The page you're looking for isn't available. Return to Flevio's homepage.",
  robots: { index: false },
};

export function NotFoundContent() {
  return (
    <main lang="en" className={`${styles.page} ${inter.variable} ${roboto.variable}`}>
          <div className={styles.brand} aria-label="Flevio">FLEVIO</div>

          <div className={styles.art} aria-hidden="true">
            <span className={`${styles.digit} ${styles.first}`}>4</span>
            <span className={`${styles.digit} ${styles.zero}`}>0</span>
            <span className={`${styles.digit} ${styles.last}`}>4</span>
          </div>

          <div className={styles.message}>
            <h1 className={styles.heading}>Page Not Found</h1>
            <div className={styles.recovery}>
              <p className={styles.description}>
                The path ends here. The page you&apos;re looking for isn&apos;t available.
              </p>
              <Link href="/" prefetch={false} className={styles.homeLink}>
                <span>Back to Home</span>
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
                  <path d="M16 10H4m0 0 5-5m-5 5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
    </main>
  );
}

export default function GlobalNotFound() {
  return (
    <html lang="en" className={styles.document}>
      <body className={styles.body}>
        <NotFoundContent />
      </body>
    </html>
  );
}
