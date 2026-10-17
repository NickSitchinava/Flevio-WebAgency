"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Locale } from "@/i18n/config";
import type { dictionaries } from "@/i18n/dictionaries";
import styles from "./projects.module.css";

type Project = (typeof dictionaries)[Locale]["projects"]["deliveryLinks"][number];

export function MobileProjectPreview({
  project,
  locale,
  className,
  href,
  previewSrc,
  children,
}: {
  project: Project;
  index: number;
  locale: Locale;
  className: string;
  href: string;
  previewSrc: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [exiting, setExiting] = React.useState(false);
  const panelRef = React.useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const visitLabel = locale === "ka" ? "საიტის ნახვა" : "Visit site";
  const closeLabel = locale === "ka" ? "გადახედვის დახურვა" : "Close preview";

  React.useLayoutEffect(() => {
    if (!open && !exiting) return;
    const stopPageWheel = (event: WheelEvent) => {
      if (!(event.target instanceof Node && panelRef.current?.contains(event.target))) event.preventDefault();
      event.stopPropagation();
    };
    const stopPageTouch = (event: TouchEvent) => {
      if (!(event.target instanceof Node && panelRef.current?.contains(event.target))) event.preventDefault();
      event.stopPropagation();
    };
    document.addEventListener("wheel", stopPageWheel, { passive: false });
    document.addEventListener("touchmove", stopPageTouch, { passive: false });
    return () => {
      document.removeEventListener("wheel", stopPageWheel);
      document.removeEventListener("touchmove", stopPageTouch);
    };
  }, [open, exiting]);

  return (
    <Dialog.Root open={open} onOpenChange={(next) => {
      if (!next && open) setExiting(true);
      setOpen(next);
    }}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={className}
          aria-label={locale === "ka" ? `${project.title} — გადახედვა` : `Preview ${project.title}`}
        >
          {children}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal forceMount>
        <AnimatePresence onExitComplete={() => setExiting(false)}>
          {open && <>
            <Dialog.Overlay forceMount asChild>
              <motion.div
                className={styles.mobilePreviewBackdrop}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.22 }}
              />
            </Dialog.Overlay>
            <div className={styles.mobilePreviewPositioner}>
              <Dialog.Content forceMount asChild>
                <motion.section
                  ref={panelRef}
                  className={styles.mobilePreviewPanel}
                  initial={reducedMotion ? false : { opacity: 0, y: 28, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
                  transition={{ duration: reducedMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className={styles.mobilePreviewVisual}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- Local, sized project preview asset. */}
                    <img src={previewSrc} alt={locale === "ka" ? `${project.title} ვებსაიტის გადახედვა` : `${project.title} website preview`} width={640} height={376} decoding="async" />
                    <Dialog.Close asChild>
                      <button type="button" className={styles.mobilePreviewClose} aria-label={closeLabel}>
                        <X size={20} aria-hidden="true" />
                      </button>
                    </Dialog.Close>
                  </div>
                  <div className={styles.mobilePreviewBody}>
                    <Dialog.Title className={styles.mobilePreviewTitle}>{project.title}</Dialog.Title>
                    <Dialog.Description className={styles.mobilePreviewCategory}>{project.description}</Dialog.Description>
                    <div className={styles.mobilePreviewFooter}>
                      <span className={styles.mobilePreviewMeta}>{project.region}</span>
                      <a href={href} target="_blank" rel="noopener noreferrer" className={styles.mobilePreviewVisit}>
                        {visitLabel}<ArrowUpRight size={17} aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </motion.section>
              </Dialog.Content>
            </div>
          </>}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
