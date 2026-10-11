"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button/Button";
import TechText from "@/components/Hero/TechText";
import { useLoaderReveal } from "@/components/ArcRevealHero/LoaderContext";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import styles from "./Hero.module.css";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function DesktopHeroBackground() {
  return (
    <div className={styles.desktopBackground} aria-hidden="true">
      <div className={styles.desktopRadial} />
      <div className={`${styles.desktopStreak} ${styles.desktopStreakOne}`} />
      <div className={`${styles.desktopStreak} ${styles.desktopStreakTwo}`} />
      <div className={`${styles.desktopStreak} ${styles.desktopStreakThree}`} />
      <div className={`${styles.desktopStreak} ${styles.desktopStreakFour}`} />
      <div className={styles.desktopDots} />
    </div>
  );
}

function MobileHeroBackground() {
  return (
    <div className={styles.mobileBackground} aria-hidden="true">
      <div className={styles.mobileRadial} />
      <div className={`${styles.mobileStreak} ${styles.mobileStreakOne}`} />
      <div className={`${styles.mobileStreak} ${styles.mobileStreakTwo}`} />
      <div className={styles.mobileDots} />
    </div>
  );
}

export default function Hero({ locale }: { locale: Locale }) {
  const isRevealed = useLoaderReveal();
  const animate = isRevealed ? "visible" : "hidden";
  const prefersReducedMotion = useReducedMotion();
  const t = dictionaries[locale].hero;
  const desktopInitial = prefersReducedMotion ? false : "hidden";
  const desktopTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.72, ease: EASE };

  return (
    <section id="home" className={styles.hero} aria-label={t.ariaLabel}>
      <div className={styles.mobileOnly}>
        <MobileHeroBackground />
        <motion.div
          className={styles.mobileHeadlineGroup}
          initial={desktopInitial}
          animate={animate}
          variants={fadeUp}
          transition={desktopTransition}
        >
          <h1 className={styles.mobileHeadline} lang={locale}>
            <span className={styles.mobileHeadlinePrefix}>{t.desktopHeadlineLines[0]}</span>
            <span className={styles.mobileHeadlineFocus}>
              <TechText
                text={t.desktopHeadlineLines[1].toUpperCase()}
                color="#151412"
                accentColor="#CD0000"
                fontSize={210}
                fontWeight={700}
                letterSpacing={-0.04}
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                reach={140}
                softness={0.7}
                strokeWidth={1.5}
                speed={1}
                lineStyle="dashed"
                selection
                labels
                draggable
                sweep
              />
            </span>
            <span className={styles.mobileHeadlineResult}>{t.desktopHeadlineLines[2]}</span>
          </h1>
        </motion.div>

        <motion.div
          className={styles.mobileConversion}
          initial={desktopInitial}
          animate={animate}
          variants={fadeUp}
          transition={{ ...desktopTransition, delay: prefersReducedMotion ? 0 : 0.12 }}
        >
          <p className={styles.mobileSubhead} lang={locale}>{t.desktopSubhead}</p>
          <div className={styles.mobileActions} lang={locale}>
            <Button
              href="#contact"
              className={styles.mobilePrimaryCta}
              style={{
                "--btn-bg": "#CD0000",
                "--btn-fg": "#EFEDE6",
                "--btn-fill": "#151412",
                "--btn-fill-fg": "#EFEDE6",
              } as React.CSSProperties}
            >
              {t.desktopPrimaryCta}
            </Button>
            <Button
              href="#projects"
              className={styles.mobileSecondaryCta}
              style={{
                "--btn-bg": "rgba(239,237,230,0.86)",
                "--btn-fg": "#151412",
                "--btn-border": "1px solid rgba(21,20,18,0.34)",
                "--btn-fill": "#CD0000",
                "--btn-fill-fg": "#EFEDE6",
              } as React.CSSProperties}
            >
              {t.desktopSecondaryCta}
            </Button>
          </div>
        </motion.div>

        <motion.p
          className={styles.mobileCapability}
          lang={locale}
          initial={desktopInitial}
          animate={animate}
          variants={fadeUp}
          transition={{ ...desktopTransition, delay: prefersReducedMotion ? 0 : 0.18 }}
        >
          {t.desktopCapability}
        </motion.p>
      </div>

      <div className={styles.desktopHero}>
        <DesktopHeroBackground />
        <motion.div
          className={styles.desktopHeadlineGroup}
          initial={desktopInitial}
          animate={animate}
          variants={fadeUp}
          transition={desktopTransition}
        >
          <h1 className={styles.desktopHeadline} lang={locale}>
            <span className={styles.desktopHeadlinePrefix}>{t.desktopHeadlineLines[0]}</span>
            <span className={styles.desktopHeadlineFocus}>
              <TechText
                text={t.desktopHeadlineLines[1].toUpperCase()}
                color="#151412"
                accentColor="#CD0000"
                fontSize={360}
                fontWeight={700}
                letterSpacing={-0.04}
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                reach={200}
                softness={0.7}
                strokeWidth={1.5}
                speed={1}
                lineStyle="dashed"
                selection
                labels
                draggable
                sweep
              />
            </span>
            <span className={styles.desktopHeadlineResult}>{t.desktopHeadlineLines[2]}</span>
          </h1>
        </motion.div>

        <motion.div
          className={styles.desktopConversion}
          initial={desktopInitial}
          animate={animate}
          variants={fadeUp}
          transition={{ ...desktopTransition, delay: prefersReducedMotion ? 0 : 0.12 }}
        >
          <p className={styles.desktopSubhead} lang={locale}>{t.desktopSubhead}</p>
          <div className={styles.desktopActions}>
            <Button
              href="#contact"
              className={styles.desktopPrimaryCta}
              style={{
                "--btn-bg": "#CD0000",
                "--btn-fg": "#EFEDE6",
                "--btn-fill": "#151412",
                "--btn-fill-fg": "#EFEDE6",
              } as React.CSSProperties}
            >
              {t.desktopPrimaryCta}
            </Button>
            <Button
              href="#projects"
              className={styles.desktopSecondaryCta}
              style={{
                "--btn-bg": "rgba(239,237,230,0.82)",
                "--btn-fg": "#151412",
                "--btn-border": "1px solid rgba(21,20,18,0.34)",
                "--btn-fill": "#CD0000",
                "--btn-fill-fg": "#EFEDE6",
              } as React.CSSProperties}
            >
              {t.desktopSecondaryCta}
            </Button>
          </div>
        </motion.div>

        <motion.p
          className={styles.desktopCapability}
          lang={locale}
          initial={desktopInitial}
          animate={animate}
          variants={fadeUp}
          transition={{ ...desktopTransition, delay: prefersReducedMotion ? 0 : 0.18 }}
        >
          {t.desktopCapability}
        </motion.p>
      </div>
    </section>
  );
}
