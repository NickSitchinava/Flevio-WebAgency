"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  Cursor,
  CursorFollow,
  CursorProvider,
} from "@/components/ui/cursor";
import { AnimatePresence, motion } from "motion/react";
import { Play, Volume2, VolumeX } from "lucide-react";
import styles from "./services.module.css";

const desktopCursorQuery = "(hover: hover) and (pointer: fine)";

function subscribeToCursorCapability(onChange: () => void) {
  const query = window.matchMedia(desktopCursorQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function hasDesktopCursorCapability() {
  return window.matchMedia(desktopCursorQuery).matches;
}

export function ServicesVideo({
  playLabel,
  pauseLabel,
  muteLabel,
  unmuteLabel,
  src = "/videos/flevio-showreel.mp4",
  poster = "/images/flevio-showreel-poster.webp",
  className,
  cursorRequiresFinePointer = false,
}: {
  playLabel: string;
  pauseLabel: string;
  muteLabel: string;
  unmuteLabel: string;
  src?: string;
  poster?: string;
  className?: string;
  cursorRequiresFinePointer?: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [touchCursorSuppressed, setTouchCursorSuppressed] = useState(false);
  const showDesktopCursor = useSyncExternalStore(
    subscribeToCursorCapability,
    hasDesktopCursorCapability,
    () => false,
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const resumeWhenVisible = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && !video.paused) {
        resumeWhenVisible.current = true;
        video.pause();
      } else if (entry.isIntersecting && resumeWhenVisible.current) {
        resumeWhenVisible.current = false;
        video.play().catch(() => setIsPlaying(false));
      }
    }, { threshold: 0.05 });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      resumeWhenVisible.current = false;
      if (video.ended) video.currentTime = 0;
      video.muted = isMuted;

      try {
        await video.play();
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    resumeWhenVisible.current = false;
    video.pause();
  };

  const toggleMuted = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div className={`${styles.mediaInteraction} ${className ?? ""}`}>
      <div className={styles.videoTarget}>
        <div
          className={styles.videoClickArea}
          onPointerDownCapture={(event) => {
            if (cursorRequiresFinePointer && event.pointerType === "touch") {
              setTouchCursorSuppressed(true);
            }
          }}
          onPointerMoveCapture={(event) => {
            if (cursorRequiresFinePointer && event.pointerType === "mouse") {
              setTouchCursorSuppressed(false);
            }
          }}
        >
          {(!cursorRequiresFinePointer || (showDesktopCursor && !touchCursorSuppressed)) && <CursorProvider className={styles.cursorProvider}>
            <Cursor>
              <svg
                className="size-6 text-[#CD0000]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
              >
                <path
                  fill="currentColor"
                  d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
                />
              </svg>
            </Cursor>
            <CursorFollow>
              <div className="flex min-w-[3.75rem] items-center justify-center overflow-hidden rounded-lg bg-[#CD0000] px-2 py-1 text-sm font-medium text-[#EFEDE6] shadow-lg">
                <AnimatePresence initial={false} mode="wait">
                  <motion.span
                    key={isPlaying ? "pause" : "play"}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.14, ease: "easeOut" }}
                  >
                    {isPlaying ? "Pause" : "Play"}
                  </motion.span>
                </AnimatePresence>
              </div>
            </CursorFollow>
          </CursorProvider>}

          <button
            type="button"
            className={styles.videoButton}
            onClick={togglePlayback}
            aria-label={isPlaying ? pauseLabel : playLabel}
          >
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              preload="none"
              playsInline
              muted={isMuted}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => {
                resumeWhenVisible.current = false;
                setIsPlaying(false);
              }}
              onVolumeChange={() =>
                setIsMuted(videoRef.current?.muted ?? false)
              }
            />

            <span className={styles.centerPlayAnchor} aria-hidden="true">
              <AnimatePresence initial={false}>
                {!isPlaying ? (
                  <motion.span
                    key="play-indicator"
                    className={styles.centerPlay}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    <Play fill="currentColor" strokeWidth={1.8} />
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </span>
          </button>
        </div>

        <button
          type="button"
          className={styles.soundToggle}
          onClick={toggleMuted}
          aria-label={isMuted ? unmuteLabel : muteLabel}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={isMuted ? "muted" : "audible"}
              className={styles.soundIcon}
              initial={{ opacity: 0, scale: 0.72, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.72, rotate: 12 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              aria-hidden="true"
            >
              {isMuted ? <VolumeX /> : <Volume2 />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
