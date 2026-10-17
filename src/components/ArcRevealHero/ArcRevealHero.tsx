"use client";

import * as React from "react";
import { LoaderRevealContext } from "./LoaderContext";
import StackLoader from "./StackLoader";
import styles from "./stack-loader.module.css";
import "./tailwind-entry.css";

export function ArcRevealHero({ children, locale = "en" }: {
  children: React.ReactNode;
  locale?: "en" | "ka";
}) {
  const [complete, setComplete] = React.useState(false);

  React.useEffect(() => {
    if (complete) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [complete]);

  return (
    <LoaderRevealContext.Provider value={{ isRevealed: complete }}>
      <div className={styles.page}>
        <div aria-hidden={!complete} inert={!complete ? true : undefined}>{children}</div>
        {!complete && (
          <StackLoader locale={locale} imageSize={1} duration={1} fadeOutDuration={0.8}
            backgroundColor="#efede6" onComplete={() => setComplete(true)} />
        )}
      </div>
    </LoaderRevealContext.Provider>
  );
}

export default ArcRevealHero;
