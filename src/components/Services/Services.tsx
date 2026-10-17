"use client";

import {
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import { ArrowUpRight, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Button } from "@/components/ui/Button/Button";
import { ServicesVideo } from "./ServicesVideo";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import styles from "./services.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  },
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const element =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);

    ctxRef.current = gsap.context(() => {}, element ?? undefined);

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // The animation context intentionally lives for the component lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const cleanup = ctxRef.current.add(callback);
    cleanupRef.current = typeof cleanup === "function" ? cleanup : undefined;
    // Dependencies are supplied by the caller, mirroring @gsap/react's API.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_VIEWPORT_QUERY = "(max-width: 699px), (max-width: 1023px) and (max-height: 520px) and (orientation: landscape)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function subscribeToMobileViewport(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(MOBILE_VIEWPORT_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getMobileViewportSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_VIEWPORT_QUERY).matches;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
}

type SplitTextInstance = InstanceType<typeof SplitText>;

const itemLayout = [
  { side: "top", desktopPosition: 27, mobilePosition: 25 },
  { side: "bottom", desktopPosition: 54, mobilePosition: 50 },
  { side: "top", desktopPosition: 81, mobilePosition: 75 },
] as const;

const mobileCopy: Record<Locale, Record<string, { description: string; details: string; features: string[] }>> = {
  en: {
    "website-development": {
      description: "Custom websites, designed and coded from scratch.",
      details: "Hand-coded around your business, without page builders or bloated templates. Fast, maintainable, and built with SEO in mind.",
      features: ["Custom design, no templates", "Maintainable hand-written code", "Speed and SEO from day one"],
    },
    "landing-pages": {
      description: "Conversion-focused landing pages built for speed and clarity.",
      details: "Focused layouts and clear calls to action remove distractions. Fast, mobile-first pages are ready for A/B testing.",
      features: ["Focused, single-goal layouts", "Ready for A/B testing", "Fast mobile-first design"],
    },
    "seo-optimization": {
      description: "Search-friendly code with strong technical SEO foundations.",
      details: "Semantic markup, structured data, and Core Web Vitals are considered from the start—without promises of rankings.",
      features: ["Semantic, accessible markup", "Structured data and schema.org", "Core Web Vitals optimization"],
    },
  },
  ka: {
    "website-development": {
      description: "ინდივიდუალური ვებსაიტები, შექმნილი და კოდირებული ნულიდან.",
      details: "ხელით დაწერილი სწრაფი საიტი თქვენი ბიზნესისთვის. შაბლონებისა და მძიმე კონსტრუქტორების გარეშე, SEO-ს გათვალისწინებით.",
      features: ["ინდივიდუალური დიზაინი", "მართვადი, ხელით დაწერილი კოდი", "სისწრაფე და SEO თავიდანვე"],
    },
    "landing-pages": {
      description: "კონვერსიაზე ორიენტირებული ლენდინგები: სწრაფი და გასაგები.",
      details: "მკაფიო მოქმედება და ფოკუსირებული სტრუქტურა. სწრაფი მობილური გვერდები მზადაა A/B ტესტირებისთვის.",
      features: ["ერთ მიზანზე ორიენტირებული", "მზადაა A/B ტესტირებისთვის", "სწრაფი, მობილურზე მორგებული"],
    },
    "seo-optimization": {
      description: "საძიებო სისტემებზე მორგებული კოდი ძლიერი ტექნიკური საფუძვლით.",
      details: "სემანტიკური მარკაპი, სტრუქტურირებული მონაცემები და Core Web Vitals — ძლიერი ტექნიკური SEO საწყისიდან.",
      features: ["სემანტიკური მარკაპი", "სტრუქტურირებული მონაცემები", "Core Web Vitals"],
    },
  },
};

const supportingCopy: Record<
  Locale,
  {
    period: string;
    playVideo: string;
    pauseVideo: string;
    muteVideo: string;
    unmuteVideo: string;
  }
> = {
  en: {
    period: "Strategy · Design · Development",
    playVideo: "Play Flevio motion reel",
    pauseVideo: "Pause Flevio motion reel",
    muteVideo: "Mute Flevio motion reel",
    unmuteVideo: "Unmute Flevio motion reel",
  },
  ka: {
    period: "სტრატეგია · დიზაინი · დეველოპმენტი",
    playVideo: "Flevio-ს ვიდეოს გაშვება",
    pauseVideo: "Flevio-ს ვიდეოს შეჩერება",
    muteVideo: "Flevio-ს ვიდეოს ხმის გამორთვა",
    unmuteVideo: "Flevio-ს ვიდეოს ხმის ჩართვა",
  },
};

