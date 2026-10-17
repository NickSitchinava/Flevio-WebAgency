"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./logo-square.module.css";
import type { Locale } from "@/i18n/config";

export default function LogoSquare({ locale }: { locale: Locale }) {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href={`/${locale}#home`} className={styles.lockup} aria-label="Flevio — Home">
        <span className={styles.square}>
          <Image src="/images/logo.webp" alt="" width={28} height={28} priority />
        </span>
        <span className={styles.wordmark}>FLEVIO</span>
      </a>
    </motion.div>
  );
}
