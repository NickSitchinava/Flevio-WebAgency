"use client";

import { useEffect, useRef, useSyncExternalStore, type RefObject } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { siInstagram, siWhatsapp } from "simple-icons";
import { Button } from "@/components/ui/Button/Button";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { Watcher } from "./Watcher";
import "./Watcher.css";
import styles from "./contact.module.css";

const desktopPointerQuery = "(hover: hover) and (pointer: fine)";
const mobileLayoutQuery = "(max-width: 760px), (max-width: 1023px) and (max-height: 520px) and (orientation: landscape)";

function canUseDesktopWatcher() {
  return window.matchMedia(desktopPointerQuery).matches && !window.matchMedia(mobileLayoutQuery).matches;
}

function subscribeToDesktopPointer(onChange: () => void) {
  const pointer = window.matchMedia(desktopPointerQuery);
  const layout = window.matchMedia(mobileLayoutQuery);
  pointer.addEventListener("change", onChange);
  layout.addEventListener("change", onChange);
  return () => { pointer.removeEventListener("change", onChange); layout.removeEventListener("change", onChange); };
}

function DesktopWatcher({ scopeRef }: { scopeRef: RefObject<HTMLElement | null> }) {
  const enabled = useSyncExternalStore(
    subscribeToDesktopPointer,
    canUseDesktopWatcher,
    () => false
  );
  return enabled ? <Watcher scopeRef={scopeRef} follow={50} bounce={30} size={84} shape="Cube" eyes="Slant" /> : null;
}

function ContactFlow({ label, stages }: { label: string; stages: [string, string, string] }) {
  const flowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const flow = flowRef.current;
    if (!flow) return;
    if (!("IntersectionObserver" in window)) {
      flow.dataset.visible = "true";
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      flow.dataset.visible = "true";
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(flow);
    return () => observer.disconnect();
  }, []);

  return <div ref={flowRef} className={styles.flow}>
    <p className={styles.flowLabel}>{label}</p>
    <ol className={styles.flowStages}>
      {stages.map((stage, index) => <li key={stage}>
        <span className={styles.flowNode} aria-hidden="true"><span /></span>
        <span className={styles.flowStageLabel}>{stage}</span>
        <span className={styles.flowStageIndex} aria-hidden="true">0{index + 1}</span>
      </li>)}
    </ol>
  </div>;
}

export default function Contact({ locale }: { locale: Locale }) {
  const t = dictionaries[locale].contact;
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="contact" className={styles.contact} aria-labelledby="contact-heading">
      <div className={styles.composition}>
        <div className={styles.interactiveSide}>
          <div className={styles.characterLine} aria-hidden="true">
            <div className={styles.watcherStage}>
              <DesktopWatcher scopeRef={sectionRef} />
            </div>
            <span className={styles.characterRule} />
          </div>

          <div className={styles.actions}>
            <Button
              href={t.channels.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.contactButton} ${styles.primaryButton}`}
              lang={locale}
            >
              <svg className={styles.channelIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={siWhatsapp.path} /></svg>
              <span>{t.whatsappAction}</span>
              <ArrowUpRight className={styles.actionArrow} size={19} strokeWidth={1.8} aria-hidden="true" />
            </Button>

            <div className={styles.secondaryActions}>
              <Button
                href={t.channels.email.href}
                aria-label={`${t.channels.email.label}: ${t.channels.email.value}`}
                className={`${styles.contactButton} ${styles.secondaryButton}`}
              >
                <Mail className={styles.channelIcon} size={20} strokeWidth={1.8} aria-hidden="true" />
                <span className={styles.channelCopy}><strong>{t.channels.email.label}</strong><small>{t.channels.email.value}</small></span>
                <ArrowUpRight className={styles.actionArrow} size={18} strokeWidth={1.8} aria-hidden="true" />
              </Button>
              <Button
                href={t.channels.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.channels.instagram.label}: ${t.channels.instagram.value}`}
                className={`${styles.contactButton} ${styles.secondaryButton}`}
              >
                <svg className={styles.channelIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={siInstagram.path} /></svg>
                <span className={styles.channelCopy}><strong>{t.channels.instagram.label}</strong><small>{t.channels.instagram.value}</small></span>
                <ArrowUpRight className={styles.actionArrow} size={18} strokeWidth={1.8} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.messageSide}>
          <h2 id="contact-heading" className={styles.heading} lang={locale}>{t.heading}</h2>
          <p className={styles.intro} lang={locale}>{t.text}</p>
          <div className={styles.trust} lang={locale}>
            <span>{t.trust.brief}</span>
            <span>{t.trust.reply}</span>
          </div>
        </div>
        <ContactFlow label={t.process.label} stages={t.process.stages} />
      </div>
    </section>
  );
}
