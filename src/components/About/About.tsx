"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button/Button";
import styles from "./about.module.css";

const DitherVeil = dynamic(() => import("./DitherVeil"), { ssr: false });

type Locale = "en" | "ka";

interface AboutContent {
  ariaLabel: string;
  headingLead: string;
  headingAccent: string;
  introduction: string;
  mobileIntroduction: string;
  detail: string;
  mobileDetail: string;
  cta: string;
  visualLabel: string;
  visualHint: string;
  mobileVisualHint: string;
  experienceValue: string;
  experienceLabel: string;
  experienceCopy: string;
  mobileExperienceCopy: string;
  capability: string;
}

const content: Record<Locale, AboutContent> = {
  en: {
    ariaLabel: "About Flevio",
    headingLead: "Built with intention.",
    headingAccent: "Designed for results.",
    introduction: "Flevio is a creative web design and development studio for service businesses ready to turn a stronger digital presence into more qualified inquiries.",
    mobileIntroduction: "Flevio is a creative web design and development studio building custom websites for service businesses.",
    detail: "We learn how your business sells, what your customers need, and where attention is lost—then turn that insight into a fast, thoughtful, conversion-focused website.",
    mobileDetail: "We study how your business sells and where attention is lost, then build fast, thoughtful sites that turn visitors into qualified inquiries.",
    cta: "View Our Work",
    visualLabel: "Craft, revealed",
    visualHint: "Move across the image or tap to uncover the detail.",
    mobileVisualHint: "Tap the image to reveal the detail.",
    experienceValue: "5+",
    experienceLabel: "Years of experience",
    experienceCopy: "Five years refining the balance between sharp design, clean development, and the business goal behind every page.",
    mobileExperienceCopy: "Five years pairing sharp design and clean development with the business goal behind every page.",
    capability: "Strategy · Design · Development",
  },
  ka: {
    ariaLabel: "Flevio-ს შესახებ",
    headingLead: "შექმნილი გააზრებულად.",
    headingAccent: "დიზაინი შედეგისთვის.",
    introduction: "Flevio არის კრეატიული ვებდიზაინისა და დეველოპმენტის სტუდია სერვის ბიზნესებისთვის, რომლებსაც ძლიერი ციფრული გამოცდილებით მეტი ხარისხიანი მოთხოვნის მიღება სურთ.",
    mobileIntroduction: "Flevio კრეატიული ვებდიზაინისა და დეველოპმენტის სტუდიაა, რომელიც სერვის ბიზნესებისთვის ინდივიდუალურ ვებსაიტებს ქმნის.",
    detail: "ვიკვლევთ, როგორ ყიდის თქვენი ბიზნესი, რა სჭირდება მომხმარებელს და სად იკარგება ყურადღება—შემდეგ ამ ცოდნას სწრაფ, გააზრებულ და კონვერსიაზე ორიენტირებულ ვებსაიტად ვაქცევთ.",
    mobileDetail: "ვიკვლევთ, როგორ ყიდის თქვენი ბიზნესი და სად იკარგება ყურადღება. ამ ცოდნით ვქმნით სწრაფ საიტებს, რომლებიც ინტერესს მოთხოვნად აქცევს.",
    cta: "ნახეთ ჩვენი ნამუშევრები",
    visualLabel: "დეტალებში დანახული ოსტატობა",
    visualHint: "გადაადგილდით სურათზე ან შეეხეთ დეტალის გამოსაჩენად.",
    mobileVisualHint: "შეეხეთ სურათს დეტალის გამოსაჩენად.",
    experienceValue: "5+",
    experienceLabel: "წლიანი გამოცდილება",
    experienceCopy: "ხუთი წელი მკაფიო დიზაინის, სუფთა დეველოპმენტისა და თითოეული გვერდის ბიზნეს მიზნის ერთ სისტემად დახვეწაში.",
    mobileExperienceCopy: "ხუთი წელია, მკაფიო დიზაინს და სუფთა დეველოპმენტს თითოეული გვერდის ბიზნეს მიზანს ვუკავშირებთ.",
    capability: "სტრატეგია · დიზაინი · დეველოპმენტი",
  },
};

function DitherStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof IntersectionObserver === "undefined") {
      setShouldMount(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldMount(true);
        observer.disconnect();
      },
      { rootMargin: window.matchMedia("(max-width: 820px), (max-width: 1023px) and (max-height: 520px) and (orientation: landscape)").matches ? "600px" : "2500px" }
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={stageRef} className={styles.visualCanvas} aria-hidden="true">
      {shouldMount && (
        <DitherVeil
          src="https://images.unsplash.com/photo-1737071371043-761e02b1ef95?q=80&w=1400&auto=format&fit=crop"
          pattern="floyd"
          pixelSize={2}
          inkColor="#120f17"
          paperColor="#f4f1ea"
          revealRadius={200}
          mobileTouchRadius={180}
          softness={0.6}
          linger={1}
          fit="contain"
          rimColor="#a78bfa"
          palette="duotone"
          levels={2}
          contrast={1.15}
          brightness={0}
          rim={0}
          reverse={false}
          wander={false}
          clickBurst
        />
      )}
    </div>
  );
}

export interface AboutProps {
  locale?: Locale;
}

export default function About({ locale = "en" }: AboutProps) {
  const t = content[locale];
  return (
    <section id="about" className={styles.about} aria-label={t.ariaLabel} lang={locale}>
      <div className={styles.inner}>
        <div className={styles.introGrid}>
          <h2 className={styles.heading}>
            <span>{t.headingLead}</span>
            <span className={styles.headingAccent}>
              {t.headingAccent}
            </span>
          </h2>

          <div className={styles.introCopy}>
            <p className={styles.introduction}>
              <span className={styles.desktopText}>{t.introduction}</span>
              <span className={styles.mobileText}>{t.mobileIntroduction}</span>
            </p>
            <p className={styles.detail}>
              <span className={styles.desktopText}>{t.detail}</span>
              <span className={styles.mobileText}>{t.mobileDetail}</span>
            </p>
            <div className={styles.ctaWrap}>
              <Button
                href="#projects"
                className={styles.cta}
                style={{
                  "--btn-bg": "#CD0000",
                  "--btn-fg": "#EFEDE6",
                  "--btn-fill": "#151412",
                  "--btn-fill-fg": "#EFEDE6",
                } as CSSProperties}
              >
                {t.cta}
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.proofGrid}>
          <div className={styles.visualPanel}>
            <div className={styles.visualMeta}>
              <span>{t.visualLabel}</span>
              <span>
                <span className={styles.desktopText}>{t.visualHint}</span>
                <span className={styles.mobileText}>{t.mobileVisualHint}</span>
              </span>
            </div>
            <DitherStage />
          </div>

          <aside
            className={styles.experience}
            aria-label={`${t.experienceValue} ${t.experienceLabel}`}
            itemScope
            itemType="https://schema.org/Organization"
          >
            <meta itemProp="name" content="Flevio" />
            <div className={styles.experienceTop}>
              <strong className={styles.experienceValue}>{t.experienceValue}</strong>
              <span className={styles.experienceLabel}>{t.experienceLabel}</span>
            </div>
            <div className={styles.experienceBody}>
              <p className={styles.experienceCopy}>
                <span className={styles.desktopText}>{t.experienceCopy}</span>
                <span className={styles.mobileText}>{t.mobileExperienceCopy}</span>
              </p>
              <p className={styles.capability}>{t.capability}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
