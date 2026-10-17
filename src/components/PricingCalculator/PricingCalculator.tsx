"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { calculatePricing } from "@/lib/pricing/engine";
import { convertGelToUsd, getGelToUsdRate } from "@/lib/pricing/currency";
import type {
  ContentOption,
  Creativity,
  ProjectSize,
  ProjectType,
  Timeline,
} from "@/lib/pricing/types";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { DropdownField, type DropdownOption } from "./DropdownField";
import { SlidingNumber } from "./sliding-number";
import { MobileCalculatorExperience, type MobileQuestion } from "./MobileCalculatorExperience";
import { Button } from "@/components/ui/Button/Button";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./pricing-calculator.module.css";

const SIZE_KEYS_BY_TYPE: Record<ProjectType, ProjectSize[]> = {
  landing: ["short", "standard", "long"],
  website: ["small", "medium", "large"],
  portfolio: ["small", "medium", "large"],
};

interface Selections {
  projectType: ProjectType | null;
  size: ProjectSize | null;
  creativity: Creativity | null;
  timeline: Timeline | null;
  seo: boolean | null;
  content: ContentOption | null;
}

const INITIAL_SELECTIONS: Selections = {
  projectType: null,
  size: null,
  creativity: null,
  timeline: null,
  seo: null,
  content: null,
};

const FIELD_ORDER: (keyof Selections)[] = [
  "projectType",
  "size",
  "creativity",
  "timeline",
  "seo",
  "content",
];

function getSizeOption(
  t: (typeof dictionaries)["en"]["pricingCalculator"],
  projectType: ProjectType,
  size: ProjectSize
): { label: string; description: string } {
  switch (projectType) {
    case "landing":
      return t.steps.size.options.landing[size as "short" | "standard" | "long"];
    case "website":
      return t.steps.size.options.website[size as "small" | "medium" | "large"];
    case "portfolio":
      return t.steps.size.options.portfolio[size as "small" | "medium" | "large"];
  }
}

function isComplete(selections: Selections): selections is {
  projectType: ProjectType;
  size: ProjectSize;
  creativity: Creativity;
  timeline: Timeline;
  seo: boolean;
  content: ContentOption;
} {
  return FIELD_ORDER.every((key) => selections[key] !== null);
}

