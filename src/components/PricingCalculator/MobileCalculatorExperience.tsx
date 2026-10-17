"use client";

import { useState, type CSSProperties, type Dispatch, type SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import type { PricingCalculatorDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import type { PricingResult } from "@/lib/pricing/types";
import type { DropdownOption } from "./DropdownField";
import { SlidingNumber } from "./sliding-number";
import styles from "./pricing-calculator.module.css";

export interface MobileQuestion {
  title: string;
  options: DropdownOption[];
  value: string | null;
  onChange: (value: string) => void;
}

interface MobileCalculatorExperienceProps {
  locale: Locale;
  t: PricingCalculatorDictionary;
  questions: MobileQuestion[];
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  currentAnswered: boolean;
  result: PricingResult | null;
  priceDisplay: { min: number; max: number; symbol: string; ready: boolean } | null;
  reviewItems: { question: string; answer: string | undefined }[];
  reducedMotion: boolean | null;
  startingHint: { label: string; value: number; prefix?: string; suffix?: string } | null;
}

const panelVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
  }),
};

export function MobileCalculatorExperience({
  locale,
  t,
  questions,
  step,
  setStep,
  currentAnswered,
  result,
  priceDisplay,
  reviewItems,
  reducedMotion,
  startingHint,
}: MobileCalculatorExperienceProps) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [direction, setDirection] = useState(1);

  const finished = step === questions.length;
  const question = questions[step];
  const stepLabel = String(Math.min(step + 1, questions.length)).padStart(2, "0");
  const transition = reducedMotion
    ? { duration: 0 }
    : { x: { type: "spring" as const, stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } };

  return (
    <div className={styles.mobileCalculator}>
      {!finished && <div className={styles.mobileProgress} aria-label={`${stepLabel} / 06`}>
        <div className={styles.mobileProgressTop}>
          <span><strong>{stepLabel}</strong><span>/ 06</span></span>
          <span aria-live="polite" aria-label={startingHint ? `${startingHint.label} ${startingHint.prefix ?? ""}${startingHint.value}${startingHint.suffix ? ` ${startingHint.suffix}` : ""}` : undefined}>
            {startingHint ? <span aria-hidden="true">{startingHint.label} {startingHint.prefix}<SlidingNumber value={startingHint.value} />{startingHint.suffix ? ` ${startingHint.suffix}` : ""}</span> : (locale === "ka" ? "შეფასების შექმნა" : "Building your estimate")}
          </span>
        </div>
        <div className={styles.mobileProgressTrack} aria-hidden="true">
          {questions.map((_, index) => <span key={index} data-active={index <= step} />)}
        </div>
      </div>}

      <motion.div layout={!reducedMotion} className={styles.mobileShell} data-result={finished}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={step}
            custom={direction}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className={styles.mobileStage}
          >
            {finished ? <>
              <span className={styles.mobileStageEyebrow}>{locale === "ka" ? "თქვენი შეფასება" : "Your estimate"}</span>
              <h4 className={styles.mobileResultHeading}>{locale === "ka" ? "თქვენი პროექტის შეფასება." : "Built from your choices."}</h4>
              {result && <div className={styles.mobileEstimateValues}>
                <div>
                  <span>{t.result.timeLabel}</span>
                  <strong>{result.timeWeeks.min}–{result.timeWeeks.max} <small>{t.result.weeksUnit}</small></strong>
                </div>
                <div>
                  <span>{t.result.priceLabel}</span>
                  <strong>{priceDisplay?.ready
                    ? `${priceDisplay.symbol}${priceDisplay.min}–${priceDisplay.symbol}${priceDisplay.max}`
                    : t.result.loadingRate}</strong>
                </div>
              </div>}
            </> : question && <>
              <span className={styles.mobileStageEyebrow}>{locale === "ka" ? "გადაწყვეტილება" : "Decision"} {stepLabel} / 06</span>
              <h4 id={`mobile-pricing-question-${step}`} className={styles.mobileQuestionTitle}>{question.title}</h4>
              <div className={styles.mobileChoices} role="group" aria-labelledby={`mobile-pricing-question-${step}`}>
                {question.options.map((option, index) => {
                  const selected = question.value === option.value;
                  return <button
                    key={option.value}
                    type="button"
                    className={styles.mobileChoice}
                    data-selected={selected}
                    aria-pressed={selected}
                    onClick={() => question.onChange(option.value)}
                  >
                    <span className={styles.mobileChoiceIndex}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.mobileChoiceCopy}>
                      <strong>{option.label}</strong>
                      {option.description && <span>{option.description}</span>}
                    </span>
                    <span className={styles.mobileChoiceMark} aria-hidden="true">{selected && <Check size={15} strokeWidth={2.5} />}</span>
                  </button>;
                })}
              </div>
            </>}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {!finished ? <div className={styles.mobileActions}>
        <button type="button" className={styles.mobileBack} onClick={() => { setDirection(-1); setStep((current) => Math.max(0, current - 1)); }} disabled={step === 0}>{t.navigation.back}</button>
        <button type="button" className={styles.mobileNext} onClick={() => { setDirection(1); setStep((current) => Math.min(questions.length, current + 1)); }} disabled={!currentAnswered}>
          {step === questions.length - 1 ? t.navigation.viewEstimate : t.navigation.next}<ArrowRight size={18} aria-hidden="true" />
        </button>
      </div> : <>
        {result && <div className={styles.mobileSummary}>
          <button type="button" className={styles.mobileSummaryToggle} aria-expanded={reviewOpen} aria-controls="mobile-pricing-review" onClick={() => setReviewOpen((open) => !open)}>
            <span>{t.navigation.review}</span><ChevronDown size={19} aria-hidden="true" data-open={reviewOpen} />
          </button>
          <motion.div id="mobile-pricing-review" className={styles.mobileSummaryContent} initial={false} animate={{ height: reviewOpen ? "auto" : 0, opacity: reviewOpen ? 1 : 0 }} transition={reducedMotion ? { duration: 0 } : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }} inert={!reviewOpen}>
            <div className={styles.mobileSummaryRows}>
              {reviewItems.map((item, index) => <button key={index} type="button" className={styles.mobileSummaryRow} onClick={() => { setDirection(-1); setStep(index); }}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span><small>{item.question}</small><strong>{item.answer}</strong></span>
              </button>)}
            </div>
          </motion.div>
        </div>}
        {result && <Button
          href={`/${locale}#contact`}
          className={styles.mobileConversation}
          style={{
            "--btn-bg": "#CD0000",
            "--btn-fg": "#EFEDE6",
            "--btn-fill": "#151412",
            "--btn-fill-fg": "#EFEDE6",
            padding: "1.15rem",
            fontSize: "0.88rem",
            fontWeight: 600,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          } as CSSProperties}
        >{t.result.ctaButton}</Button>}
        <button type="button" className={styles.mobileResultBack} onClick={() => { setDirection(-1); setStep(questions.length - 1); }}>{t.navigation.back}</button>
      </>}
    </div>
  );
}