export default function Services({ locale }: { locale: Locale }) {
  const t = dictionaries[locale].services;
  const supporting = supportingCopy[locale];
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const mobileViewport = useSyncExternalStore(
    subscribeToMobileViewport,
    getMobileViewportSnapshot,
    () => false,
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const media = gsap.matchMedia();

      media.add(
        {
          mobile: MOBILE_VIEWPORT_QUERY,
          tablet: "(min-width: 700px) and (max-width: 1100px)",
          desktop: "(min-width: 1101px)",
        },
        (context) => {
          const isMobile = Boolean(context.conditions?.mobile);
          const line = section.querySelector<HTMLElement>("[data-journey-line]");
          if (!line) return;

          const endDot = section.querySelector<HTMLElement>("[data-journey-end]");

          if (reducedMotion) {
            gsap.set(track, { clearProps: "transform" });
            gsap.set(line, { width: "100%" });
            return;
          }

          if (isMobile && endDot) {
            const slide = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                invalidateOnRefresh: true,
                snap: {
                  snapTo: (progress: number) => {
                    const stage = Math.round(progress * 4) / 4;
                    return Math.abs(stage - progress) < 0.045 ? stage : progress;
                  },
                  delay: 0.2,
                  duration: { min: 0.18, max: 0.35 },
                  ease: "power1.out",
                  inertia: false,
                },
              },
            });

            slide
              .fromTo(track, { x: 0 }, { x: () => -(track.scrollWidth - section.clientWidth), duration: 1 }, 0)
              .fromTo(line, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 1 }, 0)
              .fromTo(endDot, { x: 0 }, { x: () => line.offsetWidth, duration: 1 }, 0);
            return;
          }

          const slide = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          slide.fromTo(
            track,
            { xPercent: 0 },
            {
              xPercent: context.conditions?.tablet
                  ? -67
                  : -64,
            },
          );

          gsap.fromTo(
            line,
            { width: "0%" },
            {
              width: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 28%",
                end: "bottom bottom",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        },
      );

      return () => media.revert();
    },
    { dependencies: [mobileViewport, reducedMotion], scope: sectionRef },
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const titleSplits: SplitTextInstance[] = [];
      const descriptionSplits: SplitTextInstance[] = [];
      const revealTimelines: gsap.core.Timeline[] = [];

      if (mobileViewport && !reducedMotion) {
        gsap.set(
          section.querySelectorAll("[data-service-title], [data-service-description], [data-service-supporting]"),
          { clearProps: "transform,opacity,visibility" },
        );
        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        reveal.to({ progress: 0 }, { progress: 1, duration: 1 }, 0);
        t.items.forEach((service, index) => {
          const item = section.querySelector<HTMLElement>(`[data-service="${service.slug}"]`);
          const stem = item?.querySelector<HTMLElement>("[data-service-stem]");
          const dot = item?.querySelector<HTMLElement>("[data-service-dot]");
          if (!stem || !dot) return;
          reveal.fromTo(stem, { scaleY: 0 }, { scaleY: 1, duration: 0.07 }, 0.32 + index * 0.25);
          reveal.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.07 }, 0.32 + index * 0.25);
        });
        return () => {
          reveal.scrollTrigger?.kill();
          reveal.kill();
        };
      }

      t.items.forEach((service, index) => {
        const item = section.querySelector<HTMLElement>(
          `[data-service="${service.slug}"]`,
        );
        const stem = item?.querySelector<HTMLElement>("[data-service-stem]");
        const dot = item?.querySelector<HTMLElement>("[data-service-dot]");
        const title = item?.querySelector<HTMLElement>("[data-service-title]");
        const description = item?.querySelector<HTMLElement>(
          "[data-service-description]",
        );
        const supportingNodeList = item?.querySelectorAll<HTMLElement>(
          "[data-service-supporting]",
        );

        if (!item || !stem || !dot || !title || !description || !supportingNodeList) return;
        const supportingElements = Array.from(supportingNodeList);

        if (reducedMotion) {
          gsap.set([stem, dot, title, description, ...supportingElements], {
            clearProps: "all",
            opacity: 1,
            scale: 1,
            scaleY: 1,
          });
          return;
        }

        gsap.set(stem, {
          scaleY: 0,
          transformOrigin: item.dataset.side === "top" ? "bottom bottom" : "top top",
        });
        gsap.set(dot, { scale: 0 });
        gsap.set([title, description], { opacity: 1 });
        gsap.set(supportingElements, { opacity: 0, y: 18 });

        const titleSplit = new SplitText(title, {
          type: "lines",
        });
        const descriptionSplit = new SplitText(description, {
          type: "lines",
        });
        titleSplits.push(titleSplit);
        descriptionSplits.push(descriptionSplit);

        const desktopPositions = [28, 52, 62];
        const mobilePositions = [30, 51, 64];
        const start = window.innerWidth < 700
          ? mobilePositions[index]
          : desktopPositions[index];

        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: `${start}% 34%`,
            end: `${start + 18}% 50%`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        reveal
          .to(stem, { scaleY: 1, duration: 0.45 })
          .to(dot, { scale: 1, duration: 0.45 }, "<")
          .fromTo(
            titleSplit.lines,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.025,
              ease: "power2.out",
            },
            "-=0.28",
          )
          .fromTo(
            descriptionSplit.lines,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.025,
              ease: "power2.out",
            },
            "<",
          )
          .to(
            supportingElements,
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              stagger: 0.06,
              ease: "power2.out",
            },
            "-=0.55",
          );
        revealTimelines.push(reveal);
      });

      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", handleResize, { passive: true });

      return () => {
        revealTimelines.forEach((timeline) => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        });
        titleSplits.forEach((split) => split.revert());
        descriptionSplits.forEach((split) => split.revert());
        window.removeEventListener("resize", handleResize);
      };
    },
    { dependencies: [mobileViewport, locale, reducedMotion], scope: sectionRef },
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: t.items.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.title,
      description: service.description,
      url: `https://nicksitchinava.dev/${locale}/services/${service.slug}`,
    })),
  };

  const handleServiceFocus = (index: number) => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;

    const progress = (mobileViewport ? [0.5, 0.75, 1] : [0.4, 0.73, 0.96])[index] ?? 0;
    const scrollRange = Math.max(0, section.offsetHeight - window.innerHeight);
    window.scrollTo({
      top: section.offsetTop + scrollRange * progress,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className={styles.services}
      aria-labelledby="services-heading"
      lang={locale}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={styles.stickyViewport}>
        <div ref={trackRef} className={styles.track}>
          <div
            className={styles.openingComposition}
            aria-label="Built Around Your Business"
          >
            <p className={styles.openingTop}>Built Around</p>
            <ServicesVideo
              playLabel={supporting.playVideo}
              pauseLabel={supporting.pauseVideo}
              muteLabel={supporting.muteVideo}
              unmuteLabel={supporting.unmuteVideo}
              cursorRequiresFinePointer
            />
            <p className={styles.openingBottom}>Your Business</p>
          </div>

          <div className={styles.timeline}>
            <div className={styles.axis} aria-hidden="true">
              <span className={styles.axisDot} />
              <span data-journey-line className={styles.axisLine} />
              <span data-journey-end className={styles.axisDot} />
            </div>

            <div className={styles.timelineHeading}>
              <h2 id="services-heading">{t.heading}</h2>
            </div>
            <p className={styles.periodLabel}>{supporting.period}</p>

            {t.items.map((service, index) => {
              const layout = itemLayout[index];
              const positionStyle = {
                "--desktop-position": layout.desktopPosition,
                "--mobile-position": layout.mobilePosition,
              } as CSSProperties;

              return (
                <article
                  key={service.slug}
                  className={`${styles.serviceItem} ${
                    layout.side === "top" ? styles.topItem : styles.bottomItem
                  }`}
                  style={positionStyle}
                  data-service={service.slug}
                  data-side={layout.side}
                >
                  <div className={styles.stemWrap} aria-hidden="true">
                    <span data-service-stem className={styles.stem} />
                    <span data-service-dot className={styles.serviceDot} />
                  </div>

                  <div className={styles.serviceContent}>
                    <h3 data-service-title className={styles.serviceTitle}>
                      {service.title}
                    </h3>
                    <p
                      data-service-description
                      className={styles.serviceDescription}
                    >
                      <span className={styles.desktopCopy}>{service.description}</span>
                      <span className={styles.mobileCopy}>{mobileCopy[locale][service.slug].description}</span>
                    </p>
                    <p
                      data-service-supporting
                      className={styles.serviceDetails}
                    >
                      <span className={styles.desktopCopy}>{service.details}</span>
                      <span className={styles.mobileCopy}>{mobileCopy[locale][service.slug].details}</span>
                    </p>
                    <ul data-service-supporting className={styles.features}>
                      {service.features.map((feature, featureIndex) => (
                        <li key={feature}>
                          <Check aria-hidden="true" size={14} strokeWidth={2.25} />
                          <span>
                            <span className={styles.desktopCopy}>{feature}</span>
                            <span className={styles.mobileCopy}>{mobileCopy[locale][service.slug].features[featureIndex]}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div data-service-supporting className={styles.ctaWrap}>
                      <Button
                        href="#contact"
                        aria-label={`${t.cta}: ${service.title}`}
                        onFocus={() => handleServiceFocus(index)}
                        className={styles.cta}
                        style={
                          {
                            "--btn-bg": "#CD0000",
                            "--btn-fg": "#EFEDE6",
                            "--btn-fill": "#151412",
                            "--btn-fill-fg": "#EFEDE6",
                          } as CSSProperties
                        }
                      >
                        {t.cta}
                        <ArrowUpRight aria-hidden="true" size={15} strokeWidth={2.2} />
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
