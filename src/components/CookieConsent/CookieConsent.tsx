"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { useLoaderReveal } from "@/components/ArcRevealHero/LoaderContext";
import styles from "./cookie-consent.module.css";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const GA_ID = measurementId && /^G-[A-Z0-9]+$/.test(measurementId) ? measurementId : null;
const CONSENT_KEY = "flevio:analytics-consent:v1";
const CONSENT_LIFETIME_MS = 180 * 24 * 60 * 60 * 1000;
const GA_COOKIE_LIFETIME_SECONDS = 180 * 24 * 60 * 60;

type Choice = { version: 1; analytics: boolean; savedAt: number };
type GtagWindow = Window & {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
};

let analyticsStarted = false;

function clearAnalyticsCookies() {
  const hostname = window.location.hostname;
  const domains = ["", hostname, `.${hostname}`];
  const parts = hostname.split(".");
  for (let index = 1; index < parts.length - 1; index += 1) {
    domains.push(`.${parts.slice(index).join(".")}`);
  }

  for (const item of document.cookie.split(";")) {
    const name = item.trim().split("=")[0];
    if (name !== "_ga" && !name.startsWith("_ga_")) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ""}`;
    }
  }
}

function readChoice(): Choice | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (
      !value || typeof value !== "object" ||
      !("version" in value) || value.version !== 1 ||
      !("analytics" in value) || typeof value.analytics !== "boolean" ||
      !("savedAt" in value) || typeof value.savedAt !== "number" ||
      !Number.isFinite(value.savedAt) || value.savedAt > Date.now() ||
      Date.now() - value.savedAt >= CONSENT_LIFETIME_MS
    ) {
      return null;
    }
    return value as Choice;
  } catch {
    return null;
  }
}

function saveChoice(analytics: boolean): Choice {
  const choice: Choice = { version: 1, analytics, savedAt: Date.now() };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(choice));
  } catch {
    // Consent still applies to this page; a later visit will ask again.
  }
  return choice;
}

function startAnalytics() {
  if (!GA_ID || analyticsStarted) return;
  analyticsStarted = true;

  const browser = window as GtagWindow;
  browser.dataLayer = browser.dataLayer ?? [];
  browser.gtag = (...args: unknown[]) => browser.dataLayer?.push(args);
  browser.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  browser.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  browser.gtag("js", new Date());
  browser.gtag("config", GA_ID, {
    cookie_expires: GA_COOKIE_LIFETIME_SECONDS,
    cookie_update: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

function revokeAnalytics() {
  (window as GtagWindow).gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  clearAnalyticsCookies();
  if (analyticsStarted) window.location.reload();
}

const copy = {
  en: {
    title: "Cookies on Flevio",
    summary: "Optional Google Analytics helps us understand page visits. We load it only if you accept.",
    accept: "Accept analytics",
    decline: "Decline",
    customize: "Customize",
    settingsTitle: "Cookie choices",
    settingsDescription: "Choose whether Flevio may use Google Analytics. Your choice is saved in this browser for six months.",
    essentialTitle: "Required preference storage",
    essentialDescription: "Your choice is saved in local storage. This does not set a cookie.",
    analyticsTitle: "Analytics",
    analyticsDescription: "Google Analytics measures page views. It stays off until you allow it.",
    alwaysOn: "Always on",
    save: "Save choice",
    close: "Close cookie choices",
    privacy: "Privacy Policy",
    policy: "Cookie Policy",
  },
  ka: {
    title: "ქუქი-ფაილები Flevio-ზე",
    summary: "არჩევითი Google Analytics გვეხმარება გვერდების ნახვების გაგებაში. მას მხოლოდ თქვენი თანხმობის შემდეგ ვტვირთავთ.",
    accept: "ანალიტიკაზე თანხმობა",
    decline: "უარყოფა",
    customize: "მორგება",
    settingsTitle: "ქუქი-ფაილების არჩევანი",
    settingsDescription: "აირჩიეთ, შეუძლია თუ არა Flevio-ს Google Analytics-ის გამოყენება. არჩევანი ამ ბრაუზერში ექვსი თვით ინახება.",
    essentialTitle: "არჩევანის შენახვა",
    essentialDescription: "თქვენი არჩევანი ინახება ბრაუზერის ლოკალურ საცავში. ეს ქუქი-ფაილს არ ქმნის.",
    analyticsTitle: "ანალიტიკა",
    analyticsDescription: "Google Analytics ზომავს გვერდების ნახვებს. ის გამორთულია, სანამ თანხმობას არ მისცემთ.",
    alwaysOn: "ყოველთვის ჩართულია",
    save: "არჩევანის შენახვა",
    close: "არჩევანის დახურვა",
    privacy: "კონფიდენციალურობის პოლიტიკა",
    policy: "ქუქი-ფაილების პოლიტიკა",
  },
} satisfies Record<Locale, Record<string, string>>;

const ConsentContext = React.createContext({
  enabled: false,
  openSettings: () => {},
});

export function useCookieConsent() {
  return React.useContext(ConsentContext);
}

export function CookieConsent({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const revealed = useLoaderReveal();
  const [choice, setChoice] = React.useState<Choice | null>(() =>
    GA_ID && typeof window !== "undefined" ? readChoice() : null
  );
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [draftAnalytics, setDraftAnalytics] = React.useState(false);
  const t = copy[locale];

  React.useEffect(() => {
    if (!GA_ID) return;
    if (!choice?.analytics) {
      clearAnalyticsCookies();
    }
    if (!choice) {
      try { window.localStorage.removeItem(CONSENT_KEY); } catch { /* Storage may be unavailable. */ }
    }

    const syncTabs = (event: StorageEvent) => {
      if (event.key !== CONSENT_KEY) return;
      const next = readChoice();
      if (!next?.analytics && analyticsStarted) {
        revokeAnalytics();
        return;
      }
      setChoice(next);
    };
    window.addEventListener("storage", syncTabs);
    return () => window.removeEventListener("storage", syncTabs);
  }, [choice]);

  React.useEffect(() => {
    if (choice?.analytics) startAnalytics();
  }, [choice]);

  const choose = React.useCallback((analytics: boolean) => {
    const wasTracking = analyticsStarted;
    setChoice(saveChoice(analytics));
    setSettingsOpen(false);
    if (!analytics && wasTracking) revokeAnalytics();
  }, []);

  const openSettings = React.useCallback(() => {
    setDraftAnalytics(choice?.analytics ?? false);
    setSettingsOpen(true);
  }, [choice]);

  return (
    <ConsentContext.Provider value={{ enabled: Boolean(GA_ID), openSettings }}>
      {children}
      {GA_ID && revealed && choice === null && (
        <aside className={styles.banner} aria-label={t.title}>
          <div className={styles.bannerCopy}>
            <h2 className={styles.bannerTitle}>{t.title}</h2>
            <p>{t.summary}</p>
            <div className={styles.policyLinks}>
              <a href={`/${locale}/legal/cookies`}>{t.policy}</a>
              <a href={`/${locale}/legal/privacy`}>{t.privacy}</a>
            </div>
          </div>
          <div className={styles.bannerActions}>
            <button type="button" className={styles.accept} onClick={() => choose(true)}>{t.accept}</button>
            <button type="button" className={styles.decline} onClick={() => choose(false)}>{t.decline}</button>
            <button type="button" className={styles.customize} onClick={openSettings}>{t.customize}</button>
          </div>
        </aside>
      )}
      {GA_ID && (
        <Dialog.Root open={settingsOpen} onOpenChange={setSettingsOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className={styles.overlay} />
            <Dialog.Content className={styles.dialog} aria-describedby="cookie-settings-description">
              <Dialog.Title className={styles.dialogTitle}>{t.settingsTitle}</Dialog.Title>
              <Dialog.Description id="cookie-settings-description" className={styles.dialogDescription}>
                {t.settingsDescription}
              </Dialog.Description>
              <div className={styles.preferenceRow}>
                <div><strong>{t.essentialTitle}</strong><p>{t.essentialDescription}</p></div>
                <span className={styles.alwaysOn}>{t.alwaysOn}</span>
              </div>
              <label className={styles.preferenceRow}>
                <span><strong>{t.analyticsTitle}</strong><span className={styles.preferenceDescription}>{t.analyticsDescription}</span></span>
                <input type="checkbox" checked={draftAnalytics} onChange={(event) => setDraftAnalytics(event.target.checked)} />
              </label>
              <div className={styles.dialogFooter}>
                <div className={styles.policyLinks}>
                  <a href={`/${locale}/legal/cookies`}>{t.policy}</a>
                  <a href={`/${locale}/legal/privacy`}>{t.privacy}</a>
                </div>
                <button type="button" className={styles.save} onClick={() => choose(draftAnalytics)}>{t.save}</button>
              </div>
              <Dialog.Close className={styles.close} aria-label={t.close}><X size={20} aria-hidden="true" /></Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </ConsentContext.Provider>
  );
}
