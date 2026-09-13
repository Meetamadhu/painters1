import { ReactNode, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

interface ScrollTintFrameProps {
  children: ReactNode;
  className?: string;
  /** Graphite multiply wash — builds as the frame scrolls away */
  inkRgb?: string;
  /** Celadon wash — soft brand tint over the image */
  steelRgb?: string;
  /** Peak ink overlay (0–1) near the bottom of the scroll range */
  intensity?: number;
}

/**
 * Wrap imagery so a brand color overlay strengthens while scrolling down
 * through the frame’s viewport range.
 */
export default function ScrollTintFrame({
  children,
  className = '',
  inkRgb = '22, 25, 28',
  steelRgb = '143, 184, 168',
  intensity = 0.52
}: ScrollTintFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Clearer near mid-viewport; colour wash builds as you scroll past
  const inkOpacity = useTransform(
    scrollYProgress,
    [0, 0.28, 0.48, 0.72, 1],
    [0.18, 0.08, 0.12, intensity * 0.85, intensity]
  );
  const steelOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.55, 1],
    [0.22, 0.06, 0.18, intensity * 0.7]
  );

  const isAbsolute = /\babsolute\b/.test(className);

  return (
    <div
      ref={ref}
      className={`${isAbsolute ? '' : 'relative '}overflow-hidden ${className}`.trim()}
    >
      {children}
      {!reduceMotion && (
        <>
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none z-1 mix-blend-multiply"
            style={{
              opacity: inkOpacity,
              backgroundColor: `rgb(${inkRgb})`
            }}
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none z-1"
            style={{
              opacity: steelOpacity,
              background: `linear-gradient(165deg, rgba(${steelRgb}, 0.55) 0%, transparent 42%, rgba(${inkRgb}, 0.65) 100%)`
            }}
          />
        </>
      )}
    </div>
  );
}
