"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Letter-by-letter reveal (Utopia Tokyo style). Each character rises with a stagger
 * behind its parent mask (overflow-hidden). Words stay unbreakable (inline-block) so
 * they never split mid-word on wrap. aria-label carries readable text; letters are
 * aria-hidden. Reduced-motion falls back to static text.
 */
export default function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.035,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;

  const words = text.split(" ");
  let idx = -1;

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((ch, ci) => {
              idx += 1;
              return (
                <motion.span
                  key={ci}
                  aria-hidden
                  initial={{ y: "120%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.75, delay: delay + idx * stagger, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
          {wi < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}
