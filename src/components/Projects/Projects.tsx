"use client";

import * as React from "react";
import { ArrowUpRight, Lock, Play } from "lucide-react";
import { createPortal } from "react-dom";
import { ServicesVideo } from "@/components/Services/ServicesVideo";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { TiltedGridHero } from "./TiltedGridHero";
import { MobileProjectPreview } from "./MobileProjectPreview";
import styles from "./projects.module.css";

type Project = (typeof dictionaries)[Locale]["projects"]["deliveryLinks"][number];

const previewSources: Record<string, string> = {
  "/images/projects/alliance-travel-georgia-hero.webp": "/images/previews/alliance-travel-georgia.webp",
};

// Keep the supplied card-to-card image motion and its exact easing and durations.
const PREVIEW_KEYFRAMES = `
@keyframes cc-in {
  from { opacity: 0; transform: translateX(calc(var(--cc-dir, 1) * 64px)) scale(0.97); filter: blur(6px); }
}
@keyframes cc-out {
  to { opacity: 0; transform: translateX(calc(var(--cc-dir, 1) * -64px)) scale(0.97); filter: blur(6px); }
}`;
const subscribeHydration = () => () => {};
const clientHydrated = () => true;
const serverHydrated = () => false;
const mobileLandscapeQuery = "(max-width: 1023px) and (max-height: 520px) and (orientation: landscape)";
const subscribeMobileLandscape = (onChange: () => void) => {
  const query = window.matchMedia(mobileLandscapeQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const isMobileLandscape = () => window.matchMedia(mobileLandscapeQuery).matches;
const subscribeViewportWidth = (onChange: () => void) => {
  window.addEventListener("resize", onChange, { passive: true });
  return () => window.removeEventListener("resize", onChange);
};
const getViewportWidth = () => window.innerWidth;
const getServerViewportWidth = () => 1200;

// Gallery-only versions keep the supplied animation crisp at its rendered size
// without decoding ten full-size project screenshots into moving layers.
const gallerySources: Record<string, string> = Object.fromEntries(
  [
    "alliance-travel-georgia-hero.webp",
    "alliance-travel-georgia-footer.webp",
    "nick-portfolio-hero.webp",
    "nick-portfolio-detail.webp",
    "george-portfolio-hero.webp",
    "george-portfolio-detail.webp",
    "fdash-hero.webp",
    "fdash-detail.webp",
    "bike-summer-fest-hero.webp",
    "bike-summer-fest-detail.webp",
  ].map((name) => [`/images/projects/${name}`, `/images/gallery/${name}`]),
);

const descriptions: Record<Locale, Record<string, string>> = {
  en: {
    "Alliance Travel Georgia": "Discover and plan travel across Georgia.",
    "Nick Sitchinava": "Selected work presented with a personal voice.",
    "George Sitchinava": "A focused showcase for projects and process.",
    "F-Dash": "Complex finance information, clearly organized.",
    "Bike Summer Fest": "Festival discovery and details in one place.",
    "Company landing page": "A marketing presence for a private company.",
  },
  ka: {
    "Alliance Travel Georgia": "აღმოაჩინეთ საქართველო და დაგეგმეთ მოგზაურობა.",
    "Nick Sitchinava": "რჩეული ნამუშევრები პერსონალური ხედვით.",
    "George Sitchinava": "პროექტებისა და სამუშაო პროცესის მკაფიო პორტფოლიო.",
    "F-Dash": "კომპლექსური ფინანსური ინფორმაცია გასაგებად.",
    "Bike Summer Fest": "ფესტივალის ამბები და დეტალები ერთ გვერდზე.",
    "კომპანიის ლენდინგ გვერდი": "კერძო კომპანიის მარკეტინგული ვებგვერდი.",
  },
};

function ProjectCard({ project, index, locale, viewLabel, privateLabel, onEnter }: {
  project: Project;
  index: number;
  locale: Locale;
  viewLabel: string;
  privateLabel: string;
  onEnter: (index: number, link: HTMLAnchorElement) => void;
}) {
  const featured = index === 0;
  const summary = descriptions[locale][project.title] ?? project.description;
  const className = `${styles.projectCard} ${featured ? styles.featuredCard : ""} ${project.private ? styles.privateCard : ""}`;
  const content = (mobile = false) => (
    <>
      <span className={styles.cardTopline}>
        <span className={styles.cardNumber}>{String(index + 1).padStart(2, "0")}{featured ? <span className={styles.featuredLabel}> / {locale === "ka" ? "რჩეული" : "Featured"}</span> : null}</span>
        {project.private ? <Lock size={17} aria-hidden="true" /> : <span className={styles.cardAction}>{mobile ? (locale === "ka" ? "გადახედვა" : "Preview") : viewLabel}<ArrowUpRight size={14} aria-hidden="true" /></span>}
      </span>
      <strong className={styles.cardTitle}>{project.title}</strong>
      <span className={styles.cardCategory}>{project.description}</span>
      <span className={styles.cardDescription}>{summary}</span>
      <span className={styles.cardBottomline}>
        <span className={styles.cardMeta}>
          <span>{project.region}</span>
          {project.duration ? <span>{project.duration}</span> : null}
        </span>
      </span>
    </>
  );

  return project.href ? (
    <>
      <a href={project.href} target="_blank" rel="noopener noreferrer" className={`${className} ${styles.desktopProjectCard}`}
        onPointerEnter={(event) => { if (event.pointerType === "mouse" || event.pointerType === "pen") onEnter(index, event.currentTarget); }}
        onFocus={(event) => onEnter(index, event.currentTarget)}
        aria-label={locale === "ka" ? `${project.title} — საიტის ნახვა (ახალ ჩანართში)` : `Visit ${project.title} website (opens in a new tab)`}>
        {content()}
      </a>
      <MobileProjectPreview
        project={project}
        index={index}
        locale={locale}
        href={project.href}
        previewSrc={previewSources[project.previewSrc] ?? project.previewSrc}
        className={`${className} ${styles.mobileProjectCard}`}
      >
        {content(true)}
      </MobileProjectPreview>
    </>
  ) : (
    <div className={className} role="group" aria-label={`${project.title}. ${privateLabel}`}>
      {content()}
    </div>
  );
}

function PreviewContent({ project }: { project: Project }) {
  return <>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={previewSources[project.previewSrc] ?? project.previewSrc} alt="" width={640} height={376} decoding="async" className={styles.previewImage} />
    <span className={styles.previewCaption}><span>{project.title}</span><ArrowUpRight size={15} aria-hidden="true" /></span>
  </>;
}

export default function Projects({ locale }: { locale: Locale }) {
  const t = dictionaries[locale].projects;
  const hydrated = React.useSyncExternalStore(subscribeHydration, clientHydrated, serverHydrated);
  const mobileLandscape = React.useSyncExternalStore(subscribeMobileLandscape, isMobileLandscape, serverHydrated);
  const viewportWidth = React.useSyncExternalStore(subscribeViewportWidth, getViewportWidth, getServerViewportWidth);
  const cardsRef = React.useRef<HTMLDivElement>(null);
  const activeLinkRef = React.useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [outgoing, setOutgoing] = React.useState<{ index: number; direction: number; key: number }>();
  const [entryKey, setEntryKey] = React.useState(0);
  const [box, setBox] = React.useState({ left: 0, top: 0, width: 0, height: 0, below: false });
  const [morphing, setMorphing] = React.useState(false);
  const [previewReady, setPreviewReady] = React.useState(false);

  React.useEffect(() => {
    if (!outgoing) return;
    const timeout = setTimeout(() => setOutgoing(undefined), 400);
    return () => clearTimeout(timeout);
  }, [outgoing]);

  React.useEffect(() => {
    if (!open) return;
    const closeOnScroll = () => {
      const active = activeLinkRef.current;
      if (active && (active.matches(":hover") || document.activeElement === active)) {
        positionPreview(active);
        return;
      }
      closePreview();
    };
    window.addEventListener("scroll", closeOnScroll, { passive: true });
    window.addEventListener("resize", closeOnScroll);
    return () => {
      window.removeEventListener("scroll", closeOnScroll);
      window.removeEventListener("resize", closeOnScroll);
    };
  }, [open]);

  React.useEffect(() => {
    const cards = cardsRef.current;
    if (!cards || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      // The five small images decode near the card list, never at page startup.
      const mobilePreview = window.matchMedia("(max-width: 760px), (max-width: 1023px) and (max-height: 520px) and (orientation: landscape)").matches;
      for (const project of t.deliveryLinks) {
        if (!project.href) continue;
        const image = new Image();
        image.decoding = "async";
        image.src = previewSources[project.previewSrc] ?? project.previewSrc;
        if (mobilePreview) void image.decode().catch(() => {});
      }
    }, { rootMargin: "350px 0px" });
    observer.observe(cards);
    return () => observer.disconnect();
  }, [t.deliveryLinks]);

  function closePreview() {
    activeLinkRef.current = null;
    setOpen(false);
    setOutgoing(undefined);
    setMorphing(false);
  }

  function positionPreview(link: HTMLAnchorElement) {
    const width = Math.min(352, window.innerWidth - 32);
    const rect = link.getBoundingClientRect();
    const height = width / 1.7 + 39;
    const below = rect.top < height + 28;
    setBox({
      left: Math.min(Math.max(rect.left + rect.width / 2, width / 2 + 16), window.innerWidth - width / 2 - 16),
      top: below ? rect.bottom + 12 : rect.top - 12,
      width,
      height,
      below,
    });
  }

  function handleEnter(next: number, link: HTMLAnchorElement) {
    activeLinkRef.current = link;
    positionPreview(link);
    if (open && next === index) return;
    if (open) {
      setOutgoing({ index, direction: Math.sign(next - index) || 1, key: entryKey });
      setDirection(Math.sign(next - index) || 1);
    }
    setMorphing(open);
    setIndex(next);
    setEntryKey((key) => key + 1);
    setPreviewReady(true);
    setOpen(true);
  }

  const projects = React.useMemo(() => {
    const alliance = t.deliveryLinks.find((project) => project.title === "Alliance Travel Georgia");
    return alliance ? [alliance, ...t.deliveryLinks.filter((project) => project !== alliance)] : t.deliveryLinks;
  }, [t.deliveryLinks]);
  const fdash = projects.find((project) => project.title === "F-Dash");

  const galleryImages = React.useMemo(() => projects.filter((project) => !project.private).flatMap((project) => [
    { src: gallerySources[project.heroSrc] ?? project.heroSrc, alt: `${project.title} website design` },
    ...(project.detailSrc ? [{ src: gallerySources[project.detailSrc] ?? project.detailSrc, alt: `${project.title} website detail` }] : []),
  ]), [projects]);
  const mobileGallery = viewportWidth <= 760 || mobileLandscape;
  const mobileCurve = Math.min(46, Math.max(34, viewportWidth * 0.1));
  const mobileAxis = 65 - Math.min(2, Math.max(0, (viewportWidth - 320) * 2 / 70));
  const mobilePhase = mobileLandscape
    ? Math.max(-1.5, Math.min(1.25, 1.25 - (viewportWidth - 568) * 2.45 / 276))
    : 1.25;
  const displayedGalleryImages = React.useMemo(() => {
    if (!mobileGallery) return galleryImages;
    const mobileImages = projects.filter((project) => !project.private).map((project) => ({
      src: gallerySources[project.heroSrc] ?? project.heroSrc,
      alt: `${project.title} website design`,
    }));
    return [...mobileImages.slice(-1), ...mobileImages.slice(0, -1)];
  }, [galleryImages, mobileGallery, projects]);

  // Hover state does not need to reconcile the continuously animated 3D gallery.
  const gallery = React.useMemo(() => (
    <TiltedGridHero
      id="projects-gallery"
      images={displayedGalleryImages}
      axis={mobileLandscape ? 62 : mobileGallery ? mobileAxis : 56}
      curve={mobileGallery ? mobileCurve : 80}
      tileHeight={mobileGallery ? (mobileLandscape ? 38 : 35) : 26}
      maxTileWidth={mobileGallery ? 72 : 55}
      fade={mobileGallery ? 7 : 12}
      phase={mobileGallery ? mobilePhase : 0}
      className={styles.gallery}
    >
      <div className={styles.galleryContent}>
        <h2 id="projects-heading" className={styles.galleryHeading}>{t.wheelLabel}</h2>
        <p className={styles.galleryLine}>{t.scopeLine}</p>
      </div>
    </TiltedGridHero>
  ), [displayedGalleryImages, mobileGallery, mobileLandscape, mobileCurve, mobileAxis, mobilePhase, t.wheelLabel, t.scopeLine]);
  return (
    <section id="projects" className={styles.projects} aria-labelledby="projects-heading" lang={locale}>
      {gallery}

      <div className={styles.introduction}>
        <div className={styles.introCopy}>
          <h3>{t.heading}</h3>
          <p>{t.problemStatement}</p>
          <span>{t.problemAttribution}</span>
        </div>
        <aside className={styles.showreel} aria-label={t.showreelLabel}>
          {fdash && <div className={styles.fdashMobileLead}>
            <div className={styles.fdashIdentity}>
              <h3>F-Dash</h3>
              <p>{fdash.description}</p>
            </div>
            <div className={styles.fdashAward}>
              <strong>{locale === "ka" ? "I ადგილი" : "1st place"}</strong>
              <span>{locale === "ka" ? "მზიური 2026" : "Mziuri 2026"}</span>
            </div>
          </div>}
          <div className={styles.showreelFrame}>
            <ServicesVideo
              src="/videos/showreel.mp4"
              poster="/images/showreel-poster.webp"
              className={styles.showreelMedia}
              playLabel={locale === "ka" ? "შოურილის გაშვება" : "Play showreel"}
              pauseLabel={locale === "ka" ? "შოურილის შეჩერება" : "Pause showreel"}
              muteLabel={locale === "ka" ? "შოურილის ხმის გამორთვა" : "Mute showreel"}
              unmuteLabel={locale === "ka" ? "შოურილის ხმის ჩართვა" : "Unmute showreel"}
              cursorRequiresFinePointer
            />
          </div>
          <div className={styles.showreelCaption}>
            <span className={styles.showreelPlay}><Play size={15} fill="currentColor" aria-hidden="true" /></span>
            <div><strong>{t.showreelTitle}</strong><span>{t.showreelDescription}</span></div>
          </div>
          {fdash && <div className={styles.fdashDesktopRecognition}>
            <div className={styles.fdashDesktopTopline}>
              <div><strong>F-Dash</strong><span>{fdash.description}</span></div>
              <p><strong>{locale === "ka" ? "I ადგილი" : "1st place"}</strong><span>{locale === "ka" ? "მზიური 2026" : "Mziuri 2026"}</span></p>
            </div>
            <div className={styles.fdashDesktopBottomline}>
              <p>{locale === "ka"
                ? "F-Dash-მა საქართველოში გამართულ კონკურსში პირველი ადგილი დაიკავა, სადაც მრავალფეროვანი საინტერესო პროექტები იყო წარმოდგენილი."
                : "First place in Georgia's Mziuri competition, alongside a diverse range of interesting projects."}</p>
              <span>{locale === "ka" ? `დაახლ. ${fdash.duration}` : `Approx. ${fdash.duration}`}</span>
            </div>
          </div>}
          {fdash && <div className={styles.fdashMobileAfter}>
            <p className={styles.fdashContext}>
              {locale === "ka"
                ? "F-Dash-მა 2026 წელს საქართველოში გამართულ მზიურის კონკურსზე პირველი ადგილი დაიკავა, სადაც მრავალფეროვანი საინტერესო პროექტები იყო წარმოდგენილი."
                : "F-Dash earned first place at the 2026 Mziuri competition in Georgia, where a diverse range of projects were presented."}
            </p>
            <span className={styles.fdashDuration}>
              {locale === "ka" ? `დაახლ. ${fdash.duration}` : `Approx. ${fdash.duration}`}
            </span>
          </div>}
        </aside>
      </div>

      <div className={styles.projectIndex}>
        <div className={styles.indexHeader}>
          <h3>{t.indexHeading}</h3>
          <p><span className={styles.desktopIndexIntro}>{t.indexIntro}</span><span className={styles.mobileIndexIntro}>{locale === "ka" ? "შეეხეთ საჯარო პროექტს, დაათვალიერეთ და შემდეგ გახსენით მისი საიტი." : "Tap a public project to preview it, then choose whether to visit its site."}</span></p>
        </div>
        <div ref={cardsRef} className={styles.cards}
          onPointerLeave={closePreview}
          onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) closePreview(); }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} locale={locale} viewLabel={t.viewProjectLabel} privateLabel={t.privateLabel} onEnter={handleEnter} />
          ))}
        </div>
      </div>
      {hydrated && createPortal(<>
        <style>{PREVIEW_KEYFRAMES}</style>
        <div aria-hidden="true"
          style={{ "--preview-x": `${box.left}px`, "--preview-y": `${box.top}px`, width: box.width, height: box.height, contain: "paint" } as React.CSSProperties}
          className={`${styles.hoverPreview} ${box.below ? styles.previewBelow : ""} ${morphing ? styles.previewMorphing : styles.previewOpening} ${open ? styles.previewOpen : styles.previewClosed}`}>
          {outgoing && <div key={`out-${outgoing.key}`} className={styles.previewLayer}
            onAnimationEnd={(event) => { if (event.target === event.currentTarget) setOutgoing(undefined); }}
            style={{ "--cc-dir": outgoing.direction, animation: "cc-out 0.35s cubic-bezier(0.32,0.72,0,1) forwards" } as React.CSSProperties}>
            <PreviewContent project={projects[outgoing.index]} />
          </div>}
          <div key={`in-${entryKey}`} className={styles.previewLayer}
            style={{ "--cc-dir": direction, animation: morphing ? "cc-in 0.4s cubic-bezier(0.32,0.72,0,1) backwards" : undefined } as React.CSSProperties}>
            {previewReady && <PreviewContent project={projects[index]} />}
          </div>
        </div>
      </>, document.body)}
    </section>
  );
}
