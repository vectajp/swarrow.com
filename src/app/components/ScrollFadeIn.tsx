import { type ReactNode, useRef } from "react";
import { type UseInViewOptions, motion, useInView } from "motion/react";

interface ScrollFadeInProps {
  children: ReactNode;
  /** Vertical offset in pixels (default: 24) */
  offset?: number;
  /** Animation duration in seconds (default: 0.7) */
  duration?: number;
  /** Delay before animation starts in seconds (default: 0) */
  delay?: number;
  /** InView margin — triggers animation before element fully enters viewport */
  margin?: UseInViewOptions["margin"];
}

export function ScrollFadeIn({
  children,
  offset = 24,
  duration = 0.7,
  delay = 0,
  margin = "-80px 0px",
}: ScrollFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: offset }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: offset }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
