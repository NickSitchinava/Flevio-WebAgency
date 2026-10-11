"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button/Button";
import styles from "./about.module.css";

const DitherVeil = dynamic(() => import("./DitherVeil"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;
type Locale = "en" | "ka";

interface AboutContent {
  ariaLabel: string;
  headingLead: string;
  headingAccent: string;
  introduction: string;
  detail: string;
  cta: string;
  visualLabel: string;
  visualHint: string;
  experienceValue: string;
  experienceLabel: string;
  experienceCopy: string;
  capability: string;
}

const content: Record<Locale, AboutContent> = {
  en: {
    ariaLabel: "About Flevio",
    headingLead: "Built with intention.",
    headingAccent: "Designed for results.",
    introduction: "Flevio is a creative web design and development studio for service businesses ready to turn a stronger digital presence into more qualified inquiries.",
    detail: "We learn how your business sells, what your customers need, and where attention is lost—then turn that insight into a fast, thoughtful, conversion-focused website.",
    cta: "View Our Work",
    visualLabel: "Craft, revealed",
    visualHint: "Move across the image or tap to uncover the detail.",
    experienceValue: "5+",
    experienceLabel: "Years of experience",
    experienceCopy: "Five years refining the balance between sharp design, clean development, and the business goal behind every page.",
    capability: "Strategy · Design · Development",
  },
  ka: {
    ariaLabel: "Flevio-ს შესახებ",
    headingLead: "შექმნილი გააზრებულად.",
    headingAccent: "დიზაინი შედეგისთვის.",
    introduction: "Flevio არის კრეატიული ვებდიზაინისა და დეველოპმენტის სტუდია სერვის ბიზნესებისთვის, რომლებსაც ძლიერი ციფრული გამოცდილებით მეტი ხარისხიანი მოთხოვნის მიღება სურთ.",
    detail: "ვიკვლევთ, როგორ ყიდის თქვენი ბიზნესი, რა სჭირდება მომხმარებელს და სად იკარგება ყურადღება—შემდეგ ამ ცოდნას სწრაფ, გააზრებულ და კონვერსიაზე ორიენტირებულ ვებსაიტად ვაქცევთ.",
    cta: "ნახეთ ჩვენი ნამუშევრები",
    visualLabel: "დეტალებში დანახული ოსტატობა",
    visualHint: "გადაადგილდით სურათზე ან შეეხეთ დეტალის გამოსაჩენად.",
    experienceValue: "5+",
    experienceLabel: "წლიანი გამოცდილება",
    experienceCopy: "ხუთი წელი მკაფიო დიზაინის, სუფთა დეველოპმენტისა და თითოეული გვერდის ბიზნეს მიზნის ერთ სისტემად დახვეწაში.",
    capability: "სტრატეგია · დიზაინი · დეველოპმენტი",
  },
};

const sequence = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: EASE },
  },
};

const panelReveal = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.82, ease: EASE },
  },
};

const experienceReveal = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.82, delay: 0.08, ease: EASE },
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
      { rootMargin: "320px" }
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
  const reduceMotion = useReducedMotion();
  const initialState = reduceMotion ? false : "hidden";

  return (
    <section id="about" className={styles.about} aria-label={t.ariaLabel} lang={locale}>
      <div className={styles.inner}>
        <motion.div
          className={styles.introGrid}
          initial={initialState}
          whileInView="visible"
          viewport={{ once: true, margin: "-12%" }}
          variants={sequence}
        >
          <motion.h2 className={styles.heading} variants={sequence}>
            <motion.span variants={reveal}>{t.headingLead}</motion.span>
            <motion.span className={styles.headingAccent} variants={reveal}>
              {t.headingAccent}
            </motion.span>
          </motion.h2>

          <motion.div className={styles.introCopy} variants={sequence}>
            <motion.p className={styles.introduction} variants={reveal}>
              {t.introduction}
            </motion.p>
            <motion.p className={styles.detail} variants={reveal}>
              {t.detail}
            </motion.p>
            <motion.div className={styles.ctaWrap} variants={reveal}>
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
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.proofGrid}
          initial={initialState}
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
          variants={sequence}
        >
          <motion.div className={styles.visualPanel} variants={panelReveal}>
            <div className={styles.visualMeta}>
              <span>{t.visualLabel}</span>
              <span>{t.visualHint}</span>
            </div>
            <DitherStage />
          </motion.div>

          <motion.aside
            className={styles.experience}
            aria-label={`${t.experienceValue} ${t.experienceLabel}`}
            itemScope
            itemType="https://schema.org/Organization"
            variants={experienceReveal}
          >
            <meta itemProp="name" content="Flevio" />
            <div className={styles.experienceTop}>
              <strong className={styles.experienceValue}>{t.experienceValue}</strong>
              <span className={styles.experienceLabel}>{t.experienceLabel}</span>
            </div>
            <div className={styles.experienceBody}>
              <p className={styles.experienceCopy}>{t.experienceCopy}</p>
              <p className={styles.capability}>{t.capability}</p>
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
}
