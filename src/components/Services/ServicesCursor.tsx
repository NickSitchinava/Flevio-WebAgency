"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import styles from "./ServicesCursor.module.css";

interface CursorContextValue {
  setActive: (active: boolean) => void;
  setHovered: (hovered: boolean) => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function useServicesCursor() {
  return useContext(CursorContext);
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ServicesCursor({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pointerFine, setPointerFine] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const enabled = pointerFine && !prefersReducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 500, damping: 42, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 42, mass: 0.4 });

  useEffect(() => {
    setPointerFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const node = containerRef.current;
    if (!node) return;

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const handleEnter = () => setVisible(true);
    const handleLeave = () => {
      setVisible(false);
      setActive(false);
      setHovered(false);
    };

    node.addEventListener("pointermove", handleMove, { passive: true });
    node.addEventListener("pointerenter", handleEnter, { passive: true });
    node.addEventListener("pointerleave", handleLeave, { passive: true });
    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerenter", handleEnter);
      node.removeEventListener("pointerleave", handleLeave);
    };
  }, [enabled, x, y]);

  return (
    <CursorContext.Provider value={{ setActive, setHovered }}>
      <div ref={containerRef} className={enabled ? styles.scope : undefined}>
        {children}
        {enabled && (
          <>
            <motion.div
              aria-hidden="true"
              className={styles.dot}
              style={{ left: springX, top: springY }}
              animate={{ opacity: visible ? 1 : 0, scale: active ? 1.4 : hovered ? 1.15 : 1 }}
              transition={{ duration: 0.3, ease: EASE }}
            />
            <motion.div
              aria-hidden="true"
              className={styles.ring}
              style={{ left: springX, top: springY }}
              animate={{
                opacity: visible ? 1 : 0,
                scale: active ? 0.32 : hovered ? 1.2 : 1,
                backgroundColor: active ? "rgba(29,29,31,0.95)" : "rgba(29,29,31,0)",
                borderColor: active
                  ? "rgba(29,29,31,0)"
                  : hovered
                    ? "rgba(29,29,31,0.7)"
                    : "rgba(29,29,31,0.45)",
              }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          </>
        )}
      </div>
    </CursorContext.Provider>
  );
}