export default function PricingCalculator({ locale }: { locale: Locale }) {
  const t = dictionaries[locale].pricingCalculator;
  const [selections, setSelections] = useState<Selections>(INITIAL_SELECTIONS);
  const [usdRate, setUsdRate] = useState<number | null>(null);
  const [mobileStep, setMobileStep] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const previousMobileStep = useRef(mobileStep);

  useEffect(() => {
    if (previousMobileStep.current !== mobileStep && window.matchMedia("(max-width: 900px), (max-width: 1023px) and (max-height: 520px) and (orientation: landscape)").matches) {
      sectionRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    }
    previousMobileStep.current = mobileStep;
  }, [mobileStep]);

  useEffect(() => {
    if (locale !== "en") return;
    let active = true;
    const section = sectionRef.current;
    const loadRate = () => {
      getGelToUsdRate().then((rate) => {
        if (active) setUsdRate(rate);
      });
    };
    if (!section || typeof IntersectionObserver === "undefined") {
      loadRate();
    } else {
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        loadRate();
      }, { rootMargin: "800px" });
      observer.observe(section);
      return () => {
        active = false;
        observer.disconnect();
      };
    }
    return () => {
      active = false;
    };
  }, [locale]);

  const unlockedCount = useMemo(() => {
    let count = 1;
    for (const key of FIELD_ORDER) {
      if (selections[key] === null) break;
      count += 1;
    }
    return Math.min(count, FIELD_ORDER.length);
  }, [selections]);

  const result = useMemo(() => {
    if (!isComplete(selections)) return null;
    return calculatePricing(selections);
  }, [selections]);

  const startingEstimate = useMemo(() => {
    if (!selections.projectType) return null;
    const size = selections.size ?? SIZE_KEYS_BY_TYPE[selections.projectType][0];
    const estimate = calculatePricing({
      projectType: selections.projectType,
      size,
      creativity: selections.creativity ?? "standard",
      timeline: selections.timeline ?? "flexible",
      seo: selections.seo ?? false,
      content: selections.content ?? "client",
    });
    return {
      priceGel: estimate.priceGel.min,
      weeks: estimate.timeWeeks.min,
    };
  }, [selections]);

  const startingPrice = startingEstimate && (locale === "ka"
    ? startingEstimate.priceGel
    : usdRate !== null
      ? convertGelToUsd(startingEstimate.priceGel, usdRate)
      : null);
  const startingSymbol = locale === "ka" ? "₾" : "$";

  const priceDisplay = useMemo(() => {
    if (!result) return null;
    if (locale === "ka") {
      return { min: result.priceGel.min, max: result.priceGel.max, symbol: "₾", ready: true };
    }
    if (usdRate === null) return { min: 0, max: 0, symbol: "$", ready: false };
    return {
      min: convertGelToUsd(result.priceGel.min, usdRate),
      max: convertGelToUsd(result.priceGel.max, usdRate),
      symbol: "$",
      ready: true,
    };
  }, [result, locale, usdRate]);

  const sizeOptions: DropdownOption[] = selections.projectType
    ? SIZE_KEYS_BY_TYPE[selections.projectType].map((size) => ({
        value: size,
        ...getSizeOption(t, selections.projectType!, size),
      }))
    : [];

  const projectTypeOptions: DropdownOption[] = (
    ["landing", "website", "portfolio"] as ProjectType[]
  ).map((type) => ({ value: type, label: t.steps.projectType.options[type].label }));

  const creativityOptions: DropdownOption[] = (
    ["standard", "enhanced", "creative"] as Creativity[]
  ).map((level) => ({
    value: level,
    label: t.steps.creativity.options[level].label,
    description: t.steps.creativity.options[level].description,
  }));

  const timelineOptions: DropdownOption[] = (["flexible", "asap"] as Timeline[]).map(
    (option) => ({ value: option, label: t.steps.timeline.options[option].label })
  );

  const seoOptions: DropdownOption[] = [
    { value: "no", label: t.steps.seo.no, description: t.steps.seo.noDescription },
    { value: "yes", label: t.steps.seo.yes, description: t.steps.seo.yesDescription },
  ];

  const contentOptions: DropdownOption[] = (["client", "assistance"] as ContentOption[]).map(
    (option) => ({ value: option, label: t.steps.content.options[option] })
  );

  const currentAnswered = mobileStep < FIELD_ORDER.length &&
    selections[FIELD_ORDER[mobileStep]] !== null;
  const showMobileResults = mobileStep === FIELD_ORDER.length;
  const answeredCount = FIELD_ORDER.filter((key) => selections[key] !== null).length;
  const reviewItems = [
    { question: t.steps.projectType.title, answer: projectTypeOptions.find((option) => option.value === selections.projectType)?.label },
    { question: t.steps.size.title, answer: sizeOptions.find((option) => option.value === selections.size)?.label },
    { question: t.steps.creativity.title, answer: creativityOptions.find((option) => option.value === selections.creativity)?.label },
    { question: t.steps.timeline.title, answer: timelineOptions.find((option) => option.value === selections.timeline)?.label },
    { question: t.steps.seo.title, answer: seoOptions.find((option) => option.value === (selections.seo === null ? null : selections.seo ? "yes" : "no"))?.label },
    { question: t.steps.content.title, answer: contentOptions.find((option) => option.value === selections.content)?.label },
  ];

  const setProjectType = (value: string) =>
    setSelections((prev) => ({
      ...prev,
      projectType: value as ProjectType,
      size: SIZE_KEYS_BY_TYPE[value as ProjectType].includes(prev.size as ProjectSize)
        ? prev.size
        : null,
    }));

  const mobileQuestions: MobileQuestion[] = [
    { title: t.steps.projectType.title, options: projectTypeOptions, value: selections.projectType, onChange: setProjectType },
    { title: t.steps.size.title, options: sizeOptions, value: selections.size, onChange: (value) => setSelections((prev) => ({ ...prev, size: value as ProjectSize })) },
    { title: t.steps.creativity.title, options: creativityOptions, value: selections.creativity, onChange: (value) => setSelections((prev) => ({ ...prev, creativity: value as Creativity })) },
    { title: t.steps.timeline.title, options: timelineOptions, value: selections.timeline, onChange: (value) => setSelections((prev) => ({ ...prev, timeline: value as Timeline })) },
    { title: t.steps.seo.title, options: seoOptions, value: selections.seo === null ? null : selections.seo ? "yes" : "no", onChange: (value) => setSelections((prev) => ({ ...prev, seo: value === "yes" })) },
    { title: t.steps.content.title, options: contentOptions, value: selections.content, onChange: (value) => setSelections((prev) => ({ ...prev, content: value as ContentOption })) },
  ];

  return (
    <section ref={sectionRef} id="pricing" className={styles.pricing} aria-labelledby="pricing-heading" data-mobile-step={mobileStep} lang={locale}>
      <header className={styles.sectionHeader}>
        <h2 id="pricing-heading" className={styles.sectionTitle}>{t.toolLabel}</h2>
      </header>
      <div className={styles.layout}>
        <div className={styles.sticky}>
          <h3 className={styles.heading} aria-label={t.heading}>
            <span className={styles.headingLead}>{t.headingLead}</span>{" "}
            <span className={styles.headingFocus}>{t.headingFocus}</span>
          </h3>
          <p className={styles.subhead}>{t.subhead}</p>
          <div className={styles.progress} aria-hidden="true">
            <span className={styles.progressCurrent}>
              <span className={styles.progressDesktop}>{String(answeredCount).padStart(2, "0")}</span>
            </span>
            <span className={styles.progressRule} />
            <span className={styles.progressTotal}>06</span>
          </div>
        </div>

        <div className={styles.right}>
          <MobileCalculatorExperience
            locale={locale}
            t={t}
            questions={mobileQuestions}
            step={mobileStep}
            setStep={setMobileStep}
            currentAnswered={currentAnswered}
            result={result}
            priceDisplay={priceDisplay}
            reviewItems={reviewItems}
            reducedMotion={prefersReducedMotion}
            startingHint={startingEstimate
              ? startingPrice !== null
                ? { label: t.result.startingAt, value: startingPrice, prefix: startingSymbol }
                : { label: t.result.earlyTimeLabel, value: startingEstimate.weeks, suffix: t.result.weeksUnit }
              : null}
          />
          <div className={styles.panel}>
            <div className={styles.question} data-mobile-active={mobileStep === 0} data-answered={selections.projectType !== null}>
            <DropdownField
              index={1}
              locale={locale}
              label={t.steps.projectType.title}
              placeholder={t.placeholder}
              options={projectTypeOptions}
              value={selections.projectType}
              onChange={setProjectType}
              disabled={unlockedCount < 1}
            />
            </div>

            <div className={styles.question} data-mobile-active={mobileStep === 1} data-answered={selections.size !== null}>
            <DropdownField
              index={2}
              locale={locale}
              label={t.steps.size.title}
              placeholder={t.placeholder}
              options={sizeOptions}
              value={selections.size}
              onChange={(value) =>
                setSelections((prev) => ({ ...prev, size: value as ProjectSize }))
              }
              disabled={unlockedCount < 2}
            />
            </div>

            <div className={styles.question} data-mobile-active={mobileStep === 2} data-answered={selections.creativity !== null}>
            <DropdownField
              index={3}
              locale={locale}
              label={t.steps.creativity.title}
              placeholder={t.placeholder}
              options={creativityOptions}
              value={selections.creativity}
              onChange={(value) =>
                setSelections((prev) => ({ ...prev, creativity: value as Creativity }))
              }
              disabled={unlockedCount < 3}
            />
            </div>

            <div className={styles.question} data-mobile-active={mobileStep === 3} data-answered={selections.timeline !== null}>
            <DropdownField
              index={4}
              locale={locale}
              label={t.steps.timeline.title}
              placeholder={t.placeholder}
              options={timelineOptions}
              value={selections.timeline}
              onChange={(value) =>
                setSelections((prev) => ({ ...prev, timeline: value as Timeline }))
              }
              disabled={unlockedCount < 4}
            />
            </div>

            <div className={styles.question} data-mobile-active={mobileStep === 4} data-answered={selections.seo !== null}>
            <DropdownField
              index={5}
              locale={locale}
              label={t.steps.seo.title}
              placeholder={t.placeholder}
              options={seoOptions}
              value={selections.seo === null ? null : selections.seo ? "yes" : "no"}
              onChange={(value) =>
                setSelections((prev) => ({ ...prev, seo: value === "yes" }))
              }
              disabled={unlockedCount < 5}
            />
            </div>

            <div className={styles.question} data-mobile-active={mobileStep === 5} data-answered={selections.content !== null}>
            <DropdownField
              index={6}
              locale={locale}
              label={t.steps.content.title}
              placeholder={t.placeholder}
              options={contentOptions}
              value={selections.content}
              onChange={(value) =>
                setSelections((prev) => ({ ...prev, content: value as ContentOption }))
              }
              disabled={unlockedCount < 6}
            />
            </div>
          </div>

          {!result && (
            <div className={styles.resultPreview} aria-live="polite">
              <div className={styles.resultCard}>
                <span className={styles.resultLabel}>{startingEstimate ? t.result.earlyTimeLabel : t.result.timeLabel}</span>
                <span className={styles.previewValue} aria-label={startingEstimate ? `${startingEstimate.weeks} ${t.result.weeksUnit}` : undefined}>
                  {startingEstimate ? <span aria-hidden="true"><SlidingNumber value={startingEstimate.weeks} /> {t.result.weeksUnit}</span> : "—"}
                </span>
              </div>
              <div className={styles.resultCard}>
                <span className={styles.resultLabel}>{startingEstimate ? t.result.earlyPriceLabel : t.result.priceLabel}</span>
                <span className={styles.previewValue} aria-label={startingPrice !== null ? `${startingSymbol}${startingPrice}` : undefined}>
                  {startingPrice !== null ? <span aria-hidden="true">{startingSymbol}<SlidingNumber value={startingPrice} /></span> : "—"}
                </span>
              </div>
            </div>
          )}

          {result && (
            <motion.div
              key={showMobileResults ? "mobile-results" : "desktop-results"}
              className={styles.resultsRow}
              data-mobile-visible={showMobileResults}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.resultCard}>
                <span className={styles.resultLabel}>{t.result.timeLabel}</span>
                <p className={styles.resultTime}>
                  <SlidingNumber key={showMobileResults ? "mobile-time-min" : "desktop-time-min"} value={result.timeWeeks.min} />
                  <span className={styles.resultDash}>–</span>
                  <SlidingNumber key={showMobileResults ? "mobile-time-max" : "desktop-time-max"} value={result.timeWeeks.max} />
                  <span className={styles.resultUnit}>{t.result.weeksUnit}</span>
                </p>
              </div>

              <div className={styles.resultCard}>
                <span className={styles.resultLabel}>{t.result.priceLabel}</span>
                <p className={styles.resultPrice}>
                  {priceDisplay?.ready ? (
                    <>
                      <span className={styles.resultSymbol}>{priceDisplay.symbol}</span>
                      <SlidingNumber key={showMobileResults ? "mobile-price-min" : "desktop-price-min"} value={priceDisplay.min} />
                      <span className={styles.resultDash}>–</span>
                      <span className={styles.resultSymbol}>{priceDisplay.symbol}</span>
                      <SlidingNumber key={showMobileResults ? "mobile-price-max" : "desktop-price-max"} value={priceDisplay.max} />
                    </>
                  ) : (
                    t.result.loadingRate
                  )}
                </p>
              </div>
            </motion.div>
          )}

          {result && (
            <div className={styles.footer} data-mobile-visible={showMobileResults}>
              <Button
                href={`/${locale}#contact`}
                className={styles.ctaButton}
                style={
                  {
                    "--btn-bg": "#CD0000",
                    "--btn-fg": "#EFEDE6",
                    "--btn-fill": "#151412",
                    "--btn-fill-fg": "#EFEDE6",
                    padding: "1.15rem",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                  } as React.CSSProperties
                }
              >
                {t.result.ctaButton}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
