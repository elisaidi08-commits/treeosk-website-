"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

/**
 * TypewriterEffect — reveal type machine à écrire (21st.dev / Aceternity) RÉADAPTÉ DA :
 * plus de bleu #3b82f6 ni de noir/blanc forcé → la couleur est héritée (text-fg) et le
 * curseur prend l'accent acier. `textClassName` permet de piloter la taille/typo du titre.
 */
type Word = { text: string; className?: string };

export const TypewriterEffect = ({
  words,
  className,
  textClassName,
  cursorClassName,
}: {
  words: Word[];
  className?: string;
  textClassName?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => ({ ...word, chars: word.text.split("") }));
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        { display: "inline-block", opacity: 1, width: "fit-content" },
        { duration: 0.3, delay: stagger(0.08), ease: "easeInOut" },
      );
    }
  }, [isInView, animate]);

  return (
    <div className={cn("font-sans font-medium", textClassName, className)}>
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block">
            {word.chars.map((char, index) => (
              <motion.span
                key={`char-${index}`}
                className={cn("hidden text-fg opacity-0", word.className)}
              >
                {char}
              </motion.span>
            ))}
            &nbsp;
          </div>
        ))}
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn("inline-block h-[0.9em] w-[3px] translate-y-[0.08em] rounded-sm bg-accent", cursorClassName)}
      />
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  textClassName,
  cursorClassName,
}: {
  words: Word[];
  className?: string;
  textClassName?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => ({ ...word, chars: word.text.split("") }));

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <motion.div
        className="overflow-hidden"
        initial={{ width: "0%" }}
        whileInView={{ width: "fit-content" }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "linear", delay: 0.4 }}
      >
        <div className={cn("font-sans font-medium", textClassName)} style={{ whiteSpace: "nowrap" }}>
          {wordsArray.map((word, idx) => (
            <div key={`word-${idx}`} className="inline-block">
              {word.chars.map((char, index) => (
                <span key={`char-${index}`} className={cn("text-fg", word.className)}>
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          ))}
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn("block h-[0.9em] w-[3px] rounded-sm bg-accent", cursorClassName)}
      />
    </div>
  );
};
