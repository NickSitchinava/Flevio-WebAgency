"use client";

import { useEffect, useLayoutEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/dist/SplitText";
import styles from "./stack-loader.module.css";

gsap.registerPlugin(SplitText);

const INTRO_EASE = "cubic-bezier(0.25,1,0.5,1)";
const IMAGE_ENTRY_Y_PERCENT = 500;
const TEXT_ROTATE_X_START = 90;
const TEXT_TRANSFORM_PERSPECTIVE = 1000;
const IMAGE_Z_INDEX_DURATION = 0.1;
const IMAGE_Z_INDEX_STAGGER = 0.2;
const TEXT_STAGGER = 0.08;
const STACK_SCALE_STEP = 0.15;
const STACK_Y_PERCENT_STEP = 20;
const SPREAD_Y_PERCENT_STEP = 110;
const IMAGE_FADE_STAGGER = 0.08;

const STACK_IMAGE_SOURCES = [
  "/images/loader/stack-1.webp",
  "/images/loader/stack-2.webp",
  "/images/loader/stack-3.webp",
  "/images/loader/stack-4.webp",
  "/images/loader/stack-5.webp",
  "/images/loader/stack-6.webp",
  "/images/loader/stack-7.webp",
];

function clampNumber(value: unknown, min: number, max: number, fallback: number) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback;
}

interface StackLoaderProps {
  locale: "en" | "ka";
  imageSize?: number;
  duration?: number;
  fadeOutDuration?: number;
  backgroundColor?: string;
  onComplete: () => void;
}

export default function StackLoader({ locale, imageSize = 1, duration = 1,
  fadeOutDuration = 0.8, backgroundColor = "#efede6", onComplete }: StackLoaderProps) {
  const rootRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const text1Ref = useRef<HTMLParagraphElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const onCompleteRef = useRef(onComplete);
  const safeImageSize = clampNumber(imageSize, 0.5, 2.5, 1);
  const safeDuration = clampNumber(duration, 0.25, 3, 1);
  const safeFadeOutDuration = clampNumber(fadeOutDuration, 0.1, 3, 0.8);

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const imageWrapper = imageWrapperRef.current;
    const text1Element = text1Ref.current;
    const text2Element = text2Ref.current;
    const descriptionElement = descriptionRef.current;
    if (!root || !imageWrapper || !text1Element || !text2Element || !descriptionElement) return;

    const images = imagesRef.current.filter((image): image is HTMLDivElement => Boolean(image));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduceMotion) {
        const spread = SPREAD_Y_PERCENT_STEP * (images.length - 1);
        gsap.set(imageWrapper, { yPercent: 0, opacity: 1 });
        gsap.set(images, { opacity: (index: number) => index === Math.floor(images.length / 2) ? 1 : 0, scale: 1, zIndex: (index: number) => index,
          yPercent: (index: number) => -spread / 2 + index * SPREAD_Y_PERCENT_STEP });
        gsap.set([text1Element, text2Element, descriptionElement], { opacity: 1, rotateX: 0 });
        gsap.delayedCall(0.35, () => onCompleteRef.current());
        return;
      }

      const text1 = SplitText.create(text1Element, { type: "words" });
      const text2 = SplitText.create(text2Element, { type: "words" });
      const description = SplitText.create(descriptionElement, { type: "words,lines" });
      const textTargets = [text1.words, text2.words, description.lines];
      gsap.set(textTargets, { rotateX: TEXT_ROTATE_X_START, opacity: 0,
        transformPerspective: TEXT_TRANSFORM_PERSPECTIVE, transformOrigin: "50% 100%",
        willChange: "transform" });
      gsap.set(images, { opacity: 0 });
      gsap.set(descriptionElement, { opacity: 1 });

      const tl = gsap.timeline();
      tl.timeScale(1 / safeDuration);
      tl.fromTo(imageWrapper, { yPercent: IMAGE_ENTRY_Y_PERCENT, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5, ease: INTRO_EASE });
      tl.set([text1Element, text2Element], { opacity: 1 }, "<");
      tl.to(images, { opacity: 1, duration: 0.5, ease: INTRO_EASE }, "<");
      tl.to(textTargets, { rotateX: 0, opacity: 1, stagger: TEXT_STAGGER,
        ease: INTRO_EASE }, "<+0.5");
      images.forEach((image, index) => {
        tl.to(image, { zIndex: index, duration: IMAGE_Z_INDEX_DURATION,
          ease: INTRO_EASE }, index * IMAGE_Z_INDEX_STAGGER);
      });
      tl.to(images, { scale: (index: number) => 1 + index * STACK_SCALE_STEP,
        yPercent: (index: number) => -(index * STACK_Y_PERCENT_STEP), duration: 1,
        stagger: { each: 0.01, from: "end" }, ease: "power3.inOut" }, "<");
      tl.to(images, { scale: 1,
        yPercent: (index: number) => -SPREAD_Y_PERCENT_STEP * (images.length - 1) / 2 + index * SPREAD_Y_PERCENT_STEP,
        duration: 1, stagger: { each: 0.01, from: "end" }, ease: "power3.inOut" }, "+=0.2");
      tl.to(description.lines, { rotateX: TEXT_ROTATE_X_START, transformOrigin: "top center",
        opacity: 0, duration: 1, stagger: TEXT_STAGGER, ease: INTRO_EASE }, "<-0.1");
      tl.to(imageWrapper, { yPercent: 0, ease: INTRO_EASE }, "<");
      tl.to([text1.words, text2.words], { opacity: 0, duration: 0.5,
        rotateX: TEXT_ROTATE_X_START, transformOrigin: "top center",
        stagger: TEXT_STAGGER, ease: INTRO_EASE });
      tl.to(images, { opacity: 0, duration: safeFadeOutDuration,
        stagger: { each: IMAGE_FADE_STAGGER, from: "end" } }, "<+0.2");
      tl.to(root, { opacity: 0, duration: safeFadeOutDuration, ease: INTRO_EASE });
      tl.call(() => onCompleteRef.current());

      return () => { text1.revert(); text2.revert(); description.revert(); };
    }, root);
    return () => ctx.revert();
  }, [safeDuration, safeFadeOutDuration]);

  return (
    <section ref={rootRef} className={styles.loader} style={{ backgroundColor }}
      role="status" aria-label={locale === "ka" ? "საიტი იტვირთება" : "Loading the site"}>
      <div className={styles.main}>
        <p ref={text1Ref} className={styles.sideText}>FLEVIO</p>
        <div ref={imageWrapperRef} className={styles.images}
          style={{ "--image-size": safeImageSize } as CSSProperties}>
          {STACK_IMAGE_SOURCES.map((src, index) => (
            <div key={src} ref={(element) => { imagesRef.current[index] = element; }} className={styles.imageCard}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} width={512} height={512} alt="" className={styles.image} />
            </div>
          ))}
        </div>
        <p ref={text2Ref} className={styles.sideText}>
          {locale === "ka" ? "ვებ სააგენტო" : "WEB AGENCY"}
        </p>
      </div>
      <p ref={descriptionRef} className={styles.description}>
        {locale === "ka" ? "დიზაინი მოქმედებაში" : "DESIGN IN MOTION"}
      </p>
    </section>
  );
}
