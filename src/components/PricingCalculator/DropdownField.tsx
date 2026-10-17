"use client";

import { createPortal } from "react-dom";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import styles from "./pricing-calculator.module.css";

const PANEL_GAP = 8;

export interface DropdownOption {
  value: string;
  label: string;
  description?: string;
}

export interface DropdownFieldProps {
  index: number;
  label: string;
  placeholder: string;
  options: DropdownOption[];
  value: string | null;
  onChange: (value: string) => void;
  disabled?: boolean;
  locale?: string;
}

export function DropdownField({
  index,
  label,
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
  locale,
}: DropdownFieldProps) {
  const [open, setOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const focusOnOpenRef = useRef<number | null>(null);
  const fieldId = useId();
  const labelId = `${fieldId}-label`;
  const valueId = `${fieldId}-value`;
  const panelId = `${fieldId}-options`;
  const prefersReducedMotion = useReducedMotion();

  const focusOption = (index: number) => {
    const optionButtons = panelRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]');
    optionButtons?.[Math.max(0, Math.min(index, optionButtons.length - 1))]?.focus();
  };

  const computeCoords = () => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      top: rect.bottom + PANEL_GAP,
      left: rect.left,
      width: rect.width,
    });
  };

  useEffect(() => {
    if (!open) return;

    computeCoords();
    const focusIndex = focusOnOpenRef.current;
    focusOnOpenRef.current = null;
    const focusRaf = focusIndex === null ? 0 : requestAnimationFrame(() => focusOption(focusIndex));

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !panelRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    let rafId = 0;
    const handleReposition = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        computeCoords();
        rafId = 0;
      });
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleReposition, { passive: true });
    window.addEventListener("scroll", handleReposition, {
      passive: true,
      capture: true,
    });

    return () => {
      if (focusRaf) cancelAnimationFrame(focusRaf);
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [open]);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={styles.field}>
      <div className={styles.fieldHeader}>
        <span className={styles.fieldIndex}>{index}</span>
        <span id={labelId} className={styles.fieldLabel} lang={locale}>
          {label}
        </span>
      </div>

      <button
        ref={triggerRef}
        type="button"
        className={styles.fieldTrigger}
        data-disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={panelId}
        aria-labelledby={`${labelId} ${valueId}`}
        disabled={disabled}
        onClick={() => {
          setPortalReady(true);
          setOpen((prev) => !prev);
        }}
        onKeyDown={(event) => {
          if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
          event.preventDefault();
          const targetIndex = event.key === "ArrowUp" ? options.length - 1 : Math.max(0, options.findIndex((option) => option.value === value));
          if (open) {
            focusOption(targetIndex);
            return;
          }
          focusOnOpenRef.current = targetIndex;
          setPortalReady(true);
          setOpen(true);
        }}
      >
        <span
          id={valueId}
          className={styles.fieldTriggerLabel}
          data-placeholder={!selectedOption}
          lang={locale}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.span
          className={styles.fieldChevron}
          animate={{ rotate: open ? 180 : 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.4, ease: "easeInOut", type: "spring" }
          }
        >
          <ChevronDown size={18} strokeWidth={2} />
        </motion.span>
      </button>

      {portalReady &&
        createPortal(
          <AnimatePresence>
            {open && !disabled && (
              <motion.div
                ref={panelRef}
                id={panelId}
                role="listbox"
                aria-labelledby={labelId}
                className={styles.fieldPanel}
                style={{ top: coords.top, left: coords.left, width: coords.width }}
                lang={locale}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { y: -6, opacity: 0 }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { y: 0, opacity: 1 }
                }
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { y: -6, opacity: 0 }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
                }
              >
                {options.map((option, optionIndex) => {
                  const isActive = option.value === value;
                  return (
                    <motion.button
                      type="button"
                      key={option.value}
                      role="option"
                      aria-selected={isActive}
                      tabIndex={isActive || (!selectedOption && optionIndex === 0) ? 0 : -1}
                      className={styles.fieldOption}
                      data-active={isActive}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: 4 }
                      }
                      animate={
                        prefersReducedMotion
                          ? { opacity: 1 }
                          : { opacity: 1, y: 0 }
                      }
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { opacity: 0, y: 4 }
                      }
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : {
                              duration: 0.2,
                              delay: optionIndex * 0.025,
                              ease: [0.16, 1, 0.3, 1],
                            }
                      }
                      whileTap={{
                        scale: 0.97,
                        transition: { duration: 0.2, ease: "easeInOut" },
                      }}
                      onClick={() => {
                        onChange(option.value);
                        setOpen(false);
                        triggerRef.current?.focus();
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                          event.preventDefault();
                          focusOption(optionIndex + (event.key === "ArrowDown" ? 1 : -1));
                        } else if (event.key === "Home" || event.key === "End") {
                          event.preventDefault();
                          focusOption(event.key === "Home" ? 0 : options.length - 1);
                        } else if (event.key === "Escape") {
                          event.preventDefault();
                          setOpen(false);
                          triggerRef.current?.focus();
                        }
                      }}
                    >
                      <span className={styles.fieldOptionText}>
                        <span className={styles.fieldOptionLabel}>{option.label}</span>
                        {option.description && (
                          <span className={styles.fieldOptionDescription}>
                            {option.description}
                          </span>
                        )}
                      </span>
                      {isActive && <Check size={16} strokeWidth={2} />}
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

export default DropdownField;